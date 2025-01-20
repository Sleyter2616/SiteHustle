import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface GoalsPageProps {
  data?: VisionData;
  onChange: (data: VisionData) => void;
  errors?: Record<string, string[]>;
}

export default function GoalsPage({ data, onChange, errors }: GoalsPageProps) {
  const updateBusinessGoals = (field: string, value: string) => {
    onChange({
      ...data,
      businessGoals: {
        ...data?.businessGoals,
        [field]: value
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
          error={errors?.['businessGoals.shortTerm']?.[0]}
          helper="Focus on immediate, achievable objectives"
        >
          <div className="relative">
            <textarea
              value={data?.businessGoals?.shortTerm || ''}
              onChange={(e) => updateBusinessGoals('shortTerm', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="List your short-term goals..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Focus on specific, measurable goals you can achieve in the next 6-12 months. Examples: Launch website, Get first 10 customers, Reach 100 email subscribers." />
            </div>
          </div>
        </FormField>

        <FormField
          label="What are your mid-term goals? (1-2 years)"
          required
          error={errors?.['businessGoals.midTerm']?.[0]}
          helper="Plan for sustainable growth and expansion"
        >
          <div className="relative">
            <textarea
              value={data?.businessGoals?.midTerm || ''}
              onChange={(e) => updateBusinessGoals('midTerm', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="List your mid-term goals..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Set ambitious but realistic goals for the next 1-2 years. Examples: Reach $5K monthly revenue, Expand to new market, Launch new product line." />
            </div>
          </div>
        </FormField>

        <FormField
          label="What's your long-term vision? (3-5 years)"
          required
          error={errors?.['businessGoals.longTerm']?.[0]}
          helper="Envision your ultimate business aspirations"
        >
          <div className="relative">
            <textarea
              value={data?.businessGoals?.longTerm || ''}
              onChange={(e) => updateBusinessGoals('longTerm', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe your long-term vision..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Think big! What's your ultimate vision for the business? Examples: Become industry leader, Expand nationally, Hit $1M annual revenue." />
            </div>
          </div>
        </FormField>

        <div className="pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Website Specific Goals</h2>
          
          <FormField
            label="What do you want your website to achieve?"
            required
            error={errors?.['businessGoals.websiteGoals']?.[0]}
            helper="Define specific objectives for your online presence"
          >
            <div className="relative">
              <textarea
                value={data?.businessGoals?.websiteGoals || ''}
                onChange={(e) => updateBusinessGoals('websiteGoals', e.target.value)}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="List your website goals..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip content="What should your website accomplish? Examples: Generate leads, Showcase portfolio, Sell products, Build email list, Provide information." />
              </div>
            </div>
          </FormField>

          <FormField
            label="Success Indicators"
            required
            error={errors?.['businessGoals.successIndicators']?.[0]}
            helper="How will you measure success?"
          >
            <div className="relative">
              <textarea
                value={data?.businessGoals?.successIndicators || ''}
                onChange={(e) => updateBusinessGoals('successIndicators', e.target.value)}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="List your success metrics..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip content="List specific metrics you'll track. Examples: Monthly revenue, Number of clients, Website conversion rate, Customer satisfaction score, Email subscribers." />
              </div>
            </div>
          </FormField>
        </div>
      </div>
    </div>
  );
}
