export interface Pillar1Data {
  worksheet?: {
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
  };
  persona?: {
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
  };
  progress?: {
    worksheet?: number;
    persona?: number;
    worksheetCompleted?: boolean;
    personaCompleted?: boolean;
    completedTasks?: number;
    totalTasks?: number;
  };
}
