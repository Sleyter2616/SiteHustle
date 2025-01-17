export interface BrandIdentity {
  personality: string[]
  values: string[]
  tone: string[]
}

export interface ColorScheme {
  primary: string[]
  accent: string[]
  neutral: string[]
}

export interface Typography {
  headingFont: string
  bodyFont: string
  sizes: {
    h1: string
    h2: string
    h3: string
    body: string
    small: string
  }
}

export interface LogoAsset {
  url: string
  darkVersion?: string
  lightVersion?: string
  minSize: string
  spacing: string
  usage: {
    dos: string[]
    donts: string[]
  }
}

export interface ContentTemplate {
  id: string
  title: string
  template: string
  example: string
  completed: boolean
  content?: string
}

export interface SEOData {
  pageId: string
  title: string
  description: string
  keywords: string[]
  h1: string
  completed: boolean
}

export interface ImageAsset {
  id: string
  url: string
  alt: string
  type: 'hero' | 'product' | 'team' | 'background'
  dimensions: {
    width: number
    height: number
  }
  compressed: boolean
}

export interface Pillar4Data {
  userId: string
  progress: {
    completedTasks: number
    totalTasks: number
    currentPhase: 'branding' | 'content' | 'seo' | 'review'
    brandingCompleted: boolean
    contentCompleted: boolean
    seoCompleted: boolean
    reviewCompleted: boolean
  }
  branding: {
    identity: BrandIdentity
    colors: ColorScheme
    typography: Typography
    logo: LogoAsset
    styleGuideCompleted: boolean
  }
  content: {
    templates: ContentTemplate[]
    aiGenerated: boolean
    lastEdited: string
  }
  images: {
    assets: ImageAsset[]
    optimizationCompleted: boolean
  }
  seo: {
    pages: SEOData[]
    globalKeywords: string[]
    sitemap: boolean
  }
  review: {
    desktopChecked: boolean
    mobileChecked: boolean
    contentReviewed: boolean
    brandingConsistent: boolean
    feedback: string[]
  }
  createdAt: string
  updatedAt: string
}
