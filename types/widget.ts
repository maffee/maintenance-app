export interface Widget {
  id: string
  name: string
  targetDays: number
  lastPerformed: Date
  created: Date
}

export interface WidgetProgress {
  daysSinceLastPerformed: number
  daysUntilDue: number
  percentageComplete: number
  status: 'normal' | 'warning' | 'overdue'
} 