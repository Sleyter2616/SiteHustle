'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FiDownload, FiCheckCircle } from 'react-icons/fi'
import ProgressBar from '../dashboard/ProgressBar'
import Alert from '../common/Alert'
import FormField, { ArrayInput } from '../common/FormField'
import Tooltip from '../common/Tooltip'
import { 
  type Pillar1Data,
  validateWorksheet,
  validatePersona,
  isWorksheetComplete,
  isPersonaComplete,
  tooltips
} from '@/utils/pillar1Validation'

export default function Pillar1Content() {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'persona' | 'wireframe'>('worksheet')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [data, setData] = useState<Pillar1Data>({
    worksheet: {
      businessName: '',
      tagline: '',
      missionStatement: '',
      coreValues: [],
      businessGoals: {
        shortTerm: '',
        midTerm: '',
        longTerm: ''
      },
      visionStatement: '',
      swot: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      },
      customerJourney: {
        awareness: '',
        consideration: '',
        decision: '',
        retention: ''
      }
    },
    persona: {
      demographics: {
        ageRange: '',
        gender: '',
        location: '',
        income: '',
        education: ''
      },
      psychographics: {
        interests: [],
        values: [],
        lifestyle: '',
        challenges: [],
        motivators: []
      },
      professional: {
        occupation: '',
        industry: '',
        companySize: '',
        roleLevel: '',
        painPoints: []
      },
      valueProposition: {
        needs: [],
        solutions: [],
        benefits: []
      }
    },
    progress: {
      worksheetCompleted: false,
      personaCompleted: false,
      totalTasks: 15,
      completedTasks: 0
    }
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: pillarData, error } = await supabase
        .from('pillar_1_data')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (pillarData) {
        setData(pillarData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      setAlert({
        type: 'error',
        message: 'Failed to load your data. Please try refreshing the page.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setErrors({})
    
    try {
      // Validate based on active tab
      const validationResult = activeTab === 'worksheet' 
        ? validateWorksheet(data.worksheet)
        : validatePersona(data.persona)

      if (!validationResult.success) {
        setErrors(validationResult.errors)
        throw new Error('Please fix the validation errors')
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('pillar_1_data')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString()
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
        message: error instanceof Error ? error.message : 'Failed to save progress'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleComplete = async () => {
    const newProgress = {
      ...data.progress,
      [activeTab === 'worksheet' ? 'worksheetCompleted' : 'personaCompleted']: true
    }
    
    setData(prev => ({
      ...prev,
      progress: {
        ...newProgress,
        completedTasks: (newProgress.worksheetCompleted ? 7 : 0) + (newProgress.personaCompleted ? 8 : 0)
      }
    }))

    await handleSave()
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
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
              Complete both sections to unlock Pillar 2
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
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'worksheet'
              ? 'text-[#5865F2] border-b-2 border-[#5865F2]'
              : 'text-[#94A3B8] hover:text-[#E2E8F0]'
          }`}
        >
          Vision & Goals Worksheet
          {data.progress.worksheetCompleted && (
            <span className="ml-2 text-green-400">
              <FiCheckCircle className="inline w-4 h-4" />
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('persona')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'persona'
              ? 'text-[#5865F2] border-b-2 border-[#5865F2]'
              : 'text-[#94A3B8] hover:text-[#E2E8F0]'
          }`}
        >
          Target Audience Persona
          {data.progress.personaCompleted && (
            <span className="ml-2 text-green-400">
              <FiCheckCircle className="inline w-4 h-4" />
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('wireframe')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'wireframe'
              ? 'text-[#5865F2] border-b-2 border-[#5865F2]'
              : 'text-[#94A3B8] hover:text-[#E2E8F0]'
          }`}
        >
          Wireframe Template
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'wireframe' ? (
        <div className="space-y-6">
          <div className="bg-[#1E293B] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">
              Website Wireframe Template
            </h3>
            <p className="text-[#94A3B8] mb-6">
              Download our wireframe template to start planning your website structure.
              This template includes:
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] mb-6 space-y-2">
              <li>Homepage layout suggestions</li>
              <li>Common navigation patterns</li>
              <li>Content section recommendations</li>
              <li>Mobile-responsive considerations</li>
            </ul>
            <button 
              onClick={() => window.open('/templates/wireframe-template.pdf', '_blank')}
              className="inline-flex items-center px-4 py-2 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4]"
            >
              <FiDownload className="mr-2" />
              Download Template
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Existing Worksheet and Persona forms */}
          {activeTab === 'worksheet' && (
            <div className="space-y-6">
              <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
                  Business Identity
                </h3>
                
                <FormField
                  label="Business Name"
                  required
                  error={errors.businessName?.[0]}
                >
                  <input
                    type="text"
                    value={data.worksheet.businessName}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        businessName: e.target.value
                      }
                    }))}
                    className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                  />
                </FormField>

                <FormField
                  label="Tagline"
                  required
                  error={errors.tagline?.[0]}
                >
                  <input
                    type="text"
                    value={data.worksheet.tagline}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        tagline: e.target.value
                      }
                    }))}
                    className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                  />
                </FormField>

                <FormField
                  label="Mission Statement"
                  required
                  error={errors.missionStatement?.[0]}
                >
                  <textarea
                    value={data.worksheet.missionStatement}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        missionStatement: e.target.value
                      }
                    }))}
                    className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                  />
                </FormField>

                <FormField
                  label="Core Values"
                  required
                  error={errors.coreValues?.[0]}
                >
                  <ArrayInput
                    value={data.worksheet.coreValues}
                    onChange={(values) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        coreValues: values
                      }
                    }))}
                    placeholder="Add a core value..."
                  />
                </FormField>
              </div>

              <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
                  Business Goals
                </h3>
                
                <FormField
                  label="Short-term Goals (6-12 months)"
                  required
                  error={errors['businessGoals.shortTerm']?.[0]}
                >
                  <textarea
                    value={data.worksheet.businessGoals.shortTerm}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        businessGoals: {
                          ...prev.worksheet.businessGoals,
                          shortTerm: e.target.value
                        }
                      }
                    }))}
                    className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                  />
                </FormField>

                <FormField
                  label="Mid-term Goals (1-2 years)"
                  required
                  error={errors['businessGoals.midTerm']?.[0]}
                >
                  <textarea
                    value={data.worksheet.businessGoals.midTerm}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        businessGoals: {
                          ...prev.worksheet.businessGoals,
                          midTerm: e.target.value
                        }
                      }
                    }))}
                    className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                  />
                </FormField>

                <FormField
                  label="Long-term Goals (3-5 years)"
                  required
                  error={errors['businessGoals.longTerm']?.[0]}
                >
                  <textarea
                    value={data.worksheet.businessGoals.longTerm}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        businessGoals: {
                          ...prev.worksheet.businessGoals,
                          longTerm: e.target.value
                        }
                      }
                    }))}
                    className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                  />
                </FormField>
              </div>
            </div>
          )}

          {activeTab === 'worksheet' && (
            <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[#E2E8F0]">
                  Quick SWOT Analysis
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label={
                    <div className="flex items-center gap-2">
                      Strengths
                      <Tooltip text={tooltips.worksheet.swot.strengths} />
                    </div>
                  }
                  error={errors['swot.strengths']?.[0]}
                >
                  <ArrayInput
                    value={data.worksheet.swot?.strengths || []}
                    onChange={(values) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        swot: {
                          ...prev.worksheet.swot,
                          strengths: values
                        }
                      }
                    }))}
                    placeholder="Add a strength..."
                  />
                </FormField>

                <FormField
                  label={
                    <div className="flex items-center gap-2">
                      Weaknesses
                      <Tooltip text={tooltips.worksheet.swot.weaknesses} />
                    </div>
                  }
                  error={errors['swot.weaknesses']?.[0]}
                >
                  <ArrayInput
                    value={data.worksheet.swot?.weaknesses || []}
                    onChange={(values) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        swot: {
                          ...prev.worksheet.swot,
                          weaknesses: values
                        }
                      }
                    }))}
                    placeholder="Add a weakness..."
                  />
                </FormField>

                <FormField
                  label={
                    <div className="flex items-center gap-2">
                      Opportunities
                      <Tooltip text={tooltips.worksheet.swot.opportunities} />
                    </div>
                  }
                  error={errors['swot.opportunities']?.[0]}
                >
                  <ArrayInput
                    value={data.worksheet.swot?.opportunities || []}
                    onChange={(values) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        swot: {
                          ...prev.worksheet.swot,
                          opportunities: values
                        }
                      }
                    }))}
                    placeholder="Add an opportunity..."
                  />
                </FormField>

                <FormField
                  label={
                    <div className="flex items-center gap-2">
                      Threats
                      <Tooltip text={tooltips.worksheet.swot.threats} />
                    </div>
                  }
                  error={errors['swot.threats']?.[0]}
                >
                  <ArrayInput
                    value={data.worksheet.swot?.threats || []}
                    onChange={(values) => setData(prev => ({
                      ...prev,
                      worksheet: {
                        ...prev.worksheet,
                        swot: {
                          ...prev.worksheet.swot,
                          threats: values
                        }
                      }
                    }))}
                    placeholder="Add a threat..."
                  />
                </FormField>
              </div>
            </div>
          )}

          {activeTab === 'worksheet' && (
            <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[#E2E8F0]">
                  Customer Journey Map
                </h3>
                <span className="text-[#94A3B8] text-sm">(Optional)</span>
              </div>
              
              <FormField
                label="Awareness Stage"
                error={errors['customerJourney.awareness']?.[0]}
              >
                <textarea
                  value={data.worksheet.customerJourney?.awareness || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    worksheet: {
                      ...prev.worksheet,
                      customerJourney: {
                        ...prev.worksheet.customerJourney,
                        awareness: e.target.value
                      }
                    }
                  }))}
                  placeholder="How do potential customers discover your business?"
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                />
              </FormField>

              <FormField
                label="Consideration Stage"
                error={errors['customerJourney.consideration']?.[0]}
              >
                <textarea
                  value={data.worksheet.customerJourney?.consideration || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    worksheet: {
                      ...prev.worksheet,
                      customerJourney: {
                        ...prev.worksheet.customerJourney,
                        consideration: e.target.value
                      }
                    }
                  }))}
                  placeholder="How do they evaluate your solution?"
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                />
              </FormField>

              <FormField
                label="Decision Stage"
                error={errors['customerJourney.decision']?.[0]}
              >
                <textarea
                  value={data.worksheet.customerJourney?.decision || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    worksheet: {
                      ...prev.worksheet,
                      customerJourney: {
                        ...prev.worksheet.customerJourney,
                        decision: e.target.value
                      }
                    }
                  }))}
                  placeholder="What makes them choose your solution?"
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                />
              </FormField>

              <FormField
                label="Retention & Referral"
                error={errors['customerJourney.retention']?.[0]}
              >
                <textarea
                  value={data.worksheet.customerJourney?.retention || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    worksheet: {
                      ...prev.worksheet,
                      customerJourney: {
                        ...prev.worksheet.customerJourney,
                        retention: e.target.value
                      }
                    }
                  }))}
                  placeholder="How do you keep customers engaged and encourage referrals?"
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                />
              </FormField>
            </div>
          )}
        </div>
      )}

      {/* Persona Form */}
      {activeTab === 'persona' && (
        <div className="space-y-6">
          <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Demographics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Age Range"
                required
                error={errors['demographics.ageRange']?.[0]}
              >
                <input
                  type="text"
                  value={data.persona.demographics.ageRange}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    persona: {
                      ...prev.persona,
                      demographics: {
                        ...prev.persona.demographics,
                        ageRange: e.target.value
                      }
                    }
                  }))}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                />
              </FormField>

              <FormField
                label="Gender"
                error={errors['demographics.gender']?.[0]}
              >
                <input
                  type="text"
                  value={data.persona.demographics.gender}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    persona: {
                      ...prev.persona,
                      demographics: {
                        ...prev.persona.demographics,
                        gender: e.target.value
                      }
                    }
                  }))}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                />
              </FormField>
            </div>

            <FormField
              label="Location"
              required
              error={errors['demographics.location']?.[0]}
            >
              <input
                type="text"
                value={data.persona.demographics.location}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  persona: {
                    ...prev.persona,
                    demographics: {
                      ...prev.persona.demographics,
                      location: e.target.value
                    }
                  }
                }))}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
              />
            </FormField>
          </div>

          <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Psychographics
            </h3>

            <FormField
              label="Interests"
              required
              error={errors['psychographics.interests']?.[0]}
            >
              <ArrayInput
                value={data.persona.psychographics.interests}
                onChange={(values) => setData(prev => ({
                  ...prev,
                  persona: {
                    ...prev.persona,
                    psychographics: {
                      ...prev.persona.psychographics,
                      interests: values
                    }
                  }
                }))}
                placeholder="Add an interest..."
              />
            </FormField>

            <FormField
              label="Challenges"
              required
              error={errors['psychographics.challenges']?.[0]}
            >
              <ArrayInput
                value={data.persona.psychographics.challenges}
                onChange={(values) => setData(prev => ({
                  ...prev,
                  persona: {
                    ...prev.persona,
                    psychographics: {
                      ...prev.persona.psychographics,
                      challenges: values
                    }
                  }
                }))}
                placeholder="Add a challenge..."
              />
            </FormField>

            <FormField
              label="Motivators"
              required
              error={errors['psychographics.motivators']?.[0]}
            >
              <ArrayInput
                value={data.persona.psychographics.motivators}
                onChange={(values) => setData(prev => ({
                  ...prev,
                  persona: {
                    ...prev.persona,
                    psychographics: {
                      ...prev.persona.psychographics,
                      motivators: values
                    }
                  }
                }))}
                placeholder="Add a motivator..."
              />
            </FormField>
          </div>

          <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Professional Profile
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Occupation"
                required
                error={errors['professional.occupation']?.[0]}
              >
                <input
                  type="text"
                  value={data.persona.professional.occupation}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    persona: {
                      ...prev.persona,
                      professional: {
                        ...prev.persona.professional,
                        occupation: e.target.value
                      }
                    }
                  }))}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                />
              </FormField>

              <FormField
                label="Industry"
                required
                error={errors['professional.industry']?.[0]}
              >
                <input
                  type="text"
                  value={data.persona.professional.industry}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    persona: {
                      ...prev.persona,
                      professional: {
                        ...prev.persona.professional,
                        industry: e.target.value
                      }
                    }
                  }))}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                />
              </FormField>
            </div>

            <FormField
              label="Pain Points"
              required
              error={errors['professional.painPoints']?.[0]}
            >
              <ArrayInput
                value={data.persona.professional.painPoints}
                onChange={(values) => setData(prev => ({
                  ...prev,
                  persona: {
                    ...prev.persona,
                    professional: {
                      ...prev.persona.professional,
                      painPoints: values
                    }
                  }
                }))}
                placeholder="Add a pain point..."
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {activeTab !== 'wireframe' && (
        <div className="flex justify-between items-center pt-8 border-t border-[#1E293B]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Progress'}
          </button>

          <button
            onClick={handleComplete}
            disabled={
              saving || 
              (activeTab === 'worksheet' 
                ? data.progress.worksheetCompleted || !isWorksheetComplete(data.worksheet)
                : data.progress.personaCompleted || !isPersonaComplete(data.persona))
            }
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            title={
              activeTab === 'worksheet' && !isWorksheetComplete(data.worksheet)
                ? 'Please complete all required fields in the worksheet'
                : activeTab === 'persona' && !isPersonaComplete(data.persona)
                ? 'Please complete all required fields in the persona'
                : ''
            }
          >
            {activeTab === 'worksheet' ? 'Complete Worksheet' : 'Complete Persona'}
          </button>
        </div>
      )}
    </div>
  )
}