export interface AIModuleProgress {
  moduleId: string
  completed: boolean
  startedAt?: string
  completedAt?: string
  projectSubmitted: boolean
}

export interface ToolSetupProgress {
  toolId: string
  completed: boolean
  completedSteps: string[]
}

export interface Pillar2Data {
  userId: string
  progress: {
    completedTasks: number
    totalTasks: number
    aiBootcamp: {
      modules: AIModuleProgress[]
    }
    toolSetup: {
      tools: ToolSetupProgress[]
    }
    matrixCompleted: boolean
  }
  selectedTools: {
    primary: string
    secondary: string[]
  }
  matrixScores: {
    [toolId: string]: {
      cost: number
      easeOfUse: number
      aiIntegration: number
      designFlexibility: number
      communitySupport: number
      learningResources: number
      totalScore: number
      notes: string
    }
  }
  createdAt: string
  updatedAt: string
}
