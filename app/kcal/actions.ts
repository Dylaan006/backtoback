'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addKcal(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const amount = parseInt(formData.get('amount') as string, 10)
  const date = new Date().toLocaleDateString('en-CA')

  const { data: current } = await supabase.from('daily_kcal').select('*').eq('date', date).maybeSingle()
  
  if (current) {
    await supabase.from('daily_kcal').update({ consumed: current.consumed + amount }).eq('id', current.id)
  } else {
    await supabase.from('daily_kcal').insert({ user_id: user.id, date, goal: 2500, consumed: amount })
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
