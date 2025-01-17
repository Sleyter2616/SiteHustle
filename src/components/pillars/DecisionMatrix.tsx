'use client'

import { useState } from 'react'
import { FiDownload, FiStar, FiDollarSign, FiTrendingUp, FiCpu } from 'react-icons/fi'

interface Tool {
  id: string
  name: string
  category: string
  ratings: {
    easeOfUse: number
    design: number
    cost: number
    aiIntegration: number
  }
  description: string
}

const tools: Tool[] = [
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'Website Builder',
    ratings: {
      easeOfUse: 4,
      design: 5,
      cost: 3,
      aiIntegration: 4
    },
    description: 'Professional website builder with advanced design capabilities'
  },
  {
    id: 'bubble',
    name: 'Bubble',
    category: 'App Builder',
    ratings: {
      easeOfUse: 3,
      design: 4,
      cost: 3,
      aiIntegration: 5
    },
    description: 'Powerful no-code platform for building web applications'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Automation',
    ratings: {
      easeOfUse: 5,
      design: 3,
      cost: 4,
      aiIntegration: 5
    },
    description: 'Connect your apps and automate workflows'
  }
]

const criteria = [
  { id: 'easeOfUse', label: 'Ease of Use', icon: <FiStar /> },
  { id: 'design', label: 'Design Flexibility', icon: <FiTrendingUp /> },
  { id: 'cost', label: 'Cost Effectiveness', icon: <FiDollarSign /> },
  { id: 'aiIntegration', label: 'AI Integration', icon: <FiCpu /> }
]

export default function DecisionMatrix() {
  const [selectedTool, setSelectedTool] = useState<string>('webflow')

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-[#5865F2] fill-current' : 'text-[#4A5568]'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#E2E8F0]">Decision Matrix</h2>
        <p className="text-[#94A3B8]">
          Compare different tools based on key criteria to make an informed decision
          for your project.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-6 rounded-lg text-left transition-colors ${
              selectedTool === tool.id
                ? 'bg-[#5865F2] text-white'
                : 'bg-[#1E293B] text-[#E2E8F0] hover:bg-[#2D3748]'
            }`}
          >
            <h3 className="font-semibold mb-1">{tool.name}</h3>
            <span className={`text-sm ${
              selectedTool === tool.id ? 'text-[#E2E8F0]' : 'text-[#94A3B8]'
            }`}>
              {tool.category}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed Ratings */}
      {tools.map((tool) => tool.id === selectedTool && (
        <div key={tool.id} className="bg-[#1E293B] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">{tool.name}</h3>
          <p className="text-[#94A3B8] mb-6">{tool.description}</p>
          
          <div className="space-y-4">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E2E8F0]">
                  {criterion.icon}
                  <span>{criterion.label}</span>
                </div>
                {renderRatingStars(tool.ratings[criterion.id as keyof typeof tool.ratings])}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Download Template */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#2D3748] text-[#E2E8F0] rounded-lg hover:bg-[#374151] transition-colors">
          <FiDownload className="w-4 h-4" />
          <span>Download Matrix Template</span>
        </button>
      </div>
    </div>
  )
}
