import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';

interface ImmediateActionsPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function ImmediateActionsPage({ data, onChange, errors }: ImmediateActionsPageProps) {
  const handleActionChange = (index: number, value: string) => {
    const newActions = [...(data.immediateActions || [])];
    newActions[index] = value;
    onChange({
      ...data,
      immediateActions: newActions
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Immediate Actions</h2>
        <p className="text-gray-400">
          List the specific actions you need to take right now to start making progress.
        </p>
      </div>

      {[1, 2, 3].map((num, index) => (
        <FormField
          key={num}
          label={`Action ${num}`}
          // type="textarea"
          // value={data.immediateActions?.[index] || ''}
          // onChange={(value) => handleActionChange(index, value)}
          // placeholder="What specific action will you take?"
          // error={errors?.immediateActions?.[index]}
          // tooltip="Focus on concrete, actionable steps that you can start working on immediately"
        > </FormField>
      ))}
    </div>
  );
}
