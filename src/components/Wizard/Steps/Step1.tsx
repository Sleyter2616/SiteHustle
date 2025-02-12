import React from 'react';
import { StepComponentProps } from '@/types/wizard';
import GenericStep from '../GenericStep';
import { brandingMapping } from '@/mappings/pillar1Mapping';
import { BrandIdentityData } from '@/types/pillar1';

const Step1: React.FC<StepComponentProps<BrandIdentityData>> = ({ data, onDataChange, isActive }) => {
  return (
    <GenericStep<BrandIdentityData>
      data={data}
      onDataChange={onDataChange}
      isActive={isActive}
      fieldMappings={brandingMapping}
    />
  );
};

export default Step1;