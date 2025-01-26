import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';

interface GoalsPageProps {
  data?: VisionData;
  onChange: (data: VisionData) => void;
  errors?: Record<string, string[]>;
}

/** 
 * If you're using the extended interface with new fields:
 * interface SmartGoalFields {
 *   specific: string;
 *   measurable: string;
 *   achievable: string;
 *   relevant: string;
 *   timeBound: string;
 * }
 * 
 * interface VisionData {
 *   businessGoals?: {
 *     shortTerm?: string;
 *     midTerm?: string;
 *     longTerm?: string;
 *     websiteGoals?: string;
 *     successIndicators?: string;
 *     attendance?: SmartGoalFields;
 *     engagement?: SmartGoalFields;
 *     financial?: SmartGoalFields;
 *     contentDelivery?: SmartGoalFields;
 *     networking?: SmartGoalFields;
 *     goalPriorities?: string;
 *     actionPlan?: string;
 *     challenges?: string;
 *     accountability?: string;
 *     summary?: string;
 *     nextSteps?: string;
 *   };
 *   ...
 * }
 */

export default function GoalsPage({ data, onChange, errors }: GoalsPageProps) {
  // Helper to update top-level or simpler fields
  const updateBusinessGoals = (field: string, value: any) => {
    onChange({
      ...data,
      businessGoals: {
        ...data?.businessGoals,
        [field]: value
      }
    });
  };

  // Helper specifically for the SMART fields (attendance, engagement, etc.)
  const updateSmartField = (category: string, subField: string, newValue: string) => {
    const prev = data?.businessGoals?.[category] || {};
    onChange({
      ...data,
      businessGoals: {
        ...data?.businessGoals,
        [category]: {
          ...prev,
          [subField]: newValue
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Clarifying Your Goals</h1>
        <p className="text-gray-300 mb-6">
          Well-defined goals provide direction, unite your team, and set clear targets 
          for measuring success. In this section, you’ll establish goals using both 
          a traditional time-horizon approach (short / mid / long term) and SMART goals 
          specifically geared toward a virtual conference scenario.
        </p>
      </div>

      {/** A) Traditional Time-Horizon Goals **/}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Traditional Time-Horizon Goals</h2>
        <p className="text-gray-300">
          Consider the bigger picture of your business or project over different time spans. 
          Short-term goals focus on immediate wins (6–12 months). Mid-term goals aim for 
          sustainable growth (1–2 years). Long-term goals look to your 3–5 year vision.
        </p>

        {/* Short-Term */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Short-Term (6-12 Months)</h3>
          <p className="text-gray-300 mb-4">
            Think about immediate, achievable objectives you can realistically tackle 
            within the next year.
          </p>
          <FormField
            label="Short-Term Goals"
            required
            error={errors?.['businessGoals.shortTerm']?.[0]}
            helper="Focus on immediate, achievable objectives"
            tooltip="Examples: Launch a new product line, Acquire 100 new customers, etc."
          >
            <textarea
              value={data?.businessGoals?.shortTerm || ''}
              onChange={(e) => updateBusinessGoals('shortTerm', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="List your short-term goals..."
            />
          </FormField>
        </div>

        {/* Mid-Term */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Mid-Term (1-2 Years)</h3>
          <p className="text-gray-300 mb-4">
            Look at how to sustain and expand your initial successes over 
            the next couple of years.
          </p>
          <FormField
            label="Mid-Term Goals"
            required
            error={errors?.['businessGoals.midTerm']?.[0]}
            helper="Plan for sustainable growth and expansion"
            tooltip="Examples: Reach $X monthly revenue, Expand into a new geographic market, etc."
          >
            <textarea
              value={data?.businessGoals?.midTerm || ''}
              onChange={(e) => updateBusinessGoals('midTerm', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="List your mid-term goals..."
            />
          </FormField>
        </div>

        {/* Long-Term */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Long-Term (3-5 Years)</h3>
          <p className="text-gray-300 mb-4">
            Envision your ultimate aspirations, whether it’s industry leadership, 
            significant revenue milestones, or broader impact.
          </p>
          <FormField
            label="Long-Term Goals"
            required
            error={errors?.['businessGoals.longTerm']?.[0]}
            helper="Envision your ultimate business aspirations"
            tooltip="Examples: Become a recognized leader in your space, Achieve $1M annual revenue, etc."
          >
            <textarea
              value={data?.businessGoals?.longTerm || ''}
              onChange={(e) => updateBusinessGoals('longTerm', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
              placeholder="Describe your long-term vision..."
            />
          </FormField>
        </div>
      </div>

      {/** B) Virtual Conference SMART Goals **/}
      <div className="space-y-6 pt-8 border-t border-gray-700">
        <h2 className="text-2xl font-semibold">Virtual Conference SMART Goals</h2>
        <p className="text-gray-300">
          Use this structured approach to define, measure, and achieve outcomes that 
          align with your association’s mission and success criteria.
        </p>

        {/* 1. Attendance Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Attendance Goals</h3>
          <p className="text-gray-300 mb-6">
            How many attendees do you aim to attract? Setting a numeric target helps you 
            plan marketing and measure success.
          </p>
          <FormField label="Specific" tooltip="E.g., Increase total attendance to 1,000 participants.">
            <textarea
              value={data?.businessGoals?.attendance?.specific || ''}
              onChange={(e) => updateSmartField('attendance', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="What exact number of attendees do you aim for?"
            />
          </FormField>
          <FormField label="Measurable" tooltip="E.g., Track weekly registration numbers.">
            <textarea
              value={data?.businessGoals?.attendance?.measurable || ''}
              onChange={(e) => updateSmartField('attendance', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you measure progress?"
            />
          </FormField>
          <FormField label="Achievable" tooltip="Is this realistic given past data, budget, marketing?">
            <textarea
              value={data?.businessGoals?.attendance?.achievable || ''}
              onChange={(e) => updateSmartField('attendance', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this goal realistic?"
            />
          </FormField>
          <FormField label="Relevant" tooltip="Align with your association’s mission.">
            <textarea
              value={data?.businessGoals?.attendance?.relevant || ''}
              onChange={(e) => updateSmartField('attendance', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this important for your event?"
            />
          </FormField>
          <FormField label="Time-Bound" tooltip="E.g., Reach 1,000 registrations by [date].">
            <textarea
              value={data?.businessGoals?.attendance?.timeBound || ''}
              onChange={(e) => updateSmartField('attendance', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="What is your deadline?"
            />
          </FormField>
        </div>

        {/* 2. Engagement Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Engagement Goals</h3>
          <p className="text-gray-300 mb-6">
            Define how you’ll gauge attendee interest, participation, and satisfaction.
          </p>
          <FormField label="Specific" tooltip="E.g., Aim for an average session rating of 4/5.">
            <textarea
              value={data?.businessGoals?.engagement?.specific || ''}
              onChange={(e) => updateSmartField('engagement', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="What level of engagement do you want?"
            />
          </FormField>
          <FormField label="Measurable" tooltip="E.g., Use post-session surveys, track polls/Q&A.">
            <textarea
              value={data?.businessGoals?.engagement?.measurable || ''}
              onChange={(e) => updateSmartField('engagement', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you track engagement?"
            />
          </FormField>
          <FormField label="Achievable" tooltip="Is this feasible given your platform or resources?">
            <textarea
              value={data?.businessGoals?.engagement?.achievable || ''}
              onChange={(e) => updateSmartField('engagement', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this goal realistic?"
            />
          </FormField>
          <FormField label="Relevant" tooltip="Why does engagement matter for your event ROI?">
            <textarea
              value={data?.businessGoals?.engagement?.relevant || ''}
              onChange={(e) => updateSmartField('engagement', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this crucial to your event?"
            />
          </FormField>
          <FormField label="Time-Bound" tooltip="E.g., Evaluate metrics daily or after each session.">
            <textarea
              value={data?.businessGoals?.engagement?.timeBound || ''}
              onChange={(e) => updateSmartField('engagement', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="When will you measure it?"
            />
          </FormField>
        </div>

        {/* 3. Financial Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Financial Goals</h3>
          <p className="text-gray-300 mb-6">
            Whether it’s sponsorship, ticket revenue, or cost-saving measures, 
            define your financial targets clearly.
          </p>
          <FormField label="Specific" tooltip="E.g., Generate $50k in sponsorships or reduce costs by 20%.">
            <textarea
              value={data?.businessGoals?.financial?.specific || ''}
              onChange={(e) => updateSmartField('financial', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="What exact financial outcome do you want?"
            />
          </FormField>
          <FormField label="Measurable" tooltip="E.g., Track sponsor commitments and ticket sales weekly.">
            <textarea
              value={data?.businessGoals?.financial?.measurable || ''}
              onChange={(e) => updateSmartField('financial', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you track financial performance?"
            />
          </FormField>
          <FormField label="Achievable" tooltip="Is this target realistic based on past events, market data?">
            <textarea
              value={data?.businessGoals?.financial?.achievable || ''}
              onChange={(e) => updateSmartField('financial', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this feasible?"
            />
          </FormField>
          <FormField label="Relevant" tooltip="How does this support your broader mission or viability?">
            <textarea
              value={data?.businessGoals?.financial?.relevant || ''}
              onChange={(e) => updateSmartField('financial', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why does this matter for your org's health?"
            />
          </FormField>
          <FormField label="Time-Bound" tooltip="E.g., Achieve X revenue by [Specific Date].">
            <textarea
              value={data?.businessGoals?.financial?.timeBound || ''}
              onChange={(e) => updateSmartField('financial', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="What is your timeline?"
            />
          </FormField>
        </div>

        {/* 4. Content Delivery Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Content Delivery Goals</h3>
          <p className="text-gray-300 mb-6">
            Focus on the quality and accessibility of your event content—recordings, 
            live sessions, on-demand resources, etc.
          </p>
          <FormField
            label="Specific"
            tooltip="E.g., All sessions recorded & available within 24 hours post-event."
          >
            <textarea
              value={data?.businessGoals?.contentDelivery?.specific || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="What exactly do you aim to deliver in terms of content?"
            />
          </FormField>
          <FormField label="Measurable" tooltip="E.g., Track on-demand views, gather feedback.">
            <textarea
              value={data?.businessGoals?.contentDelivery?.measurable || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you gauge content success?"
            />
          </FormField>
          <FormField label="Achievable" tooltip="Is your team set up to meet these content requirements?">
            <textarea
              value={data?.businessGoals?.contentDelivery?.achievable || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this realistic given your resources?"
            />
          </FormField>
          <FormField label="Relevant" tooltip="Why does delivering high-quality content matter for attendees?">
            <textarea
              value={data?.businessGoals?.contentDelivery?.relevant || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this important?"
            />
          </FormField>
          <FormField label="Time-Bound" tooltip="E.g., Upload recordings within 24 hours after the event.">
            <textarea
              value={data?.businessGoals?.contentDelivery?.timeBound || ''}
              onChange={(e) => updateSmartField('contentDelivery', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="When will you complete these tasks?"
            />
          </FormField>
        </div>

        {/* 5. Networking Goals */}
        <div className="bg-[#2D3748] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Networking Goals</h3>
          <p className="text-gray-300 mb-6">
            Virtual or not, attendee relationships are vital. Define how you’ll foster 
            connections and measure them.
          </p>
          <FormField
            label="Specific"
            tooltip="E.g., Each attendee to make 3 new professional connections."
          >
            <textarea
              value={data?.businessGoals?.networking?.specific || ''}
              onChange={(e) => updateSmartField('networking', 'specific', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="What exactly do you want attendees to achieve in networking?"
            />
          </FormField>
          <FormField
            label="Measurable"
            tooltip="E.g., Monitor interactions on the event platform or dedicated app."
          >
            <textarea
              value={data?.businessGoals?.networking?.measurable || ''}
              onChange={(e) => updateSmartField('networking', 'measurable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="How will you track these interactions?"
            />
          </FormField>
          <FormField
            label="Achievable"
            tooltip="Is the platform or session structure enough for this networking level?"
          >
            <textarea
              value={data?.businessGoals?.networking?.achievable || ''}
              onChange={(e) => updateSmartField('networking', 'achievable', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why is this feasible?"
            />
          </FormField>
          <FormField
            label="Relevant"
            tooltip="Clarify how networking ties into your association’s broader mission."
          >
            <textarea
              value={data?.businessGoals?.networking?.relevant || ''}
              onChange={(e) => updateSmartField('networking', 'relevant', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 mb-2"
              placeholder="Why does networking matter here?"
            />
          </FormField>
          <FormField
            label="Time-Bound"
            tooltip="E.g., Encourage connections during the event; track 2 weeks post-event."
          >
            <textarea
              value={data?.businessGoals?.networking?.timeBound || ''}
              onChange={(e) => updateSmartField('networking', 'timeBound', e.target.value)}
              className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="When/how long is the networking phase?"
            />
          </FormField>
        </div>
      </div>

      {/* 
         C) Additional Sections:
            2: Prioritizing Goals
            3: Action Plan Development
            4: Potential Challenges & Solutions
            5: Accountability & Monitoring
            6: Summary & Alignment
            7: Next Steps
       */}
      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Prioritizing Your Goals</h2>
        <p className="text-gray-300">
          Not all goals carry the same weight. Listing them in priority order ensures 
          you allocate resources effectively.
        </p>
        <FormField
          label="Rank or List Your Top Priority Goals"
          helper="List the goals from most critical to least critical (up to 5)."
          tooltip="E.g. 1) Attendance, 2) Engagement, 3) Financial, etc."
        >
          <textarea
            value={data?.businessGoals?.goalPriorities || ''}
            onChange={(e) => updateBusinessGoals('goalPriorities', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Goal 1, Goal 2, Goal 3..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Action Plan Development</h2>
        <p className="text-gray-300">
          Outline key steps for achieving your top 3 goals. Break tasks into manageable 
          actions and deadlines.
        </p>
        <FormField
          label="Key Actions for Your Top Goals"
          tooltip="For each top goal, list the major steps (Action 1, Action 2...)"
        >
          <textarea
            value={data?.businessGoals?.actionPlan || ''}
            onChange={(e) => updateBusinessGoals('actionPlan', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[120px]"
            placeholder="Goal 1: Action 1, Action 2... Goal 2: Action 1, Action 2..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Potential Challenges & Solutions</h2>
        <p className="text-gray-300">
          Every goal faces obstacles. Identify likely challenges now, and brainstorm 
          solutions or workarounds.
        </p>
        <FormField
          label="Challenges & Solutions"
          tooltip="For each top goal, note big challenges and how you'll overcome them."
        >
          <textarea
            value={data?.businessGoals?.challenges || ''}
            onChange={(e) => updateBusinessGoals('challenges', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[120px]"
            placeholder="Goal 1 Challenges: 1)... Proposed Solutions: 1)..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Accountability & Monitoring</h2>
        <p className="text-gray-300">
          Assign responsibilities for each goal, decide how often you’ll review progress, 
          and track relevant metrics.
        </p>
        <FormField
          label="Assign Responsibilities & Review Process"
          tooltip="Example: Goal 1 = Marketing Team, Weekly check-ins, Key metrics = Registrations, etc."
        >
          <textarea
            value={data?.businessGoals?.accountability || ''}
            onChange={(e) => updateBusinessGoals('accountability', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[120px]"
            placeholder="Who owns each goal? How often do you review progress? Which metrics?"
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Summary & Alignment</h2>
        <p className="text-gray-300">
          Tie everything back to your broader vision or association mission so your goals 
          remain cohesive.
        </p>
        <FormField
          label="Overall Event (or Business) Vision"
          tooltip="Summarize your big-picture vision in 1-2 sentences."
        >
          <textarea
            value={data?.businessGoals?.summary || ''}
            onChange={(e) => updateBusinessGoals('summary', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
            placeholder="Vision Statement: We aim to..."
          />
        </FormField>
      </div>

      <div className="pt-8 border-t border-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <p className="text-gray-300">
          Finalize your goals, share them with stakeholders, and begin execution. Stay flexible 
          and update as you learn and adapt.
        </p>
        <FormField
          label="Next Steps Outline"
          tooltip="Example: 1) Finalize plan with team, 2) Communicate goals, 3) Start top priorities."
        >
          <textarea
            value={data?.businessGoals?.nextSteps || ''}
            onChange={(e) => updateBusinessGoals('nextSteps', e.target.value)}
            className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
            placeholder="List immediate actions to finalize and launch your goals."
          />
        </FormField>
      </div>
    </div>
  );
}
