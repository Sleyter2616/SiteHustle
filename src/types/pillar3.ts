export interface PageSection {
  id: string
  title: string
  completed: boolean
  required: boolean
}

export interface PageTemplate {
  id: string
  title: string
  sections: PageSection[]
  completed: boolean
  required: boolean
}

export interface UsabilityTest {
  id: string
  category: 'navigation' | 'forms' | 'layout' | 'cta' | 'performance'
  title: string
  description: string
  completed: boolean
}

export interface SetupTask {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
}

export interface Pillar3Data {
  userId: string
  selectedPlatform: string
  progress: {
    completedTasks: number
    totalTasks: number
    currentPhase: 'setup' | 'pages' | 'testing' | 'refinement'
    setupCompleted: boolean
    pagesCompleted: boolean
    testingCompleted: boolean
    refinementCompleted: boolean
  }
  setup: {
    tasks: SetupTask[]
    projectUrl?: string
    globalStyles: {
      font?: string
      primaryColor?: string
      secondaryColor?: string
    }
  }
  pages: {
    templates: PageTemplate[]
    navigation: {
      menuItems: string[]
      footerLinks: string[]
    }
  }
  testing: {
    tests: UsabilityTest[]
    feedback: {
      [key: string]: string
    }
  }
  customDomain?: {
    domain: string
    connected: boolean
  }
  createdAt: string
  updatedAt: string
}
