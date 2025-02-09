// src/components/Wizard/ReviewPage.tsx
import React from 'react';
import { WizardData } from '@/types/wizard';
import { FiEdit, FiCheck } from 'react-icons/fi';

interface ReviewPageProps {
  data: WizardData;
  onEditStep: (stepId: string) => void;
  onSubmit: () => void;
  isActive: boolean;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ data, onEditStep, onSubmit, isActive }) => {
  if (!isActive) return null;

  // Helper function to safely render a field value
  const renderField = (section: string, field: string) => {
    return (data[section]?.userInput?.[field] as string) || '-';
  };

  // For array fields, join them by comma if defined
  const renderArrayField = (section: string, field: string) => {
    const value = data[section]?.userInput?.[field];
    return Array.isArray(value) ? value.join(', ') : (value as string) || '-';
  };

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-center">
        Review Your Business Plan
      </h2>

      {/* Vision & Mission Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Vision & Mission
          </h3>
          <button
            onClick={() => onEditStep('idea_market')}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            title="Edit Vision & Mission"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300 space-y-2">
          <p>
            <strong className="text-gray-400">Business Name:</strong>{' '}
            {renderField('idea_market', 'businessName')}
          </p>
          <p>
            <strong className="text-gray-400">Tagline:</strong>{' '}
            {renderField('idea_market', 'tagline')}
          </p>
          <p>
            <strong className="text-gray-400">Mission Statement:</strong>{' '}
            {renderField('idea_market', 'missionStatement')}
          </p>
          <p>
            <strong className="text-gray-400">Vision Statement:</strong>{' '}
            {renderField('idea_market', 'visionStatement')}
          </p>
          <p>
            <strong className="text-gray-400">Core Values:</strong>{' '}
            {renderArrayField('idea_market', 'coreValues')}
          </p>
        </div>
      </div>

      {/* Brand Identity Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Brand Identity
          </h3>
          <button
            onClick={() => onEditStep('branding')}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            title="Edit Brand Identity"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300 space-y-2">
          <p>
            <strong className="text-gray-400">Brand Name:</strong>{' '}
            {renderField('branding', 'brandName')}
          </p>
          <p>
            <strong className="text-gray-400">Brand Values:</strong>{' '}
            {renderField('branding', 'brandValues')}
          </p>
          <p>
            <strong className="text-gray-400">Visual Style:</strong>{' '}
            {renderField('branding', 'visualStyle')}
          </p>
          <p>
            <strong className="text-gray-400">Brand Voice:</strong>{' '}
            {renderField('branding', 'brandVoice')}
          </p>
        </div>
      </div>

      {/* Execution Plan Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Execution Plan
          </h3>
          <button
            onClick={() => onEditStep('execution')}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            title="Edit Execution Plan"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300 space-y-2">
          <p>
            <strong className="text-gray-400">30-Day Goal:</strong>{' '}
            {renderField('execution', 'thirtyDayGoal')}
          </p>
          <p>
            <strong className="text-gray-400">Weekly Milestones:</strong>{' '}
            {renderArrayField('execution', 'weeklyMilestones')}
          </p>
          <p>
            <strong className="text-gray-400">Content Plan:</strong>{' '}
            {renderField('execution', 'contentPlan')}
          </p>
          <p>
            <strong className="text-gray-400">Immediate Actions:</strong>{' '}
            {renderArrayField('execution', 'immediateActions')}
          </p>
        </div>
      </div>

      {/* Final Submission */}
      <div className="text-center mt-8">
        <button 
          onClick={onSubmit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 mx-auto"
          title="Submit your business plan"
        >
          Submit Plan <FiCheck className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;