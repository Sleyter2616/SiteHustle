import { z } from 'zod'

export const aiModules = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Learn the basics of AI and how it can enhance your website',
    topics: [
      'Understanding AI capabilities',
      'Common AI use cases',
      'AI safety and ethics'
    ],
    project: {
      title: 'AI Integration Plan',
      steps: [
        'Identify potential AI use cases',
        'Evaluate implementation requirements',
        'Create an integration roadmap'
      ]
    },
    required: true,
    completed: false
  },
  {
    id: 'content-automation',
    title: 'AI for Content Automation',
    description: 'Master AI tools for content creation and management',
    topics: [
      'Content generation basics',
      'Image and media creation',
      'Content optimization'
    ],
    project: {
      title: 'Automated Content Workflow',
      steps: [
        'Set up content templates',
        'Configure AI tools',
        'Create test content'
      ]
    },
    required: true,
    completed: false
  },
  {
    id: 'advanced-workflows',
    title: 'Advanced AI Workflows',
    description: 'Build sophisticated AI-powered automation',
    topics: [
      'Multi-tool integration',
      'Custom workflows',
      'Performance optimization'
    ],
    project: {
      title: 'Custom AI Pipeline',
      steps: [
        'Design workflow architecture',
        'Implement integrations',
        'Test and optimize'
      ]
    },
    required: false,
    completed: false
  }
] as const

export const toolCategories = [
  {
    id: 'no-code',
    title: 'No-Code Platforms',
    description: 'Website builders and visual development tools',
    options: [
      'Webflow',
      'Bubble',
      'Wix',
      'Squarespace'
    ]
  },
  {
    id: 'automation',
    title: 'Automation Tools',
    description: 'Workflow and integration platforms',
    options: [
      'Zapier',
      'Make (Integromat)',
      'n8n',
      'Automate.io'
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    description: 'AI-powered content and automation tools',
    options: [
      'ChatGPT',
      'Midjourney',
      'Copy.ai',
      'Jasper'
    ]
  }
] as const

export const matrixCriteria = [
  {
    id: 'cost',
    title: 'Cost',
    description: 'Monthly or annual subscription fees',
    weight: 0.2
  },
  {
    id: 'ease-of-use',
    title: 'Ease of Use',
    description: 'Learning curve and user-friendliness',
    weight: 0.2
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Built-in AI features or API access',
    weight: 0.15
  },
  {
    id: 'design-flexibility',
    title: 'Design Flexibility',
    description: 'Customization and design options',
    weight: 0.15
  },
  {
    id: 'community',
    title: 'Community Support',
    description: 'Active community and resources',
    weight: 0.15
  },
  {
    id: 'learning',
    title: 'Learning Resources',
    description: 'Documentation and tutorials',
    weight: 0.15
  }
] as const

export const pillar2Schema = z.object({
  userId: z.string(),
  progress: z.object({
    completedTasks: z.number(),
    totalTasks: z.number(),
    aiBootcamp: z.object({
      modules: z.array(z.object({
        moduleId: z.string(),
        completed: z.boolean(),
        startedAt: z.string().optional(),
        completedAt: z.string().optional(),
        projectSubmitted: z.boolean()
      }))
    }),
    toolSetup: z.object({
      tools: z.array(z.object({
        toolId: z.string(),
        completed: z.boolean(),
        completedSteps: z.array(z.string())
      }))
    }),
    matrixCompleted: z.boolean()
  }),
  selectedTools: z.object({
    primary: z.string(),
    secondary: z.array(z.string())
  }),
  matrixScores: z.record(z.object({
    cost: z.number(),
    easeOfUse: z.number(),
    aiIntegration: z.number(),
    designFlexibility: z.number(),
    communitySupport: z.number(),
    learningResources: z.number(),
    totalScore: z.number(),
    notes: z.string()
  })),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Pillar2Schema = z.infer<typeof pillar2Schema>

export const validatePillar2Data = (data: Pillar2Schema) => {
  const result = pillar2Schema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export const calculateToolScore = (scores: Record<string, number>, weights = matrixCriteria) => {
  return weights.reduce((total, criterion) => {
    return total + (scores[criterion.id] || 0) * criterion.weight
  }, 0)
}

export const tooltips = {
  aiBootcamp: {
    'ai-fundamentals': 'Learn the core concepts of AI and its applications in web development',
    'content-automation': 'Master AI tools for creating and managing website content',
    'advanced-workflows': 'Build sophisticated automation pipelines with multiple AI tools'
  },
  toolSelection: {
    'no-code': 'Choose your primary website building platform',
    'automation': 'Select tools for automating repetitive tasks',
    'ai-tools': 'Pick AI-powered tools for content and automation'
  },
  matrix: {
    cost: 'Consider both free and paid tiers',
    'ease-of-use': 'Evaluate the learning curve',
    'ai-integration': 'Check AI features and integration options',
    'design-flexibility': 'Assess customization capabilities',
    community: 'Look for active user communities',
    learning: 'Check available tutorials and documentation'
  }
}
