import { Pillar6Data } from '@/types/pillar6';

export const mockPillar6Data: Pillar6Data = {
  user_id: 'mock-user-id',
  progress: {
    completedTasks: 8,
    totalTasks: 15,
    currentPhase: 'coaching',
    tutorialsWatched: 5,
    coachingCompleted: false,
    supportPlanSelected: true,
    graduated: false
  },
  tutorials: {
    library: [
      {
        id: '1',
        title: 'Getting Started with Your Website',
        description: 'Learn the basics of managing your new website',
        url: 'https://example.com/tutorials/getting-started',
        category: 'basics',
        duration: 1200, // 20 minutes
        tags: ['beginner', 'setup', 'overview'] as const,
        watched: true,
        notes: 'Remember to set up SSL certificate'
      },
      {
        id: '2',
        title: 'Content Strategy Masterclass',
        description: 'Create engaging content that converts',
        url: 'https://example.com/tutorials/content-strategy',
        category: 'content',
        duration: 2400, // 40 minutes
        tags: ['content', 'seo', 'writing'] as const,
        watched: true,
        notes: 'Content calendar template looks useful'
      },
      {
        id: '3',
        title: 'Advanced Design Principles',
        description: 'Take your website design to the next level',
        url: 'https://example.com/tutorials/design-principles',
        category: 'design',
        duration: 1800, // 30 minutes
        tags: ['design', 'ui/ux', 'branding'] as const,
        watched: false,
        notes: ''
      }
    ],
    watchHistory: [
      {
        tutorialId: '1',
        watchedDate: '2025-01-15T14:30:00Z',
        completed: true
      },
      {
        tutorialId: '2',
        watchedDate: '2025-01-16T10:15:00Z',
        completed: true
      }
    ],
    preferences: {
      autoplay: true,
      playbackSpeed: 1.25,
      closedCaptions: true
    }
  },
  coaching: {
    sessions: [
      {
        id: '1',
        date: '2025-01-10T15:00:00Z',
        scheduledDate: '2025-01-10T15:00:00Z',
        completed: true,
        notes: 'Focused on content strategy and SEO optimization',
        topics: [
          {
            title: 'Content Calendar Setup',
            completed: true,
            notes: 'Created 3-month content plan'
          },
          {
            title: 'SEO Best Practices',
            completed: true,
            notes: 'Implemented key meta tags'
          }
        ],
        actionItems: [
          {
            task: 'Create editorial calendar',
            completed: true,
            dueDate: '2025-01-17T00:00:00Z'
          },
          {
            task: 'Optimize meta descriptions',
            completed: false,
            dueDate: '2025-01-20T00:00:00Z'
          }
        ],
        feedback: {
          rating: 4.5,
          comments: 'Very helpful session, clear action items'
        }
      }
    ],
    preferences: {
      preferredDay: 'Wednesday',
      preferredTime: '15:00',
      timezone: 'America/New_York',
      format: 'video'
    },
    notes: 'Focus areas: SEO, content strategy, and conversion optimization'
  },
  support: {
    currentPlan: {
      type: 'monthly',
      active: true,
      startDate: '2025-01-01T00:00:00Z',
      features: [
        {
          name: 'Priority Support',
          included: true,
          details: '24/7 email support with 4-hour response time'
        },
        {
          name: 'Monthly Strategy Call',
          included: true,
          details: '60-minute consultation with expert'
        }
      ],
      // name: 'Professional Plan',
      // included: true,
      // details: 'Full access to all features',
      pricing: {
        amount: 99,
        interval: 'month',
        currency: 'USD'
      },
      // amount: 99,
      // interval: 'month',
      // currency: 'USD'
    },
    history: [
      {
        type: 'upgrade',
        date: '2025-01-01T00:00:00Z',
        description: 'Upgraded to Professional Plan',
        resolved: true
      }
    ],
    knowledgeBase: {
      articles: [
        {
          id: '1',
          title: 'Optimizing Your Website Speed',
          content: 'Learn how to improve your website loading times...',
          tags: ['performance', 'optimization'],
          lastUpdated: '2025-01-15T00:00:00Z'
        },
        {
          id: '2',
          title: 'SEO Best Practices 2025',
          content: 'Stay ahead with the latest SEO strategies...',
          tags: ['seo', 'marketing'],
          lastUpdated: '2025-01-16T00:00:00Z'
        }
      ],
      favorites: ['1']
    }
  },
  milestones: {
    achieved: [
      {
        id: '1',
        title: 'First Blog Post',
        description: 'Published your first blog post',
        achievedDate: '2025-01-05T00:00:00Z',
        metrics: [
          {
            name: 'Views',
            value: 100,
            unit: 'views'
          }
        ]
      }
    ],
    upcoming: [
      {
        id: '2',
        title: '1000 Visitors',
        description: 'Reach 1000 monthly visitors',
        targetDate: '2025-02-01T00:00:00Z',
        metrics: [
          {
            name: 'Current Visitors',
            value: 750,
            unit: 'visitors'
          }
        ]
      }
    ]
  },
  feedback: {
    testimonial: {
      id: '1',
      content: 'The coaching and support have been invaluable in growing my online presence.',
      rating: 5,
      date: '2025-01-15T00:00:00Z',
      permission: true,
      public: true
    },
    nps: 9,
    suggestions: [
      'Add more advanced SEO tutorials',
      'Include case studies in coaching sessions'
    ]
  },
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-16T00:00:00Z'
};
