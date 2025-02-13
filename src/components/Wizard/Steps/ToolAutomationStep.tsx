'use client';
import React from 'react';
import GenericStep from '../GenericStep';
import { toolAutomationMapping } from '@/mappings/toolAutomationMapping';
import { ToolAutomationForm } from '@/types/toolAutomation';
import { StepComponentProps } from '@/types/wizard';

const ToolAutomationStep: React.FC<StepComponentProps<ToolAutomationForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <GenericStep<ToolAutomationForm>
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
        fieldMappings={toolAutomationMapping}
      />
      {/* Optionally, add extra instructions here */}
    </div>
  );
};

export default ToolAutomationStep;
