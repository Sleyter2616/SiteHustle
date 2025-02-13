// src/mappings/businessLogicMapping.ts
import { FieldMapping } from './commonMappingTypes'; // Adjust if you have a common types file

export const businessLogicMapping: Record<string, FieldMapping> = {
  backendRequirements: {
    label: 'Backend Requirements',
    tooltip: 'Describe the essential backend features (e.g., user authentication, API endpoints, database structure).',
    placeholder: 'Enter your backend requirements...',
    minLength: 10,
    errorMessage: 'Please provide at least 10 characters for backend requirements.',
  },
    apiNeeds: {
      label: 'API Requirements',
      tooltip: 'Describe any specific API needs or integrations required for your backend.',
      placeholder: 'e.g., Payment gateways, third‑party integrations, custom endpoints',
      inputType: 'textarea',
      minLength: 10,
      errorMessage: 'API requirements must be at least 10 characters.',
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
  scalability: {
    label: 'Scalability Considerations',
    tooltip: 'Explain your scalability needs, such as handling high traffic or multi‑region deployment.',
    placeholder: 'Describe your scalability plans...',
    inputType: 'textarea',
    minLength: 10,
    errorMessage: 'Scalability considerations must be at least 10 characters.',
  },  // 4. Data Storage Preferences (Dropdown)
  dataStorage: {
    label: 'Data Storage Preferences',
    tooltip: 'Select your preferred type of data storage solution.',
    placeholder: 'Select a data storage option',
    inputType: 'dropdown',
    options: ['SQL', 'NoSQL', 'Hybrid'],
    minLength: 0,
    errorMessage: 'Please select a data storage option.',
  },
  // 5. Security Requirements (Textarea)
  securityRequirements: {
    label: 'Security Requirements',
    tooltip: 'Describe any critical security features you need (e.g., encryption, multi‑factor authentication).',
    placeholder: 'Enter your security requirements...',
    inputType: 'textarea',
    minLength: 10,
    errorMessage: 'Security requirements must be at least 10 characters.',
  },
};
