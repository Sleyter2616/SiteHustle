'use client';
import React from 'react';
import { StepComponentProps, WizardData } from '@/types/wizard';
import { FiEdit } from 'react-icons/fi';

interface ReviewProps extends StepComponentProps<WizardData> {
  onEditStep: (stepId: string) => void;
  onSubmit: () => void;
}

const Review: React.FC<ReviewProps> = ({ data, isActive, onEditStep, onSubmit }) => {
  if (!isActive) return null;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Review Your Implementation Plan</h2>

      {/* Backend & Logic Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Backend Architecture & Logic
          </h3>
          <button
            onClick={() => onEditStep('logic')}
            className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data?.userInput.logic || {}, null, 2)}
          </pre>
        </div>
      </div>

      {/* Frontend & UI Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Frontend & UI Integration
          </h3>
          <button
            onClick={() => onEditStep('lookFeel')}
            className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data.userInput.lookFeel || {}, null, 2)}
          </pre>
        </div>
      </div>

      {/* Deployment & Integration Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Deployment & Integration
          </h3>
          <button
            onClick={() => onEditStep('deployment')}
            className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data?.userInput.deployment || {}, null, 2)}
          </pre>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={onSubmit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Generate Implementation Plan
        </button>
      </div>
    </div>
  );
};

export default Review;
