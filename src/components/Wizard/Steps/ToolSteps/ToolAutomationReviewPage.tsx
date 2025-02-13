'use client';
import React from 'react';
import { WizardData } from '@/types/wizard';
import { FiEdit } from 'react-icons/fi';

interface ToolAutomationReviewPageProps {
  data: WizardData;
  onEditStep: (stepId: string) => void;
  onSubmit: () => void;
  isActive: boolean;
}

/**
 * Helper function to safely retrieve a nested value using dot‑notation.
 * (If needed, you can expand this function to format the output.)
 */
function getValue(obj: any, key: string): any {
  return key.split('.').reduce((acc, curr) => (acc ? acc[curr] : undefined), obj);
}

const ToolAutomationReviewPage: React.FC<ToolAutomationReviewPageProps> = ({
  data,
  onEditStep,
  onSubmit,
  isActive,
}) => {
  if (!isActive) return null;

  // Extract each section's data from the aggregated WizardData.
  // We assume the keys for the three sections are 'logic', 'lookFeel', and 'automation'.
  const businessLogicData = data.logic?.userInput || {};
  const lookFeelData = data.lookFeel?.userInput || {};
  const automationData = data.automation?.userInput || {};

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 text-center">
        Review Your Tool & Automation Plan
      </h2>

      {/* Business Logic Refinement Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Business Logic Refinement
          </h3>
          <button
            onClick={() => onEditStep('logic')}
            className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
            title="Edit Business Logic"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300">
          {/* You can replace the following with a more tailored layout if needed */}
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(businessLogicData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Look & Feel & Customer Experience Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Look & Feel and Customer Experience
          </h3>
          <button
            onClick={() => onEditStep('lookFeel')}
            className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
            title="Edit Look & Feel"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(lookFeelData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Tool & Automation Preferences Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Tool & Automation Preferences
          </h3>
          <button
            onClick={() => onEditStep('automation')}
            className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
            title="Edit Automation Preferences"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(automationData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Generate Tool & Automation Plan
        </button>
      </div>
    </div>
  );
};

export default ToolAutomationReviewPage;