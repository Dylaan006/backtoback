'use client'

import { useTransition } from 'react'
import { toggleHabitToday, deleteHabit } from '@/app/habits/actions'
import { Check, Trash2, Flame } from 'lucide-react'

interface HistoryDay {
  dateStr: string
  dayName: string
  dayNum: number
  completed: boolean
  isToday: boolean
}

export function HabitCard({
  habit,
  isCompleted,
  dateStr,
  totalCompleted,
  history7Days,
}: {
  habit: any
  isCompleted: boolean
  dateStr: string
  totalCompleted: number
  history7Days: HistoryDay[]
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className={`p-4 rounded-2xl border transition-all ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-[#111] border-[#222]'}`}>
      {/* Header: Title, Total Badge & Actions */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-base text-white">{habit.title}</h3>
          <span className="flex items-center space-x-1 text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            <Flame size={12} />
            <span>{totalCompleted} {totalCompleted === 1 ? 'día' : 'días'}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Compact Done Button */}
          <button 
            disabled={isPending}
            onClick={() => startTransition(() => toggleHabitToday(habit.id, !isCompleted, dateStr))}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold text-xs transition-all active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                : 'bg-[#222] text-gray-300 hover:bg-[#333] border border-[#333]'
            }`}
          >
            <Check size={14} className={isCompleted ? 'stroke-[3]' : ''} />
            <span>{isCompleted ? 'Listo' : 'Marcar'}</span>
          </button>

          <button 
            onClick={() => startTransition(() => deleteHabit(habit.id))}
            disabled={isPending}
            className="text-gray-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-[#222]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* 7 Days Grid */}
      <div className="pt-2.5 border-t border-[#222]">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">Últimos 7 días</p>
        <div className="flex justify-between items-center max-w-sm">
          {history7Days.map((day) => (
            <div key={day.dateStr} className="flex flex-col items-center space-y-1">
              <span className={`text-[10px] ${day.isToday ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>
                {day.dayName}
              </span>
              <div 
                title={`${day.dateStr}: ${day.completed ? 'Completado' : 'No completado'}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                  day.completed 
                    ? 'bg-emerald-500 text-black shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                    : day.isToday
                    ? 'bg-[#222] border border-emerald-500/50'
                    : 'bg-[#181818] border border-[#262626]'
                }`}
              >
                {day.completed && <Check size={12} className="stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
