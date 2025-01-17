import { useEffect, useState } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import Tooltip from '@/components/common/Tooltip'
import { ProgressBar } from '@/components/common/ProgressBar'
import { VideoPlayer } from '@/components/common/VideoPlayer'
import { FaCheck, FaBook, FaTrophy, FaCalendar, FaClock } from 'react-icons/fa'
import { VideoTutorial, VideoTutorialDB, Pillar6Data, Pillar6DataDB } from '@/types/pillar6'
import { tooltips } from '@/utils/tooltips'
import { tutorialCategories, tutorialLibrary, supportPlans, validatePillar6Data } from '@/utils/pillar6Validation'
import { mockPillar6Data } from '@/mocks/pillar6Mock'

type Phase = 'tutorials' | 'coaching' | 'support' | 'completion'

const initialData: Pillar6Data = {
  user_id: '',
  progress: {
    completedTasks: 0,
    totalTasks: tutorialLibrary.length + 3,
    currentPhase: 'tutorials',
    tutorialsWatched: 0,
    coachingCompleted: false,
    supportPlanSelected: false,
    graduated: false
  },
  tutorials: {
    library: [],
    watchHistory: [],
    preferences: {
      autoplay: true,
      playbackSpeed: 1,
      closedCaptions: false
    }
  },
  coaching: {
    sessions: [],
    preferences: {
      preferredDay: '',
      preferredTime: '',
      timezone: '',
      format: 'video'
    },
    notes: ''
  },
  support: {
    currentPlan: null,
    history: [],
    knowledgeBase: {
      articles: [],
      favorites: []
    }
  },
  milestones: {
    achieved: [],
    upcoming: []
  },
  feedback: {
    testimonial: null,
    nps: null,
    suggestions: []
  },
  created_at: '',
  updated_at: ''
};

const videoTutorials: VideoTutorial[] = [
  {
    id: 'site-navigation',
    title: 'Navigating Your Site Dashboard',
    description: "Learn the basics of your site's admin interface",
    url: '/tutorials/site-navigation.mp4',
    category: 'basics',
    duration: 180,
    tags: ['getting-started', 'dashboard', 'navigation'],
    watched: false,
    notes: ''
  },
  {
    id: 'content-management',
    title: 'Managing Your Content',
    description: 'Master content creation and organization',
    url: '/tutorials/content-management.mp4',
    category: 'content',
    duration: 240,
    tags: ['content', 'editing', 'organization'],
    watched: false,
    notes: ''
  },
  {
    id: 'seo-basics',
    title: 'SEO Fundamentals',
    description: 'Understand basic SEO principles',
    url: '/tutorials/seo-basics.mp4',
    category: 'marketing',
    duration: 300,
    tags: ['seo', 'marketing', 'optimization'],
    watched: false,
    notes: ''
  }
]

// Convert DB data to UI data
const toUIData = (dbData: Pillar6DataDB): Pillar6Data => ({
  user_id: dbData.user_id,
  progress: {
    ...dbData.progress,
    currentPhase: dbData.progress.currentPhase as 'tutorials' | 'coaching' | 'support' | 'completion'
  },
  tutorials: {
    ...dbData.tutorials,
    library: dbData.tutorials.library.map(tutorial => ({
      ...tutorial,
      tags: tutorial.tags as readonly string[]
    })),
    watchHistory: dbData.tutorials.watchHistory.map(item => ({
      tutorialId: item.tutorialId,
      watchedDate: item.watchedDate,
      completed: item.completed
    }))
  },
  coaching: {
    ...dbData.coaching,
    sessions: dbData.coaching.sessions.map(session => ({
      ...session,
      scheduledDate: session.scheduledDate,
      actionItems: session.actionItems.map(item => ({
        task: item.task,
        completed: item.completed,
        dueDate: item.dueDate
      }))
    }))
  },
  support: {
    ...dbData.support,
    currentPlan: dbData.support.currentPlan ? {
      ...dbData.support.currentPlan,
      startDate: dbData.support.currentPlan.startDate,
      features: dbData.support.currentPlan.features.map(f => ({ ...f }))
    } : null,
    history: dbData.support.history.map(item => ({ ...item })),
    knowledgeBase: {
      ...dbData.support.knowledgeBase,
      articles: dbData.support.knowledgeBase.articles.map(article => ({
        ...article,
        lastUpdated: article.lastUpdated,
        tags: [...article.tags]
      }))
    }
  },
  milestones: {
    ...dbData.milestones,
    achieved: dbData.milestones.achieved.map(m => ({
      ...m,
      achievedDate: m.achievedDate,
      targetDate: m.targetDate,
      metrics: m.metrics?.map(metric => ({ ...metric }))
    })),
    upcoming: dbData.milestones.upcoming.map(m => ({
      ...m,
      targetDate: m.targetDate
    }))
  },
  feedback: {
    ...dbData.feedback,
    testimonial: dbData.feedback.testimonial ? { ...dbData.feedback.testimonial } : null
  },
  created_at: dbData.created_at,
  updated_at: dbData.updated_at
});

