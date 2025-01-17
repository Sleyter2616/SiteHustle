export interface DomainConfig {
  provider: string
  domain: string
  configured: boolean
  ssl: boolean
  dnsRecords: {
    type: 'A' | 'CNAME' | 'TXT' | 'MX'
    name: string
    value: string
    configured: boolean
  }[]
}

export interface Analytics {
  provider: 'google' | 'plausible' | 'fathom' | 'custom'
  trackingId: string
  configured: boolean
  additionalTools: {
    name: string
    configured: boolean
    notes: string
  }[]
}

export interface PerformanceTest {
  tool: 'PageSpeed' | 'GTmetrix' | 'WebPageTest'
  date: string
  scores: {
    performance: number
    accessibility: number
    seo: number
    bestPractices: number
  }
  metrics: {
    fcp: number // First Contentful Paint
    lcp: number // Largest Contentful Paint
    tti: number // Time to Interactive
    tbt: number // Total Blocking Time
    cls: number // Cumulative Layout Shift
  }
  recommendations: string[]
}

export type ScalabilityFeatureName = 
  | "Blog Integration"
  | "E-commerce Setup"
  | "Membership Area"
  | "Multilingual Support"
  | string;

export type ScalabilityFeatureCategory = 
  | 'blog'
  | 'ecommerce'
  | 'membership'
  | 'multilingual'
  | 'other';

export type Priority = 'high' | 'medium' | 'low';
export type Timeline = 'short' | 'medium' | 'long';

export interface ScalabilityFeature {
  name: ScalabilityFeatureName;
  category: ScalabilityFeatureCategory;
  priority: Priority;
  timeline: Timeline;
  requirements: readonly string[];
  estimatedCost: string;
  implemented: boolean;
  notes: string;
}

export interface MaintenanceLog {
  date: string
  type: 'update' | 'backup' | 'content' | 'performance' | 'security'
  description: string
  changes: string[]
  successful: boolean
}

export interface Pillar5Data {
  userId: string
  progress: {
    completedTasks: number
    totalTasks: number
    currentPhase: 'domain' | 'analytics' | 'performance' | 'scalability' | 'launch' | 'maintenance'
    domainConfigured: boolean
    analyticsConfigured: boolean
    performanceTested: boolean
    scalabilityPlanned: boolean
    launched: boolean
    maintenanceScheduled: boolean
  }
  domain: {
    config: DomainConfig
    prelaunchChecks: {
      ssl: boolean
      mobileFriendly: boolean
      crossBrowser: boolean
      backupCreated: boolean
      redirectsConfigured: boolean
    }
  }
  analytics: {
    setup: Analytics
    goals: {
      name: string
      configured: boolean
    }[]
  }
  performance: {
    tests: PerformanceTest[]
    optimizations: {
      name: string
      status: 'pending' | 'in-progress' | 'completed' | 'skipped'
      impact: 'high' | 'medium' | 'low'
    }[]
  }
  scalability: {
    features: ScalabilityFeature[]
    documentation: {
      type: string
      url: string
      lastUpdated: string
    }[]
  }
  maintenance: {
    schedule: {
      task: string
      frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
      lastRun: string
      nextRun: string
    }[]
    logs: MaintenanceLog[]
  }
  createdAt: string
  updatedAt: string
}
