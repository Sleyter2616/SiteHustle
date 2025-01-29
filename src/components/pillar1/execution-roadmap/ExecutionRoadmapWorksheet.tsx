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
  // Provide defaults:
  const defaultData: ExecutionRoadmapData = {
    thirtyDayGoal: '',
    weeklyMilestones: [],
    contentPlan: '',
    immediateActions: [],
    ...data
  };

  return (
    <div className="space-y-6">
      {/* Intro Section */}
      <div className="space-y-3 bg-gray-800 p-4 rounded">
        <h1 className="text-2xl font-bold">Your Execution Roadmap</h1>
        <p className="text-gray-300">
          This worksheet outlines a clear, step-by-step plan 
          to translate your ideas and goals into actionable next steps. 
          By focusing on a <strong>30-day goal</strong>, weekly milestones, 
          and immediate actions, you’ll gain momentum and confidence.
        </p>
        <p className="text-gray-300">
          Think of this as your short-term sprint to test ideas quickly 
          and validate or refine your approach. 
          The more concrete your roadmap, the easier it is to stay focused and track progress.
        </p>
      </div>

      {/* Subsections */}
      <ThirtyDayGoalPage data={defaultData} onChange={onChange} />
      <WeeklyMilestonesPage data={defaultData} onChange={onChange} />
      <ContentPlanPage data={defaultData} onChange={onChange} />
      <ImmediateActionsPage data={defaultData} onChange={onChange} />

      {/* PDF and Next Section buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onPdfDownloaded}
          disabled={!isValid}
          className={`px-4 py-2 rounded ${
            !isValid
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {pdfDownloaded ? 'Re-Download PDF' : 'Download PDF'}
        </button>
        {onNextSection && (
          <button
            onClick={pdfDownloaded ? onNextSection : null}
            disabled={!isValid || !pdfDownloaded}
            className={`px-4 py-2 rounded ${
              !isValid || !pdfDownloaded
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Next Section
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * For the PDF gating & “Complete All Fields First” logic,
 * we define isDataComplete as your min. required fields:
 */
function isDataComplete(data?: ExecutionRoadmapData) {
  if (!data) return false;
  const { thirtyDayGoal, weeklyMilestones, contentPlan, immediateActions } = data;
  return (
    // Must have a 30-day goal
    !!thirtyDayGoal?.trim() &&
    // e.g. require 4 weekly milestones
    (weeklyMilestones?.length ?? 0) >= 4 &&
    // Must have contentPlan
    !!contentPlan?.trim() &&
    // e.g. require 3 immediate actions
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
