'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ProgressBar from '../dashboard/ProgressBar'
import Alert from '../common/Alert'
import { FiDownload, FiCheckCircle, FiPlay, FiExternalLink } from 'react-icons/fi'
import type { Pillar2Data, AIModuleProgress } from '@/types/pillar2'
import { websiteBuilders, appBuilders, automationTools, databaseTools, aiTools, lowCodeTools, integrationTools } from '@/types/tools'
import { ToolSection } from '@/components/tools/ToolSection'

interface Tool {
  id: string
  name: string
  category: 'no-code' | 'ai' | 'automation'
  description: string
  pros: string[]
  pricing: string
  link: string
}

const recommendedTools: Tool[] = [
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'no-code',
    description: 'Professional website builder with advanced design capabilities',
    pros: [
      'Visual design control',
      'Professional animations',
      'CMS functionality',
      'Hosting included'
    ],
    pricing: 'From $12/month',
    link: 'https://webflow.com'
  },
  {
    id: 'bubble',
    name: 'Bubble',
    category: 'no-code',
    description: 'Full-featured no-code app builder with database and workflows',
    pros: [
      'Complex functionality',
      'Database included',
      'API connections',
      'User authentication'
    ],
    pricing: 'From $25/month',
    link: 'https://bubble.io'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    description: 'Connect apps and automate workflows without coding',
    pros: [
      'Wide app support',
      'Easy to use',
      'Powerful automation',
      'Many templates'
    ],
    pricing: 'From $0/month',
    link: 'https://zapier.com'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'ai',
    description: 'AI language model for content, coding, and automation',
    pros: [
      'Content generation',
      'Code assistance',
      'Problem solving',
      'API available'
    ],
    pricing: 'From $0/month',
    link: 'https://chat.openai.com'
  }
]

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

const initialTasks: Task[] = [
  {
    id: 'landscape',
    title: 'Explore No-Code/AI Landscape',
    description: 'Review recommended tools and their capabilities',
    completed: false
  },
  {
    id: 'matrix',
    title: 'Complete Decision Matrix',
    description: 'Evaluate tools based on your needs',
    completed: false
  },
  {
    id: 'ai-bootcamp',
    title: 'AI Bootcamp ',
    description: 'Learn AI fundamentals and practical applications',
    completed: false
  },
  {
    id: 'setup',
    title: 'Tool Setup',
    description: 'Create accounts and configure basic settings',
    completed: false
  },
  {
    id: 'best-practices',
    title: 'Review Best Practices',
    description: 'Learn pro tips and recommended workflows',
    completed: false
  }
]

