'use client'

import { useTransition } from 'react'
import { toggleHabitToday, deleteHabit } from '@/app/habits/actions'
import { Check, Trash2 } from 'lucide-react'

export function HabitCard({ habit, isCompleted, dateStr }: { habit: any, isCompleted: boolean, dateStr: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className={`p-5 rounded-2xl border transition-all ${isCompleted ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-[#111] border-[#222]'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg">{habit.title}</h3>
        <button 
          onClick={() => startTransition(() => deleteHabit(habit.id))}
          disabled={isPending}
          className="text-gray-500 hover:text-rose-400 transition-colors p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <button 
        disabled={isPending}
        onClick={() => startTransition(() => toggleHabitToday(habit.id, !isCompleted, dateStr))}
        className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-bold text-lg transition-all active:scale-[0.98] ${
          isCompleted 
            ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
            : 'bg-[#222] text-gray-400 hover:bg-[#333]'
        }`}
      >
        {isCompleted ? (
          <>
            <Check size={24} />
            <span>Completed</span>
          </>
        ) : (
          <span>Mark Done</span>
        )}
      </button>
    </div>
  )
}
