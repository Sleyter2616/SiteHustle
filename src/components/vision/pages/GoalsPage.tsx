import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface GoalsPageProps {
  data: Pillar1Data;
  onChange: (data: Pillar1Data) => void;
  errors?: Record<string, string[]>;
}

export default function GoalsPage({ data, onChange, errors }: GoalsPageProps) {
  const updateBusinessGoals = (field: string, value: string) => {
    onChange({
      ...data,
      worksheet: {
        ...data.worksheet,
        businessGoals: {
          ...data.worksheet?.businessGoals,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Clarifying Your Goals</h1>
        <p className="text-gray-300 mb-6">
          Clear goals give your business direction and help measure progress. This section will help you
          define short-term, mid-term, and long-term objectives for your business.
        </p>
      </div>

      <div className="bg-[#2D3748] p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Goal Setting Framework</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Short-term goals: Achievable within 6-12 months</li>
          <li>Mid-term goals: Planned for 1-2 years</li>
          <li>Long-term vision: Your 3-5 year aspirational target</li>
        </ul>
      </div>

      <div className="space-y-6">
        <FormField
          label="What are your short-term goals? (6-12 months)"
          required
          error={errors?.['worksheet.businessGoals.shortTerm']?.[0]}
          helper="Focus on immediate, achievable objectives"
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.businessGoals?.shortTerm || ''}
              onChange={(e) => updateBusinessGoals('shortTerm', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="List your short-term goals..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content={tooltips.worksheet.businessGoals?.shortTerm} />
            </div>
          </div>
        </FormField>

        <FormField
          label="What are your mid-term goals? (1-2 years)"
          required
          error={errors?.['worksheet.businessGoals.midTerm']?.[0]}
          helper="Plan for sustainable growth and expansion"
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.businessGoals?.midTerm || ''}
              onChange={(e) => updateBusinessGoals('midTerm', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="List your mid-term goals..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content={tooltips.worksheet.businessGoals?.midTerm} />
            </div>
          </div>
        </FormField>

        <FormField
          label="What's your long-term vision? (3-5 years)"
          required
          error={errors?.['worksheet.businessGoals.longTerm']?.[0]}
          helper="Envision your ultimate business aspirations"
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.businessGoals?.longTerm || ''}
              onChange={(e) => updateBusinessGoals('longTerm', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe your long-term vision..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content={tooltips.worksheet.businessGoals?.longTerm} />
            </div>
          </div>
        </FormField>

        <div className="pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Website Specific Goals</h2>
          
          <FormField
            label="What do you want your website to achieve?"
            required
            error={errors?.['worksheet.businessGoals.websiteGoals']?.[0]}
            helper="Define specific objectives for your online presence"
          >
            <textarea
              value={data.worksheet?.businessGoals?.websiteGoals || ''}
              onChange={(e) => updateBusinessGoals('websiteGoals', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="List your website goals..."
            />
          </FormField>

          <FormField
            label="Success Indicators"
            required
            error={errors?.['worksheet.businessGoals.successIndicators']?.[0]}
            helper="How will you measure success?"
          >
            <textarea
              value={data.worksheet?.businessGoals?.successIndicators || ''}
              onChange={(e) => updateBusinessGoals('successIndicators', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="List your success metrics..."
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
