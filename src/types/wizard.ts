export interface BusinessIdeaForm {
  businessIdea: string;
  targetMarket: string;
  problemSolution: string;
  competitiveAdvantage: string;
}

export interface BrandingForm {
  reflection: {
    whoIAm: string;
    whoIAmNot: string;
    whyBuildBrand: string;
  };
  personality: {
    communicationStyle: string;
    toneAndVoice: string;
    passionateExpression: string;
    brandPersonality: string;
  };
  story: {
    pivotalExperience: string;
    definingMoment: string;
    audienceRelevance: string;
  };
  differentiation: {
    uniqueApproach: string;
    uniqueResources: string;
    competitivePerception: string;
  };
}

export interface BusinessIdeaErrors {
  businessIdea?: string[];
  targetMarket?: string[];
  problemSolution?: string[];
  competitiveAdvantage?: string[];
}

export interface BrandingErrors {
  brandName?: string[];
  brandValues?: string[];
  visualStyle?: string[];
  brandVoice?: string[];
}

export interface StepData<T = any> {
  userInput: T;
  aiOutput: string;
}

export interface WizardData {
  [key: string]: StepData<any>;
}

export interface Step {
  id: string;
  title: string;
  component: React.ComponentType<StepComponentProps<any> & { onEditStep?: (stepId: string) => void; onSubmit?: () => void }>;
  description: string;
}

export interface StepComponentProps<T = any> {
  data: StepData<T>;
  onDataChange: (data: StepData<T>) => void;
  isActive: boolean;
  onNextModule?: () => void;
}

export interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isProcessing?: boolean;
  onFinish?: () => void;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  steps: Step[];
  onStepClick: (index: number) => void;
  currentStepId: string;
}

export interface ToolAutomationForm {
  techExpertise: string;
  automationPreferences: string[];
  integrationNeeds: string[];
  additionalNotes: string;
  preferredTool: string;
}
export interface LookAndFeelForm {
  designStyle: string;
  brandVoice: string;
  uiUxPreferences: string;
  competitorInspiration: string[];
}

export interface BusinessLogicForm {
  backendRequirements: string;
  monetizationStrategy: string;
  thirdPartyIntegrations: string[]; // Expect an array of integration names or details
  scalabilityNeeds: string;
}
