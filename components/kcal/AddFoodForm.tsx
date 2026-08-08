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
    }} className="bg-[#111] border border-[#222] p-5 rounded-2xl space-y-4">
      <h3 className="font-semibold text-gray-300 text-sm">Registrar Alimento</h3>
      <div className="space-y-3">
        <input 
          name="name" 
          placeholder="¿Qué comiste? (ej. Manzana, Pollo con arroz)" 
          required 
          className="w-full bg-[#222] border border-[#333] focus:border-emerald-500 rounded-xl px-4 py-2.5 outline-none text-white text-sm transition-colors" 
        />
        <div className="flex space-x-3">
          <input 
            name="calories" 
            type="number" 
            placeholder="Calorías (kcal)" 
            required 
            className="flex-1 bg-[#222] border border-[#333] focus:border-emerald-500 rounded-xl px-4 py-2.5 outline-none text-white text-sm transition-colors" 
          />
          <button className="bg-emerald-500 text-black px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-400 transition-all active:scale-[0.98] flex items-center justify-center">
            <Plus size={20} className="mr-1" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </form>
  )
}
