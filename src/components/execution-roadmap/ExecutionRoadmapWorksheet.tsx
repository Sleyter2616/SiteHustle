import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import { withWorksheetLogic, WithWorksheetLogicProps } from '../common/withWorksheetLogic';
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
  const defaultData: ExecutionRoadmapData = data || {
    thirtyDayGoal: '',
    weeklyMilestones: [],
    contentPlan: '',
    immediateActions: []
  };

  return (
    <div className="space-y-6">
      <ThirtyDayGoalPage data={defaultData} onChange={onChange} />
      <WeeklyMilestonesPage data={defaultData} onChange={onChange} />
      <ContentPlanPage data={defaultData} onChange={onChange} />
      <ImmediateActionsPage data={defaultData} onChange={onChange} />

      {/* Example PDF or Next Section button at bottom */}
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

function isDataComplete(data: ExecutionRoadmapData) {
  if (!data) return false;
  const { thirtyDayGoal, weeklyMilestones, contentPlan, immediateActions } = data;
  return Boolean(
    thirtyDayGoal &&
    (weeklyMilestones?.length || 0) >= 4 &&
    contentPlan &&
    (immediateActions?.length || 0) >= 3
  );
}

const config = {
  generatePdf: generateExecutionRoadmapPDF,
  isDataComplete,
  pdfFileName: 'execution-roadmap.pdf',
  title: 'Execution Roadmap',
  description: 'Create a clear plan to execute your vision and achieve your business goals.',
  maxPages: 1 // or however many pages if you want multi-substeps
};

export default withWorksheetLogic(ExecutionRoadmapWorksheet, config);
