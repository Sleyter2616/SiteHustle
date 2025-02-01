import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';

interface TargetAudiencePageProps {
  data?: VisionData["targetAudience"];
  onChange: (data: VisionData["targetAudience"]) => void;
  errors?: Record<string, string[]>;
}

export default function TargetAudiencePage({ data, onChange, errors }: TargetAudiencePageProps) {
  const updateTargetAudience = (field: string, value: any) => {
    const updated = {
      ...data,
      [field]: value,
    };
    onChange(updated);
  };

  const updateIdealCustomerProfile = (field: string, value: any) => {
    const updated = {
      ...data,
      idealCustomerProfile: {
        ...data?.idealCustomerProfile,
        [field]: value,
      },
    };
    onChange(updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Target Audience Profile</h1>
        <p className="text-gray-300 mb-6">
          Define who you serve so you can tailor products, services, and content that truly resonate.
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          label="Primary Audience Profile"
          required
          error={errors?.['primaryProfile']?.[0]}
          tooltip="Who is your ideal, primary customer? Consider demographics, psychographics, and typical scenarios."
        >
          <textarea
            value={data?.primaryProfile || ''}
            onChange={(e) => updateTargetAudience('primaryProfile', e.target.value)}
            className="w-full bg-gray-700 rounded px-4 py-2 h-32"
            placeholder="Describe your primary target audience..."
          />
        </FormField>

        <FormField
          label="Secondary Audiences"
          required
          error={errors?.['secondaryAudiences']?.[0]}
          tooltip="List any additional audience segments that might benefit from your offerings."
        >
          <ArrayInput
            values={data?.secondaryAudiences || []}
            onChange={(values) => updateTargetAudience('secondaryAudiences', values)}
            placeholder="Add a secondary audience..."
          />
        </FormField>

        <FormField
          label="Pain Points"
          required
          error={errors?.['painPoints']?.[0]}
          tooltip="List the key challenges your audience faces."
        >
          <ArrayInput
            values={data?.painPoints || []}
            onChange={(values) => updateTargetAudience('painPoints', values)}
            placeholder="Add a pain point..."
          />
        </FormField>

        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold">Ideal Customer Profile</h2>
          <p className="text-sm text-gray-400 mb-2">
            Define your ultimate customer persona to fine-tune your messaging and offerings.
          </p>

          <FormField
            label="Problem"
            required
            error={errors?.['idealCustomerProfile.problem']?.[0]}
            tooltip="What is the main problem this customer faces?"
          >
            <textarea
              value={data?.idealCustomerProfile?.problem || ''}
              onChange={(e) => updateIdealCustomerProfile('problem', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 h-32"
              placeholder="Describe the primary problem..."
            />
          </FormField>

          <FormField
            label="Journey"
            required
            error={errors?.['idealCustomerProfile.journey']?.[0]}
            tooltip="Describe the transformation they seek."
          >
            <textarea
              value={data?.idealCustomerProfile?.journey || ''}
              onChange={(e) => updateIdealCustomerProfile('journey', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 h-32"
              placeholder="Describe their journey..."
            />
          </FormField>

          <FormField
            label="Desires"
            required
            error={errors?.['idealCustomerProfile.desires']?.[0]}
            tooltip="List the aspirations your ideal customer holds."
          >
            <ArrayInput
              values={data?.idealCustomerProfile?.desires || []}
              onChange={(values) => updateIdealCustomerProfile('desires', values)}
              placeholder="Add a desire..."
            />
          </FormField>

          <FormField
            label="Desired State"
            required
            error={errors?.['idealCustomerProfile.desiredState']?.[0]}
            tooltip="Describe where they want to be after using your solution."
          >
            <textarea
              value={data?.idealCustomerProfile?.desiredState || ''}
              onChange={(e) => updateIdealCustomerProfile('desiredState', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 h-32"
              placeholder="Describe the desired state..."
            />
          </FormField>

          <FormField
            label="Gap Analysis"
            required
            error={errors?.['idealCustomerProfile.gap']?.[0]}
            tooltip="Identify the gap between their current state and desired state."
          >
            <textarea
              value={data?.idealCustomerProfile?.gap || ''}
              onChange={(e) => updateIdealCustomerProfile('gap', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 h-32"
              placeholder="Describe the gap..."
            />
          </FormField>

          <FormField
            label="Unique Selling Point"
            required
            error={errors?.['idealCustomerProfile.uniqueSellingPoint']?.[0]}
            tooltip="What makes your solution uniquely valuable?"
          >
            <textarea
              value={data?.idealCustomerProfile?.uniqueSellingPoint || ''}
              onChange={(e) => updateIdealCustomerProfile('uniqueSellingPoint', e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 h-32"
              placeholder="What is your unique selling point?"
            />
          </FormField>

          <FormField
            label="Benefits"
            required
            error={errors?.['idealCustomerProfile.benefits']?.[0]}
            tooltip="List the practical advantages your solution provides."
          >
            <ArrayInput
              values={data?.idealCustomerProfile?.benefits || []}
              onChange={(values) => updateIdealCustomerProfile('benefits', values)}
              placeholder="Add a benefit..."
            />
          </FormField>

          <FormField
            label="Common Objections"
            required
            error={errors?.['idealCustomerProfile.objections']?.[0]}
            tooltip="List typical hesitations your customers may have."
          >
            <ArrayInput
              values={data?.idealCustomerProfile?.objections || []}
              onChange={(values) => updateIdealCustomerProfile('objections', values)}
              placeholder="Add an objection..."
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}