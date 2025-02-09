import React from 'react';
import { StepComponentProps } from '@/types/wizard';
import GenericStep from '../GenericStep';
import { executionMapping } from '@/mappings/pillar1Mapping';
import { ExecutionRoadmapData } from '@/types/pillar1';

const Step4: React.FC<StepComponentProps<ExecutionRoadmapData>> = ({ data, onDataChange, isActive }) => {
  return (
    <GenericStep<ExecutionRoadmapData>
      data={data}
      onDataChange={onDataChange}
      isActive={isActive}
      fieldMappings={executionMapping}
    />
  );
};

export default Step4;
