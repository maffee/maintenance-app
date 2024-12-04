import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gauge } from './Gauge'
import { Widget, WidgetProgress } from '@/types/widget'
import { calculateWidgetProgress } from '@/lib/widget'

interface MaintenanceWidgetProps {
  widget: Widget
  onReset: (id: string) => void
}

export function MaintenanceWidget({ widget, onReset }: MaintenanceWidgetProps) {
  const progress = calculateWidgetProgress(widget)

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{widget.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Gauge 
          percentage={progress.percentageComplete}
          status={progress.status}
        />
        <div className="mt-4 space-y-2 text-sm">
          <p>Target: {widget.targetDays} days</p>
          <p>Days since last: {progress.daysSinceLastPerformed}</p>
          <p>Days until due: {progress.daysUntilDue}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onReset(widget.id)}
          className="w-full"
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}