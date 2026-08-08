import { addFixedExpense, deleteFixedExpense } from '@/app/economy/actions'
import { Trash2 } from 'lucide-react'

export function FixedExpenses({ expenses, total }: { expenses: any[], total: number }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-200">Gastos Fijos</h3>
        <span className="text-rose-400 text-sm font-bold bg-rose-400/10 px-2 py-1 rounded-md">-${total.toFixed(2)}</span>
      </div>
      
      <div className="space-y-2 mb-5">
        {expenses.map(exp => (
          <div key={exp.id} className="flex justify-between items-center bg-[#1a1a1a] p-3.5 rounded-xl border border-[#222]">
            <span className="text-sm font-medium text-gray-300">{exp.title}</span>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-white">${exp.amount.toFixed(2)}</span>
              <form action={async () => {
                'use server'
                await deleteFixedExpense(exp.id)
              }}>
                <button className="text-gray-500 hover:text-rose-400 transition-colors bg-[#222] hover:bg-[#333] p-1.5 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-2">No tienes gastos fijos aún.</p>
        )}
      </div>

      <form action={addFixedExpense} className="flex space-x-2">
        <input name="title" placeholder="Gym, Alquiler..." required className="flex-1 bg-[#222] border border-[#333] focus:border-emerald-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors" />
        <input name="amount" type="number" step="0.01" placeholder="Monto" required className="w-24 bg-[#222] border border-[#333] focus:border-emerald-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors" />
        <button className="bg-emerald-500/10 text-emerald-500 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-colors">
          Agregar
        </button>
      </form>
    </div>
  )
}
