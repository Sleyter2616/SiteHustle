import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

interface SwotAnalysisPageProps {
  data?: VisionData["swot"];
  onChange: (data: VisionData["swot"]) => void;
  errors?: Record<string, string[]>;
}

export default function SwotAnalysisPage({ data, onChange, errors }: SwotAnalysisPageProps) {
  const updateSwotArray = (field: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', value: string[]) => {
    const updated = {
      ...data,
      [field]: value,
    };
    onChange(updated);
  };

  const updateSwotField = (field: string, value: string) => {
    const updated = {
      ...data,
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        SWOT Analysis
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          A SWOT analysis isn't just a business school exercise—it's a powerful tool for understanding where you stand and where 
          you can go. By honestly assessing your strengths and weaknesses while scanning for opportunities and threats, you'll 
          make better strategic decisions.
        </p>
        <p className="mt-4">
          This framework helps you leverage your advantages, shore up your weaknesses, seize opportunities, and prepare for 
          potential challenges. It's about turning self-awareness into strategic advantage and creating a roadmap for sustainable success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Strengths</h2>
          <p className="text-gray-300 mb-4">
            What internal advantages does your business have?
          </p>
          <div className="relative">
            <FormField
              label="List your business strengths"
              required
              error={errors?.['strengths']?.[0]}
            >
              <ArrayInput
                values={data?.strengths || []}
                onChange={(values) => updateSwotArray('strengths', values)}
                placeholder="Add a strength..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Examples: Unique skills, Industry experience, Strong network, Proprietary tech, Brand reputation." />
            </div>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Weaknesses</h2>
          <p className="text-gray-300 mb-4">
            Which internal factors need improvement?
          </p>
          <div className="relative">
            <FormField
              label="List your business weaknesses"
              required
              error={errors?.['weaknesses']?.[0]}
            >
              <ArrayInput
                values={data?.weaknesses || []}
                onChange={(values) => updateSwotArray('weaknesses', values)}
                placeholder="Add a weakness..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Examples: Resource constraints, Skill gaps, Outdated processes, Technology limitations." />
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Opportunities</h2>
          <p className="text-gray-300 mb-4">
            Which external trends or market gaps can you capitalize on?
          </p>
          <div className="relative">
            <FormField
              label="List your business opportunities"
              required
              error={errors?.['opportunities']?.[0]}
            >
              <ArrayInput
                values={data?.opportunities || []}
                onChange={(values) => updateSwotArray('opportunities', values)}
                placeholder="Add an opportunity..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Examples: Shifts in demand, Technology changes, New target segments, Partnerships." />
            </div>
          </div>
        </div>

        {/* Threats */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Threats</h2>
          <p className="text-gray-300 mb-4">
            What external factors could harm your business?
          </p>
          <div className="relative">
            <FormField
              label="List your business threats"
              required
              error={errors?.['threats']?.[0]}
            >
              <ArrayInput
                values={data?.threats || []}
                onChange={(values) => updateSwotArray('threats', values)}
                placeholder="Add a threat..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Examples: Competitor moves, Regulatory changes, Economic downturn, Shifting consumer tastes." />
            </div>
          </div>
        </div>
      </div>

      {/* Optional deeper sections */}
      <div className="mt-12 space-y-8 bg-[#2D3748] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Analysis & Strategy Development</h2>
        <p className="text-gray-300">
          Convert your SWOT insights into actionable strategies.
        </p>

        <FormField
          label="Matching Strengths to Opportunities"
          tooltip="E.g., Use your strong reputation to attract high-profile partners."
        >
          <textarea
            value={data?.matchingStrengthsToOpp || ''}
            onChange={(e) => updateSwotField('matchingStrengthsToOpp', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Explain how you plan to leverage your strengths..."
          />
        </FormField>

        <FormField
          label="Addressing Weaknesses to Prevent Threats"
          tooltip="E.g., If staff lacks training on new tech, invest in training."
        >
          <textarea
            value={data?.addressWeaknessesThreats || ''}
            onChange={(e) => updateSwotField('addressWeaknessesThreats', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Discuss how you will mitigate weaknesses..."
          />
        </FormField>

        <FormField
          label="Prioritizing SWOT Factors"
          tooltip="Which factors need immediate attention?"
        >
          <textarea
            value={data?.swotPriorities || ''}
            onChange={(e) => updateSwotField('swotPriorities', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="List the top priorities..."
          />
        </FormField>

        <FormField
          label="Action Steps & Timelines"
          tooltip="Outline the specific tasks and deadlines for each SWOT insight."
        >
          <textarea
            value={data?.actionSteps || ''}
            onChange={(e) => updateSwotField('actionSteps', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Define your next actions and deadlines..."
          />
        </FormField>

        <FormField
          label="Assigning Responsibilities"
          tooltip="Who owns each action item?"
        >
          <textarea
            value={data?.responsibilities || ''}
            onChange={(e) => updateSwotField('responsibilities', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="List responsibilities and reporting schedules..."
          />
        </FormField>

        <FormField
          label="Summary & Next Steps"
          tooltip="Summarize your key insights and next moves."
        >
          <textarea
            value={data?.swotSummary || ''}
            onChange={(e) => updateSwotField('swotSummary', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Summarize your SWOT-based plan..."
          />
        </FormField>
      </div>
    </div>
  );
}