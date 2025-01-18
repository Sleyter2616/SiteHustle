import React from 'react'
import { FiArrowRight, FiInfo } from 'react-icons/fi'
import FormField, { ArrayInput } from '../common/FormField'
import Tooltip from '../common/Tooltip'

interface VisionNarrativeProps {
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

const ExampleBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#2D3748] rounded-lg p-4 my-4 border border-[#4A5568]">
    <div className="text-[#A0AEC0] italic">{children}</div>
  </div>
)

const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-[#5865F2] pl-4 my-4 italic text-[#A0AEC0]">
    {children}
  </blockquote>
)

const Section = ({ 
  title, 
  subtitle,
  children 
}: { 
  title: string
  subtitle?: string
  children: React.ReactNode 
}) => (
  <div className="bg-[#1E293B] rounded-lg p-6 space-y-4 my-6">
    <h3 className="text-xl font-semibold text-[#E2E8F0]">{title}</h3>
    {subtitle && <p className="text-[#94A3B8] text-sm">{subtitle}</p>}
    {children}
  </div>
)

export default function VisionNarrative({ data, onChange, errors }: VisionNarrativeProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Section 
        title="Your Vision & Goals Foundation" 
        subtitle="The cornerstone of your digital business journey"
      >
        <div className="prose prose-invert max-w-none">
          <p>
            In today's digital landscape, success isn't just about having the right tools or 
            following trends—it's about building something meaningful and authentic that resonates 
            with your audience.
          </p>
          
          <Quote>
            "Vision without action is merely a dream. Action without vision just passes the time. 
            Vision with action can change the world." - Joel A. Barker
          </Quote>
          
          <p>
            Your vision and goals form the foundation of your digital presence. They're not just 
            words on paper—they're the compass that will guide every decision you make, from choosing 
            the right tools to crafting your content strategy.
          </p>
        </div>
      </Section>

      {/* The Value of Clarity */}
      <Section title="The Value of Clarity">
        <div className="prose prose-invert max-w-none">
          <p>
            In an era of AI-generated content and digital noise, clarity stands out. When you're 
            crystal clear about who you are and where you're going, you build authentic connections 
            with your audience—even before they become customers.
          </p>
          
          <div className="bg-[#2D3748] rounded-lg p-4 my-4">
            <h4 className="text-[#E2E8F0] font-medium mb-2">Why Clarity Matters:</h4>
            <ul className="list-disc list-inside text-[#A0AEC0] space-y-2">
              <li>Builds trust in an increasingly skeptical market</li>
              <li>Guides consistent decision-making across your business</li>
              <li>Helps you stay focused when faced with endless possibilities</li>
              <li>Makes it easier to communicate your value to potential customers</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Business Identity Section */}
      <Section title="Defining Your Identity">
        <div className="space-y-8">
          {/* Business Name & Tagline */}
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none mb-6">
              <p>
                Your business name and tagline are often the first impression people have of your brand. 
                They should be memorable, meaningful, and aligned with your vision.
              </p>
            </div>

            <ExampleBox>
              <strong>Example:</strong><br />
              Name: "No-Code Solutions"<br />
              Tagline: "Empowering Entrepreneurs to Launch Without Coding"<br />
              <small>
                Notice how the name is clear and descriptive, while the tagline communicates both the 
                value proposition and target audience.
              </small>
            </ExampleBox>

            <FormField
              label="What name captures your business essence?"
              required
              error={errors.businessName?.[0]}
              helper="Choose a name that's memorable and reflects your brand's personality"
            >
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => onChange({ businessName: e.target.value })}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                placeholder="Your Business Name"
              />
            </FormField>

            <FormField
              label="What's your compelling tagline?"
              required
              error={errors.tagline?.[0]}
              helper="Summarize your value proposition in one short phrase"
            >
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => onChange({ tagline: e.target.value })}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                placeholder="Your Tagline"
              />
            </FormField>
          </div>

          {/* Mission Statement */}
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none mb-6">
              <h4 className="text-[#E2E8F0]">Crafting Your Mission Statement</h4>
              <p>
                Your mission statement is the guiding light for all your business decisions. It should 
                clearly communicate what you do, who you serve, and the transformation you provide.
              </p>
            </div>

            <ExampleBox>
              <strong>Mission Statement Formula:</strong><br />
              "We exist to [action] for [audience] so they can [transformation]"<br /><br />
              <strong>Example:</strong><br />
              "We exist to empower non-technical entrepreneurs with no-code tools so they can transform 
              their ideas into thriving digital businesses."
            </ExampleBox>

            <FormField
              label="What's your mission statement?"
              required
              error={errors.missionStatement?.[0]}
              helper="Use the formula above to craft a clear, impactful mission statement"
            >
              <textarea
                value={data.missionStatement}
                onChange={(e) => onChange({ missionStatement: e.target.value })}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="We exist to... for... so they can..."
              />
            </FormField>
          </div>

          {/* Core Values */}
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none mb-6">
              <h4 className="text-[#E2E8F0]">Establishing Core Values</h4>
              <p>
                Core values are the principles that guide your business behavior and decision-making. 
                They should resonate with both your team and your audience.
              </p>
            </div>

            <ExampleBox>
              <strong>Example Core Values:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>Innovation: Embracing new technologies and approaches</li>
                <li>Accessibility: Making technology available to everyone</li>
                <li>Authenticity: Being genuine in all interactions</li>
                <li>Empowerment: Enabling others to achieve their goals</li>
              </ul>
            </ExampleBox>

            <FormField
              label="What are your core values?"
              required
              error={errors.coreValues?.[0]}
              helper="Add 3-5 values that define your business culture and principles"
            >
              <ArrayInput
                label="Core Values"
                values={data.coreValues}
                onChange={(values) => onChange({ coreValues: values })}
                placeholder="Add a core value..."
              />
            </FormField>
          </div>
        </div>
      </Section>

      {/* Business Goals */}
      <Section title="Setting Your Goals">
        <div className="space-y-8">
          <div className="prose prose-invert max-w-none">
            <p>
              Goals turn your vision into actionable steps. They should be SMART: Specific, 
              Measurable, Achievable, Relevant, and Time-bound.
            </p>
          </div>

          <ExampleBox>
            <strong>Example Goals:</strong>
            <ul className="list-disc list-inside mt-2">
              <li><strong>Short-term:</strong> Launch MVP and acquire first 100 users within 3 months</li>
              <li><strong>Mid-term:</strong> Reach $5k MRR and expand service offerings within 12 months</li>
              <li><strong>Long-term:</strong> Build a community of 10,000+ entrepreneurs by year 3</li>
            </ul>
          </ExampleBox>

          <div className="space-y-6">
            <FormField
              label="What are your short-term goals? (Next 6-12 months)"
              required
              error={errors['businessGoals.shortTerm']?.[0]}
              helper="Focus on specific, achievable milestones for your launch phase"
            >
              <textarea
                value={data.businessGoals.shortTerm}
                onChange={(e) => onChange({
                  businessGoals: { ...data.businessGoals, shortTerm: e.target.value }
                })}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="What specific milestones do you want to achieve in the next 6-12 months?"
              />
            </FormField>

            <FormField
              label="What are your mid-term goals? (1-2 years)"
              required
              error={errors['businessGoals.midTerm']?.[0]}
              helper="Think about growth metrics and expanding your impact"
            >
              <textarea
                value={data.businessGoals.midTerm}
                onChange={(e) => onChange({
                  businessGoals: { ...data.businessGoals, midTerm: e.target.value }
                })}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="How do you want your business to grow in the next 1-2 years?"
              />
            </FormField>

            <FormField
              label="What's your long-term vision? (2-3 years)"
              required
              error={errors['businessGoals.longTerm']?.[0]}
              helper="Envision your ideal business scale and impact"
            >
              <textarea
                value={data.businessGoals.longTerm}
                onChange={(e) => onChange({
                  businessGoals: { ...data.businessGoals, longTerm: e.target.value }
                })}
                className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px]"
                placeholder="What's the ultimate vision for your business in 2-3 years?"
              />
            </FormField>
          </div>
        </div>
      </Section>

      {/* SWOT Analysis */}
      <Section 
        title="Quick SWOT Analysis"
        subtitle="Before finalizing your goals, let's analyze your position"
      >
        <div className="prose prose-invert max-w-none mb-6">
          <p>
            A SWOT analysis helps ensure your vision and goals are grounded in reality. It's a 
            powerful tool for identifying where you stand and where you can go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Strengths"
            helper="What unique advantages do you have?"
          >
            <ArrayInput
            label="Strengths"
              values={data.swot?.strengths || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, strengths: values }
              })}
              placeholder="Add a strength..."
            />
          </FormField>

          <FormField
            label="Weaknesses"
            helper="What could you improve?"
          >
            <ArrayInput
              label="Weaknesses"
              values={data.swot?.weaknesses || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, weaknesses: values }
              })}
              placeholder="Add a weakness..."
            />
          </FormField>

          <FormField
            label="Opportunities"
            helper="What external factors could you leverage?"
          >
            <ArrayInput
              label="Opportunities"
              values={data.swot?.opportunities || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, opportunities: values }
              })}
              placeholder="Add an opportunity..."
            />
          </FormField>

          <FormField
            label="Threats"
            helper="What external challenges should you prepare for?"
          >
            <ArrayInput
              label="Threats"
              values={data.swot?.threats || []}
              onChange={(values) => onChange({
                swot: { ...data.swot, threats: values }
              })}
              placeholder="Add a threat..."
            />
          </FormField>
        </div>
      </Section>

      {/* Next Steps */}
      <Section title="Where to Next?">
        <div className="prose prose-invert max-w-none">
          <p>
            Congratulations! You've now laid a solid foundation for your business by defining your:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#A0AEC0]">
            <li>Clear business identity and mission</li>
            <li>Core values that will guide your decisions</li>
            <li>SMART goals for different time horizons</li>
            <li>Strategic position through SWOT analysis</li>
          </ul>
          <p className="mt-4">
            Next, we'll help you define your target audience persona and create a wireframe for your 
            website. These next steps will build directly on the foundation you've just created.
          </p>
          <div className="flex items-center gap-2 text-[#5865F2] mt-4">
            <FiArrowRight className="w-5 h-5" />
            <span>Continue to "Target Audience Persona"</span>
          </div>
        </div>
      </Section>
    </div>
  )
}
