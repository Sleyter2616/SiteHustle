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

export interface ToolsLandscapeData {
  selectedTools: string[]
  toolRatings: { [toolId: string]: number }
  overviewNotes: string
  researchNotes: string
}

export interface DecisionMatrixData {
  [toolId: string]: {
    easeOfUse: number
    cost: number
    scalability: number
    aiIntegration: number
  }
}

export interface AiBootcampModuleData {
  contentDraft: string
  visualAssets: string[]
  automationWorkflow: string
  researchSummary: string
}

export interface SetupGuidesData {
  accountSetupComplete: boolean
  integrationNotes: string
  setupSteps: string[]
}

export interface BestPracticesData {
  recommendations: string[]
  proTips: string
  commonPitfalls: string[]
}

export interface SectionValidationState {
  intro?: boolean
  toolsLandscape?: string[]
  decisionMatrix?: string[]
  aiBootcampModule?: string[]
  setupGuides?: string[]
  bestPractices?: string[]
  conclusion?: boolean
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
  toolsLandscape: ToolsLandscapeData
  decisionMatrix: DecisionMatrixData
  aiBootcampModule: AiBootcampModuleData
  setupGuides: SetupGuidesData
  bestPractices: BestPracticesData
}

export interface BasePageProps {
  onNextSection: () => void
  canProceed: boolean
  errors?: string[]
}

export interface ToolsLandscapePageProps extends BasePageProps {
  data: ToolsLandscapeData
  onChange: (data: ToolsLandscapeData) => void
}

export interface DecisionMatrixPageProps extends BasePageProps {
  data: DecisionMatrixData
  onChange: (data: DecisionMatrixData) => void
}

export interface AiBootcampModulePageProps extends BasePageProps {
  data: AiBootcampModuleData
  onChange: (data: AiBootcampModuleData) => void
}

export interface SetupConfigurationPageProps extends BasePageProps {
  data: SetupGuidesData
  onChange: (data: SetupGuidesData) => void
}

export interface BestPracticesPageProps extends BasePageProps {
  data: BestPracticesData
  onChange: (data: BestPracticesData) => void
}

export interface Pillar2IntroPageProps {
  onNextSection: () => void
  canProceed: boolean
}

export interface Pillar2ConclusionPageProps {
  data: Pillar2Data
  onDownloadPdf: (pillarNumber: number, sectionIndex: number) => Promise<void>
  pdfDownloaded: boolean
}