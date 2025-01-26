// src/types/pillar1.ts

/** Utility type for SMART-based goals. */
export interface SmartGoalFields {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface BrandIdentityData {
  reflection?: {
    whoIAm: string;
    whoIAmNot: string;
    whyBuildBrand: string;
  };
  personality?: {
    communicationStyle: string;
    toneAndVoice: string;
    passionateExpression: string;
    brandPersonality: string;
  };
  story?: {
    pivotalExperience: string;
    definingMoment: string;
    audienceRelevance: string;
  };
  differentiation?: {
    uniqueApproach: string;
    uniqueResources: string;
    competitivePerception: string;
  };
  /** Kept for backward compatibility if needed, or can be removed. */
  executionRoadmap?: ExecutionRoadmapData;
}

export interface VisionData {
  businessName?: string;
  tagline?: string;
  missionStatement?: string;
  visionStatement?: string;
  coreValues?: string[];

  /**
   * Extended businessGoals object to accommodate
   * the new SMART-based fields as well as the original ones.
   */
  businessGoals?: {
    shortTerm: string;
    midTerm: string;
    longTerm: string;
    websiteGoals?: string;
    successIndicators?: string;

    // New SMART-based fields for specific categories
    attendance?: SmartGoalFields;      // For attendance goals
    engagement?: SmartGoalFields;      // For engagement goals
    financial?: SmartGoalFields;       // For financial goals
    contentDelivery?: SmartGoalFields; // For content-delivery goals
    networking?: SmartGoalFields;      // For networking goals

    // Additional text fields from your extended form
    goalPriorities?: string;   // e.g. user can type "1) X, 2) Y..."
    actionPlan?: string;       // the user’s “action plan development”
    challenges?: string;       // potential challenges & solutions
    accountability?: string;   // who is responsible, how often do you meet, etc.
    summary?: string;          // summary & alignment
    nextSteps?: string;        // next steps outline
  };

  /**
   * Fields used in the default Vision pages
   */
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    matchingStrengthsToOpp?: string;
    addressWeaknessesThreats?: string;
    swotPriorities?: string;
    actionSteps?: string;
    responsibilities?: string;
    swotSummary?: string;
  };
  customerJourney?: {
    awareness: string[];
    consideration: string[];
    decision: string;
    retention: string[];
  };
  targetAudience?: {
    primaryProfile?: string;
    secondaryAudiences?: string[];
    painPoints?: string[];
    idealCustomerProfile?: {
      problem?: string;
      journey?: string;
      desires?: string[];
      desiredState?: string;
      gap?: string;
      uniqueSellingPoint?: string;
      benefits?: string[];
      objections?: string[];
    };
  };
}

export interface ExecutionRoadmapData {
  thirtyDayGoal?: string;
  weeklyMilestones?: string[];
  contentPlan?: string;
  immediateActions?: string[];
}

export interface WireframeData {
  layout?: {
    header: string;
    navigation: string;
    mainContent: string;
    footer: string;
  };
  components?: {
    callToAction: string;
    featuredSections: string[];
    contentBlocks: string[];
  };
  styling?: {
    colorScheme: string;
    typography: string;
    spacing: string;
  };
}

/**
 * WorksheetData is optional; you might not need this interface if you already
 * use VisionData & BrandIdentityData directly. Kept here if your code relies on it.
 */
export interface WorksheetData {
  businessName?: string;
  tagline?: string;
  missionStatement?: string;
  coreValues?: string[];
  businessGoals?: {
    shortTerm: string;
    midTerm: string;
    longTerm: string;
    websiteGoals?: string;
    successIndicators?: string;
    // same new fields if needed:
    attendance?: SmartGoalFields;
    engagement?: SmartGoalFields;
    financial?: SmartGoalFields;
    contentDelivery?: SmartGoalFields;
    networking?: SmartGoalFields;
    goalPriorities?: string;
    actionPlan?: string;
    challenges?: string;
    accountability?: string;
    summary?: string;
    nextSteps?: string;
  };
  targetAudience?: {
    primaryProfile?: string;
    secondaryAudiences?: string[];
    painPoints?: string[];
    idealCustomerProfile?: {
      problem?: string;
      journey?: string;
      desires?: string[];
      desiredState?: string;
      gap?: string;
      uniqueSellingPoint?: string;
      benefits?: string[];
      objections?: string[];
    };
  };
  visionStatement?: string;
  swot?: {
    strengths?: string[];
    weaknesses?: string[];
    opportunities?: string[];
    threats?: string[];
  };
  customerJourney?: {
    awareness?: string[];
    consideration?: string[];
    decision?: string;
    retention?: string[];
  };
}

export interface PersonaData {
  demographics?: {
    ageRange?: string;
    gender?: string;
    location?: string;
    income?: string;
    education?: string;
  };
  psychographics?: {
    values?: string[];
    objections?: string[];
    interests?: string[];
    lifestyle?: string;
    challenges?: string[];
    motivators?: string[];
  };
  professional?: {
    occupation?: string;
    jobTitle?: string;
    industry?: string;
    companySize?: string;
    responsibilities?: string[];
    challenges?: string[];
    goals?: string[];
    painPoints?: string[];
    roleLevel?: string;
  };
  valueProposition?: {
    benefits?: string[];
    features?: string[];
    needs?: string[];
    solutions?: string[];
    objections?: string[];
  };
}

export interface Pillar1Data {
  brandIdentity?: BrandIdentityData;
  vision?: VisionData;
  executionRoadmap?: ExecutionRoadmapData;
  wireframe?: WireframeData;
  persona?: PersonaData;
  progress?: {
    currentStep?: number;
    completedSteps?: number[];
    totalSteps?: number;
    worksheet?: number;
    persona?: number;
    worksheetCompleted?: boolean;
    personaCompleted?: boolean;
    completedTasks?: number;
    totalTasks?: number;
  };
}
