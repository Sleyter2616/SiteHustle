'use client'

import React from 'react'
import type { Pillar2Data } from '@/types/pillar2'
import { FiPlay, FiCheckCircle } from 'react-icons/fi'

interface AiBootcampModulePageProps {
  data?: Pillar2Data["aiBootcampModule"]
  onChange: (data: Pillar2Data["aiBootcampModule"]) => void
  errors?: Record<string, string[]>
  onNextSection: () => void
}

export default function AiBootcampModulePage({ data, onChange, errors, onNextSection }: AiBootcampModulePageProps) {
  // For simplicity, we render a list of modules (static data for now)
  const modules = [
    {
      id: 'basics',
      title: 'Module 1: AI Fundamentals',
      description: 'Learn the basics of AI and its applications in business.',
      topics: [
        'Understanding AI capabilities',
        'Key AI tools for entrepreneurs',
        'Ethical considerations',
        'Practical examples'
      ],
      project: {
        title: 'AI Tool Evaluation',
        steps: [
          'Select 3 AI tools relevant to your business',
          'Test each tool with real business scenarios',
          'Document pros, cons, and potential ROI',
          'Create an implementation plan'
        ]
      }
    },
    {
      id: 'content',
      title: 'Module 2: AI for Content Creation',
      description: 'Master AI-powered content generation and optimization.',
      topics: [
        'Content strategy with AI',
        'Generating compelling copy',
        'Image generation and editing',
        'Content repurposing workflows'
      ],
      project: {
        title: 'AI Content Pipeline',
        steps: [
          'Generate a blog post with AI',
          'Create social media variants',
          'Design matching visuals',
          'Set up an automated publishing workflow'
        ]
      }
    },
    {
      id: 'advanced',
      title: 'Module 3: Advanced AI Workflows',
      description: 'Build sophisticated AI automation for your business.',
      topics: [
        'Multi-step AI processes',
        'Tool integration patterns',
        'Custom AI model fine-tuning',
        'Performance optimization'
      ],
      project: {
        title: 'Automated Customer Journey',
        steps: [
          'Set up automated lead responses',
          'Create personalized follow-ups',
          'Implement sentiment analysis',
          'Build a feedback loop'
        ]
      }
    }
  ]

  const handleStartModule = (moduleId: string) => {
    // For demonstration, update the content draft to indicate module start
    onChange({ ...data, contentDraft: `Started module ${moduleId}` })
  }

  const isModuleStarted = (moduleId: string): boolean => {
    // Simple check based on contentDraft text
    return data?.contentDraft.includes(moduleId) || false
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">AI Bootcamp Module</h3>
      <p>
        Master AI tools and workflows through hands-on modules and practical projects.
      </p>
      <div className="space-y-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-medium text-white">{module.title}</h4>
                <p className="text-gray-400 mt-1">{module.description}</p>
              </div>
              <button
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  isModuleStarted(module.id)
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
                onClick={() => handleStartModule(module.id)}
                disabled={isModuleStarted(module.id)}
              >
                {isModuleStarted(module.id) ? (
                  <>
                    <FiCheckCircle className="mr-2" />
                    In Progress
                  </>
                ) : (
                  <>
                    <FiPlay className="mr-2" />
                    Start Module
                  </>
                )}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h5 className="text-md font-medium text-white mb-2">Topics Covered:</h5>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  {module.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-md font-medium text-white mb-2">Project Steps:</h5>
                <ol className="list-decimal list-inside text-gray-400 space-y-1">
                  {module.project.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}