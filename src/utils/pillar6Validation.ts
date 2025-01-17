import { z } from 'zod'

export const tutorialCategories = [
  {
    name: 'basics',
    title: 'Site Basics',
    description: 'Essential site management tasks',
    topics: ['Navigation', 'Pages', 'Settings']
  },
  {
    name: 'content',
    title: 'Content Management',
    description: 'Creating and updating content',
    topics: ['Blog Posts', 'Media Library', 'Forms']
  },
  {
    name: 'design',
    title: 'Design & Layout',
    description: 'Visual customization and styling',
    topics: ['Templates', 'Colors', 'Typography']
  },
  {
    name: 'marketing',
    title: 'Marketing Tools',
    description: 'Promotion and analytics',
    topics: ['SEO', 'Social Media', 'Email']
  },
  {
    name: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    topics: ['Error Messages', 'Performance', 'Updates']
  }
] as const

export const tutorialLibrary = [
  {
    id: 'site-navigation',
    title: 'Navigating Your Site Dashboard',
    description: 'Learn the basics of your site\'s admin interface',
    category: 'basics',
    duration: 180,
    tags: ['getting-started', 'dashboard', 'navigation']
  },
  {
    id: 'content-editing',
    title: 'Editing Page Content',
    description: 'How to update text, images, and layout',
    category: 'content',
    duration: 300,
    tags: ['content', 'editing', 'pages']
  },
  {
    id: 'blog-management',
    title: 'Managing Your Blog',
    description: 'Creating and organizing blog posts',
    category: 'content',
    duration: 240,
    tags: ['blog', 'posts', 'categories']
  }
] as const

export const supportPlans = [
  {
    type: 'monthly',
    title: 'Monthly Retainer',
    description: 'Ongoing support and maintenance',
    features: [
      'Priority email support',
      'Monthly check-ins',
      'Minor updates and fixes',
      'Performance monitoring'
    ],
    pricing: {
      amount: 199,
      interval: 'month',
      currency: 'USD'
    }
  },
  {
    type: 'hourly',
    title: 'Hourly Support',
    description: 'Pay-as-you-go assistance',
    features: [
      'Email support',
      'Custom development',
      'Training sessions',
      'Consulting calls'
    ],
    pricing: {
      amount: 150,
      interval: 'hour',
      currency: 'USD'
    }
  },
  {
    type: 'community',
    title: 'Community Access',
    description: 'Join our community of site builders',
    features: [
      'Community forum access',
      'Resource library',
      'Monthly webinars',
      'Peer support'
    ],
    pricing: {
      amount: 49,
      interval: 'month',
      currency: 'USD'
    }
  }
] as const

export const milestoneTypes = [
  {
    type: 'feature',
    title: 'Feature Launch',
    metrics: ['user adoption', 'engagement']
  },
  {
    type: 'traffic',
    title: 'Traffic Achievement',
    metrics: ['visitors', 'page views', 'time on site']
  },
  {
    type: 'engagement',
    title: 'User Engagement',
    metrics: ['comments', 'shares', 'subscriptions']
  },
  {
    type: 'revenue',
    title: 'Revenue Goal',
    metrics: ['sales', 'conversions', 'revenue']
  }
] as const

export const tooltips = {
  tutorials: {
    library: 'Browse and watch video tutorials',
    progress: 'Track your learning progress',
    preferences: 'Customize your learning experience'
  },
  coaching: {
    sessions: 'Schedule and manage coaching calls',
    topics: 'Prepare discussion topics',
    feedback: 'Provide session feedback'
  },
  support: {
    plans: 'Choose your ongoing support plan',
    knowledge: 'Access help articles and guides',
    community: 'Connect with other users'
  },
  milestones: {
    tracking: 'Track your site achievements',
    goals: 'Set future growth targets',
    celebration: 'Celebrate your success'
  }
}

export const pillar6Schema = z.object({
  userId: z.string(),
  progress: z.object({
    completedTasks: z.number(),
    totalTasks: z.number(),
    currentPhase: z.enum(['tutorials', 'coaching', 'support', 'completion']),
    tutorialsWatched: z.number(),
    coachingCompleted: z.boolean(),
    supportPlanSelected: z.boolean(),
    graduated: z.boolean()
  }),
  tutorials: z.object({
    library: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      duration: z.number(),
      category: z.enum(['basics', 'content', 'design', 'marketing', 'troubleshooting']),
      tags: z.array(z.string()),
      watched: z.boolean(),
      notes: z.string()
    })),
    watchHistory: z.array(z.object({
      tutorialId: z.string(),
      watchedDate: z.string(),
      completed: z.boolean()
    })),
    preferences: z.object({
      autoplay: z.boolean(),
      playbackSpeed: z.number(),
      closedCaptions: z.boolean()
    })
  }),
  coaching: z.object({
    sessions: z.array(z.object({
      id: z.string(),
      scheduledDate: z.string(),
      completed: z.boolean(),
      topics: z.array(z.object({
        title: z.string(),
        completed: z.boolean(),
        notes: z.string()
      })),
      actionItems: z.array(z.object({
        task: z.string(),
        completed: z.boolean(),
        dueDate: z.string()
      })),
      feedback: z.object({
        rating: z.number(),
        comments: z.string()
      })
    })),
    preferences: z.object({
      preferredDay: z.string(),
      preferredTime: z.string(),
      timezone: z.string(),
      format: z.enum(['video', 'audio', 'chat'])
    }),
    notes: z.string()
  }),
  support: z.object({
    currentPlan: z.object({
      type: z.enum(['monthly', 'hourly', 'community']),
      active: z.boolean(),
      startDate: z.string(),
      endDate: z.string().optional(),
      features: z.array(z.object({
        name: z.string(),
        included: z.boolean(),
        details: z.string()
      })),
      pricing: z.object({
        amount: z.number(),
        interval: z.enum(['month', 'hour', 'year']),
        currency: z.string()
      })
    }),
    history: z.array(z.object({
      type: z.string(),
      date: z.string(),
      description: z.string(),
      resolved: z.boolean()
    })),
    knowledgeBase: z.object({
      articles: z.array(z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        lastUpdated: z.string(),
        helpful: z.boolean()
      })),
      favorites: z.array(z.string())
    })
  }),
  milestones: z.object({
    achieved: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      achievedDate: z.string(),
      type: z.enum(['feature', 'traffic', 'engagement', 'revenue', 'other']),
      metrics: z.array(z.object({
        name: z.string(),
        value: z.string(),
        unit: z.string()
      })).optional()
    })),
    upcoming: z.array(z.object({
      title: z.string(),
      description: z.string(),
      targetDate: z.string()
    }))
  }),
  feedback: z.object({
    testimonial: z.object({
      id: z.string(),
      content: z.string(),
      rating: z.number(),
      date: z.string(),
      permission: z.boolean(),
      public: z.boolean()
    }),
    nps: z.number(),
    suggestions: z.array(z.string())
  }),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Pillar6Schema = z.infer<typeof pillar6Schema>

export const validatePillar6Data = (data: Pillar6Schema) => {
  const result = pillar6Schema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}
