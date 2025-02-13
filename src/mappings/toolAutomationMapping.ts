import { FieldMapping } from './commonTypes'; // Adjust the import if you have a shared types file

export interface FieldMapping {
  label: string;
  tooltip: string;
  placeholder: string;
  minLength?: number;
  isArray?: boolean;
  errorMessage?: string;
}

export const toolAutomationMapping: Record<string, FieldMapping> = {
  techExpertise: {
    label: 'Technical Expertise Level',
    tooltip: 'Select your current level of technical expertise.',
    placeholder: 'Select your expertise',
    minLength: 1,
    errorMessage: 'Please select your technical expertise level.',
  },
  automationPreferences: {
    label: 'Automation Preferences',
    tooltip: 'Select one or more automation areas you wish to implement.',
    placeholder: 'Select automation options (e.g., Email Automation, CRM Integration, etc.)',
    minLength: 1,
    isArray: true,
    errorMessage: 'Please select at least one automation preference.',
  },
  additionalNotes: {
    label: 'Additional Notes',
    tooltip: 'Any additional details or specific requirements for your automation setup.',
    placeholder: 'Enter any extra details...',
    minLength: 0,
    errorMessage: '',
  }
};
