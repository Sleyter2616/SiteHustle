import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';

interface CustomerJourneyPageProps {
  data?: VisionData;
  onChange: (data: VisionData) => void;
  errors?: Record<string, string[]>;
}

export default function CustomerJourneyPage({ data, onChange, errors }: CustomerJourneyPageProps) {
  const updateCustomerJourney = (field: string, value: any) => {
    onChange({
      ...data,
      customerJourney: {
        ...data?.customerJourney,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Customer Journey Map</h1>
        <p className="text-gray-300 mb-6">
          Mapping your customer's journey reveals each touchpoint that moves them from “just discovering you”
          to loyal advocate. By planning each stage thoughtfully, you can create an experience that fosters trust,
          encourages repeat business, and inspires referrals.
        </p>
      </div>

      <div className="space-y-6">
        {/* A. Awareness */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">A. Awareness</h2>
          <p className="text-gray-300 mb-6">
            How will potential customers first discover your business?
            Pinpointing these channels helps you focus your marketing resources.
          </p>
          <div className="relative">
            <FormField
              label="List your awareness channels and strategies"
              required
              error={errors?.['customerJourney.awareness']?.[0]}
              helper="Include both online and offline channels"
            >
              <ArrayInput
                values={data?.customerJourney?.awareness || []}
                onChange={(values) => updateCustomerJourney('awareness', values)}
                placeholder="Add an awareness channel..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Consider all ways customers might find you: Social media, SEO, Content marketing, Paid ads, Word of mouth, Events, Partnerships, PR, Industry directories." />
            </div>
          </div>
        </div>

        {/* B. Consideration */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">B. Consideration</h2>
          <p className="text-gray-300 mb-6">
            Once people know you exist, what convinces them you’re the right choice?
            Trust-building elements reduce doubts and highlight your credibility.
          </p>
          <div className="relative">
            <FormField
              label="List your trust-building elements"
              required
              error={errors?.['customerJourney.consideration']?.[0]}
              helper="What convinces customers to choose you?"
            >
              <ArrayInput
                values={data?.customerJourney?.consideration || []}
                onChange={(values) => updateCustomerJourney('consideration', values)}
                placeholder="Add a trust-building element..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="What convinces customers to choose you? Examples: Case studies, Reviews, Testimonials, Portfolio, Free trials, Demos, Guarantees, Industry certifications, Expert content." />
            </div>
          </div>
        </div>

        {/* C. Decision */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">C. Decision / Purchase</h2>
          <p className="text-gray-300 mb-6">
            Streamlining your purchase or sign-up process removes barriers to conversion.
            Make it easy for someone who’s convinced to say “yes.”
          </p>
          <FormField
            label="Describe your decision/purchase process"
            required
            error={errors?.['customerJourney.decision']?.[0]}
            helper="Make it as simple as possible"
          >
            <div className="relative">
              <textarea
                value={data?.customerJourney?.decision || ''}
                onChange={(e) => updateCustomerJourney('decision', e.target.value)}
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="Describe your purchase process..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip content="Make it easy to say yes! Detail your entire process: Initial contact, Consultation, Proposal/Quote, Payment options, Onboarding. Focus on removing friction points." />
              </div>
            </div>
          </FormField>
        </div>

        {/* D. Retention */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">D. Retention & Referral</h2>
          <p className="text-gray-300 mb-6">
            Keeping current customers engaged costs far less than acquiring new ones.
            Plus, satisfied clients often become brand advocates who spread the word.
          </p>
          <div className="relative">
            <FormField
              label="List your retention strategies"
              required
              error={errors?.['customerJourney.retention']?.[0]}
              helper="How will you maintain relationships?"
            >
              <ArrayInput
                values={data?.customerJourney?.retention || []}
                onChange={(values) => updateCustomerJourney('retention', values)}
                placeholder="Add a retention strategy..."
              />
            </FormField>
            <div className="absolute right-2 top-2">
              <Tooltip content="Think long-term relationships: Follow-up systems, Support channels, Loyalty programs, Regular check-ins, Exclusive content, Community building, Referral incentives." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}