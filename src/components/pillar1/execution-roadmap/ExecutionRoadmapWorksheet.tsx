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
  isValid?: boolean;
  onPdfDownloaded?: () => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
}

function ExecutionRoadmapWorksheet({
  data,
  onChange,
  isValid,
  onPdfDownloaded,
  onNextSection,
  pdfDownloaded
}: ExecutionRoadmapWorksheetProps) {
  // If no data provided, define defaults
  const defaultData: ExecutionRoadmapData = {
    thirtyDayGoal: '',
    weeklyMilestones: [],
    contentPlan: '',
    immediateActions: [],
    ...data
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
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

      {/* Pages */}
      <ThirtyDayGoalPage data={defaultData} onChange={onChange} />
      <WeeklyMilestonesPage data={defaultData} onChange={onChange} />
      <ContentPlanPage data={defaultData} onChange={onChange} />
      <ImmediateActionsPage data={defaultData} onChange={onChange} />

      {/* CTA or PDF Download / Next Section */}
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
                : 'Download Roadmap PDF'
            }
          </button>
        </div>
      )}
    </div>
  );
}

function isDataComplete(data?: ExecutionRoadmapData) {
  if (!data) return false;
  const { thirtyDayGoal, weeklyMilestones, contentPlan, immediateActions } = data;
  return Boolean(
    thirtyDayGoal &&
    (weeklyMilestones?.length || 0) >= 4 &&  // e.g. requiring 4 weekly milestones
    contentPlan &&
    (immediateActions?.length || 0) >= 3    // e.g. requiring 3 immediate actions
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

export default withWorksheetLogic<ExecutionRoadmapWorksheetProps>(ExecutionRoadmapWorksheet, config);
