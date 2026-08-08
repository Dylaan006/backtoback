'use client'
import { useRef } from 'react'
import { addHabit } from '@/app/habits/actions'
import { Plus } from 'lucide-react'

export function CreateHabit() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await addHabit(formData)
        formRef.current?.reset()
      }} 
      className="flex space-x-2"
    >
      <input 
        name="title" 
        placeholder="Nuevo hábito (ej. Leer 20 min, Entrenar)" 
        required 
        className="flex-1 bg-[#111] border border-[#333] focus:border-emerald-500 rounded-xl px-4 py-3 outline-none text-white transition-colors"
      />
      <button className="bg-emerald-500 text-black p-3 rounded-xl hover:bg-emerald-400 transition-colors flex-shrink-0">
        <Plus size={24} />
      </button>
    </form>
  )
}
