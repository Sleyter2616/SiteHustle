'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WizardData, StepData, Step, StepComponentProps } from '@/types/wizard';
import { VisionData, BrandIdentityData, ExecutionRoadmapData } from '@/types/pillar1';
import ProgressBar from './ProgressBar';
import NavigationControls from './NavigationControls';
import OnboardingGuide from './OnboardingGuide';
import Step1 from './Steps/BusinessSteps/Step1';
import Step2 from './Steps/BusinessSteps/Step2';
import Step3 from './Steps/BusinessSteps/Step3';
import ReviewStepWrapper from './Steps/BusinessSteps/ReviewStepWrapper';
import ConclusionStep from './Steps/BusinessSteps/ConclusionStep';
import { saveWithRetry, loadWizardData } from '@/lib/supabase';
import { visionMapping, brandingMapping, executionMapping } from '@/mappings/pillar1Mapping';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { buildFinalBusinessPlanPrompt } from '@/utils/buildFinalPrompt';
import { FiArrowRight } from 'react-icons/fi';

const initialData: WizardData = {
  idea_market: { userInput: {} as VisionData, aiOutput: '' },
  branding: { userInput: {} as BrandIdentityData, aiOutput: '' },
  execution: { userInput: {} as ExecutionRoadmapData, aiOutput: '' },
  review: { userInput: {} as WizardData, aiOutput: '' },
};

const steps: Step[] = [
  {
    id: 'branding',
    title: 'Brand Identity & Messaging',
    description: 'Craft a unique and authentic brand identity along with a compelling message.',
    component: Step1,
  },
  {
    id: 'idea_market',
    title: 'Business Vision & Mission',
    description: 'Define your business vision, mission, and core values to guide your strategy.',
    component: Step2,
  },
  {
    id: 'execution',
    title: 'Execution & Action Plan',
    description: 'Outline your 30-day action plan, including key milestones and immediate tasks.',
    component: Step3,
  },
  {
    id: 'review',
    title: 'Review & Finalize',
    description: 'Review all your inputs and finalize your business plan for submission.',
    component: ReviewStepWrapper,
  },
  {
    id: 'conclusion',
    title: 'Conclusion & Final Output',
    description: 'View the final AI-generated output and download your Business Plan PDF.',
    component: ConclusionStep,
  },
];

function getValue(obj: any, key: string): any {
  return key.split('.').reduce((acc, curr) => (acc ? acc[curr] : undefined), obj);
}

function validateStepData(stepId: string, data: any): { isValid: boolean; errors: string[] } {
  let errors: string[] = [];
  let mapping: Record<string, any> | undefined;

  if (stepId === 'idea_market') {
    mapping = visionMapping;
  } else if (stepId === 'branding') {
    mapping = brandingMapping;
  } else if (stepId === 'execution') {
    mapping = executionMapping;
  }

  if (mapping) {
    Object.entries(mapping).forEach(([fieldKey, fieldConfig]) => {
      const value = getValue(data, fieldKey);
      if (fieldConfig.isArray) {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(fieldConfig.errorMessage || `${fieldConfig.label} must have at least one value.`);
        } else {
          value.forEach((item: string) => {
            if (typeof item !== 'string' || item.trim().length < (fieldConfig.minLength || 0)) {
              errors.push(fieldConfig.errorMessage || `${fieldConfig.label} values must be at least ${fieldConfig.minLength} characters.`);
            }
          });
        }
      } else {
        if (!value || (typeof value === 'string' && value.trim().length < (fieldConfig.minLength || 0))) {
          errors.push(fieldConfig.errorMessage || `${fieldConfig.label} must be at least ${fieldConfig.minLength} characters.`);
        }
      }
    });
  }

  if (errors.length > 0) {
    const stepName = steps.find(s => s.id === stepId)?.title || stepId.replace('_', ' ');
    errors = [`Please complete all required fields in ${stepName} correctly.`];
  }

  return { isValid: errors.length === 0, errors };
}

const BuisinessPlanWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [wizardData, setWizardData] = useState<WizardData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error('Please sign in to continue');
        return;
      }
      setUserId(session.user.id);
    };

    getUser();
  }, [supabase.auth]);

  // Load saved wizard data
  useEffect(() => {
    const loadSavedData = async () => {
      if (!userId) return;
      try {
        const savedSteps = await loadWizardData(userId);
        if (savedSteps.length > 0) {
          const newWizardData = { ...initialData };
          savedSteps.forEach((step) => {
            newWizardData[step.step_id] = {
              userInput: step.user_input,
              aiOutput: step.ai_output,
            };
          });
          setWizardData(newWizardData);
        }
      } catch (error) {
        toast.error('Failed to load saved progress');
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [userId]);

  const totalSteps = steps.length;

  const handleDataChange = useCallback((stepId: string, newData: StepData) => {
    setWizardData(prev => ({
      ...prev,
      [stepId]: newData,
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const handleNext = async () => {
    if (!userId) {
      toast.error('Please sign in to continue');
      return;
    }
    const currentStepId = steps[currentStep]?.id || 'idea_market';
    if (currentStep < totalSteps - 1) {
      const { isValid, errors } = validateStepData(currentStepId, wizardData[currentStepId].userInput);
      if (!isValid) {
        toast.error(errors[0]);
        return;
      }
      setIsProcessing(true);
      try {
        await saveWithRetry(userId, currentStepId, wizardData[currentStepId]);
        setCurrentStep(prev => prev + 1);
        toast.success('Progress saved successfully!');
      } catch (error) {
        toast.error('Failed to save progress. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleEditStep = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Build final prompt from aggregated wizardData
      const finalPrompt = buildFinalBusinessPlanPrompt(wizardData);
      
      // Call the AI generation API endpoint
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt, stepId: 'review' }),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'AI generation failed');
      }
      
      // Create an updated review payload including AI output from each step.
      const updatedReviewData = {
        userInput: {
          idea_market: wizardData.idea_market.userInput,
          branding: wizardData.branding.userInput,
          execution: wizardData.execution.userInput,
        },
        aiOutput: JSON.stringify({
          idea_market: wizardData.idea_market.aiOutput || '',
          branding: wizardData.branding.aiOutput || '',
          execution: wizardData.execution.aiOutput || '',
          review: result.output,
        }),
      };

      console.log('Final submission payload:', updatedReviewData);
      
      // Save the updated review data
      await saveWithRetry(userId, 'review', updatedReviewData);
      console.log('Final business plan submitted:', wizardData);
      toast.success('Business plan submitted successfully!');
      
      // Transition to the Conclusion step (instead of immediate redirection)
      const conclusionStepIndex = steps.findIndex(step => step.id === 'conclusion');
      if (conclusionStepIndex !== -1) {
        setCurrentStep(conclusionStepIndex);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit business plan. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentStepId = steps[currentStep]?.id || 'idea_market';
  const CurrentStepComponent = steps[currentStep]?.component;

  // For non-review steps, pass basic props.
  const basicStepProps: StepComponentProps<any> = {
    data: wizardData[currentStepId],
    onDataChange: (newData: StepData) => handleDataChange(currentStepId, newData),
    isActive: !isProcessing,
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-8 px-4">
      <div className="container-custom">
        <ProgressBar
          current={currentStep}
          total={totalSteps}
          steps={steps}
          onStepClick={goToStep}
          currentStepId={currentStepId}
        />
        
        {currentStepId === 'review' ? (
          <ReviewStepWrapper
            data={wizardData[currentStepId]}
            onDataChange={(newData: StepData) => handleDataChange(currentStepId, newData)}
            isActive={!isProcessing}
            onEditStep={handleEditStep}
            onSubmit={handleSubmit}
          />
        ) : currentStepId === 'conclusion' ? (
          <CurrentStepComponent
            data={{ userInput: wizardData, aiOutput: wizardData.review.aiOutput }}
            onDataChange={(newData: StepData) => handleDataChange(currentStepId, newData)}
            isActive={!isProcessing}
            onNextModule={() => router.push('/tool-automation-planning-wizard')}
          />
        ) : (
          CurrentStepComponent && <CurrentStepComponent {...basicStepProps} />
        )}

        <NavigationControls
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={currentStepId === 'review' ? handleSubmit : handleNext}
          onBack={handleBack}
          isProcessing={isProcessing}
          onFinish={() => router.push('/tool-automation-planning-wizard')}
        />

        {isSubmitted && (
          <div className="mt-4 flex justify-center">
            <button 
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => router.push('/tool-automation-planning-wizard')}
            >
              Continue to Tool & Automation Planning
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <OnboardingGuide currentStep={currentStep} />
      </div>
    </div>
  );
};

export default BuisinessPlanWizard;