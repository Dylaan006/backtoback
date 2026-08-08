'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addKcal(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const name = formData.get('name') as string
  const calories = parseInt(formData.get('calories') as string, 10)
  const date = new Date().toLocaleDateString('en-CA')

  // Insertar en el log de comidas
  await supabase.from('food_logs').insert({ user_id: user.id, name, calories, date })

  // Actualizar el resumen diario de calorías
  const { data: current } = await supabase.from('daily_kcal').select('*').eq('date', date).maybeSingle()
  
  if (current) {
    await supabase.from('daily_kcal').update({ consumed: current.consumed + calories }).eq('id', current.id)
  } else {
    await supabase.from('daily_kcal').insert({ user_id: user.id, date, goal: 2500, consumed: calories })
  }
  
  revalidatePath('/kcal')
}

export async function deleteFoodLog(id: string, calories: number, date: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Eliminar el log de comida
  await supabase.from('food_logs').delete().eq('id', id)

  // Descontar del resumen diario
  const { data: current } = await supabase.from('daily_kcal').select('*').eq('date', date).maybeSingle()
  if (current) {
    const newConsumed = Math.max(0, current.consumed - calories)
    await supabase.from('daily_kcal').update({ consumed: newConsumed }).eq('id', current.id)
  }

  revalidatePath('/kcal')
}

export async function updateGoal(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const goal = parseInt(formData.get('goal') as string, 10)
  const date = new Date().toLocaleDateString('en-CA')

  const { data: current } = await supabase.from('daily_kcal').select('*').eq('date', date).maybeSingle()
  
  if (current) {
    await supabase.from('daily_kcal').update({ goal }).eq('id', current.id)
  } else {
    await supabase.from('daily_kcal').insert({ user_id: user.id, date, goal, consumed: 0 })
  }
  revalidatePath('/kcal')
}
