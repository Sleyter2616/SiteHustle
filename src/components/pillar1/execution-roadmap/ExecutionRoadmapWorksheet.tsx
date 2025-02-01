import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import { withWorksheetLogic, WithWorksheetLogicProps } from '@/components/common/withWorksheetLogic';
import { generateExecutionRoadmapPDF } from '@/utils/pdfUtils';
import ThirtyDayGoalPage from './pages/ThirtyDayGoalPage';
import WeeklyMilestonesPage from './pages/WeeklyMilestonesPage';
import ContentPlanPage from './pages/ContentPlanPage';
import ImmediateActionsPage from './pages/ImmediateActionsPage';

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
  isValid = false,
  onPdfDownloaded,
  onNextSection,
  pdfDownloaded = false
}: ExecutionRoadmapWorksheetProps) {
  // Provide defaults and merge with any incoming data:
  const defaultData: ExecutionRoadmapData = {
    thirtyDayGoal: '',
    weeklyMilestones: [],
    contentPlan: '',
    immediateActions: [],
    ...data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section with additional context */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Your Execution Roadmap
          </h1>
          <div className="space-y-4 text-gray-300">
            <p>
              This worksheet outlines a clear, step-by-step plan to translate your ideas and goals into actionable next steps.
              By focusing on a <strong>30-day goal</strong>, weekly milestones, a content plan, and immediate actions,
              you'll gain momentum and confidence.
            </p>
            <p>
              Think of this as your short-term sprint to test ideas quickly and validate or refine your approach.
              Consider supplementing the SMART goal framework with methodologies like OKRs (Objectives and Key Results) or KPIs (Key Performance Indicators)
              to better align your actions with measurable outcomes.
            </p>
            <p>
              If you have any previous PDFs or strategic documents from earlier worksheets, please review them now.
              They can provide valuable insights and help you answer these questions more effectively.
            </p>
          </div>
        </div>

        {/* Subsections */}
        <div className="space-y-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <ThirtyDayGoalPage data={defaultData} onChange={onChange} />
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <WeeklyMilestonesPage data={defaultData} onChange={onChange} />
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <ContentPlanPage data={defaultData} onChange={onChange} />
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <ImmediateActionsPage data={defaultData} onChange={onChange} />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between max-w-4xl mx-auto mt-8">
          {/* Left side - Previous button */}
          <div></div> {/* Empty div for spacing */}

          {/* Right side buttons */}
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
            {onNextSection && (
              <button
                onClick={pdfDownloaded ? onNextSection : null}
                disabled={!isValid || !pdfDownloaded}
                className={`
                  px-6 py-2 rounded-lg font-medium
                  ${!isValid || !pdfDownloaded
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }
                  transition-all duration-200
                `}
              >
                Next Section
              </button>
            )}
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