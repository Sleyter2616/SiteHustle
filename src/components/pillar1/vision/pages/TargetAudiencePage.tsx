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
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      Target Audience Profile
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Understanding your target audience is about more than demographics—it's about connecting with real people who have real needs, 
          desires, and challenges. The better you know them, the more effectively you can serve them.
        </p>
        <p className="mt-4">
          This section helps you dive deep into your ideal customer's world. By exploring their motivations, pain points, and 
          aspirations, you'll be better equipped to create solutions that truly resonate and build lasting relationships that 
          drive your business forward.
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary Audience Profile */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Who is your ideal, primary customer?</h3>
          <FormField
            label="Primary Audience Profile"
            required
            error={errors?.['primaryProfile']?.[0]}
            tooltip="Who is your ideal, primary customer? Consider demographics, psychographics, and typical scenarios."
          >
            <textarea
              value={data?.primaryProfile || ''}
              onChange={(e) => updateTargetAudience('primaryProfile', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Describe your primary target audience..."
            />
          </FormField>
        </div>

        {/* Secondary Audiences */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What are your secondary audiences?</h3>
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
        </div>

        {/* Pain Points */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What are their pain points?</h3>
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
        </div>

        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold">Ideal Customer Profile</h2>
          <p className="text-sm text-gray-400 mb-2">
            Define your ultimate customer persona to fine-tune your messaging and offerings.
          </p>

          {/* Problem */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What is the main problem this customer faces?</h3>
            <FormField
              label="Problem"
              required
              error={errors?.['idealCustomerProfile.problem']?.[0]}
              tooltip="Describe the primary problem your ideal customer faces."
            >
              <textarea
                value={data?.idealCustomerProfile?.problem || ''}
                onChange={(e) => updateIdealCustomerProfile('problem', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Describe the primary problem..."
              />
            </FormField>
          </div>

          {/* Journey */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Describe their journey.</h3>
            <FormField
              label="Journey"
              required
              error={errors?.['idealCustomerProfile.journey']?.[0]}
              tooltip="Describe the transformation they seek."
            >
              <textarea
                value={data?.idealCustomerProfile?.journey || ''}
                onChange={(e) => updateIdealCustomerProfile('journey', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Describe their journey..."
              />
            </FormField>
          </div>

          {/* Desires */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What are their desires?</h3>
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
          </div>

          {/* Desired State */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What is their desired state?</h3>
            <FormField
              label="Desired State"
              required
              error={errors?.['idealCustomerProfile.desiredState']?.[0]}
              tooltip="Describe where they want to be after using your solution."
            >
              <textarea
                value={data?.idealCustomerProfile?.desiredState || ''}
                onChange={(e) => updateIdealCustomerProfile('desiredState', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Describe the desired state..."
              />
            </FormField>
          </div>

          {/* Gap Analysis */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What is the gap between their current state and desired state?</h3>
            <FormField
              label="Gap Analysis"
              required
              error={errors?.['idealCustomerProfile.gap']?.[0]}
              tooltip="Identify the gap between their current state and desired state."
            >
              <textarea
                value={data?.idealCustomerProfile?.gap || ''}
                onChange={(e) => updateIdealCustomerProfile('gap', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Describe the gap..."
              />
            </FormField>
          </div>

          {/* Unique Selling Point */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What is your unique selling point?</h3>
            <FormField
              label="Unique Selling Point"
              required
              error={errors?.['idealCustomerProfile.uniqueSellingPoint']?.[0]}
              tooltip="What makes your solution uniquely valuable?"
            >
              <textarea
                value={data?.idealCustomerProfile?.uniqueSellingPoint || ''}
                onChange={(e) => updateIdealCustomerProfile('uniqueSellingPoint', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="What is your unique selling point?"
              />
            </FormField>
          </div>

          {/* Benefits */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What are the benefits of your solution?</h3>
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
          </div>

          {/* Common Objections */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">What are the common objections?</h3>
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
    </div>
  );
}