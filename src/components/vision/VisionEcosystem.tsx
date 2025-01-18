import React from 'react'
import { FiArrowRight, FiInfo } from 'react-icons/fi'
import FormField, { ArrayInput } from '../common/FormField'
import Tooltip from '../common/Tooltip'
import { tooltips, type Worksheet } from '@/utils/pillar1Validation'

interface VisionEcosystemProps {
  data: {
    worksheet: Worksheet
  }
  onChange: (data: { worksheet: Worksheet }) => void
  errors: Record<string, any>
}

interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-[#5865F2] pl-4 my-6 italic text-[#A0AEC0]">
    {children}
  </blockquote>
)

const ExampleBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#2D3748] rounded-lg p-6 my-4 border border-[#4A5568]">
    <h4 className="text-[#E2E8F0] font-medium mb-3">{title}</h4>
    <div className="text-[#A0AEC0]">{children}</div>
  </div>
)

const Section = ({ title, subtitle, children }: SectionProps) => (
  <div className="bg-[#1E293B] rounded-lg p-6 space-y-4 my-6">
    <h3 className="text-xl font-semibold text-[#E2E8F0]">{title}</h3>
    {subtitle && <p className="text-[#94A3B8] text-sm">{subtitle}</p>}
    {children}
  </div>
)

