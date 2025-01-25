// src/components/brand-identity/pages/ExecutionRoadmapPage.tsx

import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';

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
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Your 30-Day Action Plan</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Clarity is crucial—but action is what makes it real. This roadmap helps you turn 
            your newly established brand identity into concrete tasks. Over the next 30 days, 
            each weekly milestone keeps you on track.
          </p>
          <p className="mt-4">
            From building momentum to creating initial content or networking, these steps are 
            how you’ll begin transforming your vision into tangible results. 
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea
            // label="What’s your main brand-building goal for the next 30 days?"
            value={data?.thirtyDayGoal}
            onChange={(value) => onChange({ ...data, thirtyDayGoal: value })}
            placeholder="E.g., Launch your first content series, set up social channels, clarify brand assets..."
            rows={3}
          />
          <p className="mt-2 text-sm text-gray-400">
            Choose a specific, measurable goal that aligns with your deeper brand identity.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-200">
            Weekly Milestones (4 Weeks)
          </label>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <TextArea
                // label={`Week ${index + 1}`}
                value={data?.weeklyMilestones?.[index] || ''}
                onChange={(value) => handleMilestoneChange(index, value)}
                placeholder={`What milestone will you accomplish in week ${index + 1}?`}
                rows={2}
              />
            </div>
          ))}
        </div>

        <div>
          <TextArea
            // label="Content Plan"
            value={data?.contentPlan}
            onChange={(value) => onChange({ ...data, contentPlan: value })}
            placeholder="Outline at least 3 pieces of content you’ll create to share your story and value..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Providing consistent, valuable content builds trust and reminds people why your brand matters.
          </p>
        </div>

        <div>
          <TextArea
            // label="Immediate Actions"
            value={data?.immediateActions?.join('\n')}
            onChange={(value) => onChange({ ...data, immediateActions: value.split('\n').filter(Boolean) })}
            placeholder="List a few tasks you can do today or tomorrow to kickstart your plan..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            These are small, tangible steps to build momentum right away—no overthinking needed.
          </p>
        </div>
      </div>
    </div>
  );
}