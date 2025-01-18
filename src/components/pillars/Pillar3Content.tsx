'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FiCheckCircle, FiInfo, FiExternalLink } from 'react-icons/fi'
import ProgressBar from '../dashboard/ProgressBar'
import Alert from '../common/Alert'
import Tooltip from '../common/Tooltip'
import type { Pillar3Data } from '@/types/pillar3'
import {
  pageTemplates,
  usabilityTests,
  setupTasks,
  validatePillar3Data,
  isPhaseComplete,
  tooltips
} from '@/utils/pillar3Validation'

export default function Pillar3Content() {
  const [activePhase, setActivePhase] = useState<'setup' | 'pages' | 'testing' | 'refinement'>('setup')
  const [activePage, setActivePage] = useState<string>('home')
  const [isSaving, setIsSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [data, setData] = useState<Pillar3Data>({
    userId: '',
    selectedPlatform: '',
    progress: {
      completedTasks: 0,
      totalTasks: setupTasks.length + Object.keys(pageTemplates).length + usabilityTests.length,
      currentPhase: 'setup',
      setupCompleted: false,
      pagesCompleted: false,
      testingCompleted: false,
      refinementCompleted: false
    },
    setup: {
      tasks: setupTasks,
      globalStyles: {}
    },
    pages: {
      templates: Object.values(pageTemplates),
      navigation: {
        menuItems: [],
        footerLinks: []
      }
    },
    testing: {
      tests: usabilityTests,
      feedback: {}
    },
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

      const { data: pillar3Data, error } = await supabase
        .from('pillar_3_data')
        .select('*')
        .eq('userId', user.id)
        .single()

      if (error) throw error

      if (pillar3Data) {
        setData(pillar3Data)
      } else {
        const newData = {
          ...data,
          userId: user.id
        }
        await supabase.from('pillar_3_data').insert([newData])
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
        .from('pillar_3_data')
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

  const toggleSetupTask = async (taskId: string) => {
    const updatedData = {
      ...data,
      setup: {
        ...data.setup,
        tasks: data.setup.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }
    }
    setData(updatedData)
    await handleSave()
  }

  const togglePageSection = async (pageId: string, sectionId: string) => {
    const updatedData = {
      ...data,
      pages: {
        ...data.pages,
        templates: data.pages.templates.map(template =>
          template.id === pageId
            ? {
                ...template,
                sections: template.sections.map(section =>
                  section.id === sectionId
                    ? { ...section, completed: !section.completed }
                    : section
                )
              }
            : template
        )
      }
    }
    setData(updatedData)
    await handleSave()
  }

  const toggleTest = async (testId: string) => {
    const updatedData = {
      ...data,
      testing: {
        ...data.testing,
        tests: data.testing.tests.map(test =>
          test.id === testId ? { ...test, completed: !test.completed } : test
        )
      }
    }
    setData(updatedData)
    await handleSave()
  }

  const updateProjectUrl = async (url: string) => {
    const updatedData = {
      ...data,
      setup: {
        ...data.setup,
        projectUrl: url
      }
    }
    setData(updatedData)
    await handleSave()
  }

  const completePhase = async () => {
    if (!isPhaseComplete(data, activePhase)) {
      setAlert({
        type: 'error',
        message: 'Please complete all required tasks before proceeding.'
      })
      return
    }

    const updatedData = {
      ...data,
      progress: {
        ...data.progress,
        [`${activePhase}Completed`]: true,
        currentPhase: getNextPhase(activePhase)
      }
    }
    setData(updatedData)
    await handleSave()
    setActivePhase(getNextPhase(activePhase))
  }

  const getNextPhase = (current: 'setup' | 'pages' | 'testing' | 'refinement') => {
    const phases: ('setup' | 'pages' | 'testing' | 'refinement')[] = ['setup', 'pages', 'testing', 'refinement']
    const currentIndex = phases.indexOf(current)
    return phases[currentIndex + 1] || current
  }

  return (
    <div className="space-y-8">
      {/* Progress Section */}
      <div className="bg-[#1E293B] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#E2E8F0]">
              Building Your Foundation
            </h2>
            <p className="text-[#94A3B8] text-sm">
              Create a functional website structure before adding branding and content
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

      {/* Phase Navigation */}
      <div className="flex space-x-4 border-b border-[#1E293B]">
        {['setup', 'pages', 'testing', 'refinement'].map((phase) => (
          <button
            key={phase}
            onClick={() => setActivePhase(phase as any)}
            className={`px-4 py-2 text-sm font-medium ${
              activePhase === phase
                ? 'text-[#5865F2] border-b-2 border-[#5865F2]'
                : 'text-[#94A3B8] hover:text-[#E2E8F0]'
            }`}
          >
            {phase.charAt(0).toUpperCase() + phase.slice(1)}
            {data.progress[`${phase}Completed`] && (
              <FiCheckCircle className="inline ml-2 text-green-400" />
            )}
          </button>
        ))}
      </div>

      {/* Phase Content */}
      <div className="space-y-6">
        {activePhase === 'setup' && (
          <div className="space-y-6">
            <div className="bg-[#1E293B] rounded-lg p-6">
              <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
                Project Setup
              </h3>
              <div className="space-y-4">
                {data.setup.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between p-4 bg-[#2D3748] rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#E2E8F0]">
                          {task.title}
                        </h4>
                        <Tooltip content={tooltips.setup[task.id]} />
                        {task.required && (
                          <span className="text-xs text-[#94A3B8]">(Required)</span>
                        )}
                      </div>
                      <p className="text-sm text-[#94A3B8] mt-1">
                        {task.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSetupTask(task.id)}
                      className={`px-3 py-1 rounded ${
                        task.completed
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {data.setup.projectUrl && (
              <div className="bg-[#1E293B] rounded-lg p-6">
                <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
                  Project URL
                </h3>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={data.setup.projectUrl}
                    onChange={(e) => updateProjectUrl(e.target.value)}
                    placeholder="Enter your project URL"
                    className="flex-1 bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                  />
                  <a
                    href={data.setup.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#5865F2] hover:text-[#4752C4]"
                  >
                    <FiExternalLink className="mr-2" />
                    Visit Site
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {activePhase === 'pages' && (
          <div className="space-y-6">
            {/* Page Navigation */}
            <div className="flex space-x-4 mb-6">
              {Object.values(pageTemplates).map((template) => (
                <button
                  key={template.id}
                  onClick={() => setActivePage(template.id)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activePage === template.id
                      ? 'bg-[#2D3748] text-[#E2E8F0] rounded-md'
                      : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                  }`}
                >
                  {template.title}
                  {template.completed && (
                    <FiCheckCircle className="inline ml-2 text-green-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Active Page Template */}
            {data.pages.templates.map((template) =>
              template.id === activePage ? (
                <div key={template.id} className="bg-[#1E293B] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-[#E2E8F0]">
                      {template.title} Sections
                    </h3>
                    {template.required && (
                      <span className="text-xs text-[#94A3B8]">(Required Page)</span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {template.sections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-start justify-between p-4 bg-[#2D3748] rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-[#E2E8F0]">
                              {section.title}
                            </h4>
                            <Tooltip content={tooltips.pages[template.id][section.id]} />
                            {section.required && (
                              <span className="text-xs text-[#94A3B8]">(Required)</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => togglePageSection(template.id, section.id)}
                          className={`px-3 py-1 rounded ${
                            section.completed
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                          }`}
                        >
                          {section.completed ? 'Completed' : 'Mark Complete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        {activePhase === 'testing' && (
          <div className="space-y-6">
            {Object.entries(
              data.testing.tests.reduce((acc, test) => ({
                ...acc,
                [test.category]: [...(acc[test.category] || []), test]
              }), {} as Record<string, typeof usabilityTests>)
            ).map(([category, tests]) => (
              <div key={category} className="bg-[#1E293B] rounded-lg p-6">
                <h3 className="text-lg font-medium text-[#E2E8F0] mb-4 capitalize">
                  {category} Tests
                </h3>
                <div className="space-y-4">
                  {tests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-start justify-between p-4 bg-[#2D3748] rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[#E2E8F0]">
                            {test.title}
                          </h4>
                          <Tooltip content={tooltips.testing[test.category]} />
                        </div>
                        <p className="text-sm text-[#94A3B8] mt-1">
                          {test.description}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleTest(test.id)}
                        className={`px-3 py-1 rounded ${
                          test.completed
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                        }`}
                      >
                        {test.completed ? 'Passed' : 'Mark as Passed'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activePhase === 'refinement' && (
          <div className="space-y-6">
            <div className="bg-[#1E293B] rounded-lg p-6">
              <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
                Final Refinements
              </h3>
              <p className="text-[#94A3B8] mb-6">
                Review and refine your website structure before moving on to branding and content in Pillar 4.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-[#2D3748] rounded-lg">
                  <h4 className="font-medium text-[#E2E8F0] mb-2">
                    Internal Demo Checklist
                  </h4>
                  <ul className="list-disc list-inside text-[#94A3B8] space-y-2">
                    <li>Share your site with a colleague or friend</li>
                    <li>Note any navigation or usability issues</li>
                    <li>Check mobile responsiveness again</li>
                    <li>Verify all required sections are complete</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 border-t border-[#1E293B]">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4] disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Progress'}
        </button>

        {activePhase !== 'refinement' && (
          <button
            onClick={completePhase}
            disabled={!isPhaseComplete(data, activePhase)}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            title={
              !isPhaseComplete(data, activePhase)
                ? 'Complete all required tasks before proceeding'
                : ''
            }
          >
            Complete {activePhase.charAt(0).toUpperCase() + activePhase.slice(1)} Phase
          </button>
        )}
      </div>
    </div>
  )
}
