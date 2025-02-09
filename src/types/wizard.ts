export interface BusinessIdeaForm {
  businessIdea: string;
  targetMarket: string;
  problemSolution: string;
  competitiveAdvantage: string;
}

export interface BrandingForm {
  brandName: string;
  brandValues: string;
  visualStyle: string;
  brandVoice: string;
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
  component: React.ComponentType<StepComponentProps<any>>;
  description: string;
}

export interface StepComponentProps<T = any> {
  data: StepData<T>;
  onDataChange: (data: StepData<T>) => void;
  isActive: boolean;
}

export interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isProcessing?: boolean;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  steps: Step[];
  onStepClick: (index: number) => void;
  currentStepId: string;
}
