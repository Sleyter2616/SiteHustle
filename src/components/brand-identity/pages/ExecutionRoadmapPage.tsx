import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';
import { BrandIdentity } from '@/types/pillar4';

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
        <h2 className="text-2xl font-semibold mb-4">Your 30-Day Roadmap from Clarity to Action</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Clarity alone isn't enough. Turning your understanding into daily and weekly tasks 
            makes this process actionable. Let's create a concrete plan to implement your brand 
            identity over the next 30 days.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea
            label="What's your main goal for the next 30 days?"
            value={data?.thirtyDayGoal}
            onChange={(value) => onChange({ ...data, thirtyDayGoal: value })}
            placeholder="Define one clear, achievable goal for the next month..."
            rows={3}
          />
          <p className="mt-2 text-sm text-gray-400">
            Choose a goal that's specific, measurable, and aligned with your brand identity.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-200">
            Break it down into weekly milestones
          </label>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <TextArea
                label={`Week ${index + 1}`}
                value={data?.weeklyMilestones?.[index] || ''}
                onChange={(value) => handleMilestoneChange(index, value)}
                placeholder={`What will you accomplish in week ${index + 1}?`}
                rows={2}
              />
            </div>
          ))}
        </div>

        <div>
          <TextArea
            label="Content Plan"
            value={data?.contentPlan}
            onChange={(value) => onChange({ ...data, contentPlan: value })}
            placeholder="Outline 3 pieces of content that reflect your brand values..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Plan content that showcases your brand story, voice, and unique value proposition.
          </p>
        </div>

        <div>
          <TextArea
            label="Immediate Actions"
            value={data?.immediateActions?.join('\n')}
            onChange={(value) => onChange({ ...data, immediateActions: value.split('\n').filter(Boolean) })}
            placeholder="List 2-3 actions you can take right now..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            What can you do today to start moving toward your 30-day goal?
          </p>
        </div>
      </div>
    </div>
  );
}
