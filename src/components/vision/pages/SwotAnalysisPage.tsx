import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface SwotAnalysisPageProps {
  data: Pillar1Data;
  onChange: (data: Pillar1Data) => void;
  errors?: Record<string, string[]>;
}

export default function SwotAnalysisPage({ data, onChange, errors }: SwotAnalysisPageProps) {
  const updateSwot = (field: string, value: string[]) => {
    onChange({
      ...data,
      worksheet: {
        ...data.worksheet,
        swot: {
          ...data.worksheet?.swot,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">SWOT Analysis & Next Steps</h1>
        <p className="text-gray-300 mb-6">
          A SWOT analysis helps identify your business's internal strengths and weaknesses,
          as well as external opportunities and threats. This strategic tool will guide your
          decision-making and planning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Strengths</h2>
          <p className="text-gray-300 mb-4">
            What internal advantages does your business have?
          </p>
          <div className="relative">
          <FormField
            label="List your business strengths"
            required
            error={errors?.['worksheet.swot.strengths']?.[0]}
          >

              <ArrayInput
                values={data.worksheet?.swot?.strengths || []}
                onChange={(values) => updateSwot('strengths', values)}
                placeholder="Add a strength..."
              />

          </FormField>
          <div className="absolute right-2 top-2">
                <Tooltip content="Consider: Unique skills, Industry experience, Strong network, Proprietary technology, Brand reputation, Customer relationships, Location advantages." />
              </div>
            </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Weaknesses</h2>
          <p className="text-gray-300 mb-4">
            What internal limitations could hold your business back?
          </p>
          <div className="relative">   
          <FormField
            label="List your business weaknesses"
            required
            error={errors?.['worksheet.swot.weaknesses']?.[0]}
          >

              <ArrayInput
                values={data.worksheet?.swot?.weaknesses || []}
                onChange={(values) => updateSwot('weaknesses', values)}
                placeholder="Add a weakness..."
              />
        
          </FormField>
          <div className="absolute right-2 top-2">
                <Tooltip content="Be honest about: Limited resources, Skill gaps, Market knowledge gaps, Financial constraints, Technology limitations, Process inefficiencies." />
              </div>
            </div>
        </div>

        {/* Opportunities */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
          <p className="text-gray-300 mb-4">
            What external factors could benefit your business?
          </p>
          <div className="relative">
          <FormField
            label="List your business opportunities"
            required
            error={errors?.['worksheet.swot.opportunities']?.[0]}
          >

              <ArrayInput
                values={data.worksheet?.swot?.opportunities || []}
                onChange={(values) => updateSwot('opportunities', values)}
                placeholder="Add an opportunity..."
              />

          </FormField>
          <div className="absolute right-2 top-2">
                <Tooltip content="Look for: Market trends, Technology changes, Economic shifts, Industry gaps, Partnership possibilities, New customer segments, Regulatory changes." />
              </div>
            </div>
        </div>

        {/* Threats */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Threats</h2>
          <p className="text-gray-300 mb-4">
            What external factors could harm your business?
          </p>
          <div className="relative"> 
          <FormField
            label="List your business threats"
            required
            error={errors?.['worksheet.swot.threats']?.[0]}
          >

              <ArrayInput
                values={data.worksheet?.swot?.threats || []}
                onChange={(values) => updateSwot('threats', values)}
                placeholder="Add a threat..."
              />

          </FormField>
          <div className="absolute right-2 top-2">
                <Tooltip content="Consider: Competitor actions, Market changes, Economic conditions, Technology disruption, Changing regulations, Resource costs, Customer behavior shifts." />
              </div>
            </div>
        </div>
      </div>

      <div className="mt-12 bg-[#2D3748] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Where to Next?</h2>
        <p className="text-gray-300">
          Now that you've completed your vision and goals worksheet, you can:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
          <li>Download your worksheet as a PDF for reference</li>
          <li>Share it with your team or stakeholders</li>
          <li>Use it to guide your business decisions</li>
          <li>Review and update it regularly as your business grows</li>
        </ul>
      </div>
    </div>
  );
}
