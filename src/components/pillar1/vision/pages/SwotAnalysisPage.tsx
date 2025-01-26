import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';

interface SwotAnalysisPageProps {
  data?: VisionData;
  onChange: (data: VisionData) => void;
  errors?: Record<string, string[]>;
}

export default function SwotAnalysisPage({ data, onChange, errors }: SwotAnalysisPageProps) {
  // Helper for array fields
  const updateSwotArray = (field: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', value: string[]) => {
    onChange({
      ...data,
      swot: {
        ...data?.swot,
        [field]: value
      }
    });
  };

  // If you want to store the “Matching & Converting,” “Prioritization,” etc. as text fields, do something like:
  const updateSwotField = (field: string, value: string) => {
    onChange({
      ...data,
      swot: {
        ...data?.swot,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4">SWOT Analysis &amp; Next Steps</h1>
        <p className="text-gray-300 mb-6">
          A SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis lets you map out
          what’s working, what might hold you back, where you can shine, and what challenges lie ahead.
          By confronting these factors, you gain a realistic roadmap for moving forward.
        </p>
      </div>

      {/* S-W-O-T Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Strengths</h2>
          <p className="text-gray-300 mb-4">
            What internal advantages does your business have? 
            Identifying these helps you leverage them fully.
          </p>
          <div className="relative">
            <FormField
              label="List your business strengths"
              required
              error={errors?.['swot.strengths']?.[0]}
            >
              <ArrayInput
                values={data?.swot?.strengths || []}
                onChange={(values) => updateSwotArray('strengths', values)}
                placeholder="Add a strength..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Consider: Unique skills, Industry experience, Strong network, Proprietary tech, Brand reputation, etc." />
            </div>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Weaknesses</h2>
          <p className="text-gray-300 mb-4">
            Which internal factors need improvement or additional resources?
            Acknowledging weaknesses is the first step to overcoming them.
          </p>
          <div className="relative">
            <FormField
              label="List your business weaknesses"
              required
              error={errors?.['swot.weaknesses']?.[0]}
            >
              <ArrayInput
                values={data?.swot?.weaknesses || []}
                onChange={(values) => updateSwotArray('weaknesses', values)}
                placeholder="Add a weakness..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Consider: Resource constraints, Skill gaps, Outdated processes, Technology limitations, etc." />
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
          <p className="text-gray-300 mb-4">
            Which external trends or market gaps can you capitalize on?
            Spotting them early can open new revenue streams or partnerships.
          </p>
          <div className="relative">
            <FormField
              label="List your business opportunities"
              required
              error={errors?.['swot.opportunities']?.[0]}
            >
              <ArrayInput
                values={data?.swot?.opportunities || []}
                onChange={(values) => updateSwotArray('opportunities', values)}
                placeholder="Add an opportunity..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Look for: Shifts in demand, Technology changes, New target segments, Partnerships, etc." />
            </div>
          </div>
        </div>

        {/* Threats */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Threats</h2>
          <p className="text-gray-300 mb-4">
            What external factors could harm your business if left unaddressed?
            Identifying threats allows you to plan defense or pivot strategies.
          </p>
          <div className="relative">
            <FormField
              label="List your business threats"
              required
              error={errors?.['swot.threats']?.[0]}
            >
              <ArrayInput
                values={data?.swot?.threats || []}
                onChange={(values) => updateSwotArray('threats', values)}
                placeholder="Add a threat..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Consider: Competitor moves, Regulatory changes, Economic downturn, Shifting consumer tastes, etc." />
            </div>
          </div>
        </div>
      </div>

      {/* Optional deeper sections */}
      <div className="mt-12 space-y-8 bg-[#2D3748] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Analysis &amp; Strategy Development</h2>
        <p className="text-gray-300">
          Matching and converting each element of your SWOT into an actionable plan ensures you
          don’t just gather insights—you act on them.
        </p>

        <FormField
          label="Matching Strengths to Opportunities"
          tooltip="E.g. Use your strong reputation (strength) to attract high-profile partners (opportunity)."
        >
          <textarea
            value={data?.swot?.matchingStrengthsToOpp || ''}
            onChange={(e) => updateSwotField('matchingStrengthsToOpp', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Explain how you plan to leverage your strengths to capitalize on opportunities..."
          />
        </FormField>

        <FormField
          label="Addressing Weaknesses to Prevent Threats"
          tooltip="E.g. If staff lacks training on your new virtual platform (weakness), invest in tutorials or sessions to avoid event disasters (threat)."
        >
          <textarea
            value={data?.swot?.addressWeaknessesThreats || ''}
            onChange={(e) => updateSwotField('addressWeaknessesThreats', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Discuss how you will mitigate your weaknesses to reduce or avoid threats..."
          />
        </FormField>

        <FormField
          label="Prioritizing SWOT Factors"
          tooltip="Which strengths, weaknesses, opportunities, or threats need immediate attention?"
        >
          <textarea
            value={data?.swot?.swotPriorities || ''}
            onChange={(e) => updateSwotField('swotPriorities', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="List the top 3 strengths, weaknesses, opportunities, and threats you want to address first..."
          />
        </FormField>

        <FormField
          label="Action Steps & Timelines"
          tooltip="Outline the specific tasks you will take to act on your SWOT insights."
        >
          <textarea
            value={data?.swot?.actionSteps || ''}
            onChange={(e) => updateSwotField('actionSteps', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="For each priority, define your next actions and deadlines..."
          />
        </FormField>

        <FormField
          label="Assigning Responsibilities"
          tooltip="Define who owns each action item and how progress is monitored."
        >
          <textarea
            value={data?.swot?.responsibilities || ''}
            onChange={(e) => updateSwotField('responsibilities', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="List who is in charge of each action step, plus their reporting schedule..."
          />
        </FormField>

        <FormField
          label="Summary & Next Steps"
          tooltip="A final recap of your SWOT-based plan and how you'll integrate it with overall goals."
        >
          <textarea
            value={data?.swot?.swotSummary || ''}
            onChange={(e) => updateSwotField('swotSummary', e.target.value)}
            className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Summarize your key insights and how they shape your strategic decisions..."
          />
        </FormField>
      </div>
    </div>
  );
}
