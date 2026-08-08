'use client'
import { useRef } from 'react'
import { addTransaction } from '@/app/economy/actions'

export function TransactionForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (fd) => {
      await addTransaction(fd)
      formRef.current?.reset()
    }} className="bg-[#111] border border-[#222] p-5 rounded-2xl space-y-4">
      <h3 className="font-semibold text-gray-300">Nueva Transacción</h3>
      <div className="flex space-x-3">
        <select name="type" className="bg-[#222] text-sm text-gray-200 rounded-xl px-3 py-2.5 outline-none w-1/3 border border-[#333] focus:border-emerald-500 transition-colors">
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
        <input name="amount" type="number" step="0.01" placeholder="Monto" required className="flex-1 bg-[#222] border border-[#333] rounded-xl px-4 py-2.5 outline-none text-white text-sm focus:border-emerald-500 transition-colors" />
      </div>
      <div className="flex space-x-3">
        <input name="category" placeholder="Categoría (ej. Comida, Gym)" required className="flex-1 bg-[#222] border border-[#333] rounded-xl px-4 py-2.5 outline-none text-white text-sm focus:border-emerald-500 transition-colors" />
        <button className="bg-emerald-500 text-black px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-400 transition-all active:scale-[0.98]">
          Agregar
        </button>
      </div>
    </form>
  )
}
