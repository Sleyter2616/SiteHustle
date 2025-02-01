import React, { useMemo } from 'react';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { VisionData } from '@/types/pillar1';
import { generateVisionPDF } from '@/utils/pdfUtils';
// We no longer need to check if vision data is complete on a per-page basis in the child components.

import VisionClarityPage from './pages/VisionClarityPage';
import GoalsPage from './pages/GoalsPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import VisionConclusionPage from './pages/VisionConclusionPage';

interface VisionWorksheetProps extends WithWorksheetLogicProps {
  data?: VisionData;
  onChange?: (data: VisionData) => void;
}

function VisionWorksheet({
  data,
  onChange,
  errors,
  isValid,
  pdfDownloaded,
  onPdfDownloaded,
  onNextSection,
  currentPage = 1
}: VisionWorksheetProps) {
  const defaultData: VisionData = {
    businessName: '',
    tagline: '',
    missionStatement: '',
    visionStatement: '',
    coreValues: [],
    businessGoals: {
      shortTerm: '',
      midTerm: '',
      longTerm: '',
      websiteGoals: '',
      successIndicators: '',
      attendance: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
      engagement: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
      financial: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
      contentDelivery: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
      networking: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
      goalPriorities: '',
      actionPlan: '',
      challenges: '',
      accountability: '',
      summary: '',
      nextSteps: '',
    },
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [], matchingStrengthsToOpp: '', addressWeaknessesThreats: '', swotPriorities: '', actionSteps: '', responsibilities: '', swotSummary: '' },
    customerJourney: { awareness: [], consideration: [], decision: '', retention: [] },
    targetAudience: {
      primaryProfile: '',
      secondaryAudiences: [],
      painPoints: [],
      idealCustomerProfile: {
        problem: '',
        journey: '',
        desires: [],
        desiredState: '',
        gap: '',
        uniqueSellingPoint: '',
        benefits: [],
        objections: []
      }
    }
  };

  const mergedData: VisionData = useMemo(() => ({
    ...defaultData,
    ...data,
  }), [data]);

  // Render each page with its appropriate data and dedicated onChange handler.
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <VisionClarityPage
            data={{
              businessName: mergedData.businessName,
              tagline: mergedData.tagline,
              missionStatement: mergedData.missionStatement,
              visionStatement: mergedData.visionStatement,
              coreValues: mergedData.coreValues,
            }}
            onChange={(updatedClarity) =>
              onChange?.({ ...mergedData, ...updatedClarity })
            }
            errors={errors}
          />
        );
      case 2:
        return (
          <GoalsPage
            data={mergedData.businessGoals}
            onChange={(updatedGoals) =>
              onChange?.({ ...mergedData, businessGoals: updatedGoals })
            }
            errors={errors}
          />
        );
      case 3:
        return (
          <TargetAudiencePage
            data={mergedData.targetAudience}
            onChange={(updatedTarget) =>
              onChange?.({ ...mergedData, targetAudience: updatedTarget })
            }
            errors={errors}
          />
        );
      case 4:
        return (
          <CustomerJourneyPage
            data={mergedData.customerJourney}
            onChange={(updatedJourney) =>
              onChange?.({ ...mergedData, customerJourney: updatedJourney })
            }
            errors={errors}
          />
        );
      case 5:
        return (
          <SwotAnalysisPage
            data={mergedData.swot}
            onChange={(updatedSwot) =>
              onChange?.({ ...mergedData, swot: updatedSwot })
            }
            errors={errors}
          />
        );
      case 6:
        return <VisionConclusionPage />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {currentPage === 1 && "Vision Clarity"}
        {currentPage === 2 && "Business Goals"}
        {currentPage === 3 && "Target Audience"}
        {currentPage === 4 && "Customer Journey"}
        {currentPage === 5 && "SWOT Analysis"}
        {currentPage === 6 && "Vision Conclusion"}
      </h2>

      {renderPage()}

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
  generatePdf: generateVisionPDF,
  // We no longer use a completeness check here in the sub-pages.
  isDataComplete: () => true,
  pdfFileName: 'vision-worksheet.pdf',
  title: 'Vision & Goals',
  description: 'Define your business vision, goals, target audience, and strategic analysis.',
  maxPages: 6
};

export default withWorksheetLogic<VisionWorksheetProps>(VisionWorksheet, config);