import { Widget, WidgetProgress } from '@/types/widget'

export function calculateWidgetProgress(widget: Widget): WidgetProgress {
  const now = new Date()
  const daysSinceLastPerformed = Math.floor(
    (now.getTime() - widget.lastPerformed.getTime()) / (1000 * 60 * 60 * 24)
  )
  const daysUntilDue = widget.targetDays - daysSinceLastPerformed
  const percentageComplete = (daysSinceLastPerformed / widget.targetDays) * 100

  let status: WidgetProgress['status'] = 'normal'
  if (percentageComplete >= 100) {
    status = 'overdue'
  } else if (percentageComplete >= 70) {
    status = 'warning'
  }

  return {
    daysSinceLastPerformed,
    daysUntilDue,
    percentageComplete,
    status,
  }
}