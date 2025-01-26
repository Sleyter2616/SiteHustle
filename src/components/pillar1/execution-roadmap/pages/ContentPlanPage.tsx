import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';

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
    <div className="space-y-4 bg-gray-700 p-4 rounded">
      <h2 className="text-xl font-semibold">Content Plan</h2>
      <p className="text-gray-300 mb-4">
        Plan how you’ll engage your audience or customers 
        (e.g., social posts, blog articles, emails, videos, etc.) 
        to support your 30-day goal.
      </p>

      <FormField
        label="Describe Your Content Strategy"
        error={errors?.contentPlan?.[0]}
        tooltip="Focus on the content types and channels that align with your audience. E.g., weekly blog posts, daily Instagram reels, etc."
      >
        <textarea
          className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
          placeholder="Outline your content approach, frequency, and channels..."
          value={data.contentPlan || ''}
          onChange={(e) => updateContentPlan(e.target.value)}
        />
      </FormField>
    </div>
  );
}
