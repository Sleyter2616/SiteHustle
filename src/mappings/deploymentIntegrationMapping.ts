import { FieldMapping } from '@/types/wizard';

export const deploymentIntegrationMapping: Record<string, FieldMapping> = {
  hostingEnvironment: {
    label: 'Hosting Environment',
    tooltip: 'Select the hosting environment you plan to use.',
    placeholder: 'Select one...',
    minLength: 3,
    inputType: 'dropdown',
    options: ['AWS', 'Google Cloud', 'On-Premise', 'Hybrid'],
    errorMessage: 'Please select a hosting environment.',
  },
  containerization: {
    label: 'Containerization Strategy',
    tooltip: 'Indicate if you plan to use containerization for deployment.',
    placeholder: 'Select one...',
    minLength: 3,
    inputType: 'dropdown',
    options: ['Docker', 'Kubernetes', 'None'],
    errorMessage: 'Please select your containerization strategy.',
  },
  ciCdTools: {
    label: 'CI/CD Tools',
    tooltip: 'Which continuous integration/continuous deployment tools do you plan to use?',
    placeholder: 'e.g., Jenkins, GitHub Actions...',
    minLength: 3,
    inputType: 'textarea',
    errorMessage: 'Please list your CI/CD tools.',
  },
  monitoringStrategy: {
    label: 'Monitoring & Performance',
    tooltip: 'How will you monitor application performance and uptime?',
    placeholder: 'Describe your monitoring strategy...',
    minLength: 5,
    inputType: 'textarea',
    errorMessage: 'Monitoring strategy must be at least 5 characters.',
  },
  scalingPlan: {
    label: 'Scaling & Redundancy',
    tooltip: 'What is your plan for scaling your application and ensuring redundancy?',
    placeholder: 'Describe your scaling and backup plan...',
    minLength: 5,
    inputType: 'textarea',
    errorMessage: 'Scaling plan must be at least 5 characters.',
  },
};
