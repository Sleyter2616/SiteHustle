'use client';
import React from 'react';
import GenericStep from '../GenericStep';
import { lookAndFeelMapping } from '@/mappings/lookAndFeelMapping';
import { LookAndFeelForm } from '@/types/lookAndFeel';
import { StepComponentProps } from '@/types/wizard';

const LookAndFeelStep: React.FC<StepComponentProps<LookAndFeelForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <GenericStep<LookAndFeelForm>
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
        fieldMappings={lookAndFeelMapping}
      />
    </div>
  );
};

export default LookAndFeelStep;
