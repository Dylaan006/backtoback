import { createClient } from '@/utils/supabase/server'
import { HabitCard } from '@/components/habits/HabitCard'
import { CreateHabit } from '@/components/habits/CreateHabit'

export default async function HabitsPage() {
  const supabase = await createClient()
  
  const { data: habits } = await supabase.from('habits').select('*').order('created_at', { ascending: false })
  const { data: logs } = await supabase.from('habit_logs').select('habit_id, completed_date')

  const todayStr = new Date().toLocaleDateString('en-CA')

  // Ultimos 7 dias
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return {
      dateStr: d.toLocaleDateString('en-CA'),
      dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      dayNum: d.getDate(),
    }
  })

  return (
    <main className="p-5 space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
        <p className="text-gray-400 mt-1">Build better routines.</p>
      </header>

      <CreateHabit />

      <div className="grid grid-cols-1 gap-4">
        {habits?.map(habit => {
          const habitLogs = logs?.filter(l => l.habit_id === habit.id) || []
          const completedDatesSet = new Set(habitLogs.map(l => l.completed_date))
          const isCompletedToday = completedDatesSet.has(todayStr)
          const totalCompleted = completedDatesSet.size

          const history7Days = last7Days.map(d => ({
            ...d,
            completed: completedDatesSet.has(d.dateStr),
            isToday: d.dateStr === todayStr
          }))

          return (
            <HabitCard 
              key={habit.id} 
              habit={habit} 
              isCompleted={isCompletedToday} 
              dateStr={todayStr} 
              totalCompleted={totalCompleted}
              history7Days={history7Days}
            />
          )
        })}
        {habits?.length === 0 && (
          <p className="text-center text-gray-500 py-8">No habits yet. Start tracking today!</p>
        )}
      </div>
    </main>
  )
}
