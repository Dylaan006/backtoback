export function DailyHistory({ history }: { history: any[] }) {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="font-bold text-xl mb-4">Historial</h3>
      <div className="space-y-4">
        {history.map(day => {
          const percentage = Math.min((day.consumed / day.goal) * 100, 100)
          const isOver = day.consumed > day.goal
          return (
            <div key={day.id} className="bg-[#111] p-4 rounded-xl border border-[#222] space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-200">{day.date}</span>
                <span className={`text-sm font-bold bg-[#222] px-2.5 py-1 rounded-md ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {day.consumed} / {day.goal} kcal
                </span>
              </div>
              <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isOver ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              {/* Comidas detalladas de este día */}
              {day.foods && day.foods.length > 0 && (
                <div className="pt-2 border-t border-[#222]/50 space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Detalle del día:</p>
                  <div className="space-y-1">
                    {day.foods.map((food: any) => (
                      <div key={food.id} className="flex justify-between text-xs text-gray-400">
                        <span>• {food.name}</span>
                        <span className="font-mono text-gray-500">{food.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {history.length === 0 && (
          <p className="text-gray-500 text-center py-6 bg-[#111] rounded-xl border border-[#222]">No hay historial registrado.</p>
        )}
      </div>
    </div>
  )
}
