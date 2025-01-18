import React from 'react'
import FormField, { ArrayInput } from '../common/FormField'
import { FiInfo } from 'react-icons/fi'
import Tooltip from '../common/Tooltip'

interface VisionAndGoalsProps {
  data: {
    businessName: string
    tagline: string
    missionStatement: string
    coreValues: string[]
    businessGoals: {
      shortTerm: string
      midTerm: string
      longTerm: string
    }
    swot?: {
      strengths: string[]
      weaknesses: string[]
      opportunities: string[]
      threats: string[]
    }
  }
  onChange: (data: any) => void
  errors: Record<string, string[]>
}

const VisionExample = {
  businessName: "No-Code Solutions",
  tagline: "Empowering Entrepreneurs to Launch Without Coding",
  missionStatement: "We exist to empower non-technical entrepreneurs with no-code tools so they can transform their ideas into thriving digital businesses.",
  coreValues: ["Innovation", "Accessibility", "Authenticity", "Empowerment"],
  businessGoals: {
    shortTerm: "Launch MVP and acquire first 100 users within 3 months",
    midTerm: "Reach $5k MRR and expand service offerings within 12 months",
    longTerm: "Build a community of 10,000+ entrepreneurs and establish industry partnerships by year 3"
  }
}

export default function VisionAndGoals({ data, onChange, errors }: VisionAndGoalsProps) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-[#1E293B] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">
          Why Vision & Goals Matter
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-[#94A3B8]">
            A clear vision and specific goals are the foundation of every successful business. 
            They provide direction, inspire action, and help you make better decisions as you build 
            your digital presence.
          </p>
          <p className="text-[#94A3B8]">
            Your vision statement and goals will guide your choice of tools, design decisions, 
            and marketing strategies. They're also crucial for building trust with your audience—people 
            connect with businesses that have a clear purpose and authentic values.
          </p>
          <p className="text-[#94A3B8]">
            Take time to thoughtfully complete each section below. Your answers will influence 
            every other pillar in your journey, from tool selection to audience targeting.
          </p>
        </div>
      </div>

      {/* Business Identity */}
      <div className="bg-[#1E293B] rounded-lg p-6 space-y-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-[#E2E8F0]">
            Business Identity
          </h3>
          <Tooltip content="Your business identity should reflect your unique value proposition and resonate with your target audience.">
            <FiInfo className="w-5 h-5 text-[#94A3B8]" />
          </Tooltip>
        </div>
        
        <div className="space-y-4">
          <FormField
            label="What's your business name?"
            required
            error={errors.businessName?.[0]}
            helper="Choose a memorable name that reflects your brand's personality"
          >
            <input
              type="text"
              value={data.businessName}
              onChange={(e) => onChange({ businessName: e.target.value })}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="e.g., No-Code Solutions"
            />
          </FormField>

          <FormField
            label="What phrase captures the essence of what you offer?"
            required
            error={errors.tagline?.[0]}
            helper="Your tagline should quickly communicate your main value proposition"
          >
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
              placeholder="e.g., Empowering Entrepreneurs to Launch Without Coding"
            />
          </FormField>

          <FormField
            label="What's your mission statement?"
            required
            error={errors.missionStatement?.[0]}
            helper='Try this format: "We exist to [action] for [audience] so they can [benefit]"'
          >
            <textarea
              value={data.missionStatement}
              onChange={(e) => onChange({ missionStatement: e.target.value })}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="e.g., We exist to empower non-technical entrepreneurs with no-code tools so they can transform their ideas into thriving digital businesses."
            />
          </FormField>

          <FormField
            label="What are your core values?"
            required
            error={errors.coreValues?.[0]}
            helper="Add 3-5 values that guide your business decisions"
          >
            <ArrayInput
              label="Core values"
              values={data.coreValues}
              onChange={(values) => onChange({ coreValues: values })}
              placeholder="e.g., Innovation, Accessibility, Authenticity"
            />
          </FormField>
        </div>
      </div>

      {/* Business Goals */}
      <div className="bg-[#1E293B] rounded-lg p-6 space-y-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-[#E2E8F0]">
            Business Goals
          </h3>
          <Tooltip content="Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound">
            <FiInfo className="w-5 h-5 text-[#94A3B8]" />
          </Tooltip>
        </div>
        
        <div className="space-y-4">
          <FormField
            label="What do you want to achieve in the next 6-12 months?"
            required
            error={errors['businessGoals.shortTerm']?.[0]}
            helper="Focus on specific, measurable goals for your launch phase"
          >
            <textarea
              value={data.businessGoals.shortTerm}
              onChange={(e) => onChange({ 
                businessGoals: { ...data.businessGoals, shortTerm: e.target.value }
              })}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="e.g., Launch MVP and acquire first 100 users within 3 months"
            />
          </FormField>

          <FormField
            label="What are your goals for the next 1-2 years?"
            required
            error={errors['businessGoals.midTerm']?.[0]}
            helper="Consider revenue targets, user growth, and service expansion"
          >
            <textarea
              value={data.businessGoals.midTerm}
              onChange={(e) => onChange({
                businessGoals: { ...data.businessGoals, midTerm: e.target.value }
              })}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="e.g., Reach $5k MRR and expand service offerings within 12 months"
            />
          </FormField>

          <FormField
            label="What's your long-term vision (2-3 years)?"
            required
            error={errors['businessGoals.longTerm']?.[0]}
            helper="Think about your ideal business scale and impact"
          >
            <textarea
              value={data.businessGoals.longTerm}
              onChange={(e) => onChange({
                businessGoals: { ...data.businessGoals, longTerm: e.target.value }
              })}
              className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
              placeholder="e.g., Build a community of 10,000+ entrepreneurs and establish industry partnerships"
            />
          </FormField>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div className="bg-[#1E293B] rounded-lg p-6 space-y-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-[#E2E8F0]">
            Quick SWOT Analysis
          </h3>
          <Tooltip content="A SWOT analysis helps you understand your competitive position and plan strategically">
            <FiInfo className="w-5 h-5 text-[#94A3B8]" />
          </Tooltip>
        </div>
        
        <p className="text-[#94A3B8]">
          Understanding your strengths, weaknesses, opportunities, and threats helps you
          make better strategic decisions and choose the right tools for your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Strengths"
            helper="What unique advantages do you have?"
          >
            <ArrayInput
            label='Strengths'
              values={data.swot?.strengths || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, strengths: values }
              })}
              placeholder="e.g., Industry expertise"
            />
          </FormField>

          <FormField
            label="Weaknesses"
            helper="What could you improve?"
          >
            <ArrayInput
            label='Weaknesses'
              values={data.swot?.weaknesses || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, weaknesses: values }
              })}
              placeholder="e.g., Limited technical skills"
            />
          </FormField>

          <FormField
            label="Opportunities"
            helper="What external factors could you leverage?"
          >
            <ArrayInput
            label='Opportunities'
              values={data.swot?.opportunities || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, opportunities: values }
              })}
              placeholder="e.g., Growing market demand"
            />
          </FormField>

          <FormField
            label="Threats"
            helper="What external challenges should you prepare for?"
          >
            <ArrayInput
            label='Threats'
              values={data.swot?.threats || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, threats: values }
              })}
              placeholder="e.g., Competitive market"
            />
          </FormField>
        </div>
      </div>

      {/* Example Section */}
      <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium text-[#E2E8F0]">
          Completed Example
        </h3>
        <p className="text-[#94A3B8] mb-4">
          Here's an example of a completed Vision & Goals section for reference:
        </p>
        <div className="space-y-4 text-[#94A3B8]">
          <div>
            <strong className="text-[#E2E8F0]">Business Name:</strong>
            <p>{VisionExample.businessName}</p>
          </div>
          <div>
            <strong className="text-[#E2E8F0]">Tagline:</strong>
            <p>{VisionExample.tagline}</p>
          </div>
          <div>
            <strong className="text-[#E2E8F0]">Mission Statement:</strong>
            <p>{VisionExample.missionStatement}</p>
          </div>
          <div>
            <strong className="text-[#E2E8F0]">Core Values:</strong>
            <p>{VisionExample.coreValues.join(", ")}</p>
          </div>
          <div>
            <strong className="text-[#E2E8F0]">Short-term Goal:</strong>
            <p>{VisionExample.businessGoals.shortTerm}</p>
          </div>
          <div>
            <strong className="text-[#E2E8F0]">Mid-term Goal:</strong>
            <p>{VisionExample.businessGoals.midTerm}</p>
          </div>
          <div>
            <strong className="text-[#E2E8F0]">Long-term Goal:</strong>
            <p>{VisionExample.businessGoals.longTerm}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
