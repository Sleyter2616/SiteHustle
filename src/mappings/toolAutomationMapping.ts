
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

export const toolAutomationMapping: Record<string, FieldMapping> = {
  techExpertise: {
    label: 'Technical Expertise Level',
    tooltip: 'Select your current level of technical expertise.',
    placeholder: 'Select your expertise',
    minLength: 1,
    errorMessage: 'Please select your technical expertise level.',
    inputType: 'dropdown',
    options: ['Beginner', 'Intermediate', 'Expert'],
  },
  automationPreferences: {
    label: 'Automation Preferences',
    tooltip: 'Select one or more automation areas you wish to implement.',
    placeholder: 'Select automation options',
    minLength: 1,
    errorMessage: 'Please select at least one automation preference.',
    inputType: 'checkboxGroup',
    options: ['Email Automation', 'Social Media Scheduling', 'CRM Integration', 'Inventory Management'],
  },
  additionalNotes: {
    label: 'Additional Notes',
    tooltip: 'Any additional details or specific requirements for your automation setup.',
    placeholder: 'Enter any extra details...',
    minLength: 0,
    errorMessage: '',
    inputType: 'textarea',
  }
};