const aiModules = [
  {
    id: 'basics',
    title: 'Module 1: AI Fundamentals',
    description: 'Learn the basics of AI and how it can enhance your business',
    topics: [
      'Understanding AI capabilities and limitations',
      'Key AI tools for entrepreneurs',
      'Ethical considerations in AI usage',
      'Practical examples of AI in business'
    ],
    project: {
      title: 'AI Tool Evaluation',
      description: 'Analyze 3 AI tools and document their potential business impact',
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
    description: 'Master AI-powered content generation and optimization',
    topics: [
      'Content strategy with AI assistance',
      'Writing compelling copy with AI',
      'Image generation and editing',
      'Content repurposing workflows'
    ],
    project: {
      title: 'AI Content Pipeline',
      description: 'Create a multi-channel content strategy using AI tools',
      steps: [
        'Generate a blog post with AI assistance',
        'Create social media variants',
        'Design matching visuals',
        'Set up an automated publishing workflow'
      ]
    }
  },
  {
    id: 'advanced',
    title: 'Module 3: Advanced AI Workflows',
    description: 'Build sophisticated AI automation for your business',
    topics: [
      'Multi-step AI processes',
      'Tool integration patterns',
      'Custom AI model fine-tuning',
      'Performance optimization'
    ],
    project: {
      title: 'Automated Customer Journey',
      description: 'Build an end-to-end customer interaction system',
      steps: [
        'Set up automated lead responses',
        'Create personalized follow-ups',
        'Implement sentiment analysis',
        'Build a feedback loop'
      ]
    }
  }
]

const toolSetupGuides = {
  webflow: {
    name: 'Webflow',
    steps: [
      'Sign up for a Webflow account',
      'Choose a template or start from scratch',
      'Set up your project structure',
      'Configure hosting and custom domain',
      'Enable necessary integrations'
    ],
    resources: [
      {
        title: 'Official Documentation',
        url: 'https://university.webflow.com'
      },
      {
        title: 'Video Tutorials',
        url: 'https://www.webflow.com/resources'
      }
    ]
  },
  bubble: {
    name: 'Bubble',
    steps: [
      'Create a Bubble account',
      'Initialize your first app',
      'Set up database structure',
      'Design core workflows',
      'Configure plugins and API connections'
    ],
    resources: [
      {
        title: 'Learning Center',
        url: 'https://bubble.io/learn'
      },
      {
        title: 'Manual',
        url: 'https://manual.bubble.io'
      }
    ]
  },
  zapier: {
    name: 'Zapier',
    steps: [
      'Sign up for Zapier',
      'Connect your core apps',
      'Create your first Zap',
      'Test automation workflows',
      'Monitor and optimize performance'
    ],
    resources: [
      {
        title: 'Getting Started',
        url: 'https://zapier.com/learn'
      },
      {
        title: 'Templates',
        url: 'https://zapier.com/apps/integrations'
      }
    ]
  }
}

export default function Pillar2Content() {
  const [activeSection, setActiveSection] = useState('overview')
  const [tasks, setTasks] = useState(initialTasks)
  const [isSaving, setIsSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [data, setData] = useState<Pillar2Data>({
    userId: '',
    progress: {
      completedTasks: 0,
      totalTasks: initialTasks.length,
      aiBootcamp: {
        modules: []
      },
      toolSetup: {
        tools: []
      },
      matrixCompleted: false
    },
    selectedTools: {
      primary: '',
      secondary: []
    },
    matrixScores: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: pillar2Data, error } = await supabase
        .from('pillar_2_data')
        .select('*')
        .eq('userId', user.id)
        .single()

      if (error) throw error

      if (pillar2Data) {
        setData(pillar2Data)
        // Update tasks based on loaded data
        setTasks(prev => prev.map(task => ({
          ...task,
          completed: pillar2Data.progress.completedTasks >= prev.indexOf(task)
        })))
      } else {
        // Initialize with empty data
        const newData = {
          ...data,
          userId: user.id
        }
        await supabase.from('pillar_2_data').insert([newData])
        setData(newData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      setAlert({
        type: 'error',
        message: 'Failed to load your progress. Please try again.'
      })
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('pillar_2_data')
        .upsert({
          ...data,
          updatedAt: new Date().toISOString()
        })

      if (error) throw error

      setAlert({
        type: 'success',
        message: 'Progress saved successfully!'
      })
    } catch (error) {
      console.error('Error saving:', error)
      setAlert({
        type: 'error',
        message: 'Failed to save progress. Please try again.'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleStartModule = async (moduleId: string) => {
    try {
      const moduleProgress: AIModuleProgress = {
        moduleId,
        completed: false,
        startedAt: new Date().toISOString(),
        projectSubmitted: false
      }

      const updatedData = {
        ...data,
        progress: {
          ...data.progress,
          aiBootcamp: {
            modules: [
              ...data.progress.aiBootcamp.modules.filter(m => m.moduleId !== moduleId),
              moduleProgress
            ]
          }
        }
      }

      setData(updatedData)
      await handleSave()

      setAlert({
        type: 'success',
        message: 'Module started! Good luck with your learning journey.'
      })
    } catch (error) {
      console.error('Error starting module:', error)
      setAlert({
        type: 'error',
        message: 'Failed to start module. Please try again.'
      })
    }
  }

  const isModuleStarted = (moduleId: string) => {
    return data.progress.aiBootcamp.modules.some(m => m.moduleId === moduleId)
  }

  const isModuleCompleted = (moduleId: string) => {
    return data.progress.aiBootcamp.modules.some(m => m.moduleId === moduleId && m.completed)
  }

  const toggleTask = async (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleToolSelect = (toolId: string) => {
    const updatedData = {
      ...data,
      selectedTools: {
        ...data.selectedTools,
        secondary: [...data.selectedTools.secondary, toolId]
      }
    }
    setData(updatedData)
  }

  return (
    <div className="space-y-8">
      {/* Progress Section */}
      <div className="bg-[#1E293B] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#E2E8F0]">
              Your Progress
            </h2>
            <p className="text-[#94A3B8] text-sm">
              Complete all required tasks to unlock Pillar 3
            </p>
          </div>
          <ProgressBar 
            completed={data.progress.completedTasks} 
            total={data.progress.totalTasks}
            type="tasks"
          />
        </div>
      </div>

      {/* Alert Messages */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Navigation */}
      <div className="flex space-x-4 border-b border-[#1E293B]">
        {['overview', 'tools', 'matrix', 'ai-bootcamp', 'setup'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 text-sm font-medium ${
              activeSection === section
                ? 'text-[#5865F2] border-b-2 border-[#5865F2]'
                : 'text-[#94A3B8] hover:text-[#E2E8F0]'
            }`}
          >
            {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0]">
              Tool Selection & AI Bootcamp
            </h3>
            <p className="text-[#94A3B8]">
              Choose your no-code and AI tools, learn essential AI concepts, and prepare
              your tech stack for building your website.
            </p>
            {/* Task List */}
            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 bg-[#1E293B] p-4 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <div>
                    <h4 className="text-[#E2E8F0] font-medium">{task.title}</h4>
                    <p className="text-[#94A3B8] text-sm">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-[#1E293B] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                Tool Decision Matrix
              </h3>
              <p className="text-[#94A3B8] mb-6">
                Use this matrix to evaluate and compare different tools for your tech stack.
                Rate each tool on various factors to make an informed decision.
              </p>
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-medium text-[#E2E8F0]">How to Use:</h4>
                <ol className="list-decimal list-inside text-[#94A3B8] space-y-2">
                  <li>Download the matrix template (CSV format)</li>
                  <li>Rate each tool from 1-5 on different factors</li>
                  <li>Consider your specific needs and constraints</li>
                  <li>Compare total scores and notes</li>
                  <li>Make your final selection based on the results</li>
                </ol>
              </div>
              <button 
                onClick={() => window.open('/templates/tool-decision-matrix.csv', '_blank')}
                className="inline-flex items-center px-4 py-2 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4]"
              >
                <FiDownload className="mr-2" />
                Download Matrix Template
              </button>
            </div>
          </div>
        )}

        {activeSection === 'tools' && (
          <div className="space-y-12">
            <ToolSection
              title="Website & Landing Page Builders"
              description="Choose from a variety of no-code platforms to build your website or landing page quickly and professionally."
              tools={websiteBuilders}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <ToolSection
              title="App Builders"
              description="Create mobile and web applications without coding using these powerful app development platforms."
              tools={appBuilders}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <ToolSection
              title="Automation & Workflow Tools"
              description="Streamline your processes and connect your apps with these powerful automation platforms."
              tools={automationTools}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <ToolSection
              title="Databases & Backend Tools"
              description="Choose the right database and backend solution to power your applications."
              tools={databaseTools}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <ToolSection
              title="AI-Powered Tools"
              description="Leverage artificial intelligence for content creation, image generation, and productivity enhancement."
              tools={aiTools}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <ToolSection
              title="Low-Code Solutions"
              description="Build powerful internal tools and business applications with minimal coding required."
              tools={lowCodeTools}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <ToolSection
              title="Specialized Tools & Integrations"
              description="Essential integrations for payments, analytics, and user engagement."
              tools={integrationTools}
              selectedTools={data?.selectedTools?.secondary || []}
              onToolSelect={handleToolSelect}
            />

            <div className="bg-[#1A1F2E] p-6 rounded-lg space-y-6">
              <h2 className="text-2xl font-bold text-white">Putting It All Together</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#5865F2] mb-2">Tech Stack Synergy</h3>
                  <p className="text-gray-400">
                    Create powerful solutions by combining tools strategically. For example:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 mt-2">
                    <li>Website builder for your frontend</li>
                    <li>Automation tool for workflows</li>
                    <li>AI tools for content and support</li>
                    <li>Specialized integrations as needed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#5865F2] mb-2">Selection Tips</h3>
                  <ul className="list-disc list-inside text-gray-400">
                    <li>Match tools to your specific goals and use cases</li>
                    <li>Consider your budget and avoid tool sprawl</li>
                    <li>Evaluate learning curves against your timeline</li>
                    <li>Look for strong community support and documentation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#5865F2] mb-2">Scalability</h3>
                  <p className="text-gray-400">
                    Start with essential tools and add more as your needs grow. Regular evaluation
                    of your tech stack ensures you're getting value from each tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'ai-bootcamp' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0]">
              AI Bootcamp
            </h3>
            <p className="text-[#94A3B8]">
              Master AI tools and workflows through hands-on modules and practical projects.
            </p>

            {aiModules.map((module) => (
              <div key={module.id} className="bg-[#1E293B] rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-medium text-[#E2E8F0]">
                        {module.title}
                      </h4>
                      {isModuleCompleted(module.id) && (
                        <FiCheckCircle className="text-green-400 w-5 h-5" />
                      )}
                    </div>
                    <p className="text-[#94A3B8] mt-1">
                      {module.description}
                    </p>
                  </div>
                  <button
                    className={`inline-flex items-center px-4 py-2 ${
                      isModuleStarted(module.id)
                        ? 'bg-[#2D3748] text-[#94A3B8]'
                        : 'bg-[#5865F2] text-white hover:bg-[#4752C4]'
                    } rounded-md`}
                    onClick={() => handleStartModule(module.id)}
                    disabled={isModuleStarted(module.id)}
                  >
                    <FiPlay className="mr-2" />
                    {isModuleStarted(module.id) ? 'In Progress' : 'Start Module'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-md font-medium text-[#E2E8F0] mb-2">
                      Topics Covered:
                    </h5>
                    <ul className="list-disc list-inside text-[#94A3B8] space-y-1">
                      {module.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-md font-medium text-[#E2E8F0] mb-2">
                      Practical Project:
                    </h5>
                    <div className="bg-[#2D3748] rounded-lg p-4">
                      <h6 className="font-medium text-[#E2E8F0] mb-2">
                        {module.project.title}
                      </h6>
                      <p className="text-[#94A3B8] mb-3">
                        {module.project.description}
                      </p>
                      <ol className="list-decimal list-inside text-[#94A3B8] space-y-1">
                        {module.project.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'setup' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0]">
              Tool Setup Guides
            </h3>
            <p className="text-[#94A3B8]">
              Step-by-step instructions to set up and configure your chosen tools.
            </p>

            {Object.entries(toolSetupGuides).map(([id, guide]) => (
              <div key={id} className="bg-[#1E293B] rounded-lg p-6">
                <h4 className="text-lg font-medium text-[#E2E8F0] mb-4">
                  {guide.name} Setup
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-md font-medium text-[#E2E8F0] mb-2">
                      Setup Steps:
                    </h5>
                    <ol className="list-decimal list-inside text-[#94A3B8] space-y-2">
                      {guide.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-md font-medium text-[#E2E8F0] mb-2">
                      Resources:
                    </h5>
                    <div className="space-y-2">
                      {guide.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#5865F2] hover:text-[#4752C4]"
                        >
                          <FiExternalLink className="mr-2" />
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Save Progress */}
        <div className="pt-8 border-t border-[#1E293B]">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4] disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Progress'}
          </button>
        </div>
      </div>
    </div>
  )
}
