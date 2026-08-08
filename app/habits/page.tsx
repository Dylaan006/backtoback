import { createClient } from '@/utils/supabase/server'
import { HabitCard } from '@/components/habits/HabitCard'
import { CreateHabit } from '@/components/habits/CreateHabit'

export default async function HabitsPage() {
  const supabase = await createClient()
  
  const { data: habits } = await supabase.from('habits').select('*').order('created_at', { ascending: false })
  
  // Formato local YYYY-MM-DD
  const today = new Date().toLocaleDateString('en-CA')
  const { data: logs } = await supabase.from('habit_logs').select('habit_id').eq('completed_date', today)
  
  const completedHabitIds = new Set(logs?.map(l => l.habit_id) || [])

  return (
    <main className="p-5 space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
        <p className="text-gray-400 mt-1">Build better routines.</p>
      </header>

      <CreateHabit />

      <div className="grid grid-cols-1 gap-4">
        {habits?.map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            isCompleted={completedHabitIds.has(habit.id)} 
            dateStr={today} 
          />
        ))}
        {habits?.length === 0 && (
          <p className="text-center text-gray-500 py-8">No habits yet. Start tracking today!</p>
        )}
      </div>
    </main>
  )
}
