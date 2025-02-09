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
    { title: 'Reflection', component: <ReflectionPage data={data?.reflection} onChange={handleReflectionChange} /> },
    { title: 'Brand Personality', component: <PersonalityPage data={data?.personality} onChange={handlePersonalityChange} /> },
    { title: 'Brand Story', component: <StoryPage data={data?.story} onChange={handleStoryChange} /> },
    { title: 'Differentiation', component: <DifferentiationPage data={data?.differentiation} onChange={handleDifferentiationChange} /> },
    { title: 'Execution Roadmap', component: <ExecutionRoadmapPage data={data?.executionRoadmap} onChange={handleExecutionRoadmapChange} /> },
    { title: 'Conclusion', component: <ConclusionPage /> }
  ];

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${index === currentStep 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : index < currentStep 
                      ? 'bg-green-500 text-white'
                      : 'bg-[#1a2236] text-gray-400'
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
                    ${index < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-[#1a2236]'}
                    transition-all duration-200
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {steps[currentStep].component}
      </div>

      {/* Footer Progress */}
      <div className="text-center text-sm text-gray-400 mt-8">
        {!isValid && "Complete all sections to unlock the final PDF."}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
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
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
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