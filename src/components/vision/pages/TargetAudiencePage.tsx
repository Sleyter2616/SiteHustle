import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface TargetAudiencePageProps {
  data: Pillar1Data;
  onChange: (data: Pillar1Data) => void;
  errors?: Record<string, string[]>;
}

export default function TargetAudiencePage({ data, onChange, errors }: TargetAudiencePageProps) {
  const updateTargetAudience = (field: string, value: any) => {
    onChange({
      ...data,
      worksheet: {
        ...data.worksheet,
        targetAudience: {
          ...data.worksheet?.targetAudience,
          [field]: value
        }
      }
    });
  };

  const updateICP = (field: string, value: any) => {
    onChange({
      ...data,
      worksheet: {
        ...data.worksheet,
        targetAudience: {
          ...data.worksheet?.targetAudience,
          idealCustomerProfile: {
            ...data.worksheet?.targetAudience?.idealCustomerProfile,
            [field]: value
          }
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Identify Your Target Audience</h1>
        <p className="text-gray-300 mb-6">
          Understanding your ideal customer is crucial for creating targeted content and effective marketing strategies.
          This section will help you define your audience and their needs.
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          label="Who is your primary target audience?"
          required
          error={errors?.['worksheet.targetAudience.primaryProfile']?.[0]}
          helper="Describe your ideal customer in detail"
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.targetAudience?.primaryProfile || ''}
              onChange={(e) => updateTargetAudience('primaryProfile', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe your primary audience..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Paint a clear picture of your ideal customer. Include: Demographics (age, location, income), Psychographics (interests, values, lifestyle), and Professional details (job role, industry, company size)." />
            </div>
          </div>
        </FormField>
        <div className="relative">
        <FormField
          label="Who are your secondary audiences?"
          error={errors?.['worksheet.targetAudience.secondaryAudiences']?.[0]}
          helper="List other customer segments you want to reach"
        >
            <ArrayInput
              values={data.worksheet?.targetAudience?.secondaryAudiences || []}
              onChange={(values) => updateTargetAudience('secondaryAudiences', values)}
              placeholder="Add a secondary audience..."
            />
        </FormField>
        <div className="absolute right-2 top-2">
              <Tooltip content="Who else might use your product/service? Consider: Adjacent markets, Different company sizes, Alternative use cases, Influencers, Decision makers vs. users." />
         
          </div>
        </div>

        <FormField
          label="What's the main problem your ideal customer faces?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.problem']?.[0]}
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.targetAudience?.idealCustomerProfile?.problem || ''}
              onChange={(e) => updateICP('problem', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe their main problem..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Describe their core problem in detail. What keeps them up at night? What's the cost of not solving this problem? Why haven't they solved it yet?" />
            </div>
          </div>
        </FormField>
        <div className="relative">
        <FormField
          label="What specific pain points do they experience?"
          required
          error={errors?.['worksheet.targetAudience.painPoints']?.[0]}
        >
   
            <ArrayInput
              values={data.worksheet?.targetAudience?.painPoints || []}
              onChange={(values) => updateTargetAudience('painPoints', values)}
              placeholder="Add a pain point..."
            />

        </FormField>
        <div className="absolute right-2 top-2">
              <Tooltip content="List specific challenges your customers face. Think about: Time/money wasted, Frustrations, Inefficiencies, Risks, Lost opportunities, Emotional pain points." />
            </div>
          </div>

        <FormField
          label="What transformation are they seeking?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.journey']?.[0]}
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.targetAudience?.idealCustomerProfile?.journey || ''}
              onChange={(e) => updateICP('journey', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe their desired transformation..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Map their journey from problem to solution. What triggers their search? What steps do they take? What obstacles do they face? How do they evaluate solutions?" />
            </div>
          </div>
        </FormField>

        <div className="relative">
        <FormField
          label="What are their key desires?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.desires']?.[0]}
        >
    
            <ArrayInput
              values={data.worksheet?.targetAudience?.idealCustomerProfile?.desires || []}
              onChange={(values) => updateICP('desires', values)}
              placeholder="Add a desire..."
            />

        </FormField>
        <div className="absolute right-2 top-2">
              <Tooltip content="What do they want to achieve? Include both rational desires (save time/money) and emotional desires (feel confident, respected, successful)." />
            </div>
          </div>

        <FormField
          label="What's their desired end state?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.desiredState']?.[0]}
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.targetAudience?.idealCustomerProfile?.desiredState || ''}
              onChange={(e) => updateICP('desiredState', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe their ideal outcome..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Paint a picture of their ideal outcome. What does success look like? How will their life/work be better? What will they be able to do or achieve?" />
            </div>
          </div>
        </FormField>

        <FormField
          label="What's the gap between their current and desired state?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.gap']?.[0]}
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.targetAudience?.idealCustomerProfile?.gap || ''}
              onChange={(e) => updateICP('gap', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="Describe the gap..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="What's stopping them from reaching their goals? Consider: Knowledge gaps, Resource constraints, Technical limitations, Internal resistance, Market conditions." />
            </div>
          </div>
        </FormField>

        <FormField
          label="What's your unique selling point?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.uniqueSellingPoint']?.[0]}
        >
          <div className="relative">
            <textarea
              value={data.worksheet?.targetAudience?.idealCustomerProfile?.uniqueSellingPoint || ''}
              onChange={(e) => updateICP('uniqueSellingPoint', e.target.value)}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="What makes your solution unique..."
            />
            <div className="absolute right-2 top-2">
              <Tooltip content="Why should they choose you? Focus on unique benefits that matter to them. What can you offer that others can't? How do you solve their problem better?" />
            </div>
          </div>
        </FormField>
        <div className="relative">
        <FormField
          label="What are the key benefits of your solution?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.benefits']?.[0]}
        >

            <ArrayInput
              values={data.worksheet?.targetAudience?.idealCustomerProfile?.benefits || []}
              onChange={(values) => updateICP('benefits', values)}
              placeholder="Add a benefit..."
            />

        </FormField>
        <div className="absolute right-2 top-2">
              <Tooltip content="List specific benefits of your solution. Include both tangible results (faster, cheaper, better) and intangible benefits (peace of mind, confidence, status)." />
            </div>
          </div>
          <div className="relative">
        <FormField
          label="What objections might they have?"
          required
          error={errors?.['worksheet.targetAudience.idealCustomerProfile.objections']?.[0]}
        >

            <ArrayInput
              values={data.worksheet?.targetAudience?.idealCustomerProfile?.objections || []}
              onChange={(values) => updateICP('objections', values)}
              placeholder="Add an objection..."
            />

        </FormField>
        <div className="absolute right-2 top-2">
              <Tooltip content="What concerns might stop them from buying? Think about: Price, Implementation effort, Risk factors, Time commitment, Internal buy-in, Alternative solutions." />
            </div>
          </div>
      </div>
    </div>
  );
}
