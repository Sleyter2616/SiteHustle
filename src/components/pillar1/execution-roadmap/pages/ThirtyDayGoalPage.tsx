import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip'; // if needed

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
    <div className="space-y-4 bg-gray-700 p-4 rounded">
      <h2 className="text-xl font-semibold">30-Day Goal</h2>
      <p className="text-gray-300 mb-4">
        Think of a single, clear objective you want to accomplish within 30 days. 
        This short timeframe keeps you focused and allows for rapid iteration.
      </p>

      <FormField
        label="Your 30-Day Goal"
        error={errors?.thirtyDayGoal?.[0]}
        tooltip="Choose one big priority that’s realistic yet impactful. E.g., launch a MVP, get first 20 leads, etc."
      >
        <textarea
          className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
          placeholder="What specific, measurable outcome do you want in 30 days?"
          value={data.thirtyDayGoal || ''}
          onChange={(e) => updateField(e.target.value)}
        />
      </FormField>
    </div>
  );
}
