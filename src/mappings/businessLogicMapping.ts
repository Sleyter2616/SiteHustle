// src/mappings/businessLogicMapping.ts
import { FieldMapping } from './commonTypes'; // Adjust if you have a common types file

export interface FieldMapping {
  label: string;
  tooltip: string;
  placeholder: string;
  minLength?: number;
  isArray?: boolean;
  errorMessage?: string;
  inputType?: 'textarea' | 'dropdown' | 'checkboxGroup';
  options?: string[];
}

export const businessLogicMapping: Record<string, FieldMapping> = {
  backendRequirements: {
    label: 'Backend Requirements',
    tooltip: 'Describe the essential backend features (e.g., user authentication, API endpoints, database structure).',
    placeholder: 'Enter your backend requirements...',
    minLength: 10,
    errorMessage: 'Please provide at least 10 characters for backend requirements.',
  },
  monetizationStrategy: {
    label: 'Monetization Strategy',
    tooltip: 'How will your business earn revenue? (e.g., subscriptions, one-time sales, freemium, ads, affiliate)',
    placeholder: 'Describe your monetization strategy...',
    minLength: 5,
    errorMessage: 'Monetization strategy must be at least 5 characters.',
  },
  thirdPartyIntegrations: {
    label: 'Third-Party Integrations',
    tooltip: 'List any external services (e.g., payment processors, CRMs, analytics tools) you plan to integrate.',
    placeholder: 'Enter integration details...',
    isArray: true,
    minLength: 3,
    errorMessage: 'Each integration detail must be at least 3 characters.',
  },
  scalabilityNeeds: {
    label: 'Scalability Needs',
    tooltip: 'Describe your expected traffic, load, or performance requirements.',
    placeholder: 'Enter your scalability requirements...',
    minLength: 5,
    errorMessage: 'Scalability requirements must be at least 5 characters.',
  },
};
