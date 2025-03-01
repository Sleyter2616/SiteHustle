import { FieldMapping } from './commonMappingTypes'

export const frontEndUIMapping: Record<string, FieldMapping> = {
  designStyle: {
    label: 'Desired Design Style',
    tooltip: 'Select a design style that reflects the look and feel of your site.',
    placeholder: 'Select one...',
    minLength: 3,
    inputType: 'dropdown',
    options: ['Minimalist', 'Modern', 'Vibrant', 'Professional'],
    errorMessage: 'Please select a design style.',
  },
  userExperience: {
    label: 'User Experience Goals',
    tooltip: 'Describe the experience you want your visitors to have (e.g., friendly, engaging, intuitive).',
    placeholder: 'Describe the desired user experience...',
    minLength: 10,
    inputType: 'textarea',
    errorMessage: 'User experience description must be at least 10 characters.',
  },
  keyContent: {
    label: 'Key Content Priorities',
    tooltip: 'What are the most important pieces of content or information to display on your site?',
    placeholder: 'e.g., products, services, company story...',
    minLength: 5,
    inputType: 'textarea',
    errorMessage: 'Please describe your key content priorities.',
  },
  competitorAnalysis: {
    label: 'Competitor Analysis',
    tooltip: 'List some competitor sites and what you like or dislike about them.',
    placeholder: 'e.g., Competitor A: modern design, Competitor B: engaging UX...',
    minLength: 10,
    inputType: 'textarea',
    errorMessage: 'Competitor analysis must be at least 10 characters.',
  },
  targetAudience: {
    label: 'Target Audience Description',
    tooltip: 'Describe who your website is for and what appeals to them.',
    placeholder: 'e.g., tech-savvy professionals, creative entrepreneurs...',
    minLength: 5,
    inputType: 'textarea',
    errorMessage: 'Target audience description must be at least 5 characters.',
  },
};
