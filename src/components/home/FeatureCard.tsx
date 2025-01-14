'use client'

import * as FiIcons from 'react-icons/fi'

interface FeatureCardProps {
  title: string
  description: string
  bulletPoints: string[]
  icon: string
}

export default function FeatureCard({ title, description, bulletPoints, icon }: FeatureCardProps) {
  const IconComponent = FiIcons[icon as keyof typeof FiIcons]

  return (
    <div className="card h-full flex flex-col">
      <div className="mb-4 text-[#6C63FF]">
        {IconComponent && <IconComponent size={32} />}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#E2E8F0]">{title}</h3>
      <p className="text-[#94A3B8] mb-4">{description}</p>
      <ul className="mt-auto space-y-2">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start space-x-2 text-sm text-[#94A3B8]">
            <span className="text-[#6C63FF] mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
