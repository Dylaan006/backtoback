'use client'
import { useRef } from 'react'
import { addTask } from '@/app/tasks/actions'
import { Plus } from 'lucide-react'

export function CreateTask() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await addTask(formData)
        formRef.current?.reset()
      }} 
      className="bg-[#111] p-4 rounded-xl border border-[#222] space-y-4"
    >
      <input 
        name="title" 
        placeholder="¿Qué hay que hacer?" 
        required 
        className="w-full bg-transparent border-b border-[#333] focus:border-emerald-500 pb-2 outline-none text-white transition-colors"
      />
      <div className="flex space-x-3">
        <select name="category" className="bg-[#222] text-sm text-gray-200 rounded-lg px-3 py-2 outline-none flex-1 border border-[#333] focus:border-emerald-500 transition-colors">
          <option>Personal</option>
          <option>Trabajo</option>
          <option>Estudio</option>
        </select>
        <select name="priority" className="bg-[#222] text-sm text-gray-200 rounded-lg px-3 py-2 outline-none flex-1 border border-[#333] focus:border-emerald-500 transition-colors">
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <button className="w-full flex items-center justify-center space-x-2 bg-emerald-500/10 text-emerald-500 py-3 rounded-lg font-semibold hover:bg-emerald-500/20 transition-colors">
        <Plus size={18} />
        <span>Agregar Tarea</span>
      </button>
    </form>
  )
}
