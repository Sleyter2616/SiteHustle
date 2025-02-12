import React from 'react';
import { StepComponentProps } from '@/types/wizard';
import GenericStep from '../GenericStep';
import { visionMapping } from '@/mappings/pillar1Mapping';
import { VisionData } from '@/types/pillar1';

const Step2: React.FC<StepComponentProps<VisionData>> = ({ data, onDataChange, isActive }) => {
  return (
    <GenericStep<VisionData>
      data={data}
      onDataChange={onDataChange}
      isActive={isActive}
      fieldMappings={visionMapping}
    />
  );
};

export default Step2;