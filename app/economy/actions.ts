'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTransaction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const type = formData.get('type') as string
  const amount = parseFloat(formData.get('amount') as string)
  const category = formData.get('category') as string
  const date = new Date().toLocaleDateString('en-CA')

  await supabase.from('transactions').insert({ user_id: user.id, type, amount, category, date })
  revalidatePath('/economy')
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  await supabase.from('transactions').delete().eq('id', id)
  revalidatePath('/economy')
}

export async function addFixedExpense(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const title = formData.get('title') as string
  const amount = parseFloat(formData.get('amount') as string)

  await supabase.from('fixed_expenses').insert({ user_id: user.id, title, amount })
  revalidatePath('/economy')
}

export async function deleteFixedExpense(id: string) {
  const supabase = await createClient()
  await supabase.from('fixed_expenses').delete().eq('id', id)
  revalidatePath('/economy')
}
