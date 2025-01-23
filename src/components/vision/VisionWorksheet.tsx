

/***************************************
 FILE 2: src/components/vision/VisionWorksheet.tsx
***************************************/
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { VisionData } from '@/types/pillar1';
import VisionClarityPage from './pages/VisionClarityPage';
import GoalsPage from './pages/GoalsPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';

/* 
   The PDF component: must always return <Page>. 
   If data is empty, show placeholder text.
*/
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
            {/* etc. for other fields if you like */}
          </View>
        )
      }
    </Page>
  );
}

/* The main VisionWorksheet component for user input + multi-step UI. */
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
    customerJourney: {
      awareness: [], consideration: [], decision: '', retention: []
    },
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

  // Renders the sub-pages 1..5
  const renderPage = () => {
    switch (currentPage) {
      case 1: return <VisionClarityPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 2: return <GoalsPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 3: return <TargetAudiencePage data={defaultVision} onChange={onChange} errors={errors} />;
      case 4: return <CustomerJourneyPage data={defaultVision} onChange={onChange} errors={errors} />;
      case 5: return <SwotAnalysisPage data={defaultVision} onChange={onChange} errors={errors} />;
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
      </h2>

      {renderPage()}

      {/* Download or Next button */}
      {(onPdfDownloaded || onNextSection) && (
        <div className="flex justify-end mt-6">
          <button
            onClick={pdfDownloaded ? onNextSection : onPdfDownloaded}
            disabled={!isValid}
            className={`px-4 py-2 rounded ${
              !isValid
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {!isValid
              ? 'Complete All Fields First'
              : pdfDownloaded
                ? 'Next Section'
                : 'Download Vision PDF'
            }
          </button>
        </div>
      )}
    </div>
  );
}

/* Checks if all sub-pages are complete */
function isDataComplete(data: VisionData | undefined): boolean {
  if (!data) return false;
  // Page 1
  const clarityDone = Boolean(
    data.businessName && data.tagline && data.missionStatement &&
    data.visionStatement && data.coreValues?.length
  );
  // Page 2
  const goalsDone = Boolean(
    data.businessGoals?.shortTerm && data.businessGoals?.midTerm &&
    data.businessGoals?.longTerm
  );
  // Page 3
  const audienceDone = Boolean(
    data.targetAudience?.primaryProfile &&
    data.targetAudience?.painPoints?.length &&
    data.targetAudience?.idealCustomerProfile?.problem &&
    data.targetAudience?.idealCustomerProfile?.journey
  );
  // Page 4
  const journeyDone = Boolean(
    data.customerJourney?.awareness?.length &&
    data.customerJourney?.consideration?.length &&
    data.customerJourney?.decision &&
    data.customerJourney?.retention?.length
  );
  // Page 5
  const swotDone = Boolean(
    data.swot?.strengths?.length && data.swot?.weaknesses?.length &&
    data.swot?.opportunities?.length && data.swot?.threats?.length
  );
  return clarityDone && goalsDone && audienceDone && journeyDone && swotDone;
}

/* Tells withWorksheetLogic how to generate the PDF & check completeness */
const config = {
  generatePdf: async (data?: VisionData) => {
    // We import @react-pdf/renderer, create a <Document><VisionWorksheetPDF/></Document> at runtime
    const { pdf, Document } = await import('@react-pdf/renderer');
    const docElem = (
      <Document>
        <VisionWorksheetPDF data={data} />
      </Document>
    );
    const blob = await pdf(docElem).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = data?.businessName ? `${data.businessName}-vision.pdf` : 'vision-worksheet.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
  isDataComplete,
  pdfFileName: 'vision-worksheet.pdf',
  title: 'Vision & Strategy',
  description: 'Define your business vision, goals, target audience, and strategic analysis.',
  maxPages: 5
};

/* Wrap in the withWorksheetLogic HOC */
export default withWorksheetLogic<VisionWorksheetProps>(VisionWorksheet, config);
