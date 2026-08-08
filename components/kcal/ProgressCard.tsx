import { updateGoal } from '@/app/kcal/actions'

export function ProgressCard({ goal, consumed }: { goal: number, consumed: number }) {
  const percentage = Math.min((consumed / goal) * 100, 100)
  const remaining = goal - consumed

  return (
    <div className="bg-[#111] p-6 rounded-3xl border border-[#222]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Consumed</p>
          <p className="text-4xl font-bold text-white">{consumed} <span className="text-sm font-normal text-gray-500">kcal</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Remaining</p>
          <p className={`text-xl font-bold ${remaining > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {remaining > 0 ? remaining : 0} <span className="text-xs font-normal opacity-80">kcal</span>
          </p>
        </div>
      </div>
      
      <div className="h-4 bg-[#222] rounded-full overflow-hidden mb-6 shadow-inner">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${percentage >= 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <form action={updateGoal} className="flex items-center justify-between pt-5 border-t border-[#222]">
        <label className="text-sm font-medium text-gray-300">Daily Goal</label>
        <div className="flex space-x-2">
          <input name="goal" type="number" defaultValue={goal} className="w-24 bg-[#222] text-white text-center rounded-lg px-3 py-1.5 outline-none focus:border-emerald-500 border border-transparent transition-colors font-semibold" />
          <button className="bg-[#222] text-gray-300 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">Save</button>
        </div>
      </form>
    </div>
  )
}
