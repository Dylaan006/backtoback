export function DailyHistory({ history }: { history: any[] }) {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="font-bold text-xl mb-4">History</h3>
      <div className="space-y-3">
        {history.map(day => {
          const percentage = Math.min((day.consumed / day.goal) * 100, 100)
          const isOver = day.consumed > day.goal
          return (
            <div key={day.id} className="bg-[#111] p-4 rounded-xl border border-[#222]">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-200">{day.date}</span>
                <span className={`text-sm font-bold bg-[#222] px-2 py-1 rounded-md ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {day.consumed} / {day.goal} kcal
                </span>
              </div>
              <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isOver ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
        {history.length === 0 && (
          <p className="text-gray-500 text-center py-6 bg-[#111] rounded-xl border border-[#222]">No history yet.</p>
        )}
      </div>
    </div>
  )
}
