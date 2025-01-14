'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiLock, FiCheck } from 'react-icons/fi'
import { Database } from '@/lib/supabase'

type Pillar = Database['public']['Tables']['pillars']['Row']
type Progress = Database['public']['Tables']['user_progress']['Row']

interface PillarGridProps {
  pillars: Pillar[]
  progress: Progress[]
}

export default function PillarGrid({ pillars, progress }: PillarGridProps) {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)

  const isPillarCompleted = (pillarId: number) => {
    return progress.some(p => p.pillar_id === pillarId && p.completed)
  }

  const isPillarUnlocked = (pillarOrder: number) => {
    if (pillarOrder === 1) return true
    const previousPillar = pillars.find(p => p.order === pillarOrder - 1)
    return previousPillar ? isPillarCompleted(previousPillar.id) : false
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar) => {
        const isCompleted = isPillarCompleted(pillar.id)
        const isUnlocked = isPillarUnlocked(pillar.order)
        
        return (
          <div
            key={pillar.id}
            className={`relative overflow-hidden rounded-lg border ${
              isCompleted 
                ? 'border-green-200 bg-green-50' 
                : isUnlocked 
                  ? 'border-blue-200 bg-white' 
                  : 'border-gray-200 bg-gray-50'
            } p-6 shadow-sm transition-all duration-200 hover:shadow-md`}
            onMouseEnter={() => setHoveredPillar(pillar.id)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {pillar.title}
              </h3>
              {isCompleted ? (
                <FiCheck className="h-5 w-5 text-green-500" />
              ) : !isUnlocked ? (
                <FiLock className="h-5 w-5 text-gray-400" />
              ) : null}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {pillar.description}
            </p>
            {isUnlocked && (
              <Link
                href={`/pillars/${pillar.id}`}
                className={`mt-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {isCompleted ? 'Review Again' : 'Start Learning'}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
