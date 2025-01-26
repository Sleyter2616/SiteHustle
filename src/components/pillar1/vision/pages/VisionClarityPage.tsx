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
      {/* Intro Section */}
      <div>
        <h1 className="text-3xl font-bold mb-4">The Value of Clarity</h1>
        <p className="text-gray-300 mb-6">
          A clear vision is the foundation of any successful business. It guides your decisions,
          attracts the right customers, and keeps your team aligned. By defining each part
          of your vision, you set the stage for consistent growth and strong brand identity.
        </p>
      </div>

      {/* Why Clarity Matters Box */}
      <div className="bg-[#2D3748] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Why Clarity Matters</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Helps you make better business decisions</li>
          <li>Attracts and retains the right customers</li>
          <li>Guides your marketing and branding efforts</li>
          <li>Creates a strong foundation for growth</li>
        </ul>
      </div>

      {/* Fields */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Defining Your Identity</h2>

        {/* Business Name */}
        <FormField
          label="What's your business name?"
          required
          error={errors?.['businessName']?.[0]}
          tooltip="This will be the 'front door' to your brand. Choose a name that resonates with your values and audience."
        >
          <>
            <p className="text-sm text-gray-400 mb-2">
              Your business name forms the first impression in a crowded market.
              A clear, memorable name helps potential customers recall and share it with others.
            </p>
            <input
              type="text"
              value={data?.businessName || ''}
              onChange={(e) => updateField('businessName', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="Enter your business name"
            />
          </>
        </FormField>

        {/* Tagline */}
        <FormField
          label="What's your tagline?"
          required
          error={errors?.['tagline']?.[0]}
          helper="A short, memorable phrase that captures your value proposition."
          tooltip="Your tagline quickly conveys your unique promise or focus. Keep it concise and impactful."
        >
          <>
            <p className="text-sm text-gray-400 mb-2">
              A concise tagline instantly communicates the essence of your brand,
              sparking curiosity and recognition.
            </p>
            <input
              type="text"
              value={data?.tagline || ''}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="Enter your tagline"
            />
          </>
        </FormField>

        {/* Mission Statement Section */}
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

        {/* Mission Statement */}
        <FormField
          label="What's your mission statement?"
          required
          error={errors?.['missionStatement']?.[0]}
          helper="Use the formula above to craft a clear, impactful mission statement."
          tooltip="Your mission clarifies the immediate purpose of your business—who you serve and how you serve them."
        >
          <>
            <p className="text-sm text-gray-400 mb-2">
              This defines your core purpose and keeps both your team and audience aligned around a shared goal.
            </p>
            <textarea
              value={data?.missionStatement || ''}
              onChange={(e) => updateField('missionStatement', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="We exist to... for... so they can..."
            />
          </>
        </FormField>

        {/* Vision Statement */}
        <FormField
          label="What's your vision statement?"
          required
          error={errors?.['visionStatement']?.[0]}
          helper="Envision the future state of your business and the impact you want to make."
          tooltip="Your vision statement outlines your broader aspiration—why your brand matters in the long run."
        >
          <>
            <p className="text-sm text-gray-400 mb-2">
              Think about where you see your business heading in 3–5 years. 
              This big-picture outlook inspires both your team and customers.
            </p>
            <textarea
              value={data?.visionStatement || ''}
              onChange={(e) => updateField('visionStatement', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe the future you aim to create..."
            />
          </>
        </FormField>

        {/* Core Values */}
        <FormField
          label="What are your core values?"
          required
          error={errors?.['coreValues']?.[0]}
          helper="Add 3-5 values that define your business culture and principles."
          tooltip="Core values guide every decision you make, from hiring to marketing. They shape your brand's ethics and identity."
        >
          <>
            <p className="text-sm text-gray-400 mb-2">
              Values determine how you interact with customers, partners, and employees. They also
              influence the tone and manner in which you grow your brand.
            </p>
            <ArrayInput
              label="Core Values"
              values={data?.coreValues || []}
              onChange={(values) => updateField('coreValues', values)}
              required
              placeholder="Add a core value..."
            />
            <div className="mt-4 bg-[#1A202C] p-4 rounded-md">
              <p className="text-sm text-gray-400">Example core values:</p>
              <ul className="list-disc list-inside text-gray-300">
                <li>Customer Success First</li>
                <li>Continuous Innovation</li>
                <li>Radical Transparency</li>
                <li>Sustainable Growth</li>
              </ul>
            </div>
          </>
        </FormField>
      </div>
    </div>
  );
}