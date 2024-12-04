"use client";

import { useState } from 'react'
import { MaintenanceWidget } from '@/components/widgets/MaintenanceWidget'
import { Widget } from '@/types/widget'

export default function Home() {
  const [widget, setWidget] = useState<Widget>({
    id: '1',
    name: 'Shower Glass Cleaning',
    targetDays: 90,
    lastPerformed: new Date('2024-04-27'),
    created: new Date(),
  })

  const handleReset = (id: string) => {
    if (id === widget.id) {
      setWidget(prev => ({
        ...prev,
        lastPerformed: new Date()
      }))
    }
  }
// comment
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Maintenance Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MaintenanceWidget 
            widget={widget}
            onReset={handleReset}
          />
        </div>
      </div>
    </main>
  )
}