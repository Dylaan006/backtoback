export function BalanceCard({ incomes, expenses }: { incomes: number, expenses: number }) {
  const net = incomes - expenses
  return (
    <div className="bg-gradient-to-br from-emerald-900/40 to-[#111] border border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
      <p className="text-emerald-500/70 text-sm font-semibold uppercase tracking-wider mb-1">Net Balance</p>
      <h2 className="text-5xl font-bold text-white tracking-tight">${net.toFixed(2)}</h2>
      
      <div className="flex justify-between mt-8">
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">Incomes</p>
          <p className="text-xl font-semibold text-emerald-400">+${incomes.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">Expenses</p>
          <p className="text-xl font-semibold text-rose-400">-${expenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
