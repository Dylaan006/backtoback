import { createClient } from '@/utils/supabase/server'
import { TaskItem } from '@/components/tasks/TaskItem'
import { CreateTask } from '@/components/tasks/CreateTask'

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: tasks } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
  
  const pendingTasks = tasks?.filter(t => !t.completed) || []
  const completedTasks = tasks?.filter(t => t.completed) || []

  return (
    <main className="p-5 space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
        <p className="text-gray-400 mt-1">Administra tus metas diarias.</p>
      </header>

      <CreateTask />

      <div className="space-y-3">
        {pendingTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        {pendingTasks.length === 0 && completedTasks.length === 0 && (
          <p className="text-center text-gray-500 py-8">No tienes tareas aún. ¡Crea una arriba!</p>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="pt-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Completadas</h2>
          {completedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  )
}
