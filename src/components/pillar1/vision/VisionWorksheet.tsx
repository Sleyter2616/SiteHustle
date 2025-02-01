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
      title: 'Vision Clarity', 
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
      title: 'Goals', 
      component: <GoalsPage 
        data={data?.businessGoals} 
        onChange={handleGoalsChange} 
      />
    },
    { 
      title: 'Target Audience', 
      component: <TargetAudiencePage 
        data={data?.targetAudience} 
        onChange={handleTargetAudienceChange} 
      />
    },
    { 
      title: 'SWOT Analysis', 
      component: <SwotAnalysisPage 
        data={data?.swot} 
        onChange={handleSwotChange} 
      />
    },
    { 
      title: 'Customer Journey', 
      component: <CustomerJourneyPage 
        data={data?.customerJourney} 
        onChange={handleCustomerJourneyChange} 
      />
    },
    { 
      title: 'Conclusion', 
      component: <VisionConclusionPage /> 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${index === currentStep 
                      ? 'bg-blue-500 text-white' 
                      : index < currentStep 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300'
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
                      ${index < currentStep ? 'bg-green-500' : 'bg-gray-700'}
                      transition-all duration-200
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-3xl mx-auto mt-2">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className={`
                  text-sm font-medium
                  ${index === currentStep ? 'text-blue-400' : 'text-gray-400'}
                  transition-all duration-200
                `}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8">
          {steps[currentStep].component}
        </div>

        {/* Navigation */}
        <div className="flex justify-between max-w-4xl mx-auto">
          {/* Left side - Previous button */}
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`
              px-6 py-2 rounded-lg font-medium
              ${currentStep === 0 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }
              transition-all duration-200
            `}
          >
            Previous
          </button>

          {/* Center and Right side buttons */}
          <div className="flex gap-4">
            {/* PDF Download Button */}
            <button
              onClick={onPdfDownloaded}
              disabled={!isValid}
              className={`
                px-6 py-2 rounded-lg font-medium
                ${!isValid
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }
                transition-all duration-200
              `}
            >
              {pdfDownloaded ? 'Re-Download PDF' : 'Download PDF'}
            </button>

            {/* Next Section Button */}
            <button
              onClick={onNextSection}
              disabled={!pdfDownloaded || !isValid}
              className={`
                px-6 py-2 rounded-lg font-medium
                ${!pdfDownloaded || !isValid
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }
                transition-all duration-200
              `}
            >
              Next Section
            </button>

            {/* Next Button */}
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep === steps.length - 1}
              className={`
                px-6 py-2 rounded-lg font-medium
                ${currentStep === steps.length - 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }
                transition-all duration-200
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