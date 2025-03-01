'use client';
import React from 'react';
import GenericStep from '@/components/Wizard/Steps/GenericStep';
import { deploymentIntegrationMapping } from '@/mappings/deploymentIntegrationMapping';
import { DeploymentIntegrationForm, StepComponentProps } from '@/types/wizard';

const DeploymentIntegration: React.FC<StepComponentProps<DeploymentIntegrationForm>> = ({ data, onDataChange, isActive }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Deployment & Integration Strategy</h2>
      <GenericStep<DeploymentIntegrationForm>
        data={data}
        onDataChange={onDataChange}
        isActive={isActive}
        fieldMappings={deploymentIntegrationMapping}
      />
    </div>
  );
};

export default DeploymentIntegration;
