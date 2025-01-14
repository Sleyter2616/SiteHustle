'use client'

import { Pillar } from '../../types/pillar'
import Link from 'next/link'
import { FiLock } from 'react-icons/fi'
import * as FiIcons from 'react-icons/fi'

interface PillarCardProps {
  pillar: Pillar
}

export default function PillarCard({ pillar }: PillarCardProps) {
  // Dynamically get the icon from react-icons/fi
  const IconComponent = FiIcons[pillar.icon as keyof typeof FiIcons]

  return (
    <div className="relative group">
      <div className={`card h-full ${pillar.isLocked ? 'opacity-75' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`text-2xl ${pillar.isLocked ? 'text-[#94A3B8]' : 'text-[#6C63FF]'}`}>
            {IconComponent && <IconComponent />}
          </div>
          {pillar.isLocked && (
            <div className="text-[#94A3B8]">
              <FiLock />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-[#E2E8F0]">
          {pillar.title}
        </h3>
        
        <p className="text-[#94A3B8] mb-6">
          {pillar.description}
        </p>

        {pillar.isLocked ? (
          <div className="text-[#94A3B8] text-sm font-medium">
            Complete previous pillars to unlock
          </div>
        ) : (
          <Link 
            href={`/pillars/${pillar.id}`}
            className="btn-primary inline-flex items-center justify-center w-full"
          >
            View Pillar
          </Link>
        )}
      </div>
      
      {pillar.isLocked && (
        <div className="absolute inset-0 bg-[#0F172A]/30 rounded-xl pointer-events-none" />
      )}
    </div>
  )
}
