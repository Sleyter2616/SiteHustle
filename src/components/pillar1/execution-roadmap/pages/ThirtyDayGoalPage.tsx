import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

interface ThirtyDayGoalPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function ThirtyDayGoalPage({ data, onChange, errors }: ThirtyDayGoalPageProps) {
  const updateField = (value: string) => {
    onChange({
      ...data,
      thirtyDayGoal: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        30-Day Goal
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Setting a clear 30-day goal is crucial for maintaining focus and momentum in your business journey. 
          This short timeframe helps you stay agile while making meaningful progress toward your larger vision.
        </p>
        <p className="mt-4">
          Choose a specific, measurable objective that you can realistically achieve within 30 days. This goal 
          should be ambitious enough to push you forward but attainable enough to maintain motivation.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                What is your 30-day goal?
              </h3>
              <p className="mt-2 text-gray-300">
                Define a clear objective you want to accomplish within the next month
              </p>
            </div>
            <Tooltip content="Choose one big priority that's realistic yet impactful. E.g., launch a MVP, get first 20 leads, etc.">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <textarea
            className="w-full min-h-[100px] bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="What specific, measurable outcome do you want in 30 days?"
            value={data.thirtyDayGoal || ''}
            onChange={(e) => updateField(e.target.value)}
          />
          {errors?.thirtyDayGoal?.[0] && (
            <p className="mt-2 text-red-400 text-sm">{errors.thirtyDayGoal[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
}
