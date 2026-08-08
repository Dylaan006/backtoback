'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addHabit(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const title = formData.get('title') as string
  await supabase.from('habits').insert({ user_id: user.id, title })
  revalidatePath('/habits')
}

export async function deleteHabit(id: string) {
  const supabase = await createClient()
  await supabase.from('habits').delete().eq('id', id)
  revalidatePath('/habits')
}

export async function toggleHabitToday(habitId: string, completed: boolean, dateStr: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  if (completed) {
    await supabase.from('habit_logs').insert({ user_id: user.id, habit_id: habitId, completed_date: dateStr })
  } else {
    await supabase.from('habit_logs').delete().match({ habit_id: habitId, completed_date: dateStr })
  }
  revalidatePath('/habits')
}
