import React, { useState } from 'react';
import { VisionData } from '@/types/pillar1';

import VisionClarityPage from './pages/VisionClarityPage';
import GoalsPage from './pages/GoalsPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import VisionConclusionPage from './pages/VisionConclusionPage';

interface VisionWorksheetProps {
  data?: VisionData;
  onChange?: (data: VisionData) => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
  onPdfDownloaded?: () => void;
  isValid?: boolean;
}

export default function VisionWorksheet({
  data,
  onChange,
  onNextSection,
  pdfDownloaded,
  onPdfDownloaded,
  isValid
}: VisionWorksheetProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleVisionChange = (updatedVision) => {
    onChange?.({ 
      ...data,
      businessName: updatedVision.businessName,
      tagline: updatedVision.tagline,
      visionStatement: updatedVision.visionStatement,
      missionStatement: updatedVision.missionStatement,
      coreValues: updatedVision.coreValues
    });
  };

  const handleGoalsChange = (updatedGoals) => {
    onChange?.({ 
      ...data,
      businessGoals: updatedGoals
    });
  };

  const handleTargetAudienceChange = (updatedTarget) => {
    onChange?.({ 
      ...data,
      targetAudience: updatedTarget
    });
  };

  const handleSwotChange = (updatedSwot) => {
    onChange?.({ 
      ...data,
      swot: updatedSwot
    });
  };

  const handleCustomerJourneyChange = (updatedJourney) => {
    onChange?.({ 
      ...data,
      customerJourney: updatedJourney
    });
  };

  const steps = [
    { 
      component: <VisionClarityPage 
        data={{
          businessName: data?.businessName,
          tagline: data?.tagline,
          visionStatement: data?.visionStatement,
          missionStatement: data?.missionStatement,
          coreValues: data?.coreValues
        }} 
        onChange={handleVisionChange} 
      />
    },
    { 
      component: <GoalsPage 
        data={data?.businessGoals} 
        onChange={handleGoalsChange} 
      />
    },
    { 
      component: <TargetAudiencePage 
        data={data?.targetAudience} 
        onChange={handleTargetAudienceChange} 
      />
    },
    { 
      component: <SwotAnalysisPage 
        data={data?.swot} 
        onChange={handleSwotChange} 
      />
    },
    { 
      component: <CustomerJourneyPage 
        data={data?.customerJourney} 
        onChange={handleCustomerJourneyChange} 
      />
    },
    { 
      component: <VisionConclusionPage /> 
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onNextSection) {
      onNextSection();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center max-w-3xl mx-auto mb-12">
        {steps.map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index === currentStep 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : index < currentStep 
                    ? 'bg-green-500 text-white'
                    : 'bg-[#1a2236] text-gray-300 border border-gray-700'
                }
                transition-all duration-200
              `}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`
                  h-0.5 w-16 mx-2
                  ${index < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'}
                  transition-all duration-200
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="p-6">
        {steps[currentStep].component}
      </div>

      {/* Navigation */}
      <div className="text-center text-sm text-gray-400 mt-8">
        {!isValid && "Complete all sections to unlock the final PDF."}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`
              px-6 py-2 rounded-lg font-medium transition-all duration-200
              ${currentStep === 0
                ? 'bg-[#1a2236] text-gray-400 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }
            `}
          >
            Previous
          </button>

          <div className="flex gap-4">
            <button
              onClick={onPdfDownloaded}
              disabled={!isValid}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${!isValid
                  ? 'bg-[#1a2236] text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }
              `}
            >
              {pdfDownloaded ? 'Re-Download PDF' : 'Download PDF'}
            </button>

            <button
              onClick={onNextSection}
              disabled={!pdfDownloaded || !isValid}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${!pdfDownloaded || !isValid
                  ? 'bg-[#1a2236] text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }
              `}
            >
              Next Section
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${currentStep === steps.length - 1
                  ? 'bg-[#1a2236] text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}