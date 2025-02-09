// src/components/Wizard/Steps/ReviewStepWrapper.tsx
import React from 'react';
import { StepComponentProps } from '@/types/wizard';
import { WizardData } from '@/types/wizard';
import ReviewPage from '../ReviewPage';

interface ReviewStepWrapperProps extends StepComponentProps<WizardData> {
  // Additional props can be added if needed.
}

const ReviewStepWrapper: React.FC<ReviewStepWrapperProps> = ({ data, onDataChange, isActive }) => {
  // For the review step, we don't modify data so onDataChange can be a no-op.
  return (
    <ReviewPage 
      data={data as unknown as WizardData}
      onEditStep={(stepId: string) => {
        // For now, we simply log the step that should be edited.
        console.log(`Edit step: ${stepId}`);
      }}
      onSubmit={() => {
        // Final submission logic goes here.
        console.log('Submit wizard data');
      }}
      isActive={isActive}
    />
  );
};

export default ReviewStepWrapper;