// src/components/brand-identity/BrandIdentityWorksheet.tsx

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
    // executionRoadmap REMOVED from this flow
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

      {/* CTA clarifying gating */}
      {!pdfDownloaded && (
        <div className="mt-6 p-4 bg-gray-800 text-yellow-400 rounded">
          You must download the PDF to proceed to the next section.
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-4">
        {/* Download PDF Button */}
        <button
          onClick={onPdfDownloaded}
          disabled={!pdfDownloaded}
          className={`px-4 py-2 rounded ${
            !pdfDownloaded
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
       Re-Download Brand Identity PDF
        </button>

        {/* Next Section => gated by pdfDownloaded */}
        <button
          onClick={onNextSection}
          disabled={!pdfDownloaded}
          className={`px-4 py-2 rounded ${
            !pdfDownloaded
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          Next Section
        </button>
      </div>
    </div>
  );
}

function isDataComplete(data?: BrandIdentityData): boolean {
  if (!data) return false;
  // Additional checks can go here if needed
  return true;
}

const config = {
  generatePdf: generateBrandIdentityPDF,
  isDataComplete,
  pdfFileName: 'brand-identity.pdf',
  title: 'Brand Identity',
  description: 'Define your brand identity across reflection, personality, story, differentiation, and conclusion.',
  maxPages: 5 // only 5 pages now
};

export default withWorksheetLogic<BrandIdentityWorksheetProps>(BrandIdentityWorksheet, config);