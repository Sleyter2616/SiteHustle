// src/mappings/lookAndFeelMapping.ts
import { FieldMapping } from './commonTypes'; // Adjust as necessary

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

export const lookAndFeelMapping: Record<string, FieldMapping> = {
  designStyle: {
    label: 'Design Style',
    tooltip: 'How would you describe your preferred design style? (e.g., minimalist, modern, vibrant, professional)',
    placeholder: 'Enter your design style...',
    minLength: 3,
    errorMessage: 'Design style must be at least 3 characters.',
  },
  brandVoice: {
    label: 'Brand Voice & Tone',
    tooltip: 'What tone should your brand use? (e.g., formal, casual, friendly, authoritative)',
    placeholder: 'Enter your brand voice and tone...',
    minLength: 3,
    errorMessage: 'Brand voice must be at least 3 characters.',
  },
  uiUxPreferences: {
    label: 'UI/UX Preferences',
    tooltip: 'Describe any specific UI/UX elements or user experience features you desire.',
    placeholder: 'Enter your UI/UX preferences...',
    minLength: 5,
    errorMessage: 'UI/UX preferences must be at least 5 characters.',
  },
  competitorInspiration: {
    label: 'Competitor Inspiration',
    tooltip: 'List examples of competitor websites or designs that inspire you.',
    placeholder: 'Enter competitor websites or design elements...',
    isArray: true,
    minLength: 3,
    errorMessage: 'Each competitor example must be at least 3 characters.',
  },
};
