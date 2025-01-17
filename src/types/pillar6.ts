// Database types (mutable)
export interface VideoTutorialDB {
  id: string
  title: string
  description: string
  url: string
  category: 'basics' | 'content' | 'design' | 'marketing' | 'troubleshooting'
  duration: number
  tags: string[]
  watched: boolean
  notes: string
}

// UI types (mutable)
export interface VideoTutorial extends Omit<VideoTutorialDB, 'tags'> {
  tags: readonly string[]
}

export interface CoachingSessionDB {
  id: string
  date: string
  scheduledDate: string
  completed: boolean
  notes: string
  topics: {
    title: string
    completed: boolean
    notes: string
  }[]
  actionItems: {
    task: string
    completed: boolean
    dueDate: string
  }[]
  feedback: {
    rating: number
    comments: string
  }
}

export interface CoachingSession {
  id: string
  date: string
  scheduledDate: string
  completed: boolean
  notes: string
  topics: {
    title: string
    completed: boolean
    notes: string
  }[]
  actionItems: {
    task: string
    completed: boolean
    dueDate: string
  }[]
  feedback: {
    rating: number
    comments: string
  }
}

export interface SupportPlanDB {
  type: 'monthly' | 'hourly' | 'community'
  active: boolean
  startDate: string
  endDate?: string
  features: {
    name: string
    included: boolean
    details: string
  }[]
  pricing: {
    amount: number
    interval: 'month' | 'hour' | 'year'
    currency: string
  }
}

export interface SupportPlan {
  type: 'monthly' | 'hourly' | 'community'
  active: boolean
  startDate: string
  features: {
    name: string
    included: boolean
    details: string
  }[]
  pricing: {
    amount: number
    interval: string
    currency: string
  }
}

export interface KnowledgeBaseArticleDB {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  lastUpdated: string
  helpful: boolean
}

export interface KnowledgeBaseArticle {
  id: string
  title: string
  content: string
  tags: string[]
  lastUpdated: string
}

export interface UserMilestoneDB {
  id: string
  title: string
  description: string
  achievedDate: string
  type: 'feature' | 'traffic' | 'engagement' | 'revenue' | 'other'
  metrics?: {
    name: string
    value: string
    unit: string
  }[]
}

export interface UserMilestone {
  id: string
  title: string
  description: string
  achievedDate: string
  metrics?: {
    name: string
    value: string
    unit: string
  }[]
}

export interface TestimonialDB {
  id: string
  content: string
  rating: number
  date: string
  permission: boolean
  public: boolean
}

export interface Testimonial {
  id: string
  content: string
  rating: number
  date: string
  permission: boolean
  public: boolean
}

// DB type with snake_case fields
export interface Pillar6DataDB {
  user_id: string
  progress: {
    completedTasks: number
    totalTasks: number
    currentPhase: 'tutorials' | 'coaching' | 'support' | 'completion'
    tutorialsWatched: number
    coachingCompleted: boolean
    supportPlanSelected: boolean
    graduated: boolean
  }
  tutorials: {
    library: VideoTutorialDB[]
    watchHistory: {
      tutorialId: string
      watchedDate: string
      completed: boolean
    }[]
    preferences: {
      autoplay: boolean
      playbackSpeed: number
      closedCaptions: boolean
    }
  }
  coaching: {
    sessions: CoachingSessionDB[]
    preferences: {
      preferredDay: string
      preferredTime: string
      timezone: string
      format: 'video' | 'audio' | 'chat'
    }
    notes: string
  }
  support: {
    currentPlan: {
      type: 'monthly' | 'hourly' | 'community'
      active: boolean
      startDate: string
      features: {
        name: string
        included: boolean
        details: string
      }[]
      pricing: {
        amount: number
        interval: string
        currency: string
      }
    }
    history: {
      type: string
      date: string
      description: string
      resolved: boolean
    }[]
    knowledgeBase: {
      articles: {
        id: string
        title: string
        content: string
        tags: string[]
      }[]
      favorites: string[]
    }
  }
  milestones: {
    achieved: {
      id: string
      title: string
      description: string
      achievedDate: string
      metrics?: {
        name: string
        value: number
        unit: string
      }[]
    }[]
    upcoming: {
      title: string
      description: string
      targetDate: string
    }[]
  }
  feedback: {
    testimonial: {
      id: string
      content: string
      rating: number
      date: string
      permission: boolean
      public: boolean
    } | null
    nps: number | null
    suggestions: string[]
  }
  created_at: string
  updated_at: string
}

// UI type with camelCase fields
export interface Pillar6Data {
  userId: string
  progress: {
    completedTasks: number
    totalTasks: number
    currentPhase: 'tutorials' | 'coaching' | 'support' | 'completion'
    tutorialsWatched: number
    coachingCompleted: boolean
    supportPlanSelected: boolean
    graduated: boolean
  }
  tutorials: {
    library: VideoTutorial[]
    watchHistory: {
      tutorialId: string
      watchedDate: string
      completed: boolean
    }[]
    preferences: {
      autoplay: boolean
      playbackSpeed: number
      closedCaptions: boolean
    }
  }
  coaching: {
    sessions: CoachingSession[]
    preferences: {
      preferredDay: string
      preferredTime: string
      timezone: string
      format: 'video' | 'audio' | 'chat'
    }
    notes: string
  }
  support: {
    currentPlan: {
      type: 'monthly' | 'hourly' | 'community'
      active: boolean
      startDate: string
      features: {
        name: string
        included: boolean
        details: string
      }[]
      pricing: {
        amount: number
        interval: string
        currency: string
      }
    }
    history: {
      type: string
      date: string
      description: string
      resolved: boolean
    }[]
    knowledgeBase: {
      articles: {
        id: string
        title: string
        content: string
        tags: string[]
      }[]
      favorites: string[]
    }
  }
  milestones: {
    achieved: {
      id: string
      title: string
      description: string
      achievedDate: string
      metrics?: {
        name: string
        value: number
        unit: string
      }[]
    }[]
    upcoming: {
      title: string
      description: string
      targetDate: string
    }[]
  }
  feedback: {
    testimonial: {
      id: string
      content: string
      rating: number
      date: string
      permission: boolean
      public: boolean
    } | null
    nps: number | null
    suggestions: string[]
  }
  createdAt: string
  updatedAt: string
}
