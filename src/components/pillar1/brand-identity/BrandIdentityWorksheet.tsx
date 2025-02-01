import React from 'react';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { BrandIdentityData } from '@/types/pillar1';
import { generateBrandIdentityPDF } from '@/utils/pdfUtils';

import ReflectionPage from './pages/ReflectionPage';
import PersonalityPage from './pages/PersonalityPage';
import StoryPage from './pages/StoryPage';
import DifferentiationPage from './pages/DifferentiationPage';
import ConclusionPage from './pages/ConclusionPage';
// ExecutionRoadmapPage REMOVED

interface BrandIdentityWorksheetProps extends WithWorksheetLogicProps {
  data?: BrandIdentityData;
  onChange?: (updatedData: BrandIdentityData) => void;
}

// Per-page validation for Brand Identity
function isBrandIdentityPageComplete(data?: BrandIdentityData, currentPage?: number): boolean {
  if (!data || currentPage === undefined) return false;
  switch (currentPage) {
    case 1: // Reflection: Require at least "whoIAm" is non-empty.
      return !!data.reflection?.whoIAm?.trim();
    case 2: // Personality: Require all fields are non-empty.
      return (
        !!data.personality?.communicationStyle?.trim() &&
        !!data.personality?.toneAndVoice?.trim() &&
        !!data.personality?.passionateExpression?.trim() &&
        !!data.personality?.brandPersonality?.trim()
      );
    case 3: // Story: Require pivotalExperience, definingMoment, and audienceRelevance.
      return (
        !!data.story?.pivotalExperience?.trim() &&
        !!data.story?.definingMoment?.trim() &&
        !!data.story?.audienceRelevance?.trim()
      );
    case 4: // Differentiation: Require uniqueApproach, uniqueResources, competitivePerception.
      return (
        !!data.differentiation?.uniqueApproach?.trim() &&
        !!data.differentiation?.uniqueResources?.trim() &&
        !!data.differentiation?.competitivePerception?.trim()
      );
    case 5: // Conclusion: We assume no data input is required, so valid.
      return true;
    default:
      return false;
  }
}

function BrandIdentityWorksheet({
  data,
  onChange,
  currentPage = 1,
  pdfDownloaded,
  onPdfDownloaded,
  onNextSection,
  isValid
}: BrandIdentityWorksheetProps) {
  // Combine incoming data with defaults
  const defaultData: BrandIdentityData = {
    reflection: { whoIAm: '', whoIAmNot: '', whyBuildBrand: '' },
    personality: { communicationStyle: '', toneAndVoice: '', passionateExpression: '', brandPersonality: '' },
    story: { pivotalExperience: '', definingMoment: '', audienceRelevance: '' },
    differentiation: { uniqueApproach: '', uniqueResources: '', competitivePerception: '' },
    ...data
  };

  // Sub-page updaters
  const handleReflectionChange = (reflection: BrandIdentityData['reflection']) => {
    onChange?.({ ...defaultData, reflection });
  };
  const handlePersonalityChange = (personality: BrandIdentityData['personality']) => {
    onChange?.({ ...defaultData, personality });
  };
  const handleStoryChange = (story: BrandIdentityData['story']) => {
    onChange?.({ ...defaultData, story });
  };
  const handleDifferentiationChange = (differentiation: BrandIdentityData['differentiation']) => {
    onChange?.({ ...defaultData, differentiation });
  };

  // Render the current page
  function renderPage() {
    switch (currentPage) {
      case 1:
        return (
          <ReflectionPage
            data={defaultData.reflection}
            onChange={handleReflectionChange}
          />
        );
      case 2:
        return (
          <PersonalityPage
            data={defaultData.personality}
            onChange={handlePersonalityChange}
          />
        );
      case 3:
        return (
          <StoryPage
            data={defaultData.story}
            onChange={handleStoryChange}
          />
        );
      case 4:
        return (
          <DifferentiationPage
            data={defaultData.differentiation}
            onChange={handleDifferentiationChange}
          />
        );
      case 5:
        return <ConclusionPage />;
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4">
        {currentPage === 1 && 'Reflection'}
        {currentPage === 2 && 'Personality'}
        {currentPage === 3 && 'Story'}
        {currentPage === 4 && 'Differentiation'}
        {currentPage === 5 && 'Conclusion & Next Steps'}
      </h2>

      {renderPage()}

      {/* PDF and Next Section buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onPdfDownloaded}
          disabled={!isValid}
          className={`px-4 py-2 rounded ${
            !isValid
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {pdfDownloaded ? 'Re-Download PDF' : 'Download PDF'}
        </button>
        {onNextSection && (
          <button
            onClick={pdfDownloaded ? onNextSection : null}
            disabled={!isValid || !pdfDownloaded}
            className={`px-4 py-2 rounded ${
              !isValid || !pdfDownloaded
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Next Section
          </button>
        )}
      </div>
    </div>
  );
}

const config = {
  generatePdf: generateBrandIdentityPDF,
  // Use our per-page validation function here.
  isDataComplete: isBrandIdentityPageComplete,
  pdfFileName: 'brand-identity.pdf',
  title: 'Brand Identity',
  description: 'Define your brand identity across reflection, personality, story, differentiation, and conclusion.',
  maxPages: 5
};

export default withWorksheetLogic<BrandIdentityWorksheetProps>(BrandIdentityWorksheet, config);