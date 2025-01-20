import { Pillar1Data } from '@/types/pillar1';

const isNonEmptyString = (str: string | undefined | null): boolean => {
  return typeof str === 'string' && str.trim().length > 0;
};

const isNonEmptyArray = (arr: any[] | undefined | null): boolean => {
  return Array.isArray(arr) && arr.length > 0 && arr.every(item => isNonEmptyString(item));
};

interface ValidationResult {
  success: boolean;
  errors: Record<string, string[]>;
}

// Brand Identity Validation
export const validateReflection = (data: Pillar1Data['brandIdentity']['reflection']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data?.whoIAm || !isNonEmptyString(data.whoIAm) ||
      !data?.whoIAmNot || !isNonEmptyString(data.whoIAmNot) ||
      !data?.whyBuildBrand || !isNonEmptyString(data.whyBuildBrand)) {
    errors['reflection'] = ['Please fill out all reflection fields'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePersonality = (data: Pillar1Data['brandIdentity']['personality']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data?.communicationStyle || !isNonEmptyString(data.communicationStyle) ||
      !data?.toneAndVoice || !isNonEmptyString(data.toneAndVoice) ||
      !data?.passionateExpression || !isNonEmptyString(data.passionateExpression) ||
      !data?.brandPersonality || !isNonEmptyString(data.brandPersonality)) {
    errors['personality'] = ['Please fill out all personality fields'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateStory = (data: Pillar1Data['brandIdentity']['story']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data?.pivotalExperience || !isNonEmptyString(data.pivotalExperience) ||
      !data?.definingMoment || !isNonEmptyString(data.definingMoment) ||
      !data?.audienceRelevance || !isNonEmptyString(data.audienceRelevance)) {
    errors['story'] = ['Please fill out all story fields'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDifferentiation = (data: Pillar1Data['brandIdentity']['differentiation']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data?.uniqueApproach || !isNonEmptyString(data.uniqueApproach) ||
      !data?.uniqueResources || !isNonEmptyString(data.uniqueResources) ||
      !data?.competitivePerception || !isNonEmptyString(data.competitivePerception)) {
    errors['differentiation'] = ['Please fill out all differentiation fields'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBrandIdentity = (data?: Pillar1Data['brandIdentity']): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No brand identity data provided'] } };
  }

  const reflectionResult = validateReflection(data.reflection);
  const personalityResult = validatePersonality(data.personality);
  const storyResult = validateStory(data.story);
  const differentiationResult = validateDifferentiation(data.differentiation);

  const errors: Record<string, string[]> = {
    ...(!reflectionResult.success ? reflectionResult.errors : {}),
    ...(!personalityResult.success ? personalityResult.errors : {}),
    ...(!storyResult.success ? storyResult.errors : {}),
    ...(!differentiationResult.success ? differentiationResult.errors : {})
  };

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

// Vision Validation
export const validateVision = (data?: Pillar1Data['vision']): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No vision data provided'] } };
  }

  const errors: Record<string, string[]> = {};

  // Check basic info
  if (!isNonEmptyString(data.businessName) ||
      !isNonEmptyString(data.tagline) ||
      !isNonEmptyString(data.missionStatement) ||
      !isNonEmptyArray(data.coreValues)) {
    errors['basicInfo'] = ['Please complete all basic information fields'];
  }

  // Check business goals
  if (!data.businessGoals?.shortTerm || !isNonEmptyString(data.businessGoals.shortTerm) ||
      !data.businessGoals?.midTerm || !isNonEmptyString(data.businessGoals.midTerm) ||
      !data.businessGoals?.longTerm || !isNonEmptyString(data.businessGoals.longTerm) ||
      !data.businessGoals?.websiteGoals || !isNonEmptyString(data.businessGoals.websiteGoals) ||
      !data.businessGoals?.successIndicators || !isNonEmptyString(data.businessGoals.successIndicators)) {
    errors['businessGoals'] = ['Please complete all business goals'];
  }

  // Check SWOT analysis
  if (!data.swot?.strengths || !isNonEmptyArray(data.swot.strengths) ||
      !data.swot?.weaknesses || !isNonEmptyArray(data.swot.weaknesses) ||
      !data.swot?.opportunities || !isNonEmptyArray(data.swot.opportunities) ||
      !data.swot?.threats || !isNonEmptyArray(data.swot.threats)) {
    errors['swot'] = ['Please complete all SWOT analysis sections'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

// Execution Roadmap Validation
export const validateExecutionRoadmap = (data?: Pillar1Data['executionRoadmap']): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No execution roadmap data provided'] } };
  }

  const errors: Record<string, string[]> = {};

  if (!isNonEmptyString(data.thirtyDayGoal)) {
    errors['thirtyDayGoal'] = ['Please set your 30-day goal'];
  }

  if (!isNonEmptyArray(data.weeklyMilestones)) {
    errors['weeklyMilestones'] = ['Please set your weekly milestones'];
  }

  if (!isNonEmptyString(data.contentPlan)) {
    errors['contentPlan'] = ['Please complete your content plan'];
  }

  if (!isNonEmptyArray(data.immediateActions)) {
    errors['immediateActions'] = ['Please list your immediate actions'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

// Wireframe Validation
export const validateWireframe = (data?: Pillar1Data['wireframe']): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No wireframe data provided'] } };
  }

  const errors: Record<string, string[]> = {};

  // Check layout
  if (!data.layout?.header || !isNonEmptyString(data.layout.header) ||
      !data.layout?.navigation || !isNonEmptyString(data.layout.navigation) ||
      !data.layout?.mainContent || !isNonEmptyString(data.layout.mainContent) ||
      !data.layout?.footer || !isNonEmptyString(data.layout.footer)) {
    errors['layout'] = ['Please complete all layout sections'];
  }

  // Check components
  if (!data.components?.callToAction || !isNonEmptyString(data.components.callToAction) ||
      !data.components?.featuredSections || !isNonEmptyArray(data.components.featuredSections) ||
      !data.components?.contentBlocks || !isNonEmptyArray(data.components.contentBlocks)) {
    errors['components'] = ['Please complete all component sections'];
  }

  // Check styling
  if (!data.styling?.colorScheme || !isNonEmptyString(data.styling.colorScheme) ||
      !data.styling?.typography || !isNonEmptyString(data.styling.typography) ||
      !data.styling?.spacing || !isNonEmptyString(data.styling.spacing)) {
    errors['styling'] = ['Please complete all styling sections'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const isBrandIdentityComplete = (data: Pillar1Data['brandIdentity']): boolean => {
  return validateBrandIdentity(data).success;
};
