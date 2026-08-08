import { createClient } from '@/utils/supabase/server'
import { ProgressCard } from '@/components/kcal/ProgressCard'
import { AddFoodForm } from '@/components/kcal/AddFoodForm'
import { DailyHistory } from '@/components/kcal/DailyHistory'

export default async function KcalPage() {
  const supabase = await createClient()
  const today = new Date().toLocaleDateString('en-CA')
  
  const { data: dailyRecords } = await supabase.from('daily_kcal').select('*').order('date', { ascending: false })
  const { data: foodLogs } = await supabase.from('food_logs').select('*').order('created_at', { ascending: false })

  const todayRecord = dailyRecords?.find(r => r.date === today)
  const todayFoodLogs = foodLogs?.filter(l => l.date === today) || []

  const goal = todayRecord?.goal || 2500
  const consumed = todayRecord?.consumed || 0

  // Combinar registros diarios con sus comidas para el historial (excluyendo hoy)
  const history = dailyRecords
    ?.filter(r => r.date !== today)
    .map(r => ({
      ...r,
      foods: foodLogs?.filter(l => l.date === r.date) || []
    }))
    .slice(0, 10) || []

  return (
    <main className="p-5 space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">Contador KCAL</h1>
        <p className="text-gray-400 mt-1">Lleva el control de tu nutrición diaria.</p>
      </header>

      <ProgressCard goal={goal} consumed={consumed} />

      <AddFoodForm />

      {/* Comidas de hoy */}
      {todayFoodLogs.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-300">Comidas de Hoy</h3>
          <div className="space-y-2">
            {todayFoodLogs.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-[#111] p-3.5 rounded-xl border border-[#222]">
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.calories} kcal</p>
                </div>
                <form action={async () => {
                  'use server'
                  const { deleteFoodLog } = await import('@/app/kcal/actions')
                  await deleteFoodLog(item.id, item.calories, item.date)
                }}>
                  <button className="text-gray-500 hover:text-rose-400 bg-[#222] hover:bg-[#333] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                    Eliminar
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      <DailyHistory history={history} />
    </main>
  )
}
