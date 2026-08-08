'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const priority = formData.get('priority') as string

  await supabase.from('tasks').insert({
    user_id: user.id,
    title,
    category,
    priority,
  })

  revalidatePath('/tasks')
}

export async function toggleTask(id: string, completed: boolean) {
  const supabase = await createClient()
  await supabase.from('tasks').update({ completed }).eq('id', id)
  revalidatePath('/tasks')
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  await supabase.from('tasks').delete().eq('id', id)
  revalidatePath('/tasks')
}
