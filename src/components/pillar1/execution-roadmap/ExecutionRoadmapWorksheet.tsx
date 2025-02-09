import React, { useState } from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { generateExecutionRoadmapPDF } from '@/utils/pdfUtils';
import ThirtyDayGoalPage from './pages/ThirtyDayGoalPage';
import WeeklyMilestonesPage from './pages/WeeklyMilestonesPage';
import ContentPlanPage from './pages/ContentPlanPage';
import ImmediateActionsPage from './pages/ImmediateActionsPage';
// import ExecutionConclusionPage from './pages/ExecutionConclusionPage';

interface ExecutionRoadmapWorksheetProps extends WithWorksheetLogicProps {
  data?: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  isValid?: boolean;         // from withWorksheetLogic
  onPdfDownloaded?: () => void;   // from withWorksheetLogic
  onNextSection?: () => void;     // from withWorksheetLogic
  pdfDownloaded?: boolean;        // from withWorksheetLogic
}

function ExecutionRoadmapWorksheet({
  data,
  onChange,
  onNextSection,
  pdfDownloaded,
  onPdfDownloaded,
  isValid
}: ExecutionRoadmapWorksheetProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const defaultData: ExecutionRoadmapData = {
    thirtyDayGoal: '',
    weeklyMilestones: [],
    contentPlan: '',
    immediateActions: [],
    ...data
  };

  const steps = [
    { component: <ThirtyDayGoalPage data={defaultData} onChange={onChange} /> },
    { component: <WeeklyMilestonesPage data={defaultData} onChange={onChange} /> },
    { component: <ContentPlanPage data={defaultData} onChange={onChange} /> },
    { component: <ImmediateActionsPage data={defaultData} onChange={onChange} /> },
    // { component: <ExecutionConclusionPage /> }
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

/**
 * For the PDF gating & “Complete All Fields First” logic,
 * we define isDataComplete as the minimum required fields:
 */
function isDataComplete(data?: ExecutionRoadmapData) {
  if (!data) return false;
  const { thirtyDayGoal, weeklyMilestones, contentPlan, immediateActions } = data;
  return (
    // Must have a 30-day goal
    !!thirtyDayGoal?.trim() &&
    // Require at least 4 weekly milestones
    (weeklyMilestones?.length ?? 0) >= 4 &&
    // Must have a content plan
    !!contentPlan?.trim() &&
    // Require at least 3 immediate actions
    (immediateActions?.length ?? 0) >= 3
  );
}

const config = {
  generatePdf: generateExecutionRoadmapPDF,
  isDataComplete,
  pdfFileName: 'execution-roadmap.pdf',
  title: 'Execution Roadmap',
  description: 'Create a clear plan to execute your vision and achieve your business goals.',
  maxPages: 1
};

export default withWorksheetLogic<ExecutionRoadmapWorksheetProps>(
  ExecutionRoadmapWorksheet,
  config
);