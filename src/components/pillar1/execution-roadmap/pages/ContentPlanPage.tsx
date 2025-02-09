import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import { FiInfo } from 'react-icons/fi';
import Tooltip from '@/components/common/Tooltip';

interface ContentPlanPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function ContentPlanPage({ data, onChange, errors }: ContentPlanPageProps) {
  const updateContentPlan = (value: string) => {
    onChange({
      ...data,
      contentPlan: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Content Plan
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          A well-crafted content strategy is essential for engaging your audience and supporting your 
          business goals. Your content plan will help you maintain consistent communication and build 
          meaningful connections with your target audience.
        </p>
        <p className="mt-4">
          Consider which content types and channels will best reach your audience. Whether it's blog posts, 
          social media, videos, or email newsletters, choose formats that align with your strengths and 
          your audience's preferences.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                What is your content strategy?
              </h3>
              <p className="mt-2 text-gray-300">
                Outline your approach to creating and sharing content with your audience
              </p>
            </div>
            <Tooltip content="Focus on the content types and channels that align with your audience. E.g., weekly blog posts, daily Instagram reels, etc.">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <textarea
            className="w-full min-h-[100px] bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="Outline your content approach, frequency, and channels..."
            value={data.contentPlan || ''}
            onChange={(e) => updateContentPlan(e.target.value)}
          />
          {errors?.contentPlan?.[0] && (
            <p className="mt-2 text-red-400 text-sm">{errors.contentPlan[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
}
