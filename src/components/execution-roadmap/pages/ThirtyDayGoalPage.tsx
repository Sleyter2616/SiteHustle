import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';

interface ThirtyDayGoalPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function ThirtyDayGoalPage({ data, onChange, errors }: ThirtyDayGoalPageProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="30-Day Goal"
        type="textarea"
        value={data.thirtyDayGoal || ''}
        onChange={(value) => onChange({
          ...data,
          thirtyDayGoal: value
        })}
        placeholder="What specific goal do you want to achieve in the next 30 days?"
        error={errors?.thirtyDayGoal?.[0]}
        tooltip="Set a clear, measurable goal that you can achieve within 30 days"
      />
    </div>
  );
}
