import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import CollapsibleSection from '@/components/common/CollapsibleSection';
import { FiInfo } from 'react-icons/fi';

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
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Business Goals
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Setting meaningful goals transforms your vision from an abstract idea into actionable steps. These aren't just numbers 
          to hit—they're milestones that mark your progress and keep you motivated through challenges.
        </p>
        <p className="mt-4">
          Here, we'll establish both short-term wins and long-term aspirations. By breaking down your journey into clear, 
          achievable targets, you'll maintain momentum while building toward your bigger dreams. Remember, goals aren't just 
          about business metrics—they're about creating the impact you envision.
        </p>
      </div>

      {/* Traditional Time-Horizon Goals */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Traditional Time-Horizon Goals</h2>
        <p className="text-gray-300">
          Plan across short-term (6–12 months), mid-term (1–2 years), and long-term (3–5 years) horizons.
        </p>

        {/* Short-Term Goals */}
        <div className="rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Short-Term (6-12 Months)</h3>
          <FormField
            label="Short-Term Goals"
            required
            error={errors?.['businessGoals.shortTerm']?.[0]}
            tooltip="Examples: Launch a new product, Acquire 100 new customers."
          >
            <textarea
              value={data?.shortTerm || ''}
              onChange={(e) => updateBusinessGoals('shortTerm', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="List your short-term goals..."
            />
          </FormField>
        </div>

        {/* Mid-Term Goals */}
        <div className="rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Mid-Term (1-2 Years)</h3>
          <FormField
            label="Mid-Term Goals"
            required
            error={errors?.['businessGoals.midTerm']?.[0]}
            tooltip="Examples: Expand into a new market, Reach $X monthly revenue."
          >
            <textarea
              value={data?.midTerm || ''}
              onChange={(e) => updateBusinessGoals('midTerm', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="List your mid-term goals..."
            />
          </FormField>
        </div>

        {/* Long-Term Goals */}
        <div className="rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Long-Term (3-5 Years)</h3>
          <FormField
            label="Long-Term Goals"
            required
            error={errors?.['businessGoals.longTerm']?.[0]}
            tooltip="Examples: Become an industry leader, Achieve $1M annual revenue."
          >
            <textarea
              value={data?.longTerm || ''}
              onChange={(e) => updateBusinessGoals('longTerm', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Describe your long-term vision..."
            />
          </FormField>
        </div>
      </div>

      {/* Website Goals & Success Indicators */}
      <div className="space-y-6 pt-8 border-t border-gray-700">
        <h2 className="text-2xl font-semibold">Website Goals & Success Indicators</h2>
        <div className="space-y-6">
          <div className="rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Website Goals</h3>
            <FormField
              label="What are your website's primary goals?"
              required
              error={errors?.['websiteGoals']?.[0]}
              tooltip="Examples: Generate leads, Sell products, Build brand awareness"
            >
              <textarea
                value={data?.websiteGoals || ''}
                onChange={(e) => updateBusinessGoals('websiteGoals', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="List your website goals..."
              />
            </FormField>
          </div>

          <div className="rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Success Indicators</h3>
            <FormField
              label="How will you measure success?"
              required
              error={errors?.['successIndicators']?.[0]}
              tooltip="Examples: Conversion rate, Monthly revenue, Customer satisfaction score"
            >
              <textarea
                value={data?.successIndicators || ''}
                onChange={(e) => updateBusinessGoals('successIndicators', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="List your success indicators..."
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Prioritizing Your Goals Section */}
      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Prioritizing Your Goals</h2>
        <div className="space-y-6">
          {/* Goal Priorities */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Goal Priorities</h3>
            <FormField
              label="Rank or List Your Top Priority Goals"
              tooltip="E.g., 1) Attendance, 2) Engagement, 3) Financial..."
              required
              error={errors?.['goalPriorities']?.[0]}
            >
              <textarea
                value={data?.goalPriorities || ''}
                onChange={(e) => updateBusinessGoals('goalPriorities', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Goal 1, Goal 2, Goal 3..."
              />
            </FormField>
          </div>

          {/* Action Plan */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Action Plan</h3>
            <FormField
              label="What specific actions will you take to achieve each goal?"
              tooltip="Break down each goal into actionable steps"
              required
              error={errors?.['actionPlan']?.[0]}
            >
              <textarea
                value={data?.actionPlan || ''}
                onChange={(e) => updateBusinessGoals('actionPlan', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Goal 1: Action 1, Action 2... Goal 2: Action 1..."
              />
            </FormField>
          </div>

          {/* Challenges & Solutions */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Challenges & Solutions</h3>
            <FormField
              label="What challenges might you face and how will you overcome them?"
              tooltip="Identify potential obstacles and plan solutions"
              required
              error={errors?.['challenges']?.[0]}
            >
              <textarea
                value={data?.challenges || ''}
                onChange={(e) => updateBusinessGoals('challenges', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Goal 1 Challenges:..., Proposed Solutions:..."
              />
            </FormField>
          </div>

          {/* Accountability */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Accountability</h3>
            <FormField
              label="How will you track progress and maintain accountability?"
              tooltip="Define who is responsible and how you'll measure success"
              required
              error={errors?.['accountability']?.[0]}
            >
              <textarea
                value={data?.accountability || ''}
                onChange={(e) => updateBusinessGoals('accountability', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Who owns each goal? Which metrics do you track?"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Vision Summary Section */}
      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Vision Summary</h2>
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Summary</h3>
            <FormField
              label="Summarize your goals and vision"
              tooltip="Create a concise vision statement"
              required
              error={errors?.['summary']?.[0]}
            >
              <textarea
                value={data?.summary || ''}
                onChange={(e) => updateBusinessGoals('summary', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Vision Statement: We aim to..."
              />
            </FormField>
          </div>

          {/* Next Steps */}
          <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Next Steps</h3>
            <FormField
              label="What are your immediate next steps?"
              tooltip="List the first actions you'll take"
              required
              error={errors?.['nextSteps']?.[0]}
            >
              <textarea
                value={data?.nextSteps || ''}
                onChange={(e) => updateBusinessGoals('nextSteps', e.target.value)}
                className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                placeholder="List immediate action items to finalize & begin work."
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Detailed SMART Goals */}
      <div className="space-y-6 pt-8">
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
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="What exact attendance goal do you have?"
            />
          </FormField>
          <FormField label="Measurable" tooltip="E.g., Track weekly registration counts.">
            <textarea
              value={data?.attendance?.measurable || ''}
              onChange={(e) => updateSmartField('attendance', 'measurable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="How will you measure progress?"
            />
          </FormField>
          <FormField label="Achievable" tooltip="Is this realistic given your resources?">
            <textarea
              value={data?.attendance?.achievable || ''}
              onChange={(e) => updateSmartField('attendance', 'achievable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Why is this goal realistic?"
            />
          </FormField>
          <FormField label="Relevant" tooltip="Does this align with your broader mission?">
            <textarea
              value={data?.attendance?.relevant || ''}
              onChange={(e) => updateSmartField('attendance', 'relevant', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Why is this goal important?"
            />
          </FormField>
          <FormField label="Time-Bound" tooltip="E.g., Achieve this goal by a certain date.">
            <textarea
              value={data?.attendance?.timeBound || ''}
              onChange={(e) => updateSmartField('attendance', 'timeBound', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
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
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="E.g., Achieve an average rating of 4.0 or higher"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.engagement?.measurable || ''}
              onChange={(e) => updateSmartField('engagement', 'measurable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="E.g., Use post-session surveys, track poll responses"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.engagement?.achievable || ''}
              onChange={(e) => updateSmartField('engagement', 'achievable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Is your platform or format set up for strong engagement?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.engagement?.relevant || ''}
              onChange={(e) => updateSmartField('engagement', 'relevant', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Why does strong engagement matter for your success?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.engagement?.timeBound || ''}
              onChange={(e) => updateSmartField('engagement', 'timeBound', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
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
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="E.g., Generate $50k in sponsorship"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.financial?.measurable || ''}
              onChange={(e) => updateSmartField('financial', 'measurable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="How will you track these finances?"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.financial?.achievable || ''}
              onChange={(e) => updateSmartField('financial', 'achievable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Why is this realistic given market conditions?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.financial?.relevant || ''}
              onChange={(e) => updateSmartField('financial', 'relevant', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="How does this support overall financial health?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.financial?.timeBound || ''}
              onChange={(e) => updateSmartField('financial', 'timeBound', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
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
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="E.g., Ensure all sessions are recorded & posted"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.contentDelivery?.measurable || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'measurable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="E.g., Track on-demand views, gather feedback"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.contentDelivery?.achievable || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'achievable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Do you have the resources/tech for this?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.contentDelivery?.relevant || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'relevant', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Why is this critical for your audience experience?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.contentDelivery?.timeBound || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'timeBound', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
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
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="E.g., 3 new connections per attendee"
            />
          </FormField>
          <FormField label="Measurable">
            <textarea
              value={data?.networking?.measurable || ''}
              onChange={(e) => updateSmartField('networking', 'measurable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Monitor interactions on your platform or app"
            />
          </FormField>
          <FormField label="Achievable">
            <textarea
              value={data?.networking?.achievable || ''}
              onChange={(e) => updateSmartField('networking', 'achievable', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Is your format conducive to connecting people?"
            />
          </FormField>
          <FormField label="Relevant">
            <textarea
              value={data?.networking?.relevant || ''}
              onChange={(e) => updateSmartField('networking', 'relevant', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Why does networking matter for your mission?"
            />
          </FormField>
          <FormField label="Time-Bound">
            <textarea
              value={data?.networking?.timeBound || ''}
              onChange={(e) => updateSmartField('networking', 'timeBound', e.target.value)}
              className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="During the event? 2 weeks after? Ongoing?"
            />
          </FormField>
        </CollapsibleSection>
      </div>

      {/* Additional Sections */}
      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Analysis & Strategy Development</h2>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4 mb-8">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Next Steps</h2>
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
            className="w-full bg-[#1a2236]/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="List immediate action items to finalize & begin work."
          />
        </FormField>
      </div>
    </div>
  );
}