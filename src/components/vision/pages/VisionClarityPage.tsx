import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface VisionClarityPageProps {
  data?: VisionData;
  onChange: (data: VisionData) => void;
  errors?: Record<string, string[]>;
}

export default function VisionClarityPage({ data, onChange, errors }: VisionClarityPageProps) {
  const updateField = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">The Value of Clarity</h1>
        <p className="text-gray-300 mb-6">
          A clear vision is the foundation of any successful business. It guides your decisions,
          attracts the right customers, and keeps your team aligned.
        </p>
      </div>

      <div className="bg-[#2D3748] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Why Clarity Matters</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Helps you make better business decisions</li>
          <li>Attracts and retains the right customers</li>
          <li>Guides your marketing and branding efforts</li>
          <li>Creates a strong foundation for growth</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Defining Your Identity</h2>
        
        <FormField
          label="What's your business name?"
          required
          error={errors?.['businessName']?.[0]}
        >
          <input
            type="text"
            value={data?.businessName || ''}
            onChange={(e) => updateField('businessName', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
            placeholder="Enter your business name"
          />
        </FormField>

        <FormField
          label="What's your tagline?"
          required
          error={errors?.['tagline']?.[0]}
          helper="A short, memorable phrase that captures your value proposition"
        >
          <input
            type="text"
            value={data?.tagline || ''}
            onChange={(e) => updateField('tagline', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
            placeholder="Enter your tagline"
          />
        </FormField>

        <div className="bg-[#2D3748] p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Mission Statement Formula</h3>
          <p className="text-gray-300 mb-4">
            We exist to [action] for [audience] so they can [benefit]
          </p>
          <div className="bg-[#1A202C] p-4 rounded-md">
            <p className="text-sm text-gray-400">Example:</p>
            <p className="text-gray-300">
              "We exist to simplify online business for entrepreneurs so they can focus on what matters most."
            </p>
          </div>
        </div>

        <FormField
          label="What's your mission statement?"
          required
          error={errors?.['missionStatement']?.[0]}
          helper="Use the formula above to craft a clear, impactful mission statement"
        >
          <textarea
            value={data?.missionStatement || ''}
            onChange={(e) => updateField('missionStatement', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
            placeholder="We exist to... for... so they can..."
          />
        </FormField>

        <FormField
          label="What are your core values?"
          required
          error={errors?.['coreValues']?.[0]}
          helper="Add 3-5 values that define your business culture and principles"
        >
          <ArrayInput
            label="Core Values"
            values={data?.coreValues || []}
            onChange={(values) => updateField('coreValues', values)}
            required
            placeholder="Add a core value..."
          />
          <div className="absolute right-2 top-2">
            <Tooltip content="Core values are the fundamental beliefs that guide your business decisions. Choose 3-5 values that truly represent what your business stands for and how you operate." />
          </div>
          <div className="mt-4 bg-[#1A202C] p-4 rounded-md">
            <p className="text-sm text-gray-400">Example core values:</p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Customer Success First</li>
              <li>Continuous Innovation</li>
              <li>Radical Transparency</li>
              <li>Sustainable Growth</li>
            </ul>
          </div>
        </FormField>
      </div>
    </div>
  );
}
