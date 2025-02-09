import React from 'react';
import { ExecutionRoadmapData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

interface WeeklyMilestonesPageProps {
  data: ExecutionRoadmapData;
  onChange: (data: ExecutionRoadmapData) => void;
  errors?: Record<string, string[]>;
}

export default function WeeklyMilestonesPage({ data, onChange, errors }: WeeklyMilestonesPageProps) {
  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...(data.weeklyMilestones || [])];
    newMilestones[index] = value;
    onChange?.({ ...data, weeklyMilestones: newMilestones });
  };

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Weekly Milestones
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Breaking down your 30-day goal into weekly milestones makes it more manageable and helps you 
          track progress effectively. Each week builds upon the previous one, creating a clear path to success.
        </p>
        <p className="mt-4">
          Set realistic yet challenging milestones for each week. This structured approach ensures you're 
          making consistent progress while maintaining flexibility to adjust your strategy as needed.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {weeks.map((week, i) => (
          <div key={week} className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  {week}
                </h3>
                <p className="mt-2 text-gray-300">
                  {week === 'Week 1' ? 'Foundation and Setup' : 
                   week === 'Week 2' ? 'Development and Progress' : 
                   week === 'Week 3' ? 'Growth and Expansion' : 
                   'Review and Optimization'}
                </p>
              </div>
              <Tooltip content={
                week === 'Week 1' ? 'Focus on essential setup tasks and initial planning' : 
                week === 'Week 2' ? 'Build upon your foundation with more advanced tasks' : 
                week === 'Week 3' ? 'Focus on reaching new audiences and expanding your reach' : 
                'Review progress and optimize your approach'
              }>
                <div className="cursor-help">
                  <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                </div>
              </Tooltip>
            </div>
            <textarea
              className="w-full min-h-[100px] bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder={`List your ${week} milestones...`}
              value={data.weeklyMilestones?.[i] || ''}
              onChange={(e) => handleMilestoneChange(i, e.target.value)}
              rows={4}
            />
            {errors?.weeklyMilestones?.[i] && (
              <p className="mt-2 text-red-400 text-sm">{errors.weeklyMilestones[i]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
