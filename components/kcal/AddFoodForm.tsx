'use client'
import { useRef } from 'react'
import { addKcal } from '@/app/kcal/actions'
import { Plus } from 'lucide-react'

export function AddFoodForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (fd) => {
      await addKcal(fd)
      formRef.current?.reset()
    }} className="flex space-x-3">
      <input name="amount" type="number" placeholder="Add calories (e.g. 350)" required className="flex-1 bg-[#111] border border-[#222] focus:border-emerald-500 rounded-2xl px-5 py-4 outline-none text-white text-lg transition-colors font-medium" />
      <button className="bg-emerald-500 text-black px-6 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all active:scale-[0.98] flex items-center justify-center">
        <Plus size={24} />
      </button>
    </form>
  )
}
