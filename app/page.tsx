"use client";

import { useState } from 'react'
import { MaintenanceWidget } from '@/components/widgets/MaintenanceWidget'
import { TaskForm } from '@/components/tasks/TaskForm'
import { Widget } from '@/types/widget'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([{
    id: '1',
    name: 'Shower Glass Cleaning',
    targetDays: 90,
    lastPerformed: new Date('2024-04-27'),
    created: new Date(),
  }])

  const handleReset = (id: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id 
        ? { ...widget, lastPerformed: new Date() }
        : widget
    ))
  }

  const handleAddTask = (task: Omit<Widget, 'id' | 'lastPerformed' | 'created'>) => {
    const newWidget: Widget = {
      id: String(Date.now()),
      name: task.name,
      targetDays: task.targetDays,
      lastPerformed: new Date(),
      created: new Date(),
    }
    setWidgets(prev => [...prev, newWidget])
  }

  const handleDeleteTask = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id))
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
          <TaskForm 
            onSubmit={handleAddTask}
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map(widget => (
            <div key={widget.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => handleDeleteTask(widget.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <MaintenanceWidget 
                widget={widget}
                onReset={handleReset}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}