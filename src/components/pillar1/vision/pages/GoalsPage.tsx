import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import CollapsibleSection from '@/components/common/CollapsibleSection';

interface GoalsPageProps {
  data?: VisionData["businessGoals"];
  onChange: (data: VisionData["businessGoals"]) => void;
  errors?: Record<string, string[]>;
}

export default function GoalsPage({ data, onChange, errors }: GoalsPageProps) {
  // Helper to update top-level fields in businessGoals
  const updateBusinessGoals = (field: string, value: any) => {
    const updated = {
      ...data,
      [field]: value,
    };
    onChange(updated);
  };

  // Helper for updating SMART subfields (e.g. attendance, engagement, etc.)
  const updateSmartField = (category: string, subField: string, newValue: string) => {
    const prev = data?.[category] || {};
    onChange({
      ...data,
      [category]: {
        ...prev,
        [subField]: newValue,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Clarifying Your Goals</h1>
        <p className="text-gray-300 mb-6">
          Well-defined goals provide direction, unite your team, and set clear targets for measuring success.
          The more detail you invest here, the easier it will be to track your progress and stay motivated.
        </p>
      </div>

      {/* Traditional Time-Horizon Goals */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Traditional Time-Horizon Goals</h2>
        <p className="text-gray-300">
          Plan across short-term (6–12 months), mid-term (1–2 years), and long-term (3–5 years) horizons.
        </p>

        {/* Short-Term Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Short-Term (6-12 Months)</h3>
          <FormField
            label="Short-Term Goals"
            required
            error={errors?.['businessGoals.shortTerm']?.[0]}
            tooltip="Examples: Launch a new product, Acquire 100 new customers."
          >
            <textarea
              value={data?.shortTerm || ''}
              onChange={(e) => updateBusinessGoals('shortTerm', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="List your short-term goals..."
            />
          </FormField>
        </div>

        {/* Mid-Term Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Mid-Term (1-2 Years)</h3>
          <FormField
            label="Mid-Term Goals"
            required
            error={errors?.['businessGoals.midTerm']?.[0]}
            tooltip="Examples: Expand into a new market, Reach $X monthly revenue."
          >
            <textarea
              value={data?.midTerm || ''}
              onChange={(e) => updateBusinessGoals('midTerm', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="List your mid-term goals..."
            />
          </FormField>
        </div>

        {/* Long-Term Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Long-Term (3-5 Years)</h3>
          <FormField
            label="Long-Term Goals"
            required
            error={errors?.['businessGoals.longTerm']?.[0]}
            tooltip="Examples: Become an industry leader, Achieve $1M annual revenue."
          >
            <textarea
              value={data?.longTerm || ''}
              onChange={(e) => updateBusinessGoals('longTerm', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="Describe your long-term vision..."
            />
          </FormField>
        </div>
      </div>

      {/* Website Goals & Success Indicators */}
      <div className="space-y-6 pt-8 border-t border-gray-700">
        <h2 className="text-2xl font-semibold">Website Goals & Success Indicators</h2>
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <FormField
            label="Website Goals"
            tooltip="Describe what you aim to achieve with your website (e.g., user engagement, conversions, etc.)."
          >
            <textarea
              value={data?.websiteGoals || ''}
              onChange={(e) => updateBusinessGoals('websiteGoals', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="Enter your website goals..."
            />
          </FormField>
          <FormField
            label="Success Indicators"
            tooltip="How will you measure the success of your goals? E.g., conversion rate, user engagement metrics, etc."
          >
            <textarea
              value={data?.successIndicators || ''}
              onChange={(e) => updateBusinessGoals('successIndicators', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="Enter success indicators..."
            />
          </FormField>
        </div>
      </div>

      {/* Detailed SMART Goals */}
      <div className="space-y-6 pt-8 border-t border-gray-700">
        <h2 className="text-2xl font-semibold">Detailed SMART Goals</h2>
        <p className="text-gray-300">
          Below, we’ll break out common categories. The more detailed your answers, the clearer your execution plan will be.
        </p>

        {/* 1) Attendance Goals */}
        <CollapsibleSection title="Attendance Goals (Example)">
          <p className="text-gray-300 mb-2">
            Set a numeric target and measure sign-ups, RSVPs, or mailing list expansions.
          </p>
          <FormField label="Specific" tooltip="E.g., Increase total attendance to 1,000 participants.">
            <textarea
              value={data?.attendance?.specific || ''}
              onChange={(e) => updateSmartField('attendance', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="What exact attendance goal do you have?"
            />
          </FormField>
          <FormField label="Measurable" tooltip="E.g., Track weekly registration counts.">
            <textarea
              value={data?.attendance?.measurable || ''}
              onChange={(e) => updateSmartField('attendance', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you measure progress?"
            />
          </FormField>
          <FormField label="Achievable" tooltip="Is this realistic given your resources?">
            <textarea
              value={data?.attendance?.achievable || ''}
              onChange={(e) => updateSmartField('attendance', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this goal realistic?"
            />
          </FormField>
          <FormField label="Relevant" tooltip="Does this align with your broader mission?">
            <textarea
              value={data?.attendance?.relevant || ''}
              onChange={(e) => updateSmartField('attendance', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this goal important?"
            />
          </FormField>
          <FormField label="Time-Bound" tooltip="E.g., Achieve this goal by a certain date.">
            <textarea
              value={data?.attendance?.timeBound || ''}
              onChange={(e) => updateSmartField('attendance', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="What is the deadline?"
            />
          </FormField>
        </CollapsibleSection>

        {/* 2) Engagement Goals */}
        <CollapsibleSection title="Engagement Goals">
          <p className="text-gray-300 mb-2">
            Set specific engagement metrics for active participation through Q&A, polls, or feedback.
          </p>
          <FormField label="Specific">
            <textarea
              value={data?.engagement?.specific || ''}
              onChange={(e) => updateSmartField('engagement', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="E.g., Achieve an average rating of 4.0 or higher"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.engagement?.measurable || ''}
              onChange={(e) => updateSmartField('engagement', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="E.g., Use post-session surveys, track poll responses"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.engagement?.achievable || ''}
              onChange={(e) => updateSmartField('engagement', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Is your platform or format set up for strong engagement?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.engagement?.relevant || ''}
              onChange={(e) => updateSmartField('engagement', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why does strong engagement matter for your success?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.engagement?.timeBound || ''}
              onChange={(e) => updateSmartField('engagement', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="When/how often will you measure it?"
            />
          </FormField>
        </CollapsibleSection>

        {/* 3) Financial Goals */}
        <CollapsibleSection title="Financial Goals">
          <p className="text-gray-300 mb-2">
            Define financial targets for revenue, sponsorship, or cost savings.
          </p>
          <FormField label="Specific">
            <textarea
              value={data?.financial?.specific || ''}
              onChange={(e) => updateSmartField('financial', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="E.g., Generate $50k in sponsorship"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.financial?.measurable || ''}
              onChange={(e) => updateSmartField('financial', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you track these finances?"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.financial?.achievable || ''}
              onChange={(e) => updateSmartField('financial', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this realistic given market conditions?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.financial?.relevant || ''}
              onChange={(e) => updateSmartField('financial', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How does this support overall financial health?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.financial?.timeBound || ''}
              onChange={(e) => updateSmartField('financial', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="E.g., Achieve X by Q4 or by [date]"
            />
          </FormField>
        </CollapsibleSection>

        {/* 4) Content Delivery Goals */}
        <CollapsibleSection title="Content Delivery Goals">
          <p className="text-gray-300 mb-2">
            Focus on ensuring accessibility, quality, and timeliness for your content or sessions.
          </p>
          <FormField label="Specific">
            <textarea
              value={data?.contentDelivery?.specific || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="E.g., Ensure all sessions are recorded & posted"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.contentDelivery?.measurable || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="E.g., Track on-demand views, gather feedback"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.contentDelivery?.achievable || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Do you have the resources/tech for this?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.contentDelivery?.relevant || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this critical for your audience experience?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.contentDelivery?.timeBound || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="When must these tasks be completed?"
            />
          </FormField>
        </CollapsibleSection>

        {/* 5) Networking Goals */}
        <CollapsibleSection title="Networking Goals">
          <p className="text-gray-300 mb-2">
            Define how to facilitate meaningful connections among participants.
          </p>
          <FormField label="Specific">
            <textarea
              value={data?.networking?.specific || ''}
              onChange={(e) => updateSmartField('networking', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="E.g., 3 new connections per attendee"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.networking?.measurable || ''}
              onChange={(e) => updateSmartField('networking', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Monitor interactions on your platform or app"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.networking?.achievable || ''}
              onChange={(e) => updateSmartField('networking', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Is your format conducive to connecting people?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.networking?.relevant || ''}
              onChange={(e) => updateSmartField('networking', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why does networking matter for your mission?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.networking?.timeBound || ''}
              onChange={(e) => updateSmartField('networking', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="During the event? 2 weeks after? Ongoing?"
            />
          </FormField>
        </CollapsibleSection>
      </div>

      {/* Additional Sections */}
      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Prioritizing Your Goals</h2>
        <p className="text-gray-300">
          List your top priorities to focus on first. It helps allocate your best resources to what matters most.
        </p>
        <FormField
          label="Rank or List Your Top Priority Goals"
          tooltip="E.g., 1) Attendance, 2) Engagement, 3) Financial..."
        >
          <textarea
            value={data?.goalPriorities || ''}
            onChange={(e) => updateBusinessGoals('goalPriorities', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Goal 1, Goal 2, Goal 3..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Action Plan Development</h2>
        <FormField
          label="Key Actions for Your Top Goals"
          tooltip="List major steps for each top goal (Action 1, Action 2...)"
        >
          <textarea
            value={data?.actionPlan || ''}
            onChange={(e) => updateBusinessGoals('actionPlan', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[120px]"
            placeholder="Goal 1: Action 1, Action 2... Goal 2: Action 1..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Potential Challenges & Solutions</h2>
        <FormField
          label="Challenges & Solutions"
          tooltip="For each top goal, note biggest obstacles & how to mitigate."
        >
          <textarea
            value={data?.challenges || ''}
            onChange={(e) => updateBusinessGoals('challenges', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[120px]"
            placeholder="Goal 1 Challenges:..., Proposed Solutions:..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Accountability & Monitoring</h2>
        <FormField
          label="Assign Responsibilities & Review Process"
          tooltip="E.g., Marketing Team owns goal X, weekly check-ins, track metrics"
        >
          <textarea
            value={data?.accountability || ''}
            onChange={(e) => updateBusinessGoals('accountability', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[120px]"
            placeholder="Who owns each goal? Which metrics do you track?"
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Summary & Alignment</h2>
        <FormField
          label="Overall Event or Business Vision"
          tooltip="Keep it concise, ensuring alignment with your goals."
        >
          <textarea
            value={data?.summary || ''}
            onChange={(e) => updateBusinessGoals('summary', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
            placeholder="Vision Statement: We aim to..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4 mb-8">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <p className="text-gray-300">
          Once finalized, share your goals with stakeholders, start implementation, and regularly review &amp; update as you learn more.
        </p>
        <FormField
          label="Next Steps Outline"
          tooltip="E.g., 1) Finalize plan, 2) Communicate, 3) Implement top priorities."
        >
          <textarea
            value={data?.nextSteps || ''}
            onChange={(e) => updateBusinessGoals('nextSteps', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
            placeholder="List immediate action items to finalize & begin work."
          />
        </FormField>
      </div>
    </div>
  );
}