import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { VisionData } from '@/types/pillar1';
import { generateVisionPDF } from '@/utils/pdfUtils';
import VisionClarityPage from './pages/VisionClarityPage';
import GoalsPage from './pages/GoalsPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import VisionConclusionPage from './pages/VisionConclusionPage'; // NEW


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
            {/* ... add more fields if needed */}
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
  const defaultVision: VisionData = data || {
    businessName: '',
    tagline: '',
    missionStatement: '',
    visionStatement: '',
    coreValues: [],
    businessGoals: { shortTerm: '', midTerm: '', longTerm: '' },
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
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1: return <VisionClarityPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 2: return <GoalsPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 3: return <TargetAudiencePage data={defaultVision} onChange={onChange} errors={errors} />;
      case 4: return <CustomerJourneyPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 5: return <SwotAnalysisPage data={defaultVision} onChange={onChange} errors={errors} />;
      // NEW: conclusion as final page
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

      {/* If final page (6) => wrap-up CTA about needing PDF, if not downloaded yet */}
      { !pdfDownloaded && (
        <div className="mt-6 p-4 bg-gray-800 text-yellow-400 rounded">
          You must download the PDF to proceed to the next pillar.
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

function isDataComplete(data?: VisionData) {
  if (!data) return false;
  // same checks as before
  const clarityDone = Boolean(
    data.businessName && data.tagline && data.missionStatement &&
    data.visionStatement && data.coreValues?.length
  );
  const goalsDone = Boolean(
    data.businessGoals?.shortTerm && data.businessGoals?.midTerm && data.businessGoals?.longTerm
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

// changed maxPages from 5 to 6
const config = {
  generatePdf: generateVisionPDF,
  isDataComplete,
  pdfFileName: 'vision-worksheet.pdf',
  title: 'Vision & Strategy',
  description: 'Define your business vision, goals, target audience, and strategic analysis.',
  maxPages: 6
};

export default withWorksheetLogic<VisionWorksheetProps>(VisionWorksheet, config);