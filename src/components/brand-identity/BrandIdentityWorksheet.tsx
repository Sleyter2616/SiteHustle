import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import ReflectionPage from './pages/ReflectionPage';
import PersonalityPage from './pages/PersonalityPage';
import StoryPage from './pages/StoryPage';
import DifferentiationPage from './pages/DifferentiationPage';
import { generateBrandIdentityPDF } from '@/utils/pdfUtils';
import { withWorksheetLogic, WithWorksheetLogicProps } from '../common/withWorksheetLogic';

interface BrandIdentityWorksheetProps extends WithWorksheetLogicProps {
  data: Pillar1Data['brandIdentity'];
  onChange: (data: Pillar1Data['brandIdentity']) => void;
  currentPage: number;
}

function BrandIdentityWorksheet({ 
  data, 
  onChange,
  currentPage,
  errors
}: BrandIdentityWorksheetProps) {
  const renderPage = () => {
    const defaultBrandIdentity = data || {
      reflection: { whoIAm: '', whoIAmNot: '', whyBuildBrand: '' },
      personality: { communicationStyle: '', toneAndVoice: '', passionateExpression: '', brandPersonality: '' },
      story: { pivotalExperience: '', definingMoment: '', audienceRelevance: '' },
      differentiation: { uniqueApproach: '', uniqueResources: '', competitivePerception: '' }
    };

    switch (currentPage) {
      case 1:
        return (
          <ReflectionPage
            data={defaultBrandIdentity.reflection}
            onChange={(reflection) => onChange({ 
              ...defaultBrandIdentity,
              reflection
            })}
          />
        );
      case 2:
        return (
          <PersonalityPage
            data={defaultBrandIdentity.personality}
            onChange={(personality) => onChange({
              ...defaultBrandIdentity,
              personality
            })}
          />
        );
      case 3:
        return (
          <StoryPage
            data={defaultBrandIdentity.story}
            onChange={(story) => onChange({
              ...defaultBrandIdentity,
              story
            })}
          />
        );
      case 4:
        return (
          <DifferentiationPage
            data={defaultBrandIdentity.differentiation}
            onChange={(differentiation) => onChange({
              ...defaultBrandIdentity,
              differentiation
            })}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
}

const isDataComplete = (data: Pillar1Data['brandIdentity']) => {
  if (!data) return false;
  
  const { reflection, personality, story, differentiation } = data;
  
  const isReflectionComplete = reflection?.whoIAm && reflection.whoIAmNot && reflection.whyBuildBrand;
  const isPersonalityComplete = personality?.communicationStyle && personality.toneAndVoice && 
                              personality.passionateExpression && personality.brandPersonality;
  const isStoryComplete = story?.pivotalExperience && story.definingMoment && story.audienceRelevance;
  const isDifferentiationComplete = differentiation?.uniqueApproach && differentiation.uniqueResources && 
                                  differentiation.competitivePerception;

  return Boolean(isReflectionComplete && isPersonalityComplete && isStoryComplete && isDifferentiationComplete);
};

const config = {
  generatePdf: generateBrandIdentityPDF,
  isDataComplete,
  pdfFileName: 'brand-identity-worksheet.pdf',
  title: 'Brand Identity',
  description: 'Build a strong foundation for your brand by defining who you are and how you communicate.'
};

export default withWorksheetLogic(BrandIdentityWorksheet, config);