// Convert UI data to DB data
const toDBData = (uiData: Pillar6Data): Pillar6DataDB => ({
  user_id: uiData.user_id,
  progress: {
    ...uiData.progress,
    currentPhase: uiData.progress.currentPhase
  },
  tutorials: {
    ...uiData.tutorials,
    library: uiData.tutorials.library.map(tutorial => ({
      ...tutorial,
      tags: [...tutorial.tags]
    })),
    watchHistory: uiData.tutorials.watchHistory.map(item => ({
      tutorialId: item.tutorialId,
      watchedDate: item.watchedDate,
      completed: item.completed
    }))
  },
  coaching: {
    ...uiData.coaching,
    sessions: uiData.coaching.sessions.map(session => ({
      ...session,
      scheduled_date: session.scheduledDate,
      action_items: session.actionItems.map(item => ({
        task: item.task,
        completed: item.completed,
        due_date: item.dueDate
      }))
    }))
  },
  support: {
    ...uiData.support,
    currentPlan: uiData.support.currentPlan ? {
      ...uiData.support.currentPlan,
      startDate: uiData.support.currentPlan.startDate,
      features: uiData.support.currentPlan.features.map(f => ({ ...f }))
    } : null,
    history: uiData.support.history.map(item => ({ ...item })),
    knowledgeBase: {
      ...uiData.support.knowledgeBase,
      articles: uiData.support.knowledgeBase.articles.map(article => ({
        ...article,
        last_updated: article.lastUpdated,
        tags: [...article.tags]
      }))
    }
  },
  milestones: {
    ...uiData.milestones,
    achieved: uiData.milestones.achieved.map(m => ({
      ...m,
      achieved_date: m.achievedDate,
      target_date: m.targetDate,
      metrics: m.metrics?.map(metric => ({ ...metric }))
    })),
    upcoming: uiData.milestones.upcoming.map(m => ({
      ...m,
      target_date: m.targetDate
    }))
  },
  feedback: {
    ...uiData.feedback,
    testimonial: uiData.feedback.testimonial ? { ...uiData.feedback.testimonial } : null
  },
  created_at: uiData.created_at,
  updated_at: uiData.updated_at
});

export const Pillar6Content = () => {
  const { supabase, user } = useSupabase()
  const [data, setData] = useState<Pillar6Data>(mockPillar6Data);
  const [activePhase, setActivePhase] = useState<Phase>(mockPillar6Data.progress.currentPhase);
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!user || !data) return;
    setIsSaving(true);
    setError(null);

    try {
      const dbData = toDBData(data);
      const { error } = await supabase
        .from('pillar_6_data')
        .upsert({
          ...dbData,
          progress: { ...dbData.progress },
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSession = () => {
    setData(prev => ({
      ...prev,
      coaching: {
        ...prev.coaching,
        sessions: [
          ...prev.coaching.sessions,
          {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            scheduledDate: new Date().toISOString(),
            completed: false,
            notes: '',
            topics: [],
            actionItems: [],
            feedback: {
              rating: 0,
              comments: ''
            }
          }
        ]
      }
    }));
  };

  const handleSelectPlan = (plan: typeof supportPlans[number]) => {
    setData(prev => ({
      ...prev,
      support: {
        ...prev.support,
        currentPlan: {
          type: plan.type as 'monthly' | 'hourly' | 'community',
          active: true,
          startDate: new Date().toISOString(),
          features: plan.features.map(f => ({ ...f })),
          pricing: { ...plan.pricing }
        }
      },
      progress: {
        ...prev.progress,
        supportPlanSelected: true
      }
    }));
  };

  const handleCompleteSession = (sessionId: string) => {
    setData(prev => ({
      ...prev,
      coaching: {
        ...prev.coaching,
        sessions: prev.coaching.sessions.map(session =>
          session.id === sessionId
            ? { ...session, completed: true }
            : session
        )
      }
    }));
  };

  const handleUpdateTutorial = (tutorialId: string, updates: Partial<VideoTutorial>) => {
    setData(prev => ({
      ...prev,
      tutorials: {
        ...prev.tutorials,
        library: prev.tutorials.library.map(tutorial =>
          tutorial.id === tutorialId
            ? { ...tutorial, ...updates }
            : tutorial
        )
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
        {error}
      </div>
    )
  }

  if (!data) return null

  const progress = Math.round((data.progress.completedTasks / data.progress.totalTasks) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#E2E8F0]">
          Pillar 6: Empowerment Through Training
        </h1>
        <p className="text-[#94A3B8]">
          Master your website management skills with our comprehensive training program.
          By the end, you'll confidently handle day-to-day tasks and know exactly where
          to find help when needed.
        </p>
        
        {/* Progress Tracking */}
        <div className="bg-[#1E293B] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-[#E2E8F0]">Your Progress</h2>
            <span className="text-[#94A3B8]">{progress}% Complete</span>
          </div>
          <ProgressBar progress={progress} />
          
          {/* Phase Navigation */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {['tutorials', 'coaching', 'support', 'completion'].map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase as Phase)}
                className={`p-4 rounded-lg flex flex-col items-center space-y-2 ${
                  activePhase === phase
                    ? 'bg-[#5865F2] text-white'
                    : 'bg-[#2D3748] text-[#94A3B8] hover:bg-[#374151]'
                }`}
              >
                {phase === 'tutorials' && <FaBook className="text-2xl" />}
                {phase === 'coaching' && <FaCalendar className="text-2xl" />}
                {phase === 'support' && <FaBook className="text-2xl" />}
                {phase === 'completion' && <FaTrophy className="text-2xl" />}
                <span className="text-sm font-medium capitalize">
                  {phase}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Introduction */}
      <div className="bg-[#1E293B] rounded-lg p-6">
        <h2 className="text-xl font-medium text-[#E2E8F0] mb-4">
          Introduction & Objectives
        </h2>
        <div className="space-y-4 text-[#94A3B8]">
          <p>
            Welcome to the final pillar of your website journey! Here, you'll gain
            the confidence and skills needed to maintain and update your site
            independently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#2D3748] p-4 rounded-lg">
              <h3 className="text-[#E2E8F0] font-medium mb-2">Key Outcomes</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Master day-to-day site management</li>
                <li>Learn content updates and small tweaks</li>
                <li>Understand basic troubleshooting</li>
                <li>Know where to find help when needed</li>
              </ul>
            </div>
            <div className="bg-[#2D3748] p-4 rounded-lg">
              <h3 className="text-[#E2E8F0] font-medium mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Reduced dependency on developers</li>
                <li>Faster content updates</li>
                <li>Cost-effective maintenance</li>
                <li>Greater site control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorials Phase */}
      {activePhase === 'tutorials' && (
        <div className="space-y-6">
          {/* Tutorial Library */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Video Tutorial Library
              </h3>
              <Tooltip text={tooltips.tutorials.library} />
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-4 mb-6 overflow-x-auto">
              {tutorialCategories.map((category) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    data.tutorials.library.some(t => t.category === category.name && t.watched)
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-[#2D3748] text-[#94A3B8] hover:bg-[#374151]'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Tutorial List */}
            <div className="space-y-4">
              {data.tutorials.library.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-[#2D3748] p-4 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-[#E2E8F0] font-medium flex items-center">
                        {tutorial.watched && (
                          <FaCheck className="text-green-400 mr-2" />
                        )}
                        {tutorial.title}
                      </h4>
                      <p className="text-sm text-[#94A3B8] mt-1">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-[#94A3B8] flex items-center">
                          <FaClock className="mr-1" />
                          {Math.floor(tutorial.duration / 60)}:{(tutorial.duration % 60)
                            .toString()
                            .padStart(2, '0')}
                        </span>
                        <div className="flex items-center space-x-2">
                          {tutorial.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-[#1E293B] text-[#94A3B8] px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Handle video playback
                        const updatedLibrary = data.tutorials.library.map(t =>
                          t.id === tutorial.id ? { ...t, watched: true } : t
                        )
                        setData(prev => prev ? {
                          ...prev,
                          tutorials: {
                            ...prev.tutorials,
                            library: updatedLibrary
                          },
                          progress: {
                            ...prev.progress,
                            tutorialsWatched: updatedLibrary.filter(t => t.watched).length
                          }
                        } : null)
                      }}
                      className="ml-4 p-2 rounded-full bg-[#5865F2] text-white hover:bg-[#4752C4]"
                    >
                      <FaBook />
                    </button>
                  </div>
                  
                  {tutorial.watched && (
                    <div className="mt-4">
                      <textarea
                        placeholder="Add notes about this tutorial..."
                        value={tutorial.notes}
                        onChange={(e) => {
                          const updatedLibrary = data.tutorials.library.map(t =>
                            t.id === tutorial.id ? { ...t, notes: e.target.value } : t
                          )
                          setData(prev => prev ? {
                            ...prev,
                            tutorials: {
                              ...prev.tutorials,
                              library: updatedLibrary
                            }
                          } : null)
                        }}
                        className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded p-2 text-sm"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tutorial Settings */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Playback Preferences
              </h3>
              <Tooltip text={tooltips.tutorials.preferences} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between bg-[#2D3748] p-4 rounded-lg">
                <span className="text-[#94A3B8]">Autoplay</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.tutorials.preferences.autoplay}
                    onChange={(e) => setData(prev => prev ? {
                      ...prev,
                      tutorials: {
                        ...prev.tutorials,
                        preferences: {
                          ...prev.tutorials.preferences,
                          autoplay: e.target.checked
                        }
                      }
                    } : null)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#1A1F2E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865F2]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between bg-[#2D3748] p-4 rounded-lg">
                <span className="text-[#94A3B8]">Playback Speed</span>
                <select
                  value={data.tutorials.preferences.playbackSpeed}
                  onChange={(e) => setData(prev => prev ? {
                    ...prev,
                    tutorials: {
                      ...prev.tutorials,
                      preferences: {
                        ...prev.tutorials.preferences,
                        playbackSpeed: parseFloat(e.target.value)
                      }
                    }
                  } : null)}
                  className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>

              <div className="flex items-center justify-between bg-[#2D3748] p-4 rounded-lg">
                <span className="text-[#94A3B8]">Closed Captions</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.tutorials.preferences.closedCaptions}
                    onChange={(e) => setData(prev => prev ? {
                      ...prev,
                      tutorials: {
                        ...prev.tutorials,
                        preferences: {
                          ...prev.tutorials.preferences,
                          closedCaptions: e.target.checked
                        }
                      }
                    } : null)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#1A1F2E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865F2]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coaching Phase */}
      {activePhase === 'coaching' && (
        <div className="space-y-6">
          {/* Coaching Sessions */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                1:1 Coaching Sessions
              </h3>
              <Tooltip text={tooltips.coaching.sessions} />
            </div>

            {/* Session Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#2D3748] p-4 rounded-lg">
                <h4 className="text-[#E2E8F0] font-medium mb-4">Schedule Preferences</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">
                      Preferred Day
                    </label>
                    <select
                      value={data.coaching.preferences.preferredDay}
                      onChange={(e) => setData(prev => prev ? {
                        ...prev,
                        coaching: {
                          ...prev.coaching,
                          preferences: {
                            ...prev.coaching.preferences,
                            preferredDay: e.target.value
                          }
                        }
                      } : null)}
                      className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded px-3 py-2"
                    >
                      <option value="">Select a day</option>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={data.coaching.preferences.preferredTime}
                      onChange={(e) => setData(prev => prev ? {
                        ...prev,
                        coaching: {
                          ...prev.coaching,
                          preferences: {
                            ...prev.coaching.preferences,
                            preferredTime: e.target.value
                          }
                        }
                      } : null)}
                      className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded px-3 py-2"
                    >
                      <option value="">Select a time</option>
                      {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                        <option key={hour} value={`${hour}:00`}>{hour}:00</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">
                      Session Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['video', 'audio', 'chat'].map(format => (
                        <button
                          key={format}
                          onClick={() => setData(prev => prev ? {
                            ...prev,
                            coaching: {
                              ...prev.coaching,
                              preferences: {
                                ...prev.coaching.preferences,
                                format: format as 'video' | 'audio' | 'chat'
                              }
                            }
                          } : null)}
                          className={`px-3 py-2 rounded-lg capitalize ${
                            data.coaching.preferences.format === format
                              ? 'bg-[#5865F2] text-white'
                              : 'bg-[#1A1F2E] text-[#94A3B8] hover:bg-[#374151]'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2D3748] p-4 rounded-lg">
                <h4 className="text-[#E2E8F0] font-medium mb-4">Session Notes</h4>
                <textarea
                  value={data.coaching.notes}
                  onChange={(e) => setData(prev => prev ? {
                    ...prev,
                    coaching: {
                      ...prev.coaching,
                      notes: e.target.value
                    }
                  } : null)}
                  placeholder="Add any notes or topics you'd like to discuss..."
                  className="w-full h-[200px] bg-[#1A1F2E] text-[#E2E8F0] rounded p-3"
                />
              </div>
            </div>

            {/* Scheduled Sessions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[#E2E8F0] font-medium">Scheduled Sessions</h4>
                <button
                  onClick={() => handleAddSession()}
                  className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                >
                  + Schedule New Session
                </button>
              </div>

              {data.coaching.sessions.map((session) => (
                <div key={session.id} className="bg-[#2D3748] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="text-[#E2E8F0] font-medium">
                        Coaching Session
                      </h5>
                      <p className="text-sm text-[#94A3B8]">
                        {new Date(session.scheduledDate).toLocaleDateString()} at{' '}
                        {new Date(session.scheduledDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {session.completed ? (
                        <span className="text-green-400 text-sm flex items-center">
                          <FaCheck className="mr-1" />
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleCompleteSession(session.id)}
                          className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <h6 className="text-sm font-medium text-[#E2E8F0] mb-2">Topics</h6>
                    <div className="space-y-2">
                      {session.topics.map((topic, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={topic.completed}
                            onChange={(e) => {
                              const updatedSessions = data.coaching.sessions.map(s =>
                                s.id === session.id ? {
                                  ...s,
                                  topics: s.topics.map((t, i) =>
                                    i === index ? { ...t, completed: e.target.checked } : t
                                  )
                                } : s
                              )
                              setData(prev => prev ? {
                                ...prev,
                                coaching: {
                                  ...prev.coaching,
                                  sessions: updatedSessions
                                }
                              } : null)
                            }}
                            className="rounded border-[#4B5563] text-[#5865F2] focus:ring-[#5865F2]"
                          />
                          <input
                            type="text"
                            value={topic.title}
                            onChange={(e) => {
                              const updatedSessions = data.coaching.sessions.map(s =>
                                s.id === session.id ? {
                                  ...s,
                                  topics: s.topics.map((t, i) =>
                                    i === index ? { ...t, title: e.target.value } : t
                                  )
                                } : s
                              )
                              setData(prev => prev ? {
                                ...prev,
                                coaching: {
                                  ...prev.coaching,
                                  sessions: updatedSessions
                                }
                              } : null)
                            }}
                            placeholder="Topic title..."
                            className="flex-1 bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1 text-sm"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updatedSessions = data.coaching.sessions.map(s =>
                            s.id === session.id ? {
                              ...s,
                              topics: [
                                ...s.topics,
                                { title: '', completed: false, notes: '' }
                              ]
                            } : s
                          )
                          setData(prev => prev ? {
                            ...prev,
                            coaching: {
                              ...prev.coaching,
                              sessions: updatedSessions
                            }
                          } : null)
                        }}
                        className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                      >
                        + Add Topic
                      </button>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="mb-4">
                    <h6 className="text-sm font-medium text-[#E2E8F0] mb-2">Action Items</h6>
                    <div className="space-y-2">
                      {session.actionItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              const updatedSessions = data.coaching.sessions.map(s =>
                                s.id === session.id ? {
                                  ...s,
                                  actionItems: s.actionItems.map((a, i) =>
                                    i === index ? { ...a, completed: e.target.checked } : a
                                  )
                                } : s
                              )
                              setData(prev => prev ? {
                                ...prev,
                                coaching: {
                                  ...prev.coaching,
                                  sessions: updatedSessions
                                }
                              } : null)
                            }}
                            className="rounded border-[#4B5563] text-[#5865F2] focus:ring-[#5865F2]"
                          />
                          <input
                            type="text"
                            value={item.task}
                            onChange={(e) => {
                              const updatedSessions = data.coaching.sessions.map(s =>
                                s.id === session.id ? {
                                  ...s,
                                  actionItems: s.actionItems.map((a, i) =>
                                    i === index ? { ...a, task: e.target.value } : a
                                  )
                                } : s
                              )
                              setData(prev => prev ? {
                                ...prev,
                                coaching: {
                                  ...prev.coaching,
                                  sessions: updatedSessions
                                }
                              } : null)
                            }}
                            placeholder="Action item..."
                            className="flex-1 bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1 text-sm"
                          />
                          <input
                            type="date"
                            value={item.dueDate.split('T')[0]}
                            onChange={(e) => {
                              const updatedSessions = data.coaching.sessions.map(s =>
                                s.id === session.id ? {
                                  ...s,
                                  actionItems: s.actionItems.map((a, i) =>
                                    i === index ? { ...a, dueDate: new Date(e.target.value).toISOString() } : a
                                  )
                                } : s
                              )
                              setData(prev => prev ? {
                                ...prev,
                                coaching: {
                                  ...prev.coaching,
                                  sessions: updatedSessions
                                }
                              } : null)
                            }}
                            className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1 text-sm"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updatedSessions = data.coaching.sessions.map(s =>
                            s.id === session.id ? {
                              ...s,
                              actionItems: [
                                ...s.actionItems,
                                {
                                  task: '',
                                  completed: false,
                                  dueDate: new Date().toISOString()
                                }
                              ]
                            } : s
                          )
                          setData(prev => prev ? {
                            ...prev,
                            coaching: {
                              ...prev.coaching,
                              sessions: updatedSessions
                            }
                          } : null)
                        }}
                        className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                      >
                        + Add Action Item
                      </button>
                    </div>
                  </div>

                  {/* Session Feedback */}
                  {session.completed && (
                    <div>
                      <h6 className="text-sm font-medium text-[#E2E8F0] mb-2">Feedback</h6>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 mb-4">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => {
                                const updatedSessions = data.coaching.sessions.map(s =>
                                  s.id === session.id ? {
                                    ...s,
                                    feedback: {
                                      ...s.feedback,
                                      rating
                                    }
                                  } : s
                                )
                                setData(prev => prev ? {
                                  ...prev,
                                  coaching: {
                                    ...prev.coaching,
                                    sessions: updatedSessions
                                  }
                                } : null)
                              }}
                              className={`w-8 h-8 rounded-full ${
                                session.feedback.rating >= rating
                                  ? 'bg-[#5865F2] text-white'
                                  : 'bg-[#1A1F2E] text-[#94A3B8]'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={session.feedback.comments}
                          onChange={(e) => {
                            const updatedSessions = data.coaching.sessions.map(s =>
                              s.id === session.id ? {
                                ...s,
                                feedback: {
                                  ...s.feedback,
                                  comments: e.target.value
                                }
                              } : s
                            )
                            setData(prev => prev ? {
                              ...prev,
                              coaching: {
                                ...prev.coaching,
                                sessions: updatedSessions
                              }
                            } : null)
                          }}
                          placeholder="Share your feedback about this session..."
                          className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded p-2 text-sm"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support Phase */}
      {activePhase === 'support' && (
        <div className="space-y-6">
          {/* Support Plans */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Ongoing Support Plans
              </h3>
              <Tooltip text={tooltips.support.plans} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportPlans.map((plan) => (
                <div
                  key={plan.type}
                  className={`bg-[#2D3748] p-6 rounded-lg border-2 ${
                    data.support.currentPlan?.type === plan.type
                      ? 'border-[#5865F2]'
                      : 'border-transparent'
                  }`}
                >
                  <h4 className="text-[#E2E8F0] font-medium mb-2">{plan.title}</h4>
                  <p className="text-sm text-[#94A3B8] mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#E2E8F0]">
                      ${plan.pricing.amount}
                    </span>
                    <span className="text-[#94A3B8] text-sm">
                      /{plan.pricing.interval}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-[#94A3B8]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-2 rounded-lg ${
                      data.support.currentPlan?.type === plan.type
                        ? 'bg-[#5865F2] text-white hover:bg-[#4752C4]'
                        : 'bg-[#1A1F2E] text-[#94A3B8] hover:bg-[#374151]'
                    }`}
                  >
                    {data.support.currentPlan?.type === plan.type ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Knowledge Base
              </h3>
              <Tooltip text={tooltips.support.knowledge} />
            </div>

            <div className="space-y-4">
              {data.support.knowledgeBase.articles.map((article) => (
                <div key={article.id} className="bg-[#2D3748] p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[#E2E8F0] font-medium">{article.title}</h4>
                      <p className="text-sm text-[#94A3B8] mt-1">{article.content}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-[#1A1F2E] text-[#94A3B8] px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const isFavorite = data.support.knowledgeBase.favorites.includes(article.id)
                        setData(prev => prev ? {
                          ...prev,
                          support: {
                            ...prev.support,
                            knowledgeBase: {
                              ...prev.support.knowledgeBase,
                              favorites: isFavorite
                                ? prev.support.knowledgeBase.favorites.filter(id => id !== article.id)
                                : [...prev.support.knowledgeBase.favorites, article.id]
                            }
                          }
                        } : null)
                      }}
                      className={`ml-4 p-2 rounded-full ${
                        data.support.knowledgeBase.favorites.includes(article.id)
                          ? 'text-yellow-400'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      <FaBook />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support History */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Support History
              </h3>
              <button
                onClick={() => setData(prev => prev ? {
                  ...prev,
                  support: {
                    ...prev.support,
                    history: [
                      ...prev.support.history,
                      {
                        type: '',
                        date: new Date().toISOString(),
                        description: '',
                        resolved: false
                      }
                    ]
                  }
                } : null)}
                className="text-sm text-[#5865F2] hover:text-[#4752C4]"
              >
                + Add Entry
              </button>
            </div>

            <div className="space-y-4">
              {data.support.history.map((entry, index) => (
                <div key={index} className="bg-[#2D3748] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <span className="text-[#E2E8F0] font-medium">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <input
                        type="text"
                        value={entry.type}
                        onChange={(e) => {
                          const updatedHistory = data.support.history.map((h, i) =>
                            i === index ? { ...h, type: e.target.value } : h
                          )
                          setData(prev => prev ? {
                            ...prev,
                            support: {
                              ...prev.support,
                              history: updatedHistory
                            }
                          } : null)
                        }}
                        placeholder="Type..."
                        className="bg-[#1A1F2E] text-[#E2E8F0] rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm ${
                          entry.resolved ? 'text-green-400' : 'text-yellow-400'
                        }`}
                      >
                        {entry.resolved ? 'Resolved' : 'Pending'}
                      </span>
                      <button
                        onClick={() => {
                          const updatedHistory = data.support.history.map((h, i) =>
                            i === index ? { ...h, resolved: !h.resolved } : h
                          )
                          setData(prev => prev ? {
                            ...prev,
                            support: {
                              ...prev.support,
                              history: updatedHistory
                            }
                          } : null)
                        }}
                        className="text-sm text-[#5865F2] hover:text-[#4752C4]"
                      >
                        Toggle Status
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={entry.description}
                    onChange={(e) => {
                      const updatedHistory = data.support.history.map((h, i) =>
                        i === index ? { ...h, description: e.target.value } : h
                      )
                      setData(prev => prev ? {
                        ...prev,
                        support: {
                          ...prev.support,
                          history: updatedHistory
                        }
                      } : null)
                    }}
                    placeholder="Description..."
                    className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded p-2 text-sm mt-2"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Completion Phase */}
      {activePhase === 'completion' && (
        <div className="space-y-6">
          {/* Milestones */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Your Achievements
              </h3>
              <Tooltip text={tooltips.milestones.tracking} />
            </div>

            <div className="space-y-4">
              {data.milestones.achieved.map((milestone) => (
                <div key={milestone.id} className="bg-[#2D3748] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#E2E8F0] font-medium flex items-center">
                      <FaTrophy className="text-yellow-400 mr-2" />
                      {milestone.title}
                    </h4>
                    <span className="text-[#94A3B8] text-sm">
                      {new Date(milestone.achievedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8] mb-4">{milestone.description}</p>
                  {milestone.metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {milestone.metrics.map((metric, index) => (
                        <div key={index} className="bg-[#1A1F2E] p-3 rounded">
                          <div className="text-[#94A3B8] text-xs mb-1">{metric.name}</div>
                          <div className="text-[#E2E8F0] font-medium">
                            {metric.value} {metric.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Share Your Experience
              </h3>
              <Tooltip text={tooltips.milestones.celebration} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setData(prev => prev ? {
                      ...prev,
                      feedback: {
                        ...prev.feedback,
                        testimonial: {
                          ...prev.feedback.testimonial,
                          rating
                        }
                      }
                    } : null)}
                    className={`w-10 h-10 rounded-full ${
                      data.feedback.testimonial?.rating >= rating
                        ? 'bg-[#5865F2] text-white'
                        : 'bg-[#1A1F2E] text-[#94A3B8]'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>

              <textarea
                value={data.feedback.testimonial?.content}
                onChange={(e) => setData(prev => prev ? {
                  ...prev,
                  feedback: {
                    ...prev.feedback,
                    testimonial: {
                      ...prev.feedback.testimonial,
                      content: e.target.value
                    }
                  }
                } : null)}
                placeholder="Share your journey and success story..."
                className="w-full bg-[#1A1F2E] text-[#E2E8F0] rounded p-3"
                rows={4}
              />

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-sm text-[#94A3B8]">
                  <input
                    type="checkbox"
                    checked={data.feedback.testimonial?.permission}
                    onChange={(e) => setData(prev => prev ? {
                      ...prev,
                      feedback: {
                        ...prev.feedback,
                        testimonial: {
                          ...prev.feedback.testimonial,
                          permission: e.target.checked
                        }
                      }
                    } : null)}
                    className="rounded border-[#4B5563] text-[#5865F2] focus:ring-[#5865F2]"
                  />
                  <span>I allow my testimonial to be shared</span>
                </label>

                <label className="flex items-center space-x-2 text-sm text-[#94A3B8]">
                  <input
                    type="checkbox"
                    checked={data.feedback.testimonial?.public}
                    onChange={(e) => setData(prev => prev ? {
                      ...prev,
                      feedback: {
                        ...prev.feedback,
                        testimonial: {
                          ...prev.feedback.testimonial,
                          public: e.target.checked
                        }
                      }
                    } : null)}
                    className="rounded border-[#4B5563] text-[#5865F2] focus:ring-[#5865F2]"
                  />
                  <span>Make my testimonial public</span>
                </label>
              </div>
            </div>
          </div>

          {/* Graduation */}
          <div className="bg-[#1E293B] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#E2E8F0]">
                Complete Your Journey
              </h3>
              <button
                onClick={() => setData(prev => prev ? {
                  ...prev,
                  progress: {
                    ...prev.progress,
                    graduated: true
                  }
                } : null)}
                className={`px-6 py-2 rounded-lg ${
                  data.progress.graduated
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-[#5865F2] text-white hover:bg-[#4752C4]'
                }`}
                disabled={data.progress.graduated}
              >
                {data.progress.graduated ? (
                  <span className="flex items-center">
                    <FaCheck className="mr-2" />
                    Graduated
                  </span>
                ) : (
                  'Graduate Now'
                )}
              </button>
            </div>

            {data.progress.graduated && (
              <div className="bg-green-500/10 text-green-400 p-4 rounded-lg">
                <p className="text-lg font-medium mb-2">
                  🎉 Congratulations on completing your website journey!
                </p>
                <p>
                  You've mastered the essentials of website management and are now
                  equipped to maintain and grow your online presence independently.
                  Remember, we're always here if you need additional support!
                </p>
              </div>
            )}
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
export default Pillar6Content