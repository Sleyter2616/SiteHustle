'use client'

import { FiCheck } from 'react-icons/fi'

interface ProgramFeatureProps {
  title: string
  description: string
}

export default function ProgramFeature({ title, description }: ProgramFeatureProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="mt-1">
        <div className="w-5 h-5 rounded-full bg-[#6C63FF]/20 flex items-center justify-center">
          <FiCheck className="w-3 h-3 text-[#6C63FF]" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-[#E2E8F0] mb-1">{title}</h3>
        <p className="text-[#94A3B8] text-sm">{description}</p>
      </div>
    </div>
  )
}
