import React, { useState } from 'react';
import { BrandIdentityData } from '@/types/pillar1';
import PersonalityPage from './pages/PersonalityPage';
import StoryPage from './pages/StoryPage';
import DifferentiationPage from './pages/DifferentiationPage';
import ExecutionRoadmapPage from './pages/ExecutionRoadmapPage';
import ReflectionPage from './pages/ReflectionPage';
import ConclusionPage from './pages/ConclusionPage';

interface BrandIdentityWorksheetProps {
  data?: BrandIdentityData;
  onChange?: (data: BrandIdentityData) => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
  onPdfDownloaded?: () => void;
  isValid?: boolean;
}

export default function BrandIdentityWorksheet({ 
  data, 
  onChange, 
  onNextSection,
  pdfDownloaded,
  onPdfDownloaded,
  isValid 
}: BrandIdentityWorksheetProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePersonalityChange = (updatedPersonality) => {
    onChange?.({ ...data, personality: updatedPersonality });
  };

  const handleStoryChange = (updatedStory) => {
    onChange?.({ ...data, story: updatedStory });
  };

  const handleDifferentiationChange = (updatedDifferentiation) => {
    onChange?.({ ...data, differentiation: updatedDifferentiation });
  };

  const handleExecutionRoadmapChange = (updatedRoadmap) => {
    onChange?.({ ...data, executionRoadmap: updatedRoadmap });
  };

  const handleReflectionChange = (updatedReflection) => {
    onChange?.({ ...data, reflection: updatedReflection });
  };

  const steps = [
    { title: 'Brand Personality', component: <PersonalityPage data={data?.personality} onChange={handlePersonalityChange} /> },
    { title: 'Brand Story', component: <StoryPage data={data?.story} onChange={handleStoryChange} /> },
    { title: 'Differentiation', component: <DifferentiationPage data={data?.differentiation} onChange={handleDifferentiationChange} /> },
    { title: 'Execution Roadmap', component: <ExecutionRoadmapPage data={data?.executionRoadmap} onChange={handleExecutionRoadmapChange} /> },
    { title: 'Reflection', component: <ReflectionPage data={data?.reflection} onChange={handleReflectionChange} /> },
    { title: 'Conclusion', component: <ConclusionPage /> }
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