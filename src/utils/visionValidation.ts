import { VisionData } from '@/types/pillar1';

export function isVisionDataComplete(data?: VisionData): boolean {
  if (!data) return false;

  const clarityDone = Boolean(
    data.businessName &&
    data.tagline &&
    data.missionStatement &&
    data.visionStatement &&
    (data.coreValues && data.coreValues.length >= 1)
  );

  const goalsDone = Boolean(
    data.businessGoals?.shortTerm &&
    data.businessGoals?.midTerm &&
    data.businessGoals?.longTerm
  );

  const audienceDone = Boolean(
    data.targetAudience?.primaryProfile &&
    data.targetAudience?.painPoints?.length >= 1 &&
    data.targetAudience?.idealCustomerProfile?.problem &&
    data.targetAudience?.idealCustomerProfile?.journey
  );

  const journeyDone = Boolean(
    data.customerJourney?.awareness?.length >= 1 &&
    data.customerJourney?.consideration?.length >= 1 &&
    data.customerJourney?.decision &&
    data.customerJourney?.retention?.length >= 1
  );

  const swotDone = Boolean(
    data.swot?.strengths?.length >= 1 &&
    data.swot?.weaknesses?.length >= 1 &&
    data.swot?.opportunities?.length >= 1 &&
    data.swot?.threats?.length >= 1
  );

  // Debug logging to determine which check fails
  console.log("Clarity Done:", clarityDone);
  console.log("Goals Done:", goalsDone);
  console.log("Audience Done:", audienceDone);
  console.log("Journey Done:", journeyDone);
  console.log("SWOT Done:", swotDone);

  return clarityDone && goalsDone && audienceDone && journeyDone && swotDone;
}