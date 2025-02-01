import { z } from 'zod'
export type { Pillar1Data } from '@/types/pillar1'

/* ====================================================
   Vision Worksheet Schemas
==================================================== */

// --- Vision Clarity Schema ---
export const visionClaritySchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  missionStatement: z.string().min(1, 'Mission statement is required'),
  visionStatement: z.string()
    .min(20, 'Vision statement should describe your desired future impact')
    .max(300, 'Vision statement should be concise (max 300 characters)'),
  coreValues: z.array(z.string()).min(1, 'At least one core value is required (one is sufficient)')
});

// --- Business Goals Schema ---
export const businessGoalsSchema = z.object({
  shortTerm: z.string().min(1, 'Short-term goals are required'),
  midTerm: z.string().min(1, 'Mid-term goals are required'),
  longTerm: z.string().min(1, 'Long-term goals are required'),
  websiteGoals: z.string().optional(),
  successIndicators: z.string().optional()
});

// --- Target Audience Schema ---
export const targetAudienceSchema = z.object({
  primaryProfile: z.string().min(1, 'Primary profile is required'),
  secondaryAudiences: z.array(z.string()),
  painPoints: z.array(z.string()).min(1, 'At least one pain point is required (one is sufficient)'),
  idealCustomerProfile: z.object({
    problem: z.string().min(1, 'Problem description is required'),
    journey: z.string().min(1, 'Journey description is required'),
    desires: z.array(z.string()).min(1, 'At least one desire is required (one is sufficient)'),
    desiredState: z.string().min(1, 'Desired state is required'),
    gap: z.string().min(1, 'Gap description is required'),
    uniqueSellingPoint: z.string().min(1, 'Unique selling point is required'),
    benefits: z.array(z.string()).min(1, 'At least one benefit is required (one is sufficient)'),
    objections: z.array(z.string()).min(1, 'At least one objection is required (one is sufficient)')
  })
});

// --- Customer Journey Schema ---
export const customerJourneySchema = z.object({
  awareness: z.array(z.string()).min(1, 'List at least one primary awareness channel (one is sufficient)'),
  consideration: z.array(z.string()).min(1, 'List at least one trust-building element (one is sufficient)'),
  decision: z.string().min(1, 'Describe your purchase/signup process (one is sufficient)'),
  retention: z.array(z.string()).min(1, 'List at least one engagement strategy (one is sufficient)')
});

// --- SWOT Analysis Schema ---
export const swotSchema = z.object({
  strengths: z.array(z.string()).min(1, 'List at least one key strength (one is sufficient)'),
  weaknesses: z.array(z.string()).min(1, 'List at least one area for improvement (one is sufficient)'),
  opportunities: z.array(z.string()).min(1, 'List at least one opportunity (one is sufficient)'),
  threats: z.array(z.string()).min(1, 'List at least one potential threat (one is sufficient)'),
  // Optional additional fields:
  matchingStrengthsToOpp: z.string().optional(),
  addressWeaknessesThreats: z.string().optional(),
  swotPriorities: z.string().optional(),
  actionSteps: z.string().optional(),
  responsibilities: z.string().optional(),
  swotSummary: z.string().optional()
});

// --- Combined Vision Worksheet Schema ---
// For final submission, all sections are combined.
export const visionWorksheetSchema = z.object({
  visionClarity: visionClaritySchema,
  businessGoals: businessGoalsSchema,
  targetAudience: targetAudienceSchema,
  customerJourney: customerJourneySchema,
  swot: swotSchema
});


/* ====================================================
   Brand Identity Schema
==================================================== */

export const brandIdentitySchema = z.object({
  reflection: z.object({
    whoIAm: z.string().min(1, 'Please describe who you are'),
    whoIAmNot: z.string().min(1, 'Please describe who you are not'),
    whyBuildBrand: z.string().min(1, 'Please explain why you are building this brand')
  }),
  personality: z.object({
    communicationStyle: z.string().min(1, 'Please describe your communication style'),
    toneAndVoice: z.string().min(1, 'Please describe your tone and voice'),
    passionateExpression: z.string().min(1, 'Please describe how you express your passion'),
    brandPersonality: z.string().min(1, 'Please describe your brand personality')
  }),
  story: z.object({
    pivotalExperience: z.string().min(1, 'Please share a pivotal experience'),
    definingMoment: z.string().min(1, 'Please describe a defining moment'),
    audienceRelevance: z.string().min(1, 'Please explain how your story relates to your audience')
  }),
  differentiation: z.object({
    uniqueApproach: z.string().min(1, 'Please describe your unique approach'),
    uniqueResources: z.string().min(1, 'Please list your unique resources'),
    competitivePerception: z.string().min(1, 'Please describe how you want to be perceived versus competitors')
  })
});


/* ====================================================
   Execution Roadmap Schema
==================================================== */

export const executionRoadmapSchema = z.object({
  thirtyDayGoal: z.string().min(1, 'A 30-day goal is required'),
  weeklyMilestones: z.array(z.string()).min(4, 'At least 4 weekly milestones are required'),
  contentPlan: z.string().min(1, 'A content plan is required'),
  immediateActions: z.array(z.string()).min(3, 'At least 3 immediate actions are required')
});


/* ====================================================
   Persona Schema
==================================================== */

export const personaSchema = z.object({
  demographics: z.object({
    ageRange: z.string().min(1, 'Age range is required'),
    gender: z.string().optional(),
    location: z.string().min(1, 'Location is required'),
    income: z.string().min(1, 'Income range is required'),
    education: z.string().min(1, 'Education level is required')
  }),
  psychographics: z.object({
    interests: z.array(z.string()).min(3, 'List at least three key interests'),
    values: z.array(z.string()).min(2, 'List at least two important values'),
    lifestyle: z.string().min(20, 'Describe their lifestyle in detail'),
    challenges: z.array(z.string()).min(3, 'List at least three major challenges'),
    motivators: z.array(z.string()).min(3, 'List at least three key motivators'),
    objections: z.array(z.string()).min(2, 'List at least two common objections').optional()
  }),
  professional: z.object({
    occupation: z.string().min(1, 'Occupation is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    industry: z.string().min(1, 'Industry is required'),
    companySize: z.string().min(1, 'Company size is required'),
    responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
    challenges: z.array(z.string()).min(1, 'At least one challenge is required'),
    goals: z.array(z.string()).min(1, 'At least one professional goal is required'),
    painPoints: z.array(z.string()).min(1, 'At least one pain point is required'),
    roleLevel: z.string().min(1, 'Role level is required')
  }),
  valueProposition: z.object({
    needs: z.array(z.string()).min(3, 'List at least three key needs'),
    solutions: z.array(z.string()).min(3, 'List at least three solutions you provide'),
    benefits: z.array(z.string()).min(3, 'List at least three clear benefits')
  })
});


/* ====================================================
   Combined Types and Tooltips
==================================================== */

// Combined Vision Worksheet Schema Types
export type Worksheet = z.infer<typeof visionWorksheetSchema>
export type Persona = z.infer<typeof personaSchema>

// --- Tooltips ---
// Updated helper text to clarify that one valid input is enough.
export const tooltips = {
  worksheet: {
    businessName: 'Your official business name as it will appear on your website and materials',
    tagline: 'A short, memorable phrase that captures your unique value proposition',
    missionStatement: 'Format: We exist to [action] for [audience] so they can [benefit]',
    coreValues: 'Add at least one core value (one is sufficient).',
    businessGoals: {
      shortTerm: 'What do you want to achieve in the next 6-12 months? (one goal is enough)',
      midTerm: 'Where do you see your business in 1-2 years? (one goal is enough)',
      longTerm: 'What’s your big picture vision for 3-5 years from now? (one goal is enough)'
    },
    targetAudience: {
      primaryProfile: "Describe your ideal customer's demographics, challenges, and desires",
      secondaryAudiences: "List other potential customer segments who might benefit from your offerings",
      painPoints: "List at least one pain point (one is sufficient)",
      idealCustomerProfile: {
        problem: "What is the main problem your ideal customer faces?",
        journey: "Describe their transformation or journey (one description is enough)",
        desires: "List at least one desire (one is sufficient)",
        desiredState: "Describe their ideal state after using your solution",
        gap: "What gap prevents them from reaching that state?",
        uniqueSellingPoint: "How does your solution uniquely address their needs?",
        benefits: "List at least one benefit (one is sufficient)",
        objections: "List at least one objection (one is sufficient)"
      }
    },
    visionStatement: 'Describe the future impact you want your business to have (min 20 characters).',
    swot: {
      strengths: 'List at least one key strength (one is sufficient)',
      weaknesses: 'List at least one area for improvement (one is sufficient)',
      opportunities: 'List at least one opportunity (one is sufficient)',
      threats: 'List at least one potential threat (one is sufficient)'
    },
    customerJourney: {
      awareness: "List at least one primary awareness channel (one is sufficient)",
      consideration: "List at least one trust-building element (one is sufficient)",
      decision: "Describe your purchase/signup process (one is sufficient)",
      retention: "List at least one engagement strategy (one is sufficient)"
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
      interests: 'List at least three key interests',
      values: 'List at least two important values',
      lifestyle: 'Describe their lifestyle in detail',
      challenges: 'List at least three major challenges',
      motivators: 'List at least three key motivators'
    },
    professional: {
      occupation: 'Typical job titles or roles of your target customer',
      industry: 'Business sectors where your customers work',
      painPoints: 'List at least one work-related challenge',
      goals: 'List at least one professional goal'
    }
  }
}


/* ====================================================
   Validation Functions
==================================================== */

export function validateVisionWorksheet(data: Worksheet) {
  const result = visionWorksheetSchema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export function validatePersona(data: Persona) {
  const result = personaSchema.safeParse(data)
  return {
    success: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {}
  }
}

export function validateBrandIdentity(data: any) {
  try {
    brandIdentitySchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return { success: false, errors };
    }
    throw error;
  }
}

export const isWorksheetComplete = (data: Worksheet): boolean => {
  return validateVisionWorksheet(data).success;
}

export const isPersonaComplete = (data: Persona): boolean => {
  const result = personaSchema.safeParse(data)
  return result.success;
}