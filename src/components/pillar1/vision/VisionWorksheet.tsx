import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { VisionData } from '@/types/pillar1';
import { generateVisionPDF } from '@/utils/pdfUtils';

import VisionClarityPage from './pages/VisionClarityPage';
import GoalsPage from './pages/GoalsPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import VisionConclusionPage from './pages/VisionConclusionPage';

export function VisionWorksheetPDF({ data }: { data?: VisionData }) {
  return (
    <Page size="A4" style={{ padding: 24 }}>
      {!data 
        ? <Text>No Vision data available.</Text>
        : (
          <View>
            <Text style={{ fontSize: 18, marginBottom: 8 }}>
              Vision & Goals Summary
            </Text>
            <Text>Business Name: {data.businessName || 'N/A'}</Text>
            <Text>Tagline: {data.tagline || 'N/A'}</Text>
            <Text>Mission: {data.missionStatement || 'N/A'}</Text>
            {/* Add more fields if needed */}
          </View>
        )
      }
    </Page>
  );
}

interface VisionWorksheetProps extends WithWorksheetLogicProps {
  data?: VisionData;
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
  /**
   * Provide empty defaults for each new subfield in businessGoals
   * so that TypeScript and the rest of your code handle them gracefully.
   */
  const defaultVision: VisionData = {
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
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    customerJourney: { awareness: [], consideration: [], decision: '', retention: [] },
    targetAudience: {
      primaryProfile: '',
      secondaryAudiences: [],
      painPoints: [],
      idealCustomerProfile: {
        problem: '', journey: '', desires: [], desiredState: '',
        gap: '', uniqueSellingPoint: '', benefits: [], objections: []
      }
    },
    ...data // merges any existing data
  };

  // Renders the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case 1: return <VisionClarityPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 2: return <GoalsPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 3: return <TargetAudiencePage data={defaultVision} onChange={onChange} errors={errors} />;
      case 4: return <CustomerJourneyPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 5: return <SwotAnalysisPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 6: return <VisionConclusionPage />;
      default: return null;
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

      {/* If final page (6) => show a CTA for PDF if not downloaded */}
      {!pdfDownloaded && (
        <div className="mt-6 p-4 bg-gray-800 text-yellow-400 rounded">
          You must download the PDF to proceed to the next section.
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end mt-6 gap-4">
        <button
          onClick={onPdfDownloaded}
          disabled={!pdfDownloaded}
          className={`px-4 py-2 rounded ${
            !pdfDownloaded
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {pdfDownloaded ? 'Re-Download Vision PDF' : 'Download Vision PDF'}
        </button>

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

/**
 * If you want the *new fields* to be required, add them here.
 * Currently, we only check the original required fields.
 */
function isDataComplete(data?: VisionData) {
  if (!data) return false;

  const clarityDone = Boolean(
    data.businessName && data.tagline && data.missionStatement &&
    data.visionStatement && data.coreValues?.length
  );
  const goalsDone = Boolean(
    data.businessGoals?.shortTerm &&
    data.businessGoals?.midTerm &&
    data.businessGoals?.longTerm
    // If you want these also required: data.businessGoals?.attendance?.specific etc.
  );
  const audienceDone = Boolean(
    data.targetAudience?.primaryProfile &&
    data.targetAudience?.painPoints?.length &&
    data.targetAudience?.idealCustomerProfile?.problem &&
    data.targetAudience?.idealCustomerProfile?.journey
  );
  const journeyDone = Boolean(
    data.customerJourney?.awareness?.length &&
    data.customerJourney?.consideration?.length &&
    data.customerJourney?.decision &&
    data.customerJourney?.retention?.length
  );
  const swotDone = Boolean(
    data.swot?.strengths?.length && data.swot?.weaknesses?.length &&
    data.swot?.opportunities?.length && data.swot?.threats?.length
  );

  return clarityDone && goalsDone && audienceDone && journeyDone && swotDone;
}

const config = {
  generatePdf: generateVisionPDF,
  isDataComplete,
  pdfFileName: 'vision-worksheet.pdf',
  title: 'Vision & Strategy',
  description: 'Define your business vision, goals, target audience, and strategic analysis.',
  maxPages: 6
};

export default withWorksheetLogic<VisionWorksheetProps>(VisionWorksheet, config);
