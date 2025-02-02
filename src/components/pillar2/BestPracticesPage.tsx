'use client'

import React from 'react'
import type { Pillar2Data } from '@/types/pillar2'

interface BestPracticesPageProps {
  data?: Pillar2Data["bestPractices"]
  onChange: (data: Pillar2Data["bestPractices"]) => void
  errors?: Record<string, string[]>
  onNextSection: () => void
}

export default function BestPracticesPage({ data, onChange, errors, onNextSection }: BestPracticesPageProps) {
  const updateField = (field: keyof Pillar2Data["bestPractices"], value: any) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Best Practices & Pro Tips</h3>
      <p>
        Learn how to integrate frameworks like OKRs, KPIs, and SMART goals into your AI tool usage. Review case studies and expert advice to avoid common pitfalls.
      </p>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Recommendations</label>
        <textarea
          value={data?.recommendations.join('\n') || ''}
          onChange={(e) => updateField('recommendations', e.target.value.split('\n'))}
          className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2 min-h-[100px]"
          placeholder="Enter your recommendations, one per line..."
        />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">Pro Tips</label>
        <textarea
          value={data?.proTips || ''}
          onChange={(e) => updateField('proTips', e.target.value)}
          className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2 min-h-[100px]"
          placeholder="Enter additional pro tips and case study notes..."
        />
      </div>
    </div>
  )
}