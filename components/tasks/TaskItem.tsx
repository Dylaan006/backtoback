'use client'

import { useTransition } from 'react'
import { toggleTask, deleteTask } from '@/app/tasks/actions'
import { Trash2 } from 'lucide-react'

export function TaskItem({ task }: { task: any }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className={`flex items-center justify-between p-4 bg-[#111] rounded-xl border border-[#222] transition-opacity ${task.completed ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex items-center space-x-4 flex-1">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={(e) => startTransition(() => toggleTask(task.id, e.target.checked))}
          className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
          disabled={isPending}
        />
        <div className="flex-1">
          <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</p>
          <div className="flex items-center space-x-2 text-xs mt-1.5">
            <span className="text-gray-400 bg-[#222] px-2 py-0.5 rounded">{task.category}</span>
            <span className={`px-2 py-0.5 rounded font-medium ${
              task.priority === 'Alta' ? 'text-rose-400 bg-rose-400/10' : 
              task.priority === 'Media' ? 'text-amber-400 bg-amber-400/10' : 
              'text-blue-400 bg-blue-400/10'
            }`}>{task.priority}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => startTransition(() => deleteTask(task.id))}
        disabled={isPending}
        className="p-2 text-gray-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-400/10 ml-2"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
