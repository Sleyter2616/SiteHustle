import { z } from 'zod'

export const contentTemplates = {
  headline: {
    id: 'headline',
    title: 'Main Headline',
    template: 'Transform [Audience\'s Need] with [Your Solution]',
    example: 'Transform Your Online Presence with AI-Powered Websites',
    completed: false
  },
  subheadline: {
    id: 'subheadline',
    title: 'Supporting Headline',
    template: 'Get [Benefit] without [Pain Point]',
    example: 'Get a Professional Website without Coding Skills',
    completed: false
  },
  valueProposition: {
    id: 'value-prop',
    title: 'Value Proposition',
    template: 'We help [target audience] achieve [desired outcome] through [your method/solution]',
    example: 'We help small businesses achieve online success through AI-powered website creation',
    completed: false
  },
  about: {
    id: 'about',
    title: 'About Section',
    template: '[Company Name] was founded to [mission/purpose]. We believe in [core value] and are committed to [promise to customers].',
    example: 'SiteHustle was founded to democratize web development. We believe in empowering entrepreneurs and are committed to making professional websites accessible to everyone.',
    completed: false
  },
  services: {
    id: 'services',
    title: 'Services Description',
    template: 'Our [service/product] helps you [benefit 1], [benefit 2], and [benefit 3]',
    example: 'Our AI website builder helps you create stunning designs, optimize for search engines, and launch faster than ever',
    completed: false
  }
} as const

export const brandPersonalities = [
  'Professional',
  'Innovative',
  'Friendly',
  'Trustworthy',
  'Creative',
  'Modern',
  'Traditional',
  'Luxurious',
  'Playful',
  'Minimalist'
] as const

export const colorSchemes = {
  modern: {
    primary: ['#5865F2', '#121212'],
    accent: ['#FF6B6B', '#4ECB71'],
    neutral: ['#F8F9FA', '#343A40']
  },
  minimal: {
    primary: ['#2D3748', '#FFFFFF'],
    accent: ['#4A5568', '#CBD5E0'],
    neutral: ['#EDF2F7', '#1A202C']
  },
  bold: {
    primary: ['#6C63FF', '#2D3748'],
    accent: ['#FF6584', '#48BB78'],
    neutral: ['#F7FAFC', '#2D3748']
  }
} as const

export const fontPairings = [
  {
    heading: 'Poppins',
    body: 'Inter',
    style: 'Modern Sans-Serif'
  },
  {
    heading: 'Playfair Display',
    body: 'Source Sans Pro',
    style: 'Classic Serif + Sans'
  },
  {
    heading: 'Montserrat',
    body: 'Open Sans',
    style: 'Clean Professional'
  }
]

export type FontPairing = {
  heading: string
  body: string
  style: string
}

export const seoChecklist = [
  {
    id: 'titles',
    title: 'Page Titles',
    description: 'Each page needs a unique, keyword-rich title under 60 characters',
    required: true
  },
  {
    id: 'meta',
    title: 'Meta Descriptions',
    description: 'Compelling meta descriptions under 160 characters',
    required: true
  },
  {
    id: 'headers',
    title: 'Header Structure',
    description: 'Proper H1-H6 hierarchy with keywords',
    required: true
  },
  {
    id: 'images',
    title: 'Image Optimization',
    description: 'Alt text and compressed images',
    required: true
  },
  {
    id: 'internal-links',
    title: 'Internal Linking',
    description: 'Connect related pages naturally',
    required: false
  }
] as const

export const pillar4Schema = z.object({
  userId: z.string(),
  progress: z.object({
    completedTasks: z.number(),
    totalTasks: z.number(),
    currentPhase: z.enum(['branding', 'content', 'seo', 'review']),
    brandingCompleted: z.boolean(),
    contentCompleted: z.boolean(),
    seoCompleted: z.boolean(),
    reviewCompleted: z.boolean()
  }),
  branding: z.object({
    identity: z.object({
      personality: z.array(z.string()),
      values: z.array(z.string()),
      tone: z.array(z.string())
    }),
    colors: z.object({
      primary: z.array(z.string()),
      accent: z.array(z.string()),
      neutral: z.array(z.string())
    }),
    typography: z.object({
      headingFont: z.string(),
      bodyFont: z.string(),
      sizes: z.object({
        h1: z.string(),
        h2: z.string(),
        h3: z.string(),
        body: z.string(),
        small: z.string()
      })
    }),
    logo: z.object({
      url: z.string(),
      darkVersion: z.string().optional(),
      lightVersion: z.string().optional(),
      minSize: z.string(),
      spacing: z.string(),
      usage: z.object({
        dos: z.array(z.string()),
        donts: z.array(z.string())
      })
    }),
    styleGuideCompleted: z.boolean()
  }),
  content: z.object({
    templates: z.array(z.object({
      id: z.string(),
      title: z.string(),
      template: z.string(),
      example: z.string(),
      completed: z.boolean(),
      content: z.string().optional()
    })),
    aiGenerated: z.boolean(),
    lastEdited: z.string()
  }),
  images: z.object({
    assets: z.array(z.object({
      id: z.string(),
      url: z.string(),
      alt: z.string(),
      type: z.enum(['hero', 'product', 'team', 'background']),
      dimensions: z.object({
        width: z.number(),
        height: z.number()
      }),
      compressed: z.boolean()
    })),
    optimizationCompleted: z.boolean()
  }),
  seo: z.object({
    pages: z.array(z.object({
      pageId: z.string(),
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()),
      h1: z.string(),
      completed: z.boolean()
    })),
    globalKeywords: z.array(z.string()),
    sitemap: z.boolean()
  }),
  review: z.object({
    desktopChecked: z.boolean(),
    mobileChecked: z.boolean(),
    contentReviewed: z.boolean(),
    brandingConsistent: z.boolean(),
    feedback: z.array(z.string())
  }),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Pillar4Schema = z.infer<typeof pillar4Schema>

export const validatePillar4Data = (data: Pillar4Schema) => {
  const result = pillar4Schema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export const tooltips = {
  branding: {
    identity: 'Define your brand personality and values',
    colors: 'Choose colors that reflect your brand identity',
    typography: 'Select fonts that enhance readability and brand image',
    logo: 'Upload or create your logo with usage guidelines'
  },
  content: {
    templates: 'Fill in templates to create consistent messaging',
    aiTools: 'Use AI tools to generate initial content drafts',
    review: 'Review and edit content for brand alignment'
  },
  seo: {
    titles: 'Create compelling page titles (50-60 characters)',
    meta: 'Write engaging meta descriptions (150-160 characters)',
    keywords: 'Include relevant keywords naturally in content',
    structure: 'Use proper heading hierarchy (H1-H6)'
  },
  images: {
    optimization: 'Compress images for faster loading',
    alt: 'Add descriptive alt text for accessibility',
    consistency: 'Maintain consistent image style and quality'
  }
}
