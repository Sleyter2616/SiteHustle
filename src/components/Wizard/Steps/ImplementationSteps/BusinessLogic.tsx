'use client';
import React from 'react';
import GenericStep from '@/components/Wizard/Steps/GenericStep';
import { businessLogicMapping } from '@/mappings/businessLogicMapping';
import { BusinessLogicForm, StepComponentProps } from '@/types/wizard';

const BusinessLogic: React.FC<StepComponentProps<BusinessLogicForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Backend Architecture & Logic</h2>
      <GenericStep<BusinessLogicForm>
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
        fieldMappings={businessLogicMapping}
      />
    </div>
  );
};

export default BusinessLogic;
