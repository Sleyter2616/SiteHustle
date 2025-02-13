'use client';
import React, { useEffect, useState } from 'react';
import { StepComponentProps, WizardData, StepData } from '@/types/wizard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
// Import your review page for tool planning (create this if needed)
import ToolAutomationReviewPage from './ToolAutomationReviewPage'

interface ToolAutomationReviewStepWrapperProps extends StepComponentProps<WizardData> {
  onEditStep: (stepId: string) => void;
  onSubmit: () => void;
}

const ToolAutomationReviewStepWrapper: React.FC<ToolAutomationReviewStepWrapperProps> = ({ isActive, onEditStep, onSubmit }) => {
  const [wizardData, setWizardData] = useState<WizardData>({});
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadAllSteps = async () => {
      try {
        // Get the current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          toast.error('Please sign in to continue');
          return;
        }

        // Fetch all wizard steps for this user
        const { data, error } = await supabase
          .from('wizard_steps')
          .select('*')
          .eq('user_id', session.user.id)
          .order('updated_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform the data into WizardData format
        const transformedData: WizardData = {};
        data?.forEach((step) => {
          transformedData[step.step_id] = {
            userInput: step.user_input,
            aiOutput: step.ai_output,
          };
        });

        console.log('Loaded tool automation review data:', transformedData);
        setWizardData(transformedData);
      } catch (error) {
        console.error('Error loading review data:', error);
        toast.error('Failed to load review data');
      } finally {
        setIsLoading(false);
      }
    };

    if (isActive) {
      loadAllSteps();
    }
  }, [isActive, supabase]);

  if (!isActive) return null;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ToolAutomationReviewPage
      data={wizardData}
      onEditStep={onEditStep}
      onSubmit={onSubmit}
      isActive={isActive}
    />
  );
};

export default ToolAutomationReviewStepWrapper;