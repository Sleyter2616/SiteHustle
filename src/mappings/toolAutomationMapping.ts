// src/mappings/toolAutomationMapping.ts
import { FieldMapping } from './commonMappingTypes';

export const toolAutomationMapping: Record<string, FieldMapping> = {
  // 1. Technical Expertise Level (Dropdown)
  techExpertise: {
    label: 'Technical Expertise Level',
    tooltip: 'Select your level of technical expertise.',
    placeholder: 'Select your expertise level',
    inputType: 'dropdown',
    options: ['Beginner', 'Intermediate', 'Expert'],
    minLength: 0,
    errorMessage: 'Please select your technical expertise level.',
  },
  // 2. Automation Preferences (Checkbox Group)
  automationPreferences: {
    label: 'Automation Preferences',
    tooltip: 'Select all automation tools you plan to use.',
    placeholder: 'Select one or more automation options',
    inputType: 'checkboxGroup',
    options: [
      'Email Automation',
      'Social Media Scheduling',
      'CRM Integration',
      'Inventory Management',
      'Workflow Automation'
    ],
    isArray: true,
    minLength: 1,
    errorMessage: 'Please select at least one automation preference.',
  },
  // 3. Integration Needs (Checkbox Group)
  integrationNeeds: {
    label: 'Integration Needs',
    tooltip: 'Select the types of integrations required for your business (e.g., Payment Gateways, Analytics, Marketing Automation, ERP, Others).',
    placeholder: 'Select one or more integration options',
    inputType: 'checkboxGroup',
    options: ['Payment Gateways', 'Analytics', 'Marketing Automation', 'ERP', 'Others'],
    isArray: true,
    minLength: 1,
    errorMessage: 'Please select at least one integration need.',
  },
  // 4. Additional Automation Notes (Textarea)
  additionalNotes: {
    label: 'Additional Automation Notes',
    tooltip: 'Provide any additional details regarding your tool or automation requirements.',
    placeholder: 'Enter any additional notes here...',
    inputType: 'textarea',
    minLength: 0,
    errorMessage: '',
  },
  // 5. Preferred Tool Platform (Dropdown)
  preferredTool: {
    label: 'Preferred Tool Platforms',
    tooltip: 'Select your preferred platforms for tools/automation (if any).',
    placeholder: 'Select a tool platform (optional)',
    inputType: 'dropdown',
    options: ['Zapier', 'n8n', 'Make', 'Custom API', 'Other'],
    minLength: 0,
    errorMessage: '',
  },
};