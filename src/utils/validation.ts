import { BusinessIdeaForm, BusinessIdeaErrors } from '@/types/wizard';

export const validateBusinessIdea = (data: BusinessIdeaForm): BusinessIdeaErrors => {
  const errors: BusinessIdeaErrors = {};
  
  // Business Idea validation
  if (!data.businessIdea?.trim()) {
    errors.businessIdea = ['Please describe your business idea'];
  } else if (data.businessIdea.length < 50) {
    errors.businessIdea = ['Please provide more detail about your business idea (at least 50 characters)'];
  }

  // Target Market validation
  if (!data.targetMarket?.trim()) {
    errors.targetMarket = ['Please describe your target market'];
  } else if (data.targetMarket.length < 30) {
    errors.targetMarket = ['Please provide more detail about your target market (at least 30 characters)'];
  }

  // Problem Solution validation
  if (!data.problemSolution?.trim()) {
    errors.problemSolution = ['Please describe the problem your business solves'];
  } else if (data.problemSolution.length < 30) {
    errors.problemSolution = ['Please provide more detail about your solution (at least 30 characters)'];
  }

  // Competitive Advantage validation
  if (!data.competitiveAdvantage?.trim()) {
    errors.competitiveAdvantage = ['Please describe your competitive advantage'];
  } else if (data.competitiveAdvantage.length < 30) {
    errors.competitiveAdvantage = ['Please provide more detail about your competitive advantage (at least 30 characters)'];
  }

  return errors;
};
