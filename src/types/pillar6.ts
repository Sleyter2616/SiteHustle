// DB types (snake_case)
export interface VideoTutorialDB {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'basics' | 'content' | 'design' | 'marketing' | 'troubleshooting';
  duration: number;
  tags: string[];
  watched: boolean;
  notes: string;
}

export interface VideoTutorial extends Omit<VideoTutorialDB, 'tags'> {
  tags: readonly string[];
}

export interface WatchHistoryItem {
  tutorialId: string;
  watchedDate: string;
  completed: boolean;
}

export interface CoachingSessionDB {
  id: string;
  date: string;
  scheduled_date: string;
  completed: boolean;
  notes: string;
  topics: {
    title: string;
    completed: boolean;
    notes: string;
  }[];
  action_items: {
    task: string;
    completed: boolean;
    due_date: string;
  }[];
  feedback: {
    rating: number;
    comments: string;
  };
}

export interface CoachingSession {
  id: string;
  date: string;
  scheduledDate: string;
  completed: boolean;
  notes: string;
  topics: {
    title: string;
    completed: boolean;
    notes: string;
  }[];
  actionItems: {
    task: string;
    completed: boolean;
    dueDate: string;
  }[];
  feedback: {
    rating: number;
    comments: string;
  };
}

export interface KnowledgeBaseArticleDB {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  last_updated: string;
  helpful: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastUpdated: string;
}

export interface SupportPlanDB {
  type: 'monthly' | 'hourly' | 'community';
  active: boolean;
  start_date: string;
  end_date?: string;
  features: {
    name: string;
    included: boolean;
    details: string;
  }[];
  pricing: {
    amount: number;
    interval: 'month' | 'hour' | 'year';
    currency: string;
  };
}

export interface SupportPlan {
  type: 'monthly' | 'hourly' | 'community';
  active: boolean;
  startDate: string;
  features: {
    name: string;
    included: boolean;
    details: string;
  }[];
  pricing: {
    amount: number;
    interval: string;
    currency: string;
  };
}

export interface SupportPlanHistory {
  type: string;
  date: string;
  description: string;
  resolved: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedDate?: string;
  targetDate?: string;
  metrics?: {
    name: string;
    value: number;
    unit: string;
  }[];
}

export interface UserMilestoneDB {
  id: string;
  title: string;
  description: string;
  achieved_date: string;
  type: 'feature' | 'traffic' | 'engagement' | 'revenue' | 'other';
  metrics?: {
    name: string;
    value: string;
    unit: string;
  }[];
}

export interface UserMilestone {
  id: string;
  title: string;
  description: string;
  achieved_date: string;
  metrics?: {
    name: string;
    value: string;
    unit: string;
  }[];
}

export interface TestimonialDB {
  id: string;
  content: string;
  rating: number;
  date: string;
  permission: boolean;
  public: boolean;
}

export interface Testimonial {
  id: string;
  content: string;
  rating: number;
  date: string;
  permission: boolean;
  public: boolean;
}

// UI type with consistent field names
export interface Pillar6Data {
  user_id: string;
  progress: {
    completedTasks: number;
    totalTasks: number;
    currentPhase: 'tutorials' | 'coaching' | 'support' | 'completion';
    tutorialsWatched: number;
    coachingCompleted: boolean;
    supportPlanSelected: boolean;
    graduated: boolean;
  };
  tutorials: {
    library: VideoTutorial[];
    watchHistory: WatchHistoryItem[];
    preferences: {
      autoplay: boolean;
      playbackSpeed: number;
      closedCaptions: boolean;
    };
  };
  coaching: {
    sessions: CoachingSession[];
    preferences: {
      preferredDay: string;
      preferredTime: string;
      timezone: string;
      format: 'video' | 'audio' | 'chat';
    };
    notes: string;
  };
  support: {
    currentPlan: SupportPlan | null;
    history: SupportPlanHistory[];
    knowledgeBase: {
      articles: KnowledgeBaseArticle[];
      favorites: string[];
    };
  };
  milestones: {
    achieved: Milestone[];
    upcoming: Milestone[];
  };
  feedback: {
    testimonial: Testimonial | null;
    nps: number | null;
    suggestions: string[];
  };
  created_at: string;
  updated_at: string;
}

// DB type with snake_case fields
export interface Pillar6DataDB extends Omit<Pillar6Data, 'tutorials'> {
  tutorials: {
    library: VideoTutorialDB[];
    watchHistory: WatchHistoryItem[];
    preferences: {
      autoplay: boolean;
      playbackSpeed: number;
      closedCaptions: boolean;
    };
  };
}
