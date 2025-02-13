'use client';
import React from 'react';
import GenericStep from '../GenericStep';
import { lookAndFeelMapping } from '@/mappings/lookAndFeelMapping';
import { LookAndFeelForm, StepComponentProps } from '@/types/wizard';

const LookAndFeelStep: React.FC<StepComponentProps<LookAndFeelForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <GenericStep<LookAndFeelForm>
        fieldMappings={lookAndFeelMapping}
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
      />
    </div>
  );
};

export default LookAndFeelStep;
