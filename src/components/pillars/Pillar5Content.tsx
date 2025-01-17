'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FiCheckCircle, FiGlobe, FiBarChart, FiZap, FiLayers, FiServer } from 'react-icons/fi'
import { BiWorld, BiAnalyse, BiRocket } from 'react-icons/bi'
import { HiOutlineSparkles } from 'react-icons/hi'
import ProgressBar from '../dashboard/ProgressBar'
import Alert from '../common/Alert'
import Tooltip from '../common/Tooltip'
import type { Pillar5Data } from '@/types/pillar5'
import {
  domainProviders,
  analyticsTools,
  performanceTools,
  scalabilityFeatures,
  maintenanceTasks,
  tooltips,
  validatePillar5Data
} from '@/utils/pillar5Validation'

// DNS Record Form Component
const DNSRecordForm = ({
  record,
  onUpdate,
  onDelete
}: {
  record: {
    type: 'A' | 'CNAME' | 'TXT' | 'MX'
    name: string
    value: string
    configured: boolean
  }
  onUpdate: (updated: typeof record) => void
  onDelete: () => void
}) => (
  <div className="flex items-center gap-4 bg-[#2D3748] p-4 rounded-lg">
    <select
      value={record.type}
      onChange={(e) => onUpdate({ ...record, type: e.target.value as typeof record.type })}
      className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
    >
      {['A', 'CNAME', 'TXT', 'MX'].map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    <input
      type="text"
      value={record.name}
      onChange={(e) => onUpdate({ ...record, name: e.target.value })}
      placeholder="Name (e.g., @, www)"
      className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1 flex-1"
    />
    <input
      type="text"
      value={record.value}
      onChange={(e) => onUpdate({ ...record, value: e.target.value })}
      placeholder="Value"
      className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1 flex-1"
    />
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={record.configured}
        onChange={(e) => onUpdate({ ...record, configured: e.target.checked })}
        className="text-[#5865F2]"
      />
      <span className="text-sm text-[#94A3B8]">Configured</span>
    </div>
    <button
      onClick={onDelete}
      className="text-red-400 hover:text-red-300"
    >
      Remove
    </button>
  </div>
)

// Performance Score Component
const PerformanceScore = ({
  score,
  label
}: {
  score: number
  label: string
}) => {
  const getColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${getColor(score)}`}>
        {score}
      </div>
      <div className="text-sm text-[#94A3B8]">{label}</div>
    </div>
  )
}

export default function Pillar5Content() {
  const [activePhase, setActivePhase] = useState<'domain' | 'analytics' | 'performance' | 'scalability' | 'launch' | 'maintenance'>('domain')
  const [isSaving, setIsSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [data, setData] = useState<Pillar5Data>({
    userId: '',
    progress: {
      completedTasks: 0,
      totalTasks: 0,
      currentPhase: 'domain',
      domainConfigured: false,
      analyticsConfigured: false,
      performanceTested: false,
      scalabilityPlanned: false,
      launched: false,
      maintenanceScheduled: false
    },
    domain: {
      config: {
        provider: '',
        domain: '',
        configured: false,
        ssl: false,
        dnsRecords: []
      },
      prelaunchChecks: {
        ssl: false,
        mobileFriendly: false,
        crossBrowser: false,
        backupCreated: false,
        redirectsConfigured: false
      }
    },
    analytics: {
      setup: {
        provider: 'google',
        trackingId: '',
        configured: false,
        additionalTools: []
      },
      goals: []
    },
    performance: {
      tests: [],
      optimizations: []
    },
    scalability: {
      features: [],
      documentation: []
    },
    maintenance: {
      schedule: [],
      logs: []
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

      const { data: pillar5Data, error } = await supabase
        .from('pillar_5_data')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (pillar5Data) {
        setData(pillar5Data)
      } else {
        const newData = {
          ...data,
          userId: user.id
        }
        await supabase.from('pillar_5_data').insert([newData])
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
        .from('pillar_5_data')
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

  const updateDomainConfig = (updates: Partial<typeof data.domain.config>) => {
    setData(prev => ({
      ...prev,
      domain: {
        ...prev.domain,
        config: {
          ...prev.domain.config,
          ...updates
        }
      }
    }))
  }

  const addDNSRecord = () => {
    setData(prev => ({
      ...prev,
      domain: {
        ...prev.domain,
        config: {
          ...prev.domain.config,
          dnsRecords: [
            ...prev.domain.config.dnsRecords,
            {
              type: 'A',
              name: '',
              value: '',
              configured: false
            }
          ]
        }
      }
    }))
  }

  return (
    <div className="space-y-8">
      {/* Progress Section */}
      <div className="bg-[#1E293B] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#E2E8F0]">
              Deployment & Scalability
            </h2>
            <p className="text-[#94A3B8] text-sm">
              Launch your site and prepare for growth
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
        {['domain', 'analytics', 'performance', 'scalability', 'launch', 'maintenance'].map((phase) => (
          <button
            key={phase}
            onClick={() => setActivePhase(phase as typeof activePhase)}
            className={`px-4 py-2 text-sm font-medium ${
              activePhase === phase
                ? 'text-[#5865F2] border-b-2 border-[#5865F2]'
                : 'text-[#94A3B8] hover:text-[#E2E8F0]'
            }`}
          >
            {phase.charAt(0).toUpperCase() + phase.slice(1)}
            {data.progress[`${phase}Configured` as keyof typeof data.progress] && (
              <FiCheckCircle className="inline ml-2 text-green-400" />
            )}
          </button>
        ))}
      </div>

      {/* Domain Configuration Phase */}
      {activePhase === 'domain' && (
        <div className="space-y-6">
          {/* Domain Setup */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Domain Configuration
              </h3>
              <Tooltip text={tooltips.domain.setup} />
            </div>

            <div className="space-y-4">
              {/* Domain Provider */}
              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                  Domain Provider
                </label>
                <select
                  value={data.domain.config.provider}
                  onChange={(e) => updateDomainConfig({ provider: e.target.value })}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded px-3 py-2"
                >
                  <option value="">Select Provider</option>
                  {domainProviders.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>

              {/* Domain Name */}
              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                  Domain Name
                </label>
                <input
                  type="text"
                  value={data.domain.config.domain}
                  onChange={(e) => updateDomainConfig({ domain: e.target.value })}
                  placeholder="e.g., example.com"
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded px-3 py-2"
                />
              </div>

              {/* SSL Certificate */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.domain.config.ssl}
                  onChange={(e) => updateDomainConfig({ ssl: e.target.checked })}
                  className="text-[#5865F2]"
                />
                <span className="text-[#E2E8F0]">SSL Certificate Configured</span>
                <Tooltip text={tooltips.domain.ssl} />
              </div>

              {/* DNS Records */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#E2E8F0]">
                    DNS Records
                  </label>
                  <Tooltip text={tooltips.domain.dns} />
                </div>
                <div className="space-y-2">
                  {data.domain.config.dnsRecords.map((record, index) => (
                    <DNSRecordForm
                      key={index}
                      record={record}
                      onUpdate={(updated) => {
                        const newRecords = [...data.domain.config.dnsRecords]
                        newRecords[index] = updated
                        updateDomainConfig({ dnsRecords: newRecords })
                      }}
                      onDelete={() => {
                        const newRecords = data.domain.config.dnsRecords.filter((_, i) => i !== index)
                        updateDomainConfig({ dnsRecords: newRecords })
                      }}
                    />
                  ))}
                  <button
                    onClick={addDNSRecord}
                    className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                  >
                    + Add DNS Record
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-launch Checks */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Pre-launch Checks
            </h3>
            <div className="space-y-2">
              {Object.entries(data.domain.prelaunchChecks).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => {
                      setData(prev => ({
                        ...prev,
                        domain: {
                          ...prev.domain,
                          prelaunchChecks: {
                            ...prev.domain.prelaunchChecks,
                            [key]: e.target.checked
                          }
                        }
                      }))
                    }}
                    className="text-[#5865F2]"
                  />
                  <span className="text-[#E2E8F0]">
                    {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Phase */}
      {activePhase === 'analytics' && (
        <div className="space-y-6">
          {/* Analytics Setup */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Analytics Setup
              </h3>
              <Tooltip text={tooltips.analytics.tracking} />
            </div>

            <div className="space-y-4">
              {/* Analytics Provider */}
              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                  Analytics Provider
                </label>
                <select
                  value={data.analytics.setup.provider}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    analytics: {
                      ...prev.analytics,
                      setup: {
                        ...prev.analytics.setup,
                        provider: e.target.value as typeof data.analytics.setup.provider
                      }
                    }
                  }))}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded px-3 py-2"
                >
                  {['google', 'plausible', 'fathom', 'custom'].map((provider) => (
                    <option key={provider} value={provider}>
                      {provider.charAt(0).toUpperCase() + provider.slice(1)} Analytics
                    </option>
                  ))}
                </select>
              </div>

              {/* Tracking ID */}
              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                  Tracking ID
                </label>
                <input
                  type="text"
                  value={data.analytics.setup.trackingId}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    analytics: {
                      ...prev.analytics,
                      setup: {
                        ...prev.analytics.setup,
                        trackingId: e.target.value
                      }
                    }
                  }))}
                  placeholder="e.g., G-XXXXXXXXXX or UA-XXXXXXXX-X"
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded px-3 py-2"
                />
              </div>

              {/* Additional Tools */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#E2E8F0]">
                    Additional Tools
                  </label>
                  <Tooltip text={tooltips.analytics.tools} />
                </div>
                <div className="space-y-2">
                  {analyticsTools.map((tool) => (
                    <div key={tool.name} className="flex items-center justify-between bg-[#2D3748] p-4 rounded-lg">
                      <div>
                        <h4 className="text-[#E2E8F0] font-medium">{tool.name}</h4>
                        <p className="text-sm text-[#94A3B8]">{tool.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={tool.setupGuide}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#5865F2] hover:text-[#4752C4] text-sm"
                        >
                          Setup Guide
                        </a>
                        <input
                          type="checkbox"
                          checked={data.analytics.setup.additionalTools.some(t => t.name === tool.name && t.configured)}
                          onChange={(e) => {
                            const newTools = e.target.checked
                              ? [...data.analytics.setup.additionalTools, { name: tool.name, configured: true, notes: '' }]
                              : data.analytics.setup.additionalTools.filter(t => t.name !== tool.name)
                            setData(prev => ({
                              ...prev,
                              analytics: {
                                ...prev.analytics,
                                setup: {
                                  ...prev.analytics.setup,
                                  additionalTools: newTools
                                }
                              }
                            }))
                          }}
                          className="text-[#5865F2]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Goals */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#E2E8F0]">
                    Conversion Goals
                  </label>
                  <Tooltip text={tooltips.analytics.goals} />
                </div>
                <div className="space-y-2">
                  {data.analytics.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-[#2D3748] p-4 rounded-lg">
                      <input
                        type="text"
                        value={goal.name}
                        onChange={(e) => {
                          const newGoals = [...data.analytics.goals]
                          newGoals[index] = { ...goal, name: e.target.value }
                          setData(prev => ({
                            ...prev,
                            analytics: {
                              ...prev.analytics,
                              goals: newGoals
                            }
                          }))
                        }}
                        placeholder="Goal Name"
                        className="flex-1 bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                      />
                      <input
                        type="checkbox"
                        checked={goal.configured}
                        onChange={(e) => {
                          const newGoals = [...data.analytics.goals]
                          newGoals[index] = { ...goal, configured: e.target.checked }
                          setData(prev => ({
                            ...prev,
                            analytics: {
                              ...prev.analytics,
                              goals: newGoals
                            }
                          }))
                        }}
                        className="text-[#5865F2]"
                      />
                      <button
                        onClick={() => {
                          const newGoals = data.analytics.goals.filter((_, i) => i !== index)
                          setData(prev => ({
                            ...prev,
                            analytics: {
                              ...prev.analytics,
                              goals: newGoals
                            }
                          }))
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setData(prev => ({
                      ...prev,
                      analytics: {
                        ...prev.analytics,
                        goals: [...prev.analytics.goals, { name: '', configured: false }]
                      }
                    }))}
                    className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                  >
                    + Add Goal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Testing Phase */}
      {activePhase === 'performance' && (
        <div className="space-y-6">
          {/* Performance Tests */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Performance Tests
              </h3>
              <Tooltip text={tooltips.performance.testing} />
            </div>

            <div className="space-y-4">
              {/* Test Results */}
              {data.performance.tests.map((test, index) => (
                <div key={index} className="bg-[#2D3748] p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#E2E8F0] font-medium">{test.tool}</h4>
                      <p className="text-sm text-[#94A3B8]">
                        Tested on: {new Date(test.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newTests = data.performance.tests.filter((_, i) => i !== index)
                        setData(prev => ({
                          ...prev,
                          performance: {
                            ...prev.performance,
                            tests: newTests
                          }
                        }))
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-4 gap-4">
                    <PerformanceScore score={test.scores.performance} label="Performance" />
                    <PerformanceScore score={test.scores.accessibility} label="Accessibility" />
                    <PerformanceScore score={test.scores.seo} label="SEO" />
                    <PerformanceScore score={test.scores.bestPractices} label="Best Practices" />
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-5 gap-4 text-center">
                    {Object.entries(test.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-[#E2E8F0] font-medium">
                          {value.toFixed(2)}s
                        </div>
                        <div className="text-sm text-[#94A3B8]">
                          {key.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {test.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-[#E2E8F0] font-medium mb-2">Recommendations</h5>
                      <ul className="list-disc list-inside text-sm text-[#94A3B8] space-y-1">
                        {test.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Test */}
              <button
                onClick={() => {
                  const newTest = {
                    tool: 'PageSpeed' as const,
                    date: new Date().toISOString(),
                    scores: {
                      performance: 0,
                      accessibility: 0,
                      seo: 0,
                      bestPractices: 0
                    },
                    metrics: {
                      fcp: 0,
                      lcp: 0,
                      tti: 0,
                      tbt: 0,
                      cls: 0
                    },
                    recommendations: []
                  }
                  setData(prev => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      tests: [...prev.performance.tests, newTest]
                    }
                  }))
                }}
                className="text-sm text-[#5865F2] hover:text-[#4752C4]"
              >
                + Add Performance Test
              </button>
            </div>
          </div>

          {/* Optimizations */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Optimizations
              </h3>
              <Tooltip text={tooltips.performance.optimization} />
            </div>

            <div className="space-y-2">
              {data.performance.optimizations.map((opt, index) => (
                <div key={index} className="flex items-center justify-between bg-[#2D3748] p-4 rounded-lg">
                  <div>
                    <h4 className="text-[#E2E8F0] font-medium">{opt.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${
                        opt.impact === 'high' ? 'text-red-400' :
                        opt.impact === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {opt.impact.charAt(0).toUpperCase() + opt.impact.slice(1)} Impact
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={opt.status}
                      onChange={(e) => {
                        const newOpts = [...data.performance.optimizations]
                        newOpts[index] = { ...opt, status: e.target.value as typeof opt.status }
                        setData(prev => ({
                          ...prev,
                          performance: {
                            ...prev.performance,
                            optimizations: newOpts
                          }
                        }))
                      }}
                      className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                    >
                      {['pending', 'in-progress', 'completed', 'skipped'].map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const newOpts = data.performance.optimizations.filter((_, i) => i !== index)
                        setData(prev => ({
                          ...prev,
                          performance: {
                            ...prev.performance,
                            optimizations: newOpts
                          }
                        }))
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setData(prev => ({
                  ...prev,
                  performance: {
                    ...prev.performance,
                    optimizations: [
                      ...prev.performance.optimizations,
                      {
                        name: '',
                        status: 'pending',
                        impact: 'medium'
                      }
                    ]
                  }
                }))}
                className="text-sm text-[#5865F2] hover:text-[#4752C4]"
              >
                + Add Optimization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scalability Phase */}
      {activePhase === 'scalability' && (
        <div className="space-y-6">
          {/* Feature Planning */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Feature Planning
              </h3>
              <Tooltip text={tooltips.scalability.planning} />
            </div>

            <div className="space-y-4">
              {scalabilityFeatures.map((feature) => (
                <div key={feature.name} className="bg-[#2D3748] p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#E2E8F0] font-medium">{feature.name}</h4>
                      <p className="text-sm text-[#94A3B8]">{feature.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={data.scalability.features.find(f => f.name === feature.name)?.priority || 'low'}
                        onChange={(e) => {
                          const existingFeature = data.scalability.features.find(f => f.name === feature.name)
                          const newFeatures = existingFeature
                            ? data.scalability.features.map(f =>
                                f.name === feature.name
                                  ? { ...f, priority: e.target.value as 'high' | 'medium' | 'low' }
                                  : f
                              )
                            : [
                                ...data.scalability.features,
                                {
                                  name: feature.name,
                                  category: feature.category,
                                  priority: e.target.value as 'high' | 'medium' | 'low',
                                  timeline: 'short',
                                  requirements: feature.requirements,
                                  estimatedCost: '',
                                  implemented: false,
                                  notes: ''
                                }
                              ]
                          setData(prev => ({
                            ...prev,
                            scalability: {
                              ...prev.scalability,
                              features: newFeatures
                            }
                          }))
                        }}
                        className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                      >
                        {['high', 'medium', 'low'].map((priority) => (
                          <option key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                          </option>
                        ))}
                      </select>
                      <select
                        value={data.scalability.features.find(f => f.name === feature.name)?.timeline || 'short'}
                        onChange={(e) => {
                          const existingFeature = data.scalability.features.find(f => f.name === feature.name)
                          const newFeatures = existingFeature
                            ? data.scalability.features.map(f =>
                                f.name === feature.name
                                  ? { ...f, timeline: e.target.value as 'short' | 'medium' | 'long' }
                                  : f
                              )
                            : [
                                ...data.scalability.features,
                                {
                                  name: feature.name,
                                  category: feature.category,
                                  priority: 'low',
                                  timeline: e.target.value as 'short' | 'medium' | 'long',
                                  requirements: feature.requirements,
                                  estimatedCost: '',
                                  implemented: false,
                                  notes: ''
                                }
                              ]
                          setData(prev => ({
                            ...prev,
                            scalability: {
                              ...prev.scalability,
                              features: newFeatures
                            }
                          }))
                        }}
                        className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                      >
                        <option value="short">1-3 Months</option>
                        <option value="medium">3-6 Months</option>
                        <option value="long">6+ Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h5 className="text-[#E2E8F0] font-medium mb-2">Requirements</h5>
                    <ul className="list-disc list-inside text-sm text-[#94A3B8] space-y-1">
                      {feature.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Notes & Cost */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                        Estimated Cost
                      </label>
                      <input
                        type="text"
                        value={data.scalability.features.find(f => f.name === feature.name)?.estimatedCost || ''}
                        onChange={(e) => {
                          const existingFeature = data.scalability.features.find(f => f.name === feature.name)
                          const newFeatures = existingFeature
                            ? data.scalability.features.map(f =>
                                f.name === feature.name
                                  ? { ...f, estimatedCost: e.target.value }
                                  : f
                              )
                            : [
                                ...data.scalability.features,
                                {
                                  name: feature.name,
                                  category: feature.category,
                                  priority: 'low',
                                  timeline: 'short',
                                  requirements: feature.requirements,
                                  estimatedCost: e.target.value,
                                  implemented: false,
                                  notes: ''
                                }
                              ]
                          setData(prev => ({
                            ...prev,
                            scalability: {
                              ...prev.scalability,
                              features: newFeatures
                            }
                          }))
                        }}
                        placeholder="e.g., $100/month"
                        className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                        Notes
                      </label>
                      <input
                        type="text"
                        value={data.scalability.features.find(f => f.name === feature.name)?.notes || ''}
                        onChange={(e) => {
                          const existingFeature = data.scalability.features.find(f => f.name === feature.name)
                          const newFeatures = existingFeature
                            ? data.scalability.features.map(f =>
                                f.name === feature.name
                                  ? { ...f, notes: e.target.value }
                                  : f
                              )
                            : [
                                ...data.scalability.features,
                                {
                                  name: feature.name,
                                  category: feature.category,
                                  priority: 'low',
                                  timeline: 'short',
                                  requirements: feature.requirements,
                                  estimatedCost: '',
                                  implemented: false,
                                  notes: e.target.value
                                }
                              ]
                          setData(prev => ({
                            ...prev,
                            scalability: {
                              ...prev.scalability,
                              features: newFeatures
                            }
                          }))
                        }}
                        placeholder="Additional notes..."
                        className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Documentation
              </h3>
              <Tooltip text={tooltips.scalability.documentation} />
            </div>

            <div className="space-y-2">
              {data.scalability.documentation.map((doc, index) => (
                <div key={index} className="flex items-center space-x-4 bg-[#2D3748] p-4 rounded-lg">
                  <input
                    type="text"
                    value={doc.type}
                    onChange={(e) => {
                      const newDocs = [...data.scalability.documentation]
                      newDocs[index] = { ...doc, type: e.target.value }
                      setData(prev => ({
                        ...prev,
                        scalability: {
                          ...prev.scalability,
                          documentation: newDocs
                        }
                      }))
                    }}
                    placeholder="Document Type"
                    className="flex-1 bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={doc.url}
                    onChange={(e) => {
                      const newDocs = [...data.scalability.documentation]
                      newDocs[index] = { ...doc, url: e.target.value }
                      setData(prev => ({
                        ...prev,
                        scalability: {
                          ...prev.scalability,
                          documentation: newDocs
                        }
                      }))
                    }}
                    placeholder="URL or Location"
                    className="flex-1 bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                  />
                  <button
                    onClick={() => {
                      const newDocs = data.scalability.documentation.filter((_, i) => i !== index)
                      setData(prev => ({
                        ...prev,
                        scalability: {
                          ...prev.scalability,
                          documentation: newDocs
                        }
                      }))
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setData(prev => ({
                  ...prev,
                  scalability: {
                    ...prev.scalability,
                    documentation: [
                      ...prev.scalability.documentation,
                      {
                        type: '',
                        url: '',
                        lastUpdated: new Date().toISOString()
                      }
                    ]
                  }
                }))}
                className="text-sm text-[#5865F2] hover:text-[#4752C4]"
              >
                + Add Documentation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launch Phase */}
      {activePhase === 'launch' && (
        <div className="space-y-6">
          {/* Pre-launch Checklist */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Pre-launch Checklist
            </h3>
            <div className="space-y-2">
              {Object.entries(data.domain.prelaunchChecks).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => {
                      setData(prev => ({
                        ...prev,
                        domain: {
                          ...prev.domain,
                          prelaunchChecks: {
                            ...prev.domain.prelaunchChecks,
                            [key]: e.target.checked
                          }
                        }
                      }))
                    }}
                    className="text-[#5865F2]"
                  />
                  <span className="text-[#E2E8F0]">
                    {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Status */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Launch Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.progress.launched}
                  onChange={(e) => {
                    setData(prev => ({
                      ...prev,
                      progress: {
                        ...prev.progress,
                        launched: e.target.checked
                      }
                    }))
                  }}
                  className="text-[#5865F2]"
                />
                <span className="text-[#E2E8F0]">Site Launched</span>
              </div>
              {data.progress.launched && (
                <div className="bg-green-400/10 text-green-400 p-4 rounded-lg">
                  Congratulations! Your site is live and ready for visitors.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Phase */}
      {activePhase === 'maintenance' && (
        <div className="space-y-6">
          {/* Maintenance Schedule */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Maintenance Schedule
              </h3>
              <Tooltip text={tooltips.maintenance.schedule} />
            </div>

            <div className="space-y-4">
              {maintenanceTasks.map((task) => (
                <div key={task.name} className="bg-[#2D3748] p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#E2E8F0] font-medium">{task.name}</h4>
                      <p className="text-sm text-[#94A3B8]">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm ${
                        task.priority === 'high' ? 'text-red-400' :
                        task.priority === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                      <span className="text-[#94A3B8] text-sm">
                        {task.frequency.charAt(0).toUpperCase() + task.frequency.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  {data.maintenance.schedule.some(s => s.task === task.name) && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                          Last Run
                        </label>
                        <input
                          type="date"
                          value={data.maintenance.schedule.find(s => s.task === task.name)?.lastRun.split('T')[0] || ''}
                          onChange={(e) => {
                            const newSchedule = data.maintenance.schedule.map(s =>
                              s.task === task.name
                                ? { ...s, lastRun: new Date(e.target.value).toISOString() }
                                : s
                            )
                            setData(prev => ({
                              ...prev,
                              maintenance: {
                                ...prev.maintenance,
                                schedule: newSchedule
                              }
                            }))
                          }}
                          className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                          Next Run
                        </label>
                        <input
                          type="date"
                          value={data.maintenance.schedule.find(s => s.task === task.name)?.nextRun.split('T')[0] || ''}
                          onChange={(e) => {
                            const newSchedule = data.maintenance.schedule.map(s =>
                              s.task === task.name
                                ? { ...s, nextRun: new Date(e.target.value).toISOString() }
                                : s
                            )
                            setData(prev => ({
                              ...prev,
                              maintenance: {
                                ...prev.maintenance,
                                schedule: newSchedule
                              }
                            }))
                          }}
                          className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* Add to Schedule Button */}
                  {!data.maintenance.schedule.some(s => s.task === task.name) && (
                    <button
                      onClick={() => setData(prev => ({
                        ...prev,
                        maintenance: {
                          ...prev.maintenance,
                          schedule: [
                            ...prev.maintenance.schedule,
                            {
                              task: task.name,
                              frequency: task.frequency,
                              lastRun: new Date().toISOString(),
                              nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                            }
                          ]
                        }
                      }))}
                      className="mt-4 text-sm text-[#5865F2] hover:text-[#4752C4]"
                    >
                      + Add to Schedule
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Logs */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Maintenance Logs
              </h3>
              <Tooltip text={tooltips.maintenance.monitoring} />
            </div>

            <div className="space-y-4">
              {/* Log Entries */}
              {data.maintenance.logs.map((log, index) => (
                <div key={index} className="bg-[#2D3748] p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#E2E8F0] font-medium">
                        {new Date(log.date).toLocaleDateString()}
                      </span>
                      <span className={`ml-2 text-sm ${
                        log.successful ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {log.successful ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    <span className="text-[#94A3B8] text-sm">
                      {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-[#94A3B8]">{log.description}</p>
                  {log.changes.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-[#94A3B8] space-y-1">
                      {log.changes.map((change, i) => (
                        <li key={i}>{change}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Add Log Entry */}
              <button
                onClick={() => setData(prev => ({
                  ...prev,
                  maintenance: {
                    ...prev.maintenance,
                    logs: [
                      ...prev.maintenance.logs,
                      {
                        date: new Date().toISOString(),
                        type: 'update',
                        description: '',
                        changes: [],
                        successful: true
                      }
                    ]
                  }
                }))}
                className="text-sm text-[#5865F2] hover:text-[#4752C4]"
              >
                + Add Log Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-lg bg-[#5865F2] text-white font-medium ${
            isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4752C4]'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Progress'}
        </button>
      </div>
    </div>
  )
}
