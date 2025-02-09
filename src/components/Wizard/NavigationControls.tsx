import React from 'react';
import { NavigationControlsProps } from '@/types/wizard';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isProcessing = false,
}) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
      <button
        onClick={onBack}
        disabled={isFirstStep}
        className={`
          flex items-center px-4 py-2 rounded-lg text-sm font-medium
          transition-all duration-200
          ${isFirstStep
            ? 'opacity-50 cursor-not-allowed bg-gray-700 text-gray-400'
            : 'bg-gray-700 text-white hover:bg-gray-600'}
        `}
        title="Go back to previous step"
      >
        <FiArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <button
        onClick={onNext}
        disabled={isProcessing}
        className={`
          flex items-center px-4 py-2 rounded-lg text-sm font-medium
          transition-all duration-200
          ${isProcessing
            ? 'opacity-50 cursor-not-allowed bg-gray-700 text-gray-400'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'}
        `}
        title={isLastStep ? "Complete the wizard" : "Continue to next step"}
      >
        {isLastStep ? (
          <>
            Finish
            <FiCheck className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            Next
            <FiArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

export default NavigationControls;
