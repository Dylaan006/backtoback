import { createClient } from '@/utils/supabase/server'
import { ProgressCard } from '@/components/kcal/ProgressCard'
import { AddFoodForm } from '@/components/kcal/AddFoodForm'
import { DailyHistory } from '@/components/kcal/DailyHistory'

export default async function KcalPage() {
  const supabase = await createClient()
  const date = new Date().toLocaleDateString('en-CA')
  
  const { data: todayRecord } = await supabase.from('daily_kcal').select('*').eq('date', date).maybeSingle()
  const { data: history } = await supabase.from('daily_kcal').select('*').lt('date', date).order('date', { ascending: false }).limit(10)

  const goal = todayRecord?.goal || 2500
  const consumed = todayRecord?.consumed || 0

  return (
    <main className="p-5 space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">KCAL Counter</h1>
        <p className="text-gray-400 mt-1">Track your daily nutrition.</p>
      </header>

      <ProgressCard goal={goal} consumed={consumed} />

      <AddFoodForm />

      <DailyHistory history={history || []} />
    </main>
  )
}
