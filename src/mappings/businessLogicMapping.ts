// src/mappings/businessLogicMapping.ts
import { FieldMapping } from './commonMappingTypes';

export const businessLogicMapping: Record<string, FieldMapping> = {
  backendArchitecture: {
    label: 'Preferred Backend Architecture',
    tooltip: 'Select whether you prefer a monolithic system, microservices, or a serverless architecture.',
    placeholder: 'Select one...',
    minLength: 3,
    inputType: 'dropdown',
    options: ['Monolithic', 'Microservices', 'Serverless'],
    errorMessage: 'Please select a backend architecture.',
  },
  programmingLanguages: {
    label: 'Programming Languages/Technologies',
    tooltip: 'List the languages or technologies you are comfortable with (e.g., JavaScript, Python).',
    placeholder: 'e.g., JavaScript, Python',
    minLength: 2,
    inputType: 'textarea',
    errorMessage: 'Please specify at least one programming language or technology.',
  },
  apiIntegrationNeeds: {
    label: 'API Integration Needs',
    tooltip: 'Describe the types of API integrations you require (e.g., payment processing, third-party services).',
    placeholder: 'Describe your API integration needs...',
    minLength: 10,
    inputType: 'textarea',
    errorMessage: 'API integration details must be at least 10 characters.',
  },
  dataStorageStrategy: {
    label: 'Data Storage & Management',
    tooltip: 'How do you plan to store and manage your data? (e.g., SQL, NoSQL, cloud databases)',
    placeholder: 'e.g., SQL, NoSQL, cloud storage...',
    minLength: 5,
    inputType: 'textarea',
    errorMessage: 'Please describe your data storage strategy.',
  },
  securityRequirements: {
    label: 'Security Requirements',
    tooltip: 'What security measures are critical for your system? (e.g., authentication, encryption)',
    placeholder: 'Describe your security requirements...',
    minLength: 5,
    inputType: 'textarea',
    errorMessage: 'Security requirements must be specified in at least 5 characters.',
  },
};
