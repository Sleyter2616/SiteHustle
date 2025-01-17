import { z } from 'zod'

export const domainProviders = [
  'GoDaddy',
  'Namecheap',
  'Google Domains',
  'Cloudflare',
  'Route53',
  'Other'
] as const

export const analyticsTools = [
  {
    name: 'Google Analytics',
    description: 'Comprehensive web analytics platform',
    setupGuide: 'https://analytics.google.com/analytics/web/'
  },
  {
    name: 'Google Search Console',
    description: 'Monitor search performance and issues',
    setupGuide: 'https://search.google.com/search-console'
  },
  {
    name: 'Hotjar',
    description: 'Heatmaps and user behavior analytics',
    setupGuide: 'https://www.hotjar.com/'
  }
] as const

export const performanceTools = [
  {
    name: 'PageSpeed Insights',
    url: 'https://pagespeed.web.dev/',
    metrics: ['FCP', 'LCP', 'TTI', 'TBT', 'CLS']
  },
  {
    name: 'GTmetrix',
    url: 'https://gtmetrix.com/',
    metrics: ['Performance', 'Structure', 'LCP', 'CLS']
  }
] as const

export const scalabilityFeatures = [
  {
    name: 'Blog Integration',
    category: 'blog',
    description: 'Add a blog for content marketing and SEO',
    requirements: [
      'Content Management System',
      'Category/Tag System',
      'RSS Feed'
    ]
  },
  {
    name: 'E-commerce Setup',
    category: 'ecommerce',
    description: 'Sell products or services online',
    requirements: [
      'Payment Processing',
      'Product Management',
      'Shopping Cart',
      'Order System'
    ]
  },
  {
    name: 'Membership Area',
    category: 'membership',
    description: 'Create gated content or premium features',
    requirements: [
      'User Authentication',
      'Payment Plans',
      'Member Dashboard',
      'Protected Content'
    ]
  },
  {
    name: 'Multilingual Support',
    category: 'multilingual',
    description: 'Add multiple language versions',
    requirements: [
      'Language Selector',
      'Content Translation',
      'URL Structure',
      'SEO Meta Tags'
    ]
  }
] as const

export const maintenanceTasks = [
  {
    name: 'Backup Database',
    frequency: 'weekly',
    priority: 'high',
    description: 'Create full backup of site data'
  },
  {
    name: 'Update Content',
    frequency: 'monthly',
    priority: 'medium',
    description: 'Review and refresh site content'
  },
  {
    name: 'Performance Check',
    frequency: 'monthly',
    priority: 'medium',
    description: 'Run speed tests and optimize'
  },
  {
    name: 'Security Scan',
    frequency: 'monthly',
    priority: 'high',
    description: 'Check for vulnerabilities'
  }
] as const

export const tooltips = {
  domain: {
    setup: 'Configure your custom domain and DNS settings',
    ssl: 'Enable HTTPS for secure connections',
    dns: 'Set up DNS records for domain routing'
  },
  analytics: {
    tracking: 'Install analytics to monitor traffic',
    goals: 'Set up conversion tracking',
    tools: 'Additional monitoring tools'
  },
  performance: {
    testing: 'Run speed and optimization tests',
    optimization: 'Implement performance improvements',
    monitoring: 'Track site performance over time'
  },
  scalability: {
    planning: 'Plan future feature additions',
    documentation: 'Document technical requirements',
    timeline: 'Create implementation schedule'
  },
  maintenance: {
    schedule: 'Set up regular maintenance tasks',
    monitoring: 'Track site health and updates',
    backup: 'Configure backup procedures'
  }
}

export const pillar5Schema = z.object({
  userId: z.string(),
  progress: z.object({
    completedTasks: z.number(),
    totalTasks: z.number(),
    currentPhase: z.enum(['domain', 'analytics', 'performance', 'scalability', 'launch', 'maintenance']),
    domainConfigured: z.boolean(),
    analyticsConfigured: z.boolean(),
    performanceTested: z.boolean(),
    scalabilityPlanned: z.boolean(),
    launched: z.boolean(),
    maintenanceScheduled: z.boolean()
  }),
  domain: z.object({
    config: z.object({
      provider: z.string(),
      domain: z.string(),
      configured: z.boolean(),
      ssl: z.boolean(),
      dnsRecords: z.array(z.object({
        type: z.enum(['A', 'CNAME', 'TXT', 'MX']),
        name: z.string(),
        value: z.string(),
        configured: z.boolean()
      }))
    }),
    prelaunchChecks: z.object({
      ssl: z.boolean(),
      mobileFriendly: z.boolean(),
      crossBrowser: z.boolean(),
      backupCreated: z.boolean(),
      redirectsConfigured: z.boolean()
    })
  }),
  analytics: z.object({
    setup: z.object({
      provider: z.enum(['google', 'plausible', 'fathom', 'custom']),
      trackingId: z.string(),
      configured: z.boolean(),
      additionalTools: z.array(z.object({
        name: z.string(),
        configured: z.boolean(),
        notes: z.string()
      }))
    }),
    goals: z.array(z.object({
      name: z.string(),
      configured: z.boolean()
    }))
  }),
  performance: z.object({
    tests: z.array(z.object({
      tool: z.enum(['PageSpeed', 'GTmetrix', 'WebPageTest']),
      date: z.string(),
      scores: z.object({
        performance: z.number(),
        accessibility: z.number(),
        seo: z.number(),
        bestPractices: z.number()
      }),
      metrics: z.object({
        fcp: z.number(),
        lcp: z.number(),
        tti: z.number(),
        tbt: z.number(),
        cls: z.number()
      }),
      recommendations: z.array(z.string())
    })),
    optimizations: z.array(z.object({
      name: z.string(),
      status: z.enum(['pending', 'in-progress', 'completed', 'skipped']),
      impact: z.enum(['high', 'medium', 'low'])
    }))
  }),
  scalability: z.object({
    features: z.array(z.object({
      name: z.string(),
      category: z.enum(['blog', 'ecommerce', 'membership', 'multilingual', 'other']),
      priority: z.enum(['high', 'medium', 'low']),
      timeline: z.enum(['short', 'medium', 'long']),
      requirements: z.array(z.string()),
      estimatedCost: z.string(),
      implemented: z.boolean(),
      notes: z.string()
    })),
    documentation: z.array(z.object({
      type: z.string(),
      url: z.string(),
      lastUpdated: z.string()
    }))
  }),
  maintenance: z.object({
    schedule: z.array(z.object({
      task: z.string(),
      frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly']),
      lastRun: z.string(),
      nextRun: z.string()
    })),
    logs: z.array(z.object({
      date: z.string(),
      type: z.enum(['update', 'backup', 'content', 'performance', 'security']),
      description: z.string(),
      changes: z.array(z.string()),
      successful: z.boolean()
    }))
  }),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Pillar5Schema = z.infer<typeof pillar5Schema>

export const validatePillar5Data = (data: Pillar5Schema) => {
  const result = pillar5Schema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}
