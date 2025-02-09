import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import { FiInfo } from 'react-icons/fi';
import Tooltip from '@/components/common/Tooltip';

interface ImmediateActionsPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function ImmediateActionsPage({ data, onChange, errors }: ImmediateActionsPageProps) {
  const handleActionChange = (index: number, value: string) => {
    const updated = [...(data.immediateActions || [])];
    updated[index] = value;
    onChange({ ...data, immediateActions: updated });
  };

  // For example, require at least 3 immediate actions:
  const totalActions = [0, 1, 2]; // three placeholders

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Immediate Actions
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Identifying and prioritizing immediate actions is crucial for building momentum. These are the 
          specific tasks you can start working on right away to move closer to your 30-day goal.
        </p>
        <p className="mt-4">
          Focus on concrete, actionable steps that you can complete within the next few days. Breaking down 
          your larger goals into smaller, manageable tasks helps maintain progress and motivation.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {Array.from({ length: totalActions }, (_, i) => (
          <div key={i} className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Action {i + 1}
                </h3>
                <p className="mt-2 text-gray-300">
                  Define a specific, actionable task you can start immediately
                </p>
              </div>
              <Tooltip content="Choose tasks that are specific, measurable, and can be completed within a few days">
                <div className="cursor-help">
                  <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                </div>
              </Tooltip>
            </div>
            <input
              type="text"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder={`What's your next immediate action?`}
              value={data.immediateActions?.[i] || ''}
              onChange={(e) => handleActionChange(i, e.target.value)}
            />
            {errors?.immediateActions?.[i] && (
              <p className="mt-2 text-red-400 text-sm">{errors.immediateActions[i]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
