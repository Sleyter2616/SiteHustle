import { z } from 'zod'

export const pageTemplates = {
  home: {
    id: 'home',
    title: 'Home Page',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        required: true,
        completed: false
      },
      {
        id: 'features',
        title: 'Features/Benefits',
        required: true,
        completed: false
      },
      {
        id: 'cta',
        title: 'Call to Action',
        required: true,
        completed: false
      },
      {
        id: 'social-proof',
        title: 'Social Proof',
        required: false,
        completed: false
      }
    ],
    required: true,
    completed: false
  },
  about: {
    id: 'about',
    title: 'About Page',
    sections: [
      {
        id: 'story',
        title: 'Business Story',
        required: true,
        completed: false
      },
      {
        id: 'mission',
        title: 'Mission & Vision',
        required: true,
        completed: false
      },
      {
        id: 'team',
        title: 'Team Section',
        required: false,
        completed: false
      }
    ],
    required: true,
    completed: false
  },
  contact: {
    id: 'contact',
    title: 'Contact Page',
    sections: [
      {
        id: 'form',
        title: 'Contact Form',
        required: true,
        completed: false
      },
      {
        id: 'info',
        title: 'Contact Information',
        required: true,
        completed: false
      },
      {
        id: 'map',
        title: 'Location Map',
        required: false,
        completed: false
      }
    ],
    required: true,
    completed: false
  },
  services: {
    id: 'services',
    title: 'Products/Services Page',
    sections: [
      {
        id: 'listings',
        title: 'Product/Service Listings',
        required: true,
        completed: false
      },
      {
        id: 'pricing',
        title: 'Pricing Information',
        required: false,
        completed: false
      },
      {
        id: 'gallery',
        title: 'Image Gallery',
        required: false,
        completed: false
      }
    ],
    required: false,
    completed: false
  }
}

export type UsabilityTest = {
  id: string
  category: 'navigation' | 'forms' | 'layout' | 'cta' | 'performance'
  title: string
  description: string
  completed: boolean
}

export let usabilityTests: UsabilityTest[] = [
  {
    id: 'nav-links',
    category: 'navigation',
    title: 'Navigation Links',
    description: 'Verify all navigation links work correctly',
    completed: false
  },
  {
    id: 'mobile-resp',
    category: 'layout',
    title: 'Mobile Responsiveness',
    description: 'Test site layout on different screen sizes',
    completed: false
  },
  {
    id: 'forms',
    category: 'forms',
    title: 'Form Validation',
    description: 'Check all forms for proper validation',
    completed: false
  },
  {
    id: 'perf',
    category: 'performance',
    title: 'Load Times',
    description: 'Measure and optimize page load times',
    completed: false
  },
  {
    id: 'cta-check',
    category: 'cta',
    title: 'Call-to-Action',
    description: 'Test all CTA buttons and links',
    completed: false
  }
]

export const setupTasks = [
  {
    id: 'project-setup',
    title: 'Create New Project',
    description: 'Set up a new project in your chosen platform',
    required: true,
    completed: false
  },
  {
    id: 'global-styles',
    title: 'Define Global Styles',
    description: 'Set up basic typography and color scheme',
    required: true,
    completed: false
  },
  {
    id: 'meta-setup',
    title: 'Basic SEO Setup',
    description: 'Configure site title and meta description',
    required: true,
    completed: false
  },
  {
    id: 'domain-setup',
    title: 'Domain Setup',
    description: 'Connect custom domain (optional)',
    required: false,
    completed: false
  }
]

export const pillar3Schema = z.object({
  userId: z.string(),
  selectedPlatform: z.string(),
  progress: z.object({
    completedTasks: z.number(),
    totalTasks: z.number(),
    currentPhase: z.enum(['setup', 'pages', 'testing', 'refinement']),
    setupCompleted: z.boolean(),
    pagesCompleted: z.boolean(),
    testingCompleted: z.boolean(),
    refinementCompleted: z.boolean()
  }),
  setup: z.object({
    tasks: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      completed: z.boolean(),
      required: z.boolean()
    })),
    projectUrl: z.string().optional(),
    globalStyles: z.object({
      font: z.string().optional(),
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional()
    })
  }),
  pages: z.object({
    templates: z.array(z.object({
      id: z.string(),
      title: z.string(),
      sections: z.array(z.object({
        id: z.string(),
        title: z.string(),
        completed: z.boolean(),
        required: z.boolean()
      })),
      completed: z.boolean(),
      required: z.boolean()
    })),
    navigation: z.object({
      menuItems: z.array(z.string()),
      footerLinks: z.array(z.string())
    })
  }),
  testing: z.object({
    tests: z.array(z.object({
      id: z.string(),
      category: z.enum(['navigation', 'forms', 'layout', 'cta', 'performance']),
      title: z.string(),
      description: z.string(),
      completed: z.boolean()
    })),
    feedback: z.record(z.string())
  }),
  customDomain: z.object({
    domain: z.string(),
    connected: z.boolean()
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Pillar3Schema = z.infer<typeof pillar3Schema>

export const validatePillar3Data = (data: Pillar3Schema) => {
  const result = pillar3Schema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export const isPhaseComplete = (data: Pillar3Schema, phase: 'setup' | 'pages' | 'testing' | 'refinement'): boolean => {
  switch (phase) {
    case 'setup':
      return data.setup.tasks.every(task => !task.required || task.completed)
    case 'pages':
      return data.pages.templates.every(template => !template.required || template.completed)
    case 'testing':
      return data.testing.tests.every(test => test.completed)
    case 'refinement':
      return data.progress.refinementCompleted
    default:
      return false
  }
}

export const tooltips = {
  setup: {
    projectSetup: 'Create a new project in your chosen platform and configure basic settings',
    globalStyles: 'Define consistent typography, colors, and spacing for your site',
    metaSetup: 'Add site title, description, and basic SEO information',
    domainSetup: 'Connect a custom domain if you have one (optional)'
  },
  pages: {
    home: {
      hero: 'Create an attention-grabbing header section',
      features: 'List key features or benefits of your product/service',
      cta: 'Add clear call-to-action buttons',
      socialProof: 'Include testimonials or social proof (optional)'
    },
    about: {
      story: 'Share your business or personal story',
      mission: 'State your mission and vision',
      team: 'Add team member information (optional)'
    },
    contact: {
      form: 'Create a contact form with essential fields',
      info: 'Add contact information and business hours',
      map: 'Include a location map if relevant (optional)'
    }
  },
  testing: {
    navigation: 'Ensure all navigation links work correctly',
    forms: 'Test form submissions and validation',
    layout: 'Check layout on different devices',
    cta: 'Verify all call-to-action buttons work',
    performance: 'Monitor page load times and performance'
  }
}
