// src/types/businessLogic.ts
export interface BusinessLogicForm {
  backendRequirements: string;
  monetizationStrategy: string;
  thirdPartyIntegrations: string[]; // Expect an array of integration names or details
  scalabilityNeeds: string;
}
