'use client'

import React from 'react'
import type { Pillar2Data } from '@/types/pillar2'

interface DecisionMatrixPageProps {
  data?: Pillar2Data["decisionMatrix"]
  onChange: (data: Pillar2Data["decisionMatrix"]) => void
  errors?: Record<string, string[]>
  onNextSection: () => void
}

export default function DecisionMatrixPage({ data, onChange, errors, onNextSection }: DecisionMatrixPageProps) {
  // Update the rating with a default object if missing
  const updateRating = (toolName: string, field: string, value: number) => {
    const currentRatings = data && data[toolName]
      ? { ...data[toolName] }
      : { easeOfUse: 0, cost: 0, scalability: 0, aiIntegration: 0 }
    currentRatings[field] = value
    onChange({
      ...data,
      [toolName]: currentRatings
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Tool Decision Matrix</h3>
      <p>
        Rate each tool based on ease of use, design flexibility, cost, scalability, and AI integration.
      </p>
      <div className="space-y-4">
        {/* For illustration, we include static entries for a few tools */}
        {['ChatGPT', 'Zapier', 'Webflow'].map((toolName) => (
          <div key={toolName} className="bg-[#1E293B] p-4 rounded-lg">
            <h4 className="text-lg font-medium text-white">{toolName}</h4>
            <div className="space-y-2 mt-2">
              <div>
                <label className="text-sm text-gray-400">Ease of Use:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={data?.[toolName]?.easeOfUse || 0}
                  onChange={(e) => updateRating(toolName, 'easeOfUse', Number(e.target.value))}
                  className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Cost:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={data?.[toolName]?.cost || 0}
                  onChange={(e) => updateRating(toolName, 'cost', Number(e.target.value))}
                  className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Scalability:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={data?.[toolName]?.scalability || 0}
                  onChange={(e) => updateRating(toolName, 'scalability', Number(e.target.value))}
                  className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">AI Integration:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={data?.[toolName]?.aiIntegration || 0}
                  onChange={(e) => updateRating(toolName, 'aiIntegration', Number(e.target.value))}
                  className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}