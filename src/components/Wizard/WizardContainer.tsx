'use client';
import React, { useState, useCallback } from 'react';
import { WizardData, StepData, Step } from '@/types/wizard';
import { VisionData, BrandIdentityData, ExecutionRoadmapData } from '@/types/pillar1';
import ProgressBar from './ProgressBar';
import NavigationControls from './NavigationControls';
import OnboardingGuide from './OnboardingGuide';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';
import ReviewStepWrapper from './Steps/ReviewStepWrapper';

const initialData: WizardData = {
  idea_market: { userInput: {} as VisionData, aiOutput: '' },
  branding: { userInput: {} as BrandIdentityData, aiOutput: '' },
  execution: { userInput: {} as ExecutionRoadmapData, aiOutput: '' },
  review: { userInput: {} as WizardData, aiOutput: '' },
};

const steps: Step[] = [
  {
    id: 'idea_market',
    title: 'Vision & Mission',
    description: 'Define your business vision, mission, and core values',
    component: Step1,
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    description: 'Create your authentic brand personality',
    component: Step2,
  },
  {
    id: 'execution',
    title: 'Execution Plan',
    description: 'Define your 30-day action plan',
    component: Step4,
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review all your inputs and submit your business plan',
    component: ReviewStepWrapper,
  },
];

const WizardContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [wizardData, setWizardData] = useState<WizardData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentStepId = steps[currentStep].id;
  const totalSteps = steps.length;

  const handleStepDataChange = useCallback((stepId: string, newData: StepData) => {
    setWizardData(prev => ({
      ...prev,
      [stepId]: newData,
    }));
  }, []);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex);
    }
  }, [totalSteps]);

  const goNext = useCallback(async () => {
    if (currentStep < totalSteps - 1) {
      setIsProcessing(true);
      try {
        // Simulate async processing (e.g., validation, API calls)
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentStep(prev => prev + 1);
      } finally {
        setIsProcessing(false);
      }
    }
  }, [currentStep, totalSteps]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            SiteHustle Wizard
          </h1>
          <p className="text-gray-400">
            Let's build your online business, step by step.
          </p>
        </div>

        {/* Progress Tracking */}
        <ProgressBar
          current={currentStep}
          total={totalSteps}
          steps={steps}
          onStepClick={goToStep}
          currentStepId={currentStepId}
        />

        {/* Current Step */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            {steps[currentStep].description}
          </p>
          <div className="relative">
            <CurrentStepComponent
              data={wizardData[currentStepId]}
              onDataChange={(newData) => handleStepDataChange(currentStepId, newData)}
              isActive={!isProcessing}
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <NavigationControls
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={goNext}
          onBack={goBack}
          isProcessing={isProcessing}
        />

        {/* Onboarding Guide */}
        <OnboardingGuide currentStep={currentStep} />
      </div>
    </div>
  );
};

export default WizardContainer;