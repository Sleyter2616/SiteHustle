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
    const updated = [...(data.immediateActions || [])];
    updated[index] = value;
    onChange({ ...data, immediateActions: updated });
  };

  // For example, require at least 3 immediate actions:
  const totalActions = [0, 1, 2]; // three placeholders

  return (
    <div className="space-y-4 bg-gray-700 p-4 rounded">
      <h2 className="text-xl font-semibold">Immediate Actions</h2>
      <p className="text-gray-300 mb-4">
        List specific tasks you can start right away—within the next day or two. 
        These are quick wins that build momentum toward your weekly milestones.
      </p>

      {totalActions.map((_, i) => (
        <FormField
          key={i}
          label={`Action ${i + 1}`}
          error={errors?.[`immediateActions`]?.[i]}
          tooltip="Aim for clear, doable tasks that you can complete or at least start within 24-48 hours."
        >
          <input
            className="w-full bg-gray-800 text-gray-200 rounded-md px-3 py-2"
            placeholder={`What concrete step will you take as Action ${i + 1}?`}
            value={data.immediateActions?.[i] || ''}
            onChange={(e) => handleActionChange(i, e.target.value)}
          />
        </FormField>
      ))}
      <div className="bg-gray-800 p-4 rounded mt-6 space-y-3">
  <h3 className="text-xl font-semibold">Roadmap Ready!</h3>
  <p className="text-gray-300">
    Congratulations—you’ve outlined a clear 30-day objective, weekly milestones,
    a content plan, and immediate actions. This is your playbook for the
    next month. Revisit these steps regularly and adjust as needed.
  </p>
</div>

    </div>
  );
}
