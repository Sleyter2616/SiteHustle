import { Pillar1Data } from '@/types/pillar1Types';

interface ValidationResult {
  success: boolean;
  errors: Record<string, string[]>;
}

export const validateReflection = (data: Pillar1Data['brandIdentity']['reflection']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.whoIAm?.trim()) {
    errors['reflection.whoIAm'] = ['Please describe who you are'];
  }

  if (!data.whoIAmNot?.trim()) {
    errors['reflection.whoIAmNot'] = ['Please describe who you are not'];
  }

  if (!data.whyBuildBrand?.trim()) {
    errors['reflection.whyBuildBrand'] = ['Please explain why you want to build this brand'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePersonality = (data: Pillar1Data['brandIdentity']['personality']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.communicationStyle?.trim()) {
    errors['personality.communicationStyle'] = ['Please describe your communication style'];
  }

  if (!data.toneAndVoice?.trim()) {
    errors['personality.toneAndVoice'] = ['Please describe your tone and voice'];
  }

  if (!data.passionateExpression?.trim()) {
    errors['personality.passionateExpression'] = ['Please describe how you express your passion'];
  }

  if (!data.brandPersonality?.trim()) {
    errors['personality.brandPersonality'] = ['Please describe your overall brand personality'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateStory = (data: Pillar1Data['brandIdentity']['story']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.pivotalExperience?.trim()) {
    errors['story.pivotalExperience'] = ['Please share your pivotal experience'];
  }

  if (!data.definingMoment?.trim()) {
    errors['story.definingMoment'] = ['Please share your defining moment'];
  }

  if (!data.audienceRelevance?.trim()) {
    errors['story.audienceRelevance'] = ['Please explain why your audience should care'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDifferentiation = (data: Pillar1Data['brandIdentity']['differentiation']): ValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.uniqueApproach?.trim()) {
    errors['differentiation.uniqueApproach'] = ['Please describe your unique approach'];
  }

  if (!data.uniqueResources?.trim()) {
    errors['differentiation.uniqueResources'] = ['Please list your unique resources'];
  }

  if (!data.competitivePerception?.trim()) {
    errors['differentiation.competitivePerception'] = ['Please describe how you want to be perceived'];
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBrandIdentity = (data: Pillar1Data['brandIdentity']): ValidationResult => {
  const reflectionResult = validateReflection(data.reflection);
  const personalityResult = validatePersonality(data.personality);
  const storyResult = validateStory(data.story);
  const differentiationResult = validateDifferentiation(data.differentiation);

  return {
    success: reflectionResult.success && 
             personalityResult.success && 
             storyResult.success && 
             differentiationResult.success,
    errors: {
      ...reflectionResult.errors,
      ...personalityResult.errors,
      ...storyResult.errors,
      ...differentiationResult.errors
    }
  };
};

export const isBrandIdentityComplete = (data: Pillar1Data['brandIdentity']): boolean => {
  return validateBrandIdentity(data).success;
};
