import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface TargetAudiencePageProps {
  data?: VisionData;
  onChange: (data: VisionData) => void;
  errors?: Record<string, string[]>;
}

export default function TargetAudiencePage({ data, onChange, errors }: TargetAudiencePageProps) {
  const updateTargetAudience = (field: string, value: any) => {
    onChange({
      ...data,
      targetAudience: {
        ...data?.targetAudience,
        [field]: value
      }
    });
  };

  const updateIdealCustomerProfile = (field: string, value: any) => {
    onChange({
      ...data,
      targetAudience: {
        ...data?.targetAudience,
        idealCustomerProfile: {
          ...data?.targetAudience?.idealCustomerProfile,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Target Audience Profile</h1>
        <p className="text-gray-300 mb-6">
          Identifying exactly who you serve is central to creating products, services,
          and content that truly resonate. The more precisely you define your audience,
          the easier it is to speak their language and solve their problems.
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          label="Primary Audience Profile"
          required
          error={errors?.['targetAudience.primaryProfile']?.[0]}
          tooltip="Who is your ideal, primary customer? Consider demographics, psychographics, and the scenarios they face."
        >
          <textarea
            value={data?.targetAudience?.primaryProfile || ''}
            onChange={(e) => updateTargetAudience('primaryProfile', e.target.value)}
            className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Describe your primary target audience..."
          />
        </FormField>

        <FormField
          label="Secondary Audiences"
          required
          error={errors?.['targetAudience.secondaryAudiences']?.[0]}
          tooltip="Sometimes there's a secondary or 'related' group that might benefit from your offerings. List them here."
        >
          <ArrayInput
            values={data?.targetAudience?.secondaryAudiences || []}
            onChange={(values) => updateTargetAudience('secondaryAudiences', values)}
            placeholder="Add a secondary audience..."
          />
        </FormField>

        <FormField
          label="Pain Points"
          required
          error={errors?.['targetAudience.painPoints']?.[0]}
          tooltip="Pinpoint exactly what troubles your audience, so you can position your brand as the solution."
        >
          <ArrayInput
            values={data?.targetAudience?.painPoints || []}
            onChange={(values) => updateTargetAudience('painPoints', values)}
            placeholder="Add a pain point..."
          />
        </FormField>

        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold">Ideal Customer Profile</h2>
          <p className="text-sm text-gray-400 mb-2">
            Here, you define the ultimate persona you want to attract—someone who sees real value in what you offer.
            The more specific you are, the better you can craft products, marketing, and messaging that truly click.
          </p>

          <FormField
            label="Problem"
            required
            error={errors?.['targetAudience.idealCustomerProfile.problem']?.[0]}
            tooltip="What is the main problem or challenge this ideal customer faces, that you want to solve?"
          >
            <textarea
              value={data?.targetAudience?.idealCustomerProfile?.problem || ''}
              onChange={(e) => updateIdealCustomerProfile('problem', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe the main problem your ideal customer faces..."
            />
          </FormField>

          <FormField
            label="Journey"
            required
            error={errors?.['targetAudience.idealCustomerProfile.journey']?.[0]}
            tooltip="What's the transformation they desire? Understand how they move from 'problem' to 'solution.'"
          >
            <textarea
              value={data?.targetAudience?.idealCustomerProfile?.journey || ''}
              onChange={(e) => updateIdealCustomerProfile('journey', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe their journey and transformation..."
            />
          </FormField>

          <FormField
            label="Desires"
            required
            error={errors?.['targetAudience.idealCustomerProfile.desires']?.[0]}
            tooltip="List specific aspirations—both tangible and intangible—that your offering helps them achieve."
          >
            <ArrayInput
              values={data?.targetAudience?.idealCustomerProfile?.desires || []}
              onChange={(values) => updateIdealCustomerProfile('desires', values)}
              placeholder="Add a desire..."
            />
          </FormField>

          <FormField
            label="Desired State"
            required
            error={errors?.['targetAudience.idealCustomerProfile.desiredState']?.[0]}
            tooltip="Where do they ultimately want to be after using your product or service?"
          >
            <textarea
              value={data?.targetAudience?.idealCustomerProfile?.desiredState || ''}
              onChange={(e) => updateIdealCustomerProfile('desiredState', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe their ideal end state..."
            />
          </FormField>

          <FormField
            label="Gap Analysis"
            required
            error={errors?.['targetAudience.idealCustomerProfile.gap']?.[0]}
            tooltip="Pinpoint the differences between where they are now and where they want to be—this is what your brand can bridge."
          >
            <textarea
              value={data?.targetAudience?.idealCustomerProfile?.gap || ''}
              onChange={(e) => updateIdealCustomerProfile('gap', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe the gap between current and desired state..."
            />
          </FormField>

          <FormField
            label="Unique Selling Point"
            required
            error={errors?.['targetAudience.idealCustomerProfile.uniqueSellingPoint']?.[0]}
            tooltip="What differentiates you in the eyes of this ideal customer? Why should they choose you over competitors?"
          >
            <textarea
              value={data?.targetAudience?.idealCustomerProfile?.uniqueSellingPoint || ''}
              onChange={(e) => updateIdealCustomerProfile('uniqueSellingPoint', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="What makes your solution unique for them..."
            />
          </FormField>

          <FormField
            label="Benefits"
            required
            error={errors?.['targetAudience.idealCustomerProfile.benefits']?.[0]}
            tooltip="Practical advantages they gain—time saved, money earned, stress reduced, etc."
          >
            <ArrayInput
              values={data?.targetAudience?.idealCustomerProfile?.benefits || []}
              onChange={(values) => updateIdealCustomerProfile('benefits', values)}
              placeholder="Add a benefit..."
            />
          </FormField>

          <FormField
            label="Common Objections"
            required
            error={errors?.['targetAudience.idealCustomerProfile.objections']?.[0]}
            tooltip="What hesitations might stop them from buying? Listing these helps you address them upfront."
          >
            <ArrayInput
              values={data?.targetAudience?.idealCustomerProfile?.objections || []}
              onChange={(values) => updateIdealCustomerProfile('objections', values)}
              placeholder="Add an objection..."
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}