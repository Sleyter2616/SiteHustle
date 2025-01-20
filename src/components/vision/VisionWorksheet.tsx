import React from 'react';
import { VisionData } from '@/types/pillar1';
import VisionClarityPage from './pages/VisionClarityPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import GoalsPage from './pages/GoalsPage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import { generateVisionWorksheetPDF } from '@/utils/pdfUtils';
import { withWorksheetLogic, WithWorksheetLogicProps } from '../common/withWorksheetLogic';

type VisionWorksheetProps = Omit<WithWorksheetLogicProps, 'data'> & {
  data: VisionData;
  onChange: (data: VisionData) => void;
  currentPage: number;
}

function VisionWorksheet({ 
  data, 
  onChange, 
  currentPage,
  errors 
}: VisionWorksheetProps) {
  const renderPage = () => {
    const defaultData = data || {
      businessName: '',
      tagline: '',
      missionStatement: '',
      coreValues: [],
      businessGoals: {
        shortTerm: '',
        midTerm: '',
        longTerm: ''
      },
      targetAudience: {
        primaryProfile: '',
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
      },
      visionStatement: '',
      swot: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      },
      customerJourney: {
        awareness: [],
        consideration: [],
        decision: '',
        retention: []
      }
    };

    switch (currentPage) {
      case 1:
        return (
          <VisionClarityPage
            data={defaultData}
            onChange={onChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <TargetAudiencePage
            data={defaultData}
            onChange={onChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <GoalsPage
            data={defaultData}
            onChange={onChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <CustomerJourneyPage
            data={defaultData}
            onChange={onChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <SwotAnalysisPage
            data={defaultData}
            onChange={onChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
}

const isDataComplete = (data: VisionData) => {
  if (!data) return false;

  const {
    businessName,
    tagline,
    missionStatement,
    coreValues,
    businessGoals,
    targetAudience,
    visionStatement,
    swot,
    customerJourney
  } = data;

  const hasBasicInfo = businessName && tagline && missionStatement && coreValues?.length;
  const hasBusinessGoals = businessGoals?.shortTerm && businessGoals?.midTerm && businessGoals?.longTerm;
  
  const hasTargetAudience = targetAudience?.primaryProfile && 
                           targetAudience?.painPoints?.length && 
                           targetAudience?.idealCustomerProfile?.problem &&
                           targetAudience?.idealCustomerProfile?.journey &&
                           targetAudience?.idealCustomerProfile?.desires?.length &&
                           targetAudience?.idealCustomerProfile?.desiredState &&
                           targetAudience?.idealCustomerProfile?.gap &&
                           targetAudience?.idealCustomerProfile?.uniqueSellingPoint &&
                           targetAudience?.idealCustomerProfile?.benefits?.length &&
                           targetAudience?.idealCustomerProfile?.objections?.length;

  const hasVisionAndSwot = visionStatement && 
                          swot?.strengths?.length && 
                          swot?.weaknesses?.length && 
                          swot?.opportunities?.length && 
                          swot?.threats?.length;

  const hasCustomerJourney = customerJourney?.awareness?.length && 
                            customerJourney?.consideration?.length && 
                            customerJourney?.decision && 
                            customerJourney?.retention?.length;

  return Boolean(hasBasicInfo && hasBusinessGoals && hasTargetAudience && hasVisionAndSwot && hasCustomerJourney);
};

const config = {
  generatePdf: generateVisionWorksheetPDF,
  isDataComplete,
  pdfFileName: 'vision-worksheet.pdf',
  title: 'Vision & Goals',
  description: 'Define your business vision, target audience, and strategic goals.'
};

export default withWorksheetLogic(VisionWorksheet, config);
