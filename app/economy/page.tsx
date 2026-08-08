import { createClient } from '@/utils/supabase/server'
import { BalanceCard } from '@/components/economy/BalanceCard'
import { TransactionForm } from '@/components/economy/TransactionForm'
import { FixedExpenses } from '@/components/economy/FixedExpenses'
import { deleteTransaction } from '@/app/economy/actions'
import { Trash2 } from 'lucide-react'

export default async function EconomyPage() {
  const supabase = await createClient()
  
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-CA')
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString('en-CA')

  const { data: transactions } = await supabase.from('transactions')
    .select('*')
    .gte('date', firstDay)
    .lte('date', lastDay)
    .order('created_at', { ascending: false })

  const { data: fixedExpenses } = await supabase.from('fixed_expenses').select('*').order('created_at', { ascending: false })

  const incomes = transactions?.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0) || 0
  const expenses = transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0) || 0
  const fixedTotal = fixedExpenses?.reduce((acc, e) => acc + e.amount, 0) || 0

  return (
    <main className="p-5 space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">Economía</h1>
        <p className="text-gray-400 mt-1">Administra tu dinero eficazmente.</p>
      </header>

      <BalanceCard incomes={incomes} expenses={expenses + fixedTotal} />

      <TransactionForm />

      <FixedExpenses expenses={fixedExpenses || []} total={fixedTotal} />

      <div className="space-y-3 pt-2">
        <h2 className="text-xl font-bold mb-4">Transacciones Recientes</h2>
        {transactions?.map(t => (
          <div key={t.id} className="flex justify-between items-center bg-[#111] p-4 rounded-xl border border-[#222]">
            <div>
              <p className="font-semibold text-white">{t.category}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.date}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              </span>
              <form action={async () => {
                'use server'
                await deleteTransaction(t.id)
              }}>
                <button className="text-gray-500 hover:text-rose-400 transition-colors bg-[#222] hover:bg-[#333] p-2 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {transactions?.length === 0 && (
          <p className="text-center text-gray-500 py-8 bg-[#111] rounded-xl border border-[#222]">No tienes transacciones este mes.</p>
        )}
      </div>
    </main>
  )
}
