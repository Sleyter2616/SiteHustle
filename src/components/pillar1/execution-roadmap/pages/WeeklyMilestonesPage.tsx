import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';

interface WeeklyMilestonesPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function WeeklyMilestonesPage({ data, onChange, errors }: WeeklyMilestonesPageProps) {
  const handleMilestoneChange = (index: number, value: string) => {
    const updated = [...(data.weeklyMilestones || [])];
    updated[index] = value;
    onChange({ ...data, weeklyMilestones: updated });
  };

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return (
    <div className="space-y-4 bg-gray-700 p-4 rounded">
      <h2 className="text-xl font-semibold">Weekly Milestones</h2>
      <p className="text-gray-300 mb-4">
        Break your 30-day goal into four weekly checkpoints. Each milestone should build upon 
        the previous one, ensuring steady progress and adaptability.
      </p>

      {weeks.map((week, i) => (
        <FormField
          key={week}
          label={week}
          error={errors?.[`weeklyMilestones`]?.[i]}
          tooltip={`Define a specific, achievable outcome for ${week} that contributes to your overall 30-day goal.`}
        >
          <textarea
            className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
            placeholder={`What do you want to achieve in ${week}?`}
            value={data.weeklyMilestones?.[i] || ''}
            onChange={(e) => handleMilestoneChange(i, e.target.value)}
          />
        </FormField>
      ))}
    </div>
  );
}
