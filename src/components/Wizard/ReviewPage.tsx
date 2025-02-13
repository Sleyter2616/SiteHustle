import React, { useEffect, useState } from 'react';
import { WizardData } from '@/types/wizard';
import { VisionData, BrandIdentityData, ExecutionRoadmapData } from '@/types/pillar1';
import { FiEdit, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { buildFinalPrompt } from '@/utils/buildFinalPrompt';

interface ReviewPageProps {
  data: WizardData;
  onEditStep: (stepId: string) => void;
  onSubmit: () => void;
  isActive: boolean;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ data, onEditStep, onSubmit, isActive }) => {
  const [finalPlan, setFinalPlan] = useState<string>('');
  const [isPlanLoading, setIsPlanLoading] = useState<boolean>(false);

  // Extract data from each section
  const visionData = data.idea_market?.userInput as VisionData;
  const brandingData = data.branding?.userInput as BrandIdentityData;
  const executionData = data.execution?.userInput as ExecutionRoadmapData;

  // Build the final prompt (generic example)
  const finalPrompt = buildFinalPrompt(data);

  useEffect(() => {
    const fetchFinalPlan = async () => {
      setIsPlanLoading(true);
      try {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: finalPrompt, stepId: 'review' }),
        });
        const json = await res.json();
        if (json.success) {
          setFinalPlan(json.output);
        } else {
          toast.error(json.error || 'Failed to generate final business plan.');
        }
      } catch (error: any) {
        toast.error('Error generating final business plan.');
      } finally {
        setIsPlanLoading(false);
      }
    };

    fetchFinalPlan();
  }, [finalPrompt]);

  if (!isActive) return null;

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-center">
        Review Your Business Plan
      </h2>

      {/* Business Vision Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Business Vision
          </h3>
          <button
            onClick={() => onEditStep('idea_market')}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            title="Edit Business Vision"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="text-gray-300 space-y-2">
          <p>
            <strong className="text-gray-400">Business Name:</strong>{' '}
            {visionData?.businessName || '-'}
          </p>
          <p>
            <strong className="text-gray-400">Tagline:</strong>{' '}
            {visionData?.tagline || '-'}
          </p>
          <p>
            <strong className="text-gray-400">Mission Statement:</strong>{' '}
            {visionData?.missionStatement || '-'}
          </p>
          <p>
            <strong className="text-gray-400">Vision Statement:</strong>{' '}
            {visionData?.visionStatement || '-'}
          </p>
          <p>
            <strong className="text-gray-400">Core Values:</strong>{' '}
            {Array.isArray(visionData?.coreValues) ? visionData.coreValues.join(', ') : '-'}
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
        <div className="text-gray-300 space-y-4">
          <div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">Reflection</h4>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-400">Who I Am:</strong>{' '}
                {brandingData?.reflection?.whoIAm || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Who I Am Not:</strong>{' '}
                {brandingData?.reflection?.whoIAmNot || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Why Build Brand:</strong>{' '}
                {brandingData?.reflection?.whyBuildBrand || '-'}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">Personality</h4>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-400">Communication Style:</strong>{' '}
                {brandingData?.personality?.communicationStyle || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Tone and Voice:</strong>{' '}
                {brandingData?.personality?.toneAndVoice || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Passionate Expression:</strong>{' '}
                {brandingData?.personality?.passionateExpression || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Brand Personality:</strong>{' '}
                {brandingData?.personality?.brandPersonality || '-'}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">Story</h4>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-400">Pivotal Experience:</strong>{' '}
                {brandingData?.story?.pivotalExperience || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Defining Moment:</strong>{' '}
                {brandingData?.story?.definingMoment || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Audience Relevance:</strong>{' '}
                {brandingData?.story?.audienceRelevance || '-'}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">Differentiation</h4>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-400">Unique Approach:</strong>{' '}
                {brandingData?.differentiation?.uniqueApproach || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Unique Resources:</strong>{' '}
                {brandingData?.differentiation?.uniqueResources || '-'}
              </p>
              <p>
                <strong className="text-gray-400">Competitive Perception:</strong>{' '}
                {brandingData?.differentiation?.competitivePerception || '-'}
              </p>
            </div>
          </div>
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
            {executionData?.thirtyDayGoal || '-'}
          </p>
          <p>
            <strong className="text-gray-400">Weekly Milestones:</strong>{' '}
            {Array.isArray(executionData?.weeklyMilestones) ? executionData.weeklyMilestones.join(', ') : '-'}
          </p>
          <p>
            <strong className="text-gray-400">Content Plan:</strong>{' '}
            {executionData?.contentPlan || '-'}
          </p>
          <p>
            <strong className="text-gray-400">Immediate Actions:</strong>{' '}
            {Array.isArray(executionData?.immediateActions) ? executionData.immediateActions.join(', ') : '-'}
          </p>
        </div>
      </div>

      {/* Final AI Output Section */}
      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 transition-all duration-300">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-center">
          Final AI-Refined Business Plan
        </h3>
        {isPlanLoading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="text-gray-300 mt-4 whitespace-pre-wrap">
            {finalPlan || 'No AI output generated yet.'}
          </div>
        )}
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