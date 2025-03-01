'use client';
import React from 'react';
import GenericStep from '@/components/Wizard/Steps/GenericStep';
import { frontEndUIMapping } from '@/mappings/frontEndUIMapping';
import { FrontEndUIForm, StepComponentProps } from '@/types/wizard';

const FrontEndUI: React.FC<StepComponentProps<FrontEndUIForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Frontend & UI Integration</h2>
      <GenericStep<FrontEndUIForm>
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
        fieldMappings={frontEndUIMapping}
      />
    </div>
  );
};

export default FrontEndUI;
