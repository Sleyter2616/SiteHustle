// src/mappings/lookAndFeelMapping.ts
import { FieldMapping } from './commonMappingTypes' 

export const lookAndFeelMapping: Record<string, FieldMapping> = {
  // 1. Design Style (Dropdown)
  designStyle: {
    label: 'Design Style',
    tooltip: 'Select the visual style that best represents your website (e.g., Minimalist, Modern, Vibrant, Professional, Rustic).',
    placeholder: 'Select your design style',
    inputType: 'dropdown',
    options: ['Minimalist', 'Modern', 'Vibrant', 'Professional', 'Rustic'],
    minLength: 0,
    errorMessage: 'Please select your design style.',
  },
  // 2. Tone & Language (Dropdown)
  tone: {
    label: 'Tone & Language',
    tooltip: 'Select the tone you want your website to convey (e.g., Friendly, Authoritative, Casual, Formal, Humorous).',
    placeholder: 'Select your brand tone',
    inputType: 'dropdown',
    options: ['Friendly', 'Authoritative', 'Casual', 'Formal', 'Humorous'],
    minLength: 0,
    errorMessage: 'Please select the tone for your website.',
  },
  // 3. User Experience Focus (Dropdown)
  userExperience: {
    label: 'User Experience Focus',
    tooltip: 'Select the type of user experience you want to create (e.g., Intuitive, Engaging, Minimalistic, Interactive, Personalized).',
    placeholder: 'Select user experience focus',
    inputType: 'dropdown',
    options: ['Intuitive', 'Engaging', 'Minimalistic', 'Interactive', 'Personalized'],
    minLength: 0,
    errorMessage: 'Please select a user experience focus.',
  },
  // 4. Competitor Analysis (Textarea)
  competitorAnalysis: {
    label: 'Competitor Analysis',
    tooltip: 'List at least two competitors and describe what differentiates your brand from them.',
    placeholder: 'Enter competitor names and differentiation points',
    inputType: 'textarea',
    minLength: 10,
    errorMessage: 'Competitor analysis must be at least 10 characters.',
  },
  // 5. Target Audience (Textarea)
  targetAudience: {
    label: 'Primary Target Audience',
    tooltip: 'Describe your primary target audience and their characteristics.',
    placeholder: 'Enter details about your target audience...',
    inputType: 'textarea',
    minLength: 10,
    errorMessage: 'Target audience description must be at least 10 characters.',
  },
};