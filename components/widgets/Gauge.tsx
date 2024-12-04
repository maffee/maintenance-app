import React from 'react'
import { cn } from '@/lib/utils'

interface GaugeProps {
  percentage: number
  status: 'normal' | 'warning' | 'overdue'
}

export function Gauge({ percentage, status }: GaugeProps) {
  const angle = (percentage / 100) * 180

  const statusColors = {
    normal: 'bg-green-500',
    warning: 'bg-orange-500',
    overdue: 'bg-red-500'
  }

  return (
    <div className="relative w-40 h-20 mx-auto">
      {/* Gauge background */}
      <div className="absolute w-40 h-20 overflow-hidden">
        <div className="absolute bottom-0 w-40 h-40 rounded-full bg-gray-200" />
      </div>
      
      {/* Gauge fill */}
      <div className="absolute w-40 h-20 overflow-hidden">
        <div 
          className={cn(
            'absolute bottom-0 w-40 h-40 rounded-full transition-transform duration-500',
            statusColors[status]
          )}
          style={{
            transform: `rotate(${angle - 180}deg)`
          }}
        />
      </div>
      
      {/* Percentage text */}
      <div className="absolute bottom-0 w-full text-center">
        <span className="text-2xl font-bold">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}