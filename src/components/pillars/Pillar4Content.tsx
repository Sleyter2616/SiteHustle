'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FiCheckCircle, FiInfo, FiExternalLink, FiUpload, FiEye } from 'react-icons/fi'
import { HiColorSwatch } from 'react-icons/hi'
import { RiPaletteLine, RiFileTextLine, RiSearchLine } from 'react-icons/ri'
import ProgressBar from '../dashboard/ProgressBar'
import Alert from '../common/Alert'
import Tooltip from '../common/Tooltip'
import type { Pillar4Data } from '@/types/pillar4'
import {
  brandPersonalities,
  colorSchemes,
  fontPairings,
  contentTemplates,
  seoChecklist,
  validatePillar4Data,
  tooltips,
  type FontPairing
} from '@/utils/pillar4Validation'

// Color Picker Component
const ColorPicker = ({
  color,
  onChange,
  label
}: {
  color: string
  onChange: (color: string) => void
  label: string
}) => (
  <div className="flex items-center gap-2">
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer"
    />
    <input
      type="text"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#2D3748] text-[#E2E8F0] rounded px-2 py-1 text-sm w-24"
      placeholder="#000000"
    />
    <span className="text-sm text-[#94A3B8]">{label}</span>
  </div>
)

// Font Preview Component
const FontPreview = ({
  font,
  onSelect,
  selected
}: {
  font: FontPairing
  onSelect: () => void
  selected: boolean
}) => (
  <button
    onClick={onSelect}
    className={`w-full p-4 rounded-lg ${
      selected ? 'bg-[#5865F2]/20 border border-[#5865F2]' : 'bg-[#2D3748]'
    }`}
  >
    <h4 style={{ fontFamily: font.heading }} className="text-xl text-[#E2E8F0] mb-2">
      {font.heading}
    </h4>
    <p style={{ fontFamily: font.body }} className="text-[#94A3B8]">
      {font.body} - {font.style}
    </p>
  </button>
)

export default function Pillar4Content() {
  const [activePhase, setActivePhase] = useState<'branding' | 'content' | 'seo' | 'review'>('branding')
  const [isSaving, setIsSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [data, setData] = useState<Pillar4Data>({
    userId: '',
    progress: {
      completedTasks: 0,
      totalTasks: 0,
      currentPhase: 'branding',
      brandingCompleted: false,
      contentCompleted: false,
      seoCompleted: false,
      reviewCompleted: false
    },
    branding: {
      identity: {
        personality: [],
        values: [],
        tone: []
      },
      colors: {
        primary: [],
        accent: [],
        neutral: []
      },
      typography: {
        headingFont: '',
        bodyFont: '',
        sizes: {
          h1: '2.25rem',
          h2: '1.875rem',
          h3: '1.5rem',
          body: '1rem',
          small: '0.875rem'
        }
      },
      logo: {
        url: '',
        minSize: '32px',
        spacing: '16px',
        usage: {
          dos: [],
          donts: []
        }
      },
      styleGuideCompleted: false
    },
    content: {
      templates: Object.values(contentTemplates),
      aiGenerated: false,
      lastEdited: new Date().toISOString()
    },
    images: {
      assets: [],
      optimizationCompleted: false
    },
    seo: {
      pages: [],
      globalKeywords: [],
      sitemap: false
    },
    review: {
      desktopChecked: false,
      mobileChecked: false,
      contentReviewed: false,
      brandingConsistent: false,
      feedback: []
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

      const { data: pillar4Data, error } = await supabase
        .from('pillar_4_data')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (pillar4Data) {
        setData(pillar4Data)
      } else {
        const newData = {
          ...data,
          userId: user.id
        }
        await supabase.from('pillar_4_data').insert([newData])
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
        .from('pillar_4_data')
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

  const updateBrandIdentity = (field: keyof typeof data.branding.identity, value: string[]) => {
    setData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        identity: {
          ...prev.branding.identity,
          [field]: value
        }
      }
    }))
  }

  const updateColors = (category: keyof typeof data.branding.colors, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        colors: {
          ...prev.branding.colors,
          [category]: [
            ...prev.branding.colors[category].slice(0, index),
            value,
            ...prev.branding.colors[category].slice(index + 1)
          ]
        }
      }
    }))
  }

  const updateTypography = (fonts: { heading: string; body: string }) => {
    setData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        typography: {
          ...prev.branding.typography,
          headingFont: fonts.heading,
          bodyFont: fonts.body
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
              Branding & Content
            </h2>
            <p className="text-[#94A3B8] text-sm">
              Create your unique brand identity and compelling content
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
        {['branding', 'content', 'seo', 'review'].map((phase) => (
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

      {/* Branding Phase */}
      {activePhase === 'branding' && (
        <div className="space-y-6">
          {/* Brand Identity */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Brand Identity
              </h3>
              <Tooltip content={tooltips.branding.identity} />
            </div>

            <div className="space-y-4">
              {/* Brand Personality */}
              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-2">
                  Brand Personality
                </label>
                <div className="flex flex-wrap gap-2">
                  {brandPersonalities.map((trait) => (
                    <button
                      key={trait}
                      onClick={() => {
                        const personality = data.branding.identity.personality
                        const updated = personality.includes(trait)
                          ? personality.filter(t => t !== trait)
                          : [...personality, trait]
                        updateBrandIdentity('personality', updated)
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        data.branding.identity.personality.includes(trait)
                          ? 'bg-[#5865F2] text-white'
                          : 'bg-[#2D3748] text-[#94A3B8] hover:text-[#E2E8F0]'
                      }`}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#E2E8F0]">
                    Color Palette
                  </label>
                  <Tooltip content={tooltips.branding.colors} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm text-[#94A3B8]">Primary Colors</h4>
                    {data.branding.colors.primary.map((color, index) => (
                      <ColorPicker
                        key={index}
                        color={color}
                        onChange={(value) => updateColors('primary', index, value)}
                        label={`Primary ${index + 1}`}
                      />
                    ))}
                    {data.branding.colors.primary.length < 2 && (
                      <button
                        onClick={() => {
                          setData(prev => ({
                            ...prev,
                            branding: {
                              ...prev.branding,
                              colors: {
                                ...prev.branding.colors,
                                primary: [...prev.branding.colors.primary, '#000000']
                              }
                            }
                          }))
                        }}
                        className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                      >
                        + Add Primary Color
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm text-[#94A3B8]">Accent Colors</h4>
                    {data.branding.colors.accent.map((color, index) => (
                      <ColorPicker
                        key={index}
                        color={color}
                        onChange={(value) => updateColors('accent', index, value)}
                        label={`Accent ${index + 1}`}
                      />
                    ))}
                    {data.branding.colors.accent.length < 2 && (
                      <button
                        onClick={() => {
                          setData(prev => ({
                            ...prev,
                            branding: {
                              ...prev.branding,
                              colors: {
                                ...prev.branding.colors,
                                accent: [...prev.branding.colors.accent, '#000000']
                              }
                            }
                          }))
                        }}
                        className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                      >
                        + Add Accent Color
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#E2E8F0]">
                    Typography
                  </label>
                  <Tooltip content={tooltips.branding.typography} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fontPairings.map((pair) => (
                    <FontPreview
                      key={pair.heading}
                      font={pair}
                      selected={
                        data.branding.typography.headingFont === pair.heading &&
                        data.branding.typography.bodyFont === pair.body
                      }
                      onSelect={() => updateTypography({
                        heading: pair.heading,
                        body: pair.body
                      })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">Logo</h3>
              <Tooltip content={tooltips.branding.logo} />
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#2D3748] rounded-lg p-8 text-center">
                {data.branding.logo.url ? (
                  <div className="space-y-4">
                    <img
                      src={data.branding.logo.url}
                      alt="Logo"
                      className="max-w-xs mx-auto"
                    />
                    <button
                      onClick={() => setData(prev => ({
                        ...prev,
                        branding: {
                          ...prev.branding,
                          logo: {
                            ...prev.branding.logo,
                            url: ''
                          }
                        }
                      }))}
                      className="text-[#94A3B8] hover:text-[#E2E8F0]"
                    >
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FiUpload className="w-12 h-12 text-[#94A3B8] mx-auto" />
                    <p className="text-[#94A3B8]">
                      Drag and drop your logo or{' '}
                      <button className="text-[#5865F2] hover:text-[#4752C4]">
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-[#64748B]">
                      Recommended: SVG or PNG with transparent background
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Phase */}
      {activePhase === 'content' && (
        <div className="space-y-6">
          {/* Content Templates */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Content Templates
              </h3>
              <Tooltip content={tooltips.content.templates} />
            </div>

            <div className="space-y-6">
              {data.content.templates.map((template) => (
                <div key={template.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#E2E8F0]">
                      {template.title}
                    </label>
                    {template.completed && (
                      <FiCheckCircle className="text-green-400" />
                    )}
                  </div>
                  <div className="bg-[#2D3748] rounded p-3 text-sm text-[#94A3B8]">
                    {template.template}
                  </div>
                  <div className="bg-[#2D3748]/50 rounded p-3 text-sm text-[#64748B]">
                    Example: {template.example}
                  </div>
                  <textarea
                    value={template.content || ''}
                    onChange={(e) => {
                      const updatedTemplates = data.content.templates.map(t =>
                        t.id === template.id
                          ? { ...t, content: e.target.value, completed: e.target.value.length > 0 }
                          : t
                      )
                      setData(prev => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          templates: updatedTemplates,
                          lastEdited: new Date().toISOString()
                        }
                      }))
                    }}
                    placeholder="Enter your content here..."
                    className="w-full h-24 bg-[#1A1F2E] text-[#E2E8F0] rounded p-2 mt-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* AI Content Generation */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                AI Content Assistant
              </h3>
              <Tooltip content={tooltips.content.aiTools} />
            </div>
            <div className="space-y-4">
              <p className="text-[#94A3B8]">
                Need help getting started? Our AI can help generate initial content based on your brand identity.
              </p>
              <button
                onClick={() => {
                  // AI content generation logic here
                  setData(prev => ({
                    ...prev,
                    content: {
                      ...prev.content,
                      aiGenerated: true
                    }
                  }))
                }}
                className="bg-[#5865F2] text-white px-4 py-2 rounded hover:bg-[#4752C4]"
              >
                Generate Content
              </button>
              {data.content.aiGenerated && (
                <p className="text-sm text-yellow-400">
                  Remember to review and edit AI-generated content to match your brand voice!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEO Phase */}
      {activePhase === 'seo' && (
        <div className="space-y-6">
          {/* SEO Checklist */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                SEO Optimization
              </h3>
              <Tooltip content={tooltips.seo.titles} />
            </div>

            <div className="space-y-6">
              {seoChecklist.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#E2E8F0]">
                      {item.title}
                      {item.required && <span className="text-red-400">*</span>}
                    </label>
                    <Tooltip content={item.description} />
                  </div>
                  <div className="space-y-2">
                    {data.seo.pages.map((page, index) => (
                      <div key={index} className="space-y-2">
                        <input
                          type="text"
                          value={page.title}
                          onChange={(e) => {
                            const updatedPages = [...data.seo.pages]
                            updatedPages[index] = {
                              ...updatedPages[index],
                              title: e.target.value,
                              completed: e.target.value.length > 0
                            }
                            setData(prev => ({
                              ...prev,
                              seo: {
                                ...prev.seo,
                                pages: updatedPages
                              }
                            }))
                          }}
                          placeholder={`${item.title} for page ${index + 1}`}
                          className="w-full bg-[#2D3748] text-[#E2E8F0] rounded p-2"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setData(prev => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            pages: [
                              ...prev.seo.pages,
                              {
                                pageId: `page-${prev.seo.pages.length + 1}`,
                                title: '',
                                description: '',
                                keywords: [],
                                h1: '',
                                completed: false
                              }
                            ]
                          }
                        }))
                      }}
                      className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                    >
                      + Add Page
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Review Phase */}
      {activePhase === 'review' && (
        <div className="space-y-6">
          <div className="bg-[#1E293B] rounded-lg p-6">
            <h3 className="text-lg font-medium text-[#E2E8F0] mb-4">
              Final Review
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.review.desktopChecked}
                  onChange={(e) => {
                    setData(prev => ({
                      ...prev,
                      review: {
                        ...prev.review,
                        desktopChecked: e.target.checked
                      }
                    }))
                  }}
                  className="text-[#5865F2]"
                />
                <span className="text-[#E2E8F0]">Desktop Preview Checked</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.review.mobileChecked}
                  onChange={(e) => {
                    setData(prev => ({
                      ...prev,
                      review: {
                        ...prev.review,
                        mobileChecked: e.target.checked
                      }
                    }))
                  }}
                  className="text-[#5865F2]"
                />
                <span className="text-[#E2E8F0]">Mobile Preview Checked</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.review.contentReviewed}
                  onChange={(e) => {
                    setData(prev => ({
                      ...prev,
                      review: {
                        ...prev.review,
                        contentReviewed: e.target.checked
                      }
                    }))
                  }}
                  className="text-[#5865F2]"
                />
                <span className="text-[#E2E8F0]">Content Reviewed</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.review.brandingConsistent}
                  onChange={(e) => {
                    setData(prev => ({
                      ...prev,
                      review: {
                        ...prev.review,
                        brandingConsistent: e.target.checked
                      }
                    }))
                  }}
                  className="text-[#5865F2]"
                />
                <span className="text-[#E2E8F0]">Branding Consistency Checked</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-lg ${
            isSaving
              ? 'bg-[#4752C4] cursor-not-allowed'
              : 'bg-[#5865F2] hover:bg-[#4752C4]'
          } text-white`}
        >
          {isSaving ? 'Saving...' : 'Save Progress'}
        </button>
      </div>
    </div>
  )
}
