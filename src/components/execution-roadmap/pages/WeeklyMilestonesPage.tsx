import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';

interface WeeklyMilestonesPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function WeeklyMilestonesPage({ data, onChange, errors }: WeeklyMilestonesPageProps) {
  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...(data.weeklyMilestones || [])];
    newMilestones[index] = value;
    onChange({
      ...data,
      weeklyMilestones: newMilestones
    });
  };

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Weekly Milestones</h2>
        <p className="text-gray-400">Break down your 30-day goal into weekly achievable milestones.</p>
      </div>

      {weeks.map((week, index) => (
        <FormField
          key={week}
          label={week}
          type="textarea"
          value={data.weeklyMilestones?.[index] || ''}
          onChange={(value) => handleMilestoneChange(index, value)}
          placeholder={`What do you want to achieve in ${week.toLowerCase()}?`}
          error={errors?.weeklyMilestones?.[index]}
          tooltip={`Set specific milestones for ${week.toLowerCase()} that align with your 30-day goal`}
        />
      ))}
    </div>
  );
}