export default function VisionEcosystem({ data, onChange, errors }: VisionEcosystemProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Section 
        title="Your Vision & Goals Foundation" 
        subtitle="Welcome to the first step in building your digital business ecosystem"
      >
        <div className="prose prose-invert max-w-none">
          <p>
            The business landscape is undergoing a fundamental shift. As social media evolves and 
            traditional marketing loses its edge, people have grown increasingly skeptical of who 
            they do business with. Years of aggressive sales tactics and manipulative marketing have 
            created a world where trust is not just important—it's everything.
          </p>
          
          <Quote>
            "In this new reality, having a large following means very little if your audience doesn't 
            trust you or is not interested in what you sell."
          </Quote>
          
          <p>
            That's why we start with Vision & Goals. Your vision isn't just a statement—it's the 
            foundation that will guide every decision you make, from choosing tools to crafting your 
            content strategy. When your vision is clear and authentic, it naturally attracts the right 
            audience and builds the trust essential for long-term success.
          </p>
        </div>
      </Section>

      {/* The Value of Clarity */}
      <Section title="The Value of Clarity">
        <div className="prose prose-invert max-w-none">
          <p>
            In today's digital landscape, clarity is your competitive advantage. When you're crystal 
            clear about who you are and where you're going, you build authentic connections with your 
            audience—even before they become customers.
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

      {/* Business Identity */}
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

            <ExampleBox title="Example Business Identity">
              <div className="space-y-2">
                <p><strong>Name:</strong> "No-Code Solutions"</p>
                <p><strong>Tagline:</strong> "Empowering Entrepreneurs to Launch Without Coding"</p>
                <p className="text-sm mt-4">
                  Notice how the name clearly states what the business does, while the tagline 
                  communicates both the value proposition (launch without coding) and target 
                  audience (entrepreneurs).
                </p>
              </div>
            </ExampleBox>

            <FormField
              label="What name captures your business essence?"
              required
              error={errors?.worksheet?.businessName?.[0]}
            >
              <div className="relative">
                <input
                  type="text"
                  value={data.worksheet.businessName}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      businessName: e.target.value
                    }
                  })}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                  placeholder="Your Business Name"
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.businessName} />
                </div>
              </div>
            </FormField>

            <FormField
              label="What's your compelling tagline?"
              required
              error={errors?.worksheet?.tagline?.[0]}
            >
              <div className="relative">
                <input
                  type="text"
                  value={data.worksheet.tagline}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      tagline: e.target.value
                    }
                  })}
                  className="w-full bg-[#2D3748] text-[#E2E8F0] rounded-md px-3 py-2"
                  placeholder="Your Tagline"
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.tagline} />
                </div>
              </div>
            </FormField>

            <FormField
              label="What's your mission statement?"
              required
              error={errors?.worksheet?.missionStatement?.[0]}
              helper="Use the formula above to craft a clear, impactful mission statement"
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.missionStatement}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      missionStatement: e.target.value
                    }
                  })}
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                  placeholder="We exist to... for... so they can..."
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.missionStatement} />
                </div>
              </div>
            </FormField>

            <FormField
              label="What are your core values?"
              required
              error={errors?.worksheet?.coreValues?.[0]}
              helper="Add 3-5 values that define your business culture and principles"
            >
              <ArrayInput
                label="Core Values"
                values={data.worksheet.coreValues}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    coreValues: values
                  }
                })}
                placeholder="Add a core value..."
              />
            </FormField>
          </div>

          {/* Mission Statement */}
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none mb-6">
              <h4 className="text-[#E2E8F0]">Crafting Your Mission Statement</h4>
              <p>
                Your mission statement is the guiding light for all your business decisions. When done 
                right, it becomes the compass that guides your content, decisions, and brand positioning.
              </p>
            </div>

            <ExampleBox title="Mission Statement Formula">
              <div className="space-y-4">
                <p><strong>Template:</strong></p>
                <p>"We exist to [action] for [audience] so they can [transformation]"</p>
                <p><strong>Example:</strong></p>
                <p>
                  "We exist to empower non-technical entrepreneurs with no-code tools so they can 
                  transform their ideas into thriving digital businesses."
                </p>
              </div>
            </ExampleBox>

            <FormField
              label="What's your mission statement?"
              required
              error={errors?.worksheet?.missionStatement?.[0]}
              helper="Use the formula above to craft a clear, impactful mission statement"
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.missionStatement}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      missionStatement: e.target.value
                    }
                  })}
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                  placeholder="We exist to... for... so they can..."
                />
              </div>
            </FormField>

            <FormField
              label="What are your core values?"
              required
              error={errors?.worksheet?.coreValues?.[0]}
              helper="Add 3-5 values that define your business culture and principles"
            >
              <ArrayInput
                value={data.worksheet.coreValues}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    coreValues: values
                  }
                })}
                placeholder="Add a core value..."
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

            <ExampleBox title="Example Core Values">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Innovation:</strong> Embracing new technologies and approaches</li>
                <li><strong>Accessibility:</strong> Making technology available to everyone</li>
                <li><strong>Authenticity:</strong> Being genuine in all interactions</li>
                <li><strong>Empowerment:</strong> Enabling others to achieve their goals</li>
              </ul>
            </ExampleBox>

            <FormField
              label="What are your core values?"
              required
              error={errors?.worksheet?.coreValues?.[0]}
              helper="Add 3-5 values that define your business culture and principles"
            >
              <ArrayInput
                value={data.worksheet.coreValues}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    coreValues: values
                  }
                })}
                placeholder="Add a core value..."
              />
            </FormField>
          </div>
        </div>
      </Section>

      {/* Target Audience */}
      <Section 
        title="Identify Your Target Audience"
        subtitle="Understanding who you serve is crucial for crafting your message and offerings"
      >
        <div className="space-y-6">
          <div className="bg-[#2D3748] rounded-lg p-6">
            <h4 className="text-[#E2E8F0] font-medium mb-4">Primary Customer Profile</h4>
            <FormField
              label="Who are they?"
              error={errors?.worksheet?.targetAudience?.primaryProfile?.[0]}
              required
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.targetAudience.primaryProfile}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      targetAudience: {
                        ...data.worksheet.targetAudience,
                        primaryProfile: e.target.value
                      }
                    }
                  })}
                  placeholder="They are ___ (age, location, profession). They struggle with ___ (pain points). They desire ___ (goals/outcomes)."
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.targetAudience.primaryProfile} />
                </div>
              </div>
            </FormField>
            <p className="text-[#94A3B8] text-sm mt-4">
              Consider your ICP from The Ecosystem (non-technical entrepreneurs, for example).
            </p>
          </div>

          <div className="bg-[#2D3748] rounded-lg p-6">
            <ArrayInput
              label="Secondary Audiences"
              values={data.worksheet.targetAudience.secondaryAudiences}
              onChange={(values) => onChange({
                ...data,
                worksheet: {
                  ...data.worksheet,
                  targetAudience: {
                    ...data.worksheet.targetAudience,
                    secondaryAudiences: values
                  }
                }
              })}
              error={errors?.worksheet?.targetAudience?.secondaryAudiences?.[0]}
              tooltip={tooltips.worksheet.targetAudience.secondaryAudiences}
              placeholder="Add another audience segment..."
            />
          </div>

          <div className="bg-[#2D3748] rounded-lg p-6">
            <ArrayInput
              label="Pain Points"
              values={data.worksheet.targetAudience.painPoints}
              onChange={(values) => onChange({
                ...data,
                worksheet: {
                  ...data.worksheet,
                  targetAudience: {
                    ...data.worksheet.targetAudience,
                    painPoints: values
                  }
                }
              })}
              error={errors?.worksheet?.targetAudience?.painPoints?.[0]}
              tooltip={tooltips.worksheet.targetAudience.painPoints}
              placeholder="Add a pain point..."
            />
            <p className="text-[#94A3B8] text-sm mt-4">
              Think about how your "Conflict → Internal Pursuit → Action → Result → Content" cycle intersects with these pain points.
            </p>
          </div>
        </div>
      </Section>

      {/* Business Goals */}
      <Section title="Setting Your Goals">
        <div className="space-y-8">
          <div className="prose prose-invert max-w-none">
            <p>
              Clear goals are essential for turning your vision into reality. Let's break down your goals into manageable timeframes:
            </p>
          </div>
          
          <div className="space-y-6">
            <FormField
              label="What are your short-term goals? (Next 6-12 months)"
              required
              error={errors?.worksheet?.businessGoals?.shortTerm?.[0]}
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.businessGoals.shortTerm}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      businessGoals: {
                        ...data.worksheet.businessGoals,
                        shortTerm: e.target.value
                      }
                    }
                  })}
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                  placeholder="What specific milestones do you want to achieve in the next 6-12 months?"
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.businessGoals.shortTerm} />
                </div>
              </div>
            </FormField>

            <FormField
              label="What are your mid-term goals? (1-2 years)"
              required
              error={errors?.worksheet?.businessGoals?.midTerm?.[0]}
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.businessGoals.midTerm}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      businessGoals: {
                        ...data.worksheet.businessGoals,
                        midTerm: e.target.value
                      }
                    }
                  })}
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                  placeholder="How do you want your business to grow in the next 1-2 years?"
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.businessGoals.midTerm} />
                </div>
              </div>
            </FormField>

            <FormField
              label="What's your long-term vision? (2-3 years)"
              required
              error={errors?.worksheet?.businessGoals?.longTerm?.[0]}
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.businessGoals.longTerm}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      businessGoals: {
                        ...data.worksheet.businessGoals,
                        longTerm: e.target.value
                      }
                    }
                  })}
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                  placeholder="What's the ultimate vision for your business in 2-3 years?"
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.businessGoals.longTerm} />
                </div>
              </div>
            </FormField>
          </div>
        </div>
      </Section>

      {/* SWOT Analysis */}
      <Section title="SWOT Analysis" subtitle="Analyze your Strengths, Weaknesses, Opportunities, and Threats">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Strengths"
                values={data.worksheet.swot.strengths}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    swot: {
                      ...data.worksheet.swot,
                      strengths: values
                    }
                  }
                })}
                error={errors?.worksheet?.swot?.strengths?.[0]}
                placeholder="Add a strength..."
              />
            </div>

            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Weaknesses"
                values={data.worksheet.swot.weaknesses}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    swot: {
                      ...data.worksheet.swot,
                      weaknesses: values
                    }
                  }
                })}
                error={errors?.worksheet?.swot?.weaknesses?.[0]}
                placeholder="Add a weakness..."
              />
            </div>

            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Opportunities"
                values={data.worksheet.swot.opportunities}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    swot: {
                      ...data.worksheet.swot,
                      opportunities: values
                    }
                  }
                })}
                error={errors?.worksheet?.swot?.opportunities?.[0]}
                placeholder="Add an opportunity..."
              />
            </div>

            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Threats"
                values={data.worksheet.swot.threats}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    swot: {
                      ...data.worksheet.swot,
                      threats: values
                    }
                  }
                })}
                error={errors?.worksheet?.swot?.threats?.[0]}
                placeholder="Add a threat..."
              />
            </div>
          </div>
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
            With this foundation in place, you're ready to move on to defining your target audience 
            and creating your website wireframe. These next steps will build directly on the vision 
            and goals you've just established.
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
