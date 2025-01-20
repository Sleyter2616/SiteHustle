import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';

interface ContentPlanPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function ContentPlanPage({ data, onChange, errors }: ContentPlanPageProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Content Plan</h2>
        <p className="text-gray-400">
          Outline your content strategy to engage your audience and achieve your business goals.
        </p>
      </div>

      <FormField
        label="Content Strategy"
        type="textarea"
        value={data.contentPlan || ''}
        onChange={(value) => onChange({
          ...data,
          contentPlan: value
        })}
        placeholder="Describe your content strategy, including types of content, frequency, and distribution channels"
        error={errors?.contentPlan?.[0]}
        tooltip="Your content plan should align with your target audience's needs and your business goals"
      />
    </div>
  );
}
