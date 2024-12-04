import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Widget } from '@/types/widget'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TaskFormProps {
  onSubmit: (task: Omit<Widget, 'id' | 'lastPerformed' | 'created'>) => void
  trigger?: React.ReactNode
  dialogTitle?: string
}

export function TaskForm({ onSubmit, trigger, dialogTitle = 'Add New Task' }: TaskFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [targetDays, setTargetDays] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      targetDays: parseInt(targetDays),
    })
    setName('')
    setTargetDays('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Task</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDays">Target Days</Label>
            <Input
              id="targetDays"
              type="number"
              value={targetDays}
              onChange={(e) => setTargetDays(e.target.value)}
              placeholder="Enter target days"
              min="1"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Save Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}