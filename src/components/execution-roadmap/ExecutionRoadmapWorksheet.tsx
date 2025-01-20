import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import { generateExecutionRoadmapPDF } from '@/utils/pdfUtils';
import { withWorksheetLogic, WithWorksheetLogicProps } from '../common/withWorksheetLogic';
import ThirtyDayGoalPage from './pages/ThirtyDayGoalPage';
import WeeklyMilestonesPage from './pages/WeeklyMilestonesPage';
import ContentPlanPage from './pages/ContentPlanPage';
import ImmediateActionsPage from './pages/ImmediateActionsPage';

type ExecutionRoadmapWorksheetProps = Omit<WithWorksheetLogicProps, 'data'> & {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
}

function ExecutionRoadmapWorksheet({ 
  data, 
  onChange, 
  errors 
}: ExecutionRoadmapWorksheetProps) {
  const defaultData = data || {
    thirtyDayGoal: '',
    weeklyMilestones: ['', '', '', ''],
    contentPlan: '',
    immediateActions: ['', '', '']
  };

  return (
    <div className="space-y-6">
      <ThirtyDayGoalPage
        data={defaultData}
        onChange={onChange}
        errors={errors}
      />
      <WeeklyMilestonesPage
        data={defaultData}
        onChange={onChange}
        errors={errors}
      />
      <ContentPlanPage
        data={defaultData}
        onChange={onChange}
        errors={errors}
      />
      <ImmediateActionsPage
        data={defaultData}
        onChange={onChange}
        errors={errors}
      />
    </div>
  );
}

const isDataComplete = (data: ExecutionRoadmapData) => {
  if (!data) return false;

  const {
    thirtyDayGoal,
    weeklyMilestones,
    contentPlan,
    immediateActions
  } = data;

  const hasThirtyDayGoal = !!thirtyDayGoal;
  const hasWeeklyMilestones = weeklyMilestones?.length >= 4; // At least 4 weekly milestones
  const hasContentPlan = !!contentPlan;
  const hasImmediateActions = immediateActions?.length >= 3; // At least 3 immediate actions

  return Boolean(hasThirtyDayGoal && hasWeeklyMilestones && hasContentPlan && hasImmediateActions);
};

const config = {
  generatePdf: generateExecutionRoadmapPDF,
  isDataComplete,
  pdfFileName: 'execution-roadmap.pdf',
  title: 'Execution Roadmap',
  description: 'Create a clear plan to execute your vision and achieve your business goals.'
};

export default withWorksheetLogic(ExecutionRoadmapWorksheet, config);
