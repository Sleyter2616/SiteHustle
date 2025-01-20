
export interface BrandIdentityData {
  reflection: {
    whoIAm: string;
    whoIAmNot: string;
    whyBuildBrand: string;
  };
  personality: {
    communicationStyle: string;
    toneAndVoice: string;
    passionateExpression: string;
    brandPersonality: string;
  };
  story: {
    pivotalExperience: string;
    definingMoment: string;
    audienceRelevance: string;
  };
  differentiation: {
    uniqueApproach: string;
    uniqueResources: string;
    competitivePerception: string;
  };
}

export interface VisionData {
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
  };
  visionStatement?: string;
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  customerJourney?: {
    awareness: string;
    consideration: string;
    decision: string;
    retention: string;
    advocacy: string;
  };
}

export interface ExecutionRoadmapData {
  thirtyDayGoal: string;
  weeklyMilestones: string[];
  contentPlan: string;
  immediateActions: string[];
}

export interface WireframeData {
  layout: {
    header: string;
    navigation: string;
    mainContent: string;
    footer: string;
  };
  components: {
    callToAction: string;
    featuredSections: string[];
    contentBlocks: string[];
  };
  styling: {
    colorScheme: string;
    typography: string;
    spacing: string;
  };
}
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
  worksheet?: WorksheetData;
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
