import React from 'react';
import { ProgressBarProps } from '@/types/wizard';
import { FiCheck } from 'react-icons/fi';

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  steps,
  onStepClick,
  currentStepId,
}) => {
  const progress = (current / (total - 1)) * 100;

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-1 absolute top-1/2 -translate-y-1/2">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < current;
          const isCurrent = index === current;
          const isClickable = index <= current;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-300 relative z-10
                  ${isCompleted || isCurrent ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'}
                  ${isClickable ? 'cursor-pointer hover:ring-2 hover:ring-purple-400' : 'cursor-not-allowed'}
                `}
                title={step.title}
              >
                {isCompleted ? (
                  <FiCheck className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                    {index + 1}
                  </span>
                )}
              </button>
              <span className={`
                mt-2 text-sm whitespace-nowrap
                ${isCurrent ? 'text-white font-medium' : 'text-gray-400'}
              `}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
