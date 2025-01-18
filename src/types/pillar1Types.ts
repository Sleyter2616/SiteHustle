export interface Pillar1Data {
  worksheet: {
    businessName: string;
    tagline: string;
    missionStatement: string;
    coreValues: string[];
    businessGoals: {
      shortTerm: string;
      midTerm: string;
      longTerm: string;
    };
    targetAudience: {
      primaryProfile: string;
      secondaryAudiences?: string[];
      painPoints: string[];
      idealCustomerProfile?: {
        problem: string;
        journey: string;
        desires: string[];
        desiredState: string;
        gap: string;
        uniqueSellingPoint: string;
        benefits: string[];
        objections: string[];
      };
    };
    visionStatement: string;
    swot?: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    customerJourney?: {
      awareness: string[];
      consideration: string[];
      decision: string;
      retention: string[];
    };
  };
  persona?: {
    // Add persona fields if needed
  };
}
