'use client';
import React from 'react';
import GenericStep from '../GenericStep';
import { businessLogicMapping } from '@/mappings/businessLogicMapping';
import { BusinessLogicForm } from '@/types/businessLogic';
import { StepComponentProps } from '@/types/wizard';

const BusinessLogicStep: React.FC<StepComponentProps<BusinessLogicForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <GenericStep<BusinessLogicForm>
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
        fieldMappings={businessLogicMapping}
      />
    </div>
  );
};

export default BusinessLogicStep;
