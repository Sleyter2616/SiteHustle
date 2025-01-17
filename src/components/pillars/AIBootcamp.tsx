'use client'

import { useState } from 'react'
import { FiPlay, FiCheck, FiCpu, FiMessageSquare, FiZap, FiImage } from 'react-icons/fi'

interface Module {
  id: string
  title: string
  description: string
  duration: string
  icon: JSX.Element
  completed?: boolean
}

const modules: Module[] = [
  {
    id: 'intro',
    title: 'Introduction to AI Tools',
    description: 'Learn the basics of AI and how it can transform your business',
    duration: '30 mins',
    icon: <FiCpu className="w-6 h-6" />
  },
  {
    id: 'content',
    title: 'Content Generation',
    description: 'Master prompts for creating engaging website copy and blog posts',
    duration: '45 mins',
    icon: <FiMessageSquare className="w-6 h-6" />
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Set up AI-powered automations for common business tasks',
    duration: '1 hour',
    icon: <FiZap className="w-6 h-6" />
  },
  {
    id: 'design',
    title: 'AI Design Assistant',
    description: 'Use AI tools to generate and edit images for your website',
    duration: '45 mins',
    icon: <FiImage className="w-6 h-6" />
  }
]

export default function AIBootcamp() {
  const [activeModule, setActiveModule] = useState<string>('intro')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#E2E8F0]">AI Bootcamp</h2>
        <p className="text-[#94A3B8]">
          A hands-on mini-course to help you leverage AI tools effectively in your business.
          Complete these modules to gain practical experience with AI-driven workflows.
        </p>
      </div>

      <div className="grid gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`bg-[#1E293B] rounded-lg p-6 ${
              activeModule === module.id ? 'ring-2 ring-[#5865F2]' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-[#5865F2] mt-1">{module.icon}</div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#E2E8F0]">{module.title}</h3>
                  <span className="text-sm text-[#94A3B8]">{module.duration}</span>
                </div>
                <p className="text-[#94A3B8] text-sm mb-4">{module.description}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveModule(module.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2D3748] text-[#E2E8F0] rounded-lg hover:bg-[#374151] transition-colors"
                  >
                    <FiPlay className="w-4 h-4" />
                    <span>Start Module</span>
                  </button>
                  {module.completed && (
                    <div className="flex items-center gap-2 text-[#10B981] text-sm">
                      <FiCheck className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2D3748] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#E2E8F0] mb-2">
          Mini-Project: Create an AI-Powered Landing Page
        </h3>
        <p className="text-[#94A3B8] mb-4">
          Put your AI skills to the test by creating a complete landing page using AI tools
          for content generation, image creation, and automated lead capture.
        </p>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors">
          <FiPlay className="w-4 h-4" />
          <span>Start Project</span>
        </button>
      </div>
    </div>
  )
}
