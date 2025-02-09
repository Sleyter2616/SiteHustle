// src/components/brand-identity/pages/ExecutionRoadmapPage.tsx

import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

type ExecutionRoadmapData = NonNullable<Pillar1Data['brandIdentity']['executionRoadmap']>;

interface ExecutionRoadmapPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
}

export default function ExecutionRoadmapPage({ data, onChange }: ExecutionRoadmapPageProps) {
  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...(data?.weeklyMilestones || [])];
    newMilestones[index] = value;
    onChange({ ...data, weeklyMilestones: newMilestones });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Your 30-Day Action Plan
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Clarity is crucial—but action is what makes it real. This roadmap helps you turn 
          your newly established brand identity into concrete tasks. Over the next 30 days, 
          each weekly milestone keeps you on track.
        </p>
        <p className="mt-4">
          From building momentum to creating initial content or networking, these steps are 
          how you'll begin transforming your vision into tangible results. 
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              What's your main brand-building goal for the next 30 days?
            </h3>
            <Tooltip content="Choose a specific, measurable goal that aligns with your deeper brand identity.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Focus on one meaningful goal that will move your brand forward.
          </p>
          <TextArea
            value={data?.thirtyDayGoal}
            onChange={(value) => onChange({ ...data, thirtyDayGoal: value })}
            placeholder="E.g., Launch your first content series, set up social channels, clarify brand assets..."
            rows={3}
          />
        </div>

        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Weekly Milestones (4 Weeks)
            </h3>
            <Tooltip content="Break down your main goal into weekly achievable steps.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <p className="text-sm text-gray-400 mb-2">Week {index + 1}</p>
                <TextArea
                  value={data?.weeklyMilestones?.[index] || ''}
                  onChange={(value) => handleMilestoneChange(index, value)}
                  placeholder={`What milestone will you accomplish in week ${index + 1}?`}
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Content Plan
            </h3>
            <Tooltip content="Plan content that showcases your expertise and resonates with your audience.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Providing consistent, valuable content builds trust and reminds people why your brand matters.
          </p>
          <TextArea
            value={data?.contentPlan}
            onChange={(value) => onChange({ ...data, contentPlan: value })}
            placeholder="Outline at least 3 pieces of content you'll create to share your story and value..."
            rows={4}
          />
        </div>

        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Immediate Actions
            </h3>
            <Tooltip content="List quick wins you can achieve right away to build momentum.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            These are small, tangible steps to build momentum right away—no overthinking needed.
          </p>
          <TextArea
            value={data?.immediateActions?.join('\n')}
            onChange={(value) => onChange({ ...data, immediateActions: value.split('\n').filter(Boolean) })}
            placeholder="List a few tasks you can do today or tomorrow to kickstart your plan..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}