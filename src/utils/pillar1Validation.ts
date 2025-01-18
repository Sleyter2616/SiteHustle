import { z } from 'zod'

export const worksheetSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  tagline: z.string().min(1, 'Tagline is required')
    .max(100, 'Tagline should be concise (max 100 characters)'),
  missionStatement: z.string()
    .min(20, 'Mission statement should clearly explain what you do, for whom, and why')
    .max(200, 'Mission statement should be concise (max 200 characters)'),
  coreValues: z.array(z.string())
    .min(3, 'Define at least 3 core values')
    .max(7, 'Try to focus on your most important values (max 7)'),
  businessGoals: z.object({
    shortTerm: z.string().min(20, 'Describe your 6-12 month goals in detail'),
    midTerm: z.string().min(20, 'Describe your 1-2 year goals in detail'),
    longTerm: z.string().min(20, 'Describe your 3-5 year goals in detail')
  }),
  targetAudience: z.object({
    primaryProfile: z.string().min(1, 'Primary profile is required'),
    secondaryAudiences: z.array(z.string()).optional(),
    painPoints: z.array(z.string()).min(1, 'At least one pain point is required'),
    idealCustomerProfile: z.object({
      problem: z.string().min(20, 'Describe the main problem your audience faces'),
      journey: z.string().min(20, 'Describe the transformation they seek'),
      desires: z.array(z.string()).min(2, 'List at least 2 key desires'),
      desiredState: z.string().min(20, 'Describe their ideal end state'),
      gap: z.string().min(20, 'Describe what stands between them and their desired state'),
      uniqueSellingPoint: z.string().min(20, 'What makes your solution unique?'),
      benefits: z.array(z.string()).min(2, 'List at least 2 key benefits'),
      objections: z.array(z.string()).min(2, 'List at least 2 potential objections')
    })
  }),
  visionStatement: z.string()
    .min(20, 'Vision statement should describe your desired future impact')
    .max(300, 'Vision statement should be concise (max 300 characters)'),
  swot: z.object({
    strengths: z.array(z.string()).min(2, 'List at least 2 key strengths'),
    weaknesses: z.array(z.string()).min(2, 'List at least 2 areas for improvement'),
    opportunities: z.array(z.string()).min(2, 'List at least 2 opportunities'),
    threats: z.array(z.string()).min(2, 'List at least 2 potential threats')
  }).optional(),
  customerJourney: z.object({
    awareness: z.array(z.string()).min(2, 'List at least 2 primary awareness channels'),
    consideration: z.array(z.string()).min(2, 'List at least 2 trust-building elements'),
    decision: z.string().min(20, 'Describe your ideal purchase/signup process'),
    retention: z.array(z.string()).min(1, 'List at least 1 engagement strategy')
  }).optional()
})

export const personaSchema = z.object({
  demographics: z.object({
    ageRange: z.string().min(1, 'Age range is required'),
    gender: z.string().optional(),
    location: z.string().min(1, 'Location is required'),
    income: z.string().min(1, 'Income range is required'),
    education: z.string().min(1, 'Education level is required')
  }),
  psychographics: z.object({
    interests: z.array(z.string()).min(3, 'List at least 3 key interests'),
    values: z.array(z.string()).min(2, 'List at least 2 important values'),
    lifestyle: z.string().min(20, 'Describe their lifestyle in detail'),
    challenges: z.array(z.string()).min(3, 'List at least 3 major challenges'),
    motivators: z.array(z.string()).min(3, 'List at least 3 key motivators'),
    objections: z.array(z.string()).min(2, 'List at least 2 common objections').optional()
  }),
  professional: z.object({
    occupation: z.string().min(1, 'Occupation is required'),
    industry: z.string().min(1, 'Industry is required'),
    companySize: z.string().min(1, 'Company size is required'),
    roleLevel: z.string().min(1, 'Role level is required'),
    painPoints: z.array(z.string()).min(3, 'List at least 3 significant pain points'),
    goals: z.array(z.string()).min(2, 'List at least 2 professional goals')
  }),
  valueProposition: z.object({
    needs: z.array(z.string()).min(3, 'List at least 3 key needs'),
    solutions: z.array(z.string()).min(3, 'List at least 3 solutions you provide'),
    benefits: z.array(z.string()).min(3, 'List at least 3 clear benefits')
  })
})

export type Worksheet = z.infer<typeof worksheetSchema>
export type Persona = z.infer<typeof personaSchema>

export interface Pillar1Data {
  worksheet: Worksheet
  persona: Persona
  progress: {
    worksheetCompleted: boolean
    personaCompleted: boolean
    totalTasks: number
    completedTasks: number
  }
}

export const tooltips = {
  worksheet: {
    businessName: 'Your official business name as it will appear on your website and materials',
    tagline: 'A short, memorable phrase that captures your unique value proposition',
    missionStatement: 'Format: We exist to [action] for [audience] so they can [benefit]',
    coreValues: 'The fundamental beliefs that guide your business decisions and culture',
    businessGoals: {
      shortTerm: 'What do you want to achieve in the next 6-12 months?',
      midTerm: 'Where do you see your business in 1-2 years?',
      longTerm: 'What\'s your big picture vision for 3-5 years from now?'
    },
    targetAudience: {
      primaryProfile: "Describe your ideal customer's demographics, challenges, and desires",
      secondaryAudiences: "List other potential customer segments who might benefit from your offerings",
      painPoints: "List specific problems your target audience faces that your solution will address",
      idealCustomerProfile: {
        problem: "What is the main problem or challenge your ideal customer is struggling with?",
        journey: "What transformation or end result are they seeking?",
        desires: "What are their deepest desires and aspirations?",
        desiredState: "Describe their ideal situation after using your solution",
        gap: "What's preventing them from achieving their desired state?",
        uniqueSellingPoint: "How does your solution uniquely address their needs?",
        benefits: "What specific benefits will they gain from your solution?",
        objections: "What concerns might prevent them from choosing your solution?"
      }
    },
    visionStatement: 'The future impact you want your business to have on your industry or community',
    swot: {
      strengths: 'What unique advantages or capabilities do you have?',
      weaknesses: 'What areas need improvement or resources?',
      opportunities: 'What external factors could benefit your business?',
      threats: 'What external challenges could impact your success?'
    },
    customerJourney: {
      awarenessChannels: "How do new prospects first discover you? List your main traffic sources.",
      considerationElements: "What trust-building elements convince prospects you're the right solution?",
      decisionProcess: "Describe your ideal purchase or signup process",
      retentionStrategies: "How do you keep customers engaged and encourage referrals?"
    }
  },
  persona: {
    demographics: {
      ageRange: 'The typical age range of your target customer',
      location: 'Geographic areas where your customers are located',
      income: 'Typical income range of your target customer',
      education: 'Relevant educational background of your audience'
    },
    psychographics: {
      interests: 'What topics, activities, or areas interest your audience?',
      values: 'What principles or beliefs matter to your audience?',
      lifestyle: 'Describe their daily life, habits, and preferences',
      challenges: 'What problems or pain points do they face?',
      motivators: 'What drives their decisions and actions?'
    },
    professional: {
      occupation: 'Typical job titles or roles of your target customer',
      industry: 'Business sectors where your customers work',
      painPoints: 'Specific work-related challenges they face',
      goals: 'What are they trying to achieve professionally?'
    }
  }
}

export const validateWorksheet = (data: Worksheet) => {
  const result = worksheetSchema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export const validatePersona = (data: Persona) => {
  const result = personaSchema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export const isWorksheetComplete = (data: Worksheet): boolean => {
  return (
    !!data.businessName &&
    !!data.tagline &&
    !!data.missionStatement &&
    data.coreValues.length > 0 &&
    !!data.businessGoals.shortTerm &&
    !!data.businessGoals.midTerm &&
    !!data.businessGoals.longTerm &&
    !!data.targetAudience?.primaryProfile &&
    data.targetAudience?.painPoints?.length > 0 &&
    !!data.visionStatement &&
    !!data.targetAudience?.idealCustomerProfile?.problem &&
    data.targetAudience?.idealCustomerProfile?.desires?.length > 0 &&
    !!data.targetAudience?.idealCustomerProfile?.desiredState &&
    !!data.targetAudience?.idealCustomerProfile?.gap &&
    !!data.targetAudience?.idealCustomerProfile?.uniqueSellingPoint &&
    data.targetAudience?.idealCustomerProfile?.benefits?.length > 0 &&
    data.targetAudience?.idealCustomerProfile?.objections?.length > 0
  )
}

export const isPersonaComplete = (data: Persona): boolean => {
  const result = personaSchema.safeParse(data)
  return result.success
}
