'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WizardData, StepData, Step, StepComponentProps } from '@/types/wizard';
import ProgressBar from './ProgressBar';
import NavigationControls from './NavigationControls';
import OnboardingGuide from './OnboardingGuide';

// Import step components
import BusinessLogic from './Steps/ImplementationSteps/BusinessLogic';
import FrontEndUI from './Steps/ImplementationSteps/FrontEndUI';
import DeploymentIntegration from './Steps/ImplementationSteps/DeploymentIntegration';
import Review from './Steps/ImplementationSteps/Review';
import Conclusion from './Steps/ImplementationSteps/Conclusion';

import { saveWithRetry, loadWizardData } from '@/lib/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { buildImplementationFinalPrompt } from '@/utils/buildFinalPrompt';

const initialData: WizardData = {
  logic: { userInput: {} as any, aiOutput: '' },
  lookFeel: { userInput: {} as any, aiOutput: '' },
  deployment: { userInput: {} as any, aiOutput: '' },
  review: { userInput: {} as WizardData, aiOutput: '' },
  conclusion: { userInput: {} as WizardData, aiOutput: '' },
};

const steps: Step[] = [
  {
    id: 'logic',
    title: 'Backend Architecture & Logic',
    description: 'Detail your backend architecture, API integration needs, data management, and security requirements.',
    component: BusinessLogic,
  },
  {
    id: 'lookFeel',
    title: 'Frontend & UI Integration',
    description: 'Define the design style, user experience, and content priorities for your site.',
    component: FrontEndUI,
  },
  {
    id: 'deployment',
    title: 'Deployment & Integration Strategy',
    description: 'Outline your hosting environment, containerization, CI/CD tools, monitoring, and scaling plans.',
    component: DeploymentIntegration,
  },
  {
    id: 'review',
    title: 'Review & Finalize Implementation Plan',
    description: 'Review all your inputs and confirm your implementation plan before generating the final output.',
    component: Review,
  },
  {
    id: 'conclusion',
    title: 'Conclusion & Final Output',
    description: 'View the final AI-generated implementation plan, download your PDF, and proceed to the next module.',
    component: Conclusion,
  },
];

function getValue(obj: any, key: string): any {
  return key.split('.').reduce((acc, curr) => (acc ? acc[curr] : undefined), obj);
}

function validateStepData(stepId: string, data: any): { isValid: boolean; errors: string[] } {
  let errors: string[] = [];
  let mapping: Record<string, any> | undefined;

  if (stepId === 'logic') {
    mapping = require('@/mappings/businessLogicMapping').businessLogicMapping;
  } else if (stepId === 'lookFeel') {
    mapping = require('@/mappings/frontEndUIMapping').frontEndUIMapping;
  } else if (stepId === 'deployment') {
    mapping = require('@/mappings/deploymentIntegrationMapping').deploymentIntegrationMapping;
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

const ImplementationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [wizardData, setWizardData] = useState<WizardData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    const currentStepId = steps[currentStep]?.id || 'logic';
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
      const finalPrompt = buildImplementationFinalPrompt(wizardData);
      
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
      
      // Create updated review payload including AI output
      const updatedReviewData = {
        userInput: {
          logic: wizardData.logic.userInput,
          lookFeel: wizardData.lookFeel.userInput,
          deployment: wizardData.deployment.userInput,
        },
        aiOutput: JSON.stringify({
          logic: wizardData.logic.aiOutput || '',
          lookFeel: wizardData.lookFeel.aiOutput || '',
          deployment: wizardData.deployment.aiOutput || '',
          review: result.output,
        }),
      };

      console.log('Final submission payload:', updatedReviewData);
      
      // Save updated review data
      await saveWithRetry(userId, 'review', updatedReviewData);
      toast.success('Implementation plan submitted successfully!');
      
      // Transition to Conclusion step
      const conclusionStepIndex = steps.findIndex(step => step.id === 'conclusion');
      if (conclusionStepIndex !== -1) {
        setCurrentStep(conclusionStepIndex);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit implementation plan. Please try again.');
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

  const currentStepId = steps[currentStep]?.id || 'logic';
  const CurrentStepComponent = steps[currentStep]?.component;

  // For non-review steps, pass basic props
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
          <Review
            data={wizardData[currentStepId]}
            onDataChange={(newData: StepData) => handleDataChange(currentStepId, newData)}
            isActive={!isProcessing}
            onEditStep={handleEditStep}
            onSubmit={handleSubmit}
          />
        ) : currentStepId === 'conclusion' ? (
          <Conclusion
            data={{ userInput: wizardData, aiOutput: wizardData.review.aiOutput }}
            onDataChange={(newData: StepData) => handleDataChange(currentStepId, newData)}
            isActive={!isProcessing}
            onNextModule={() => router.push('/business-planning-wizard')}
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
        />

        <OnboardingGuide currentStep={currentStep} />
      </div>
    </div>
  );
};

export default ImplementationWizard;
