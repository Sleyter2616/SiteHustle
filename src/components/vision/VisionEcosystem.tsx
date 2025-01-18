import React, { useState } from 'react'
import { FiArrowRight, FiInfo, FiDownload } from 'react-icons/fi'
import FormField, { ArrayInput } from '../common/FormField'
import Tooltip from '../common/Tooltip'
import { tooltips, type Worksheet } from '@/utils/pillar1Validation'
import { generateVisionWorksheetPDF } from '../../utils/pdfUtils';

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
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    try {
      await generateVisionWorksheetPDF(data);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setGeneratingPDF(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
                required
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
                label="Core Values"
                values={data.worksheet.coreValues}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    coreValues: values
                  }
                })}
                required
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
                label="Core Values"
                values={data.worksheet.coreValues}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    coreValues: values
                  }
                })}
                required
                placeholder="Add a core value..."
              />
            </FormField>
          </div>
        </div>
      </Section>

      {/* Identify Your Target Audience (ICP) */}
      <Section title="Identify Your Target Audience (ICP)" subtitle="Understanding your Ideal Customer Profile helps you create content and products that perfectly match their needs.">
        <div className="space-y-8">
          <div className="bg-[#2D3748] rounded-lg p-6">
            <p className="text-[#E2E8F0] mb-6">
              Your Ideal Customer Profile (ICP) is more than just demographics—it's a deep understanding of who your perfect customer is, what they struggle with, and how you can help them succeed. Taking time to define your ICP will help you:
            </p>
            <ul className="list-disc list-inside text-[#E2E8F0] space-y-2 mb-6">
              <li>Create content that resonates with your target audience</li>
              <li>Focus your marketing efforts on the right channels</li>
              <li>Develop products and services that solve real problems</li>
              <li>Build stronger connections with your audience</li>
            </ul>
          </div>

          {/* Primary Profile */}
          <FormField
            label="Who is your primary target audience?"
            required
            error={errors?.worksheet?.targetAudience?.primaryProfile}
            helper="Describe the specific group of people who will benefit most from your solution"
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
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                placeholder="Describe your ideal customer's demographics, challenges, and desires..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip text={tooltips.worksheet.targetAudience.primaryProfile} />
              </div>
            </div>
          </FormField>

          {/* Secondary Audiences */}
          <FormField
            label="Who are your secondary audiences?"
            error={errors?.worksheet?.targetAudience?.secondaryAudiences?.[0]}
            helper="List other groups who might benefit from your solution"
          >
            <ArrayInput
              label="Secondary Audiences"
              values={data.worksheet.targetAudience.secondaryAudiences || []}
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
              placeholder="Add another audience segment..."
            />
          </FormField>

          {/* Problem */}
          <FormField
            label="What's the main problem your ideal customer faces?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.problem}
            helper="Describe the core challenge that drives them to seek a solution"
          >
            <div className="relative">
              <textarea
                value={data.worksheet.targetAudience.idealCustomerProfile?.problem || ''}
                onChange={(e) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    targetAudience: {
                      ...data.worksheet.targetAudience,
                      idealCustomerProfile: {
                        ...data.worksheet.targetAudience.idealCustomerProfile,
                        problem: e.target.value
                      }
                    }
                  }
                })}
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                placeholder="Example: Non-technical entrepreneurs struggling to build and maintain their website..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip text={tooltips.worksheet.targetAudience.idealCustomerProfile.problem} />
              </div>
            </div>
          </FormField>

          {/* Pain Points */}
          <FormField
            label="What specific pain points do they experience?"
            required
            error={errors?.worksheet?.targetAudience?.painPoints?.[0]}
            helper="List the frustrations and challenges they face"
          >
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
              placeholder="Add a pain point..."
              required
            />
          </FormField>

          {/* Journey */}
          <FormField
            label="What transformation are they seeking?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.journey}
            helper="Describe the journey they want to take and their end goal"
          >
            <div className="relative">
              <textarea
                value={data.worksheet.targetAudience.idealCustomerProfile?.journey || ''}
                onChange={(e) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    targetAudience: {
                      ...data.worksheet.targetAudience,
                      idealCustomerProfile: {
                        ...data.worksheet.targetAudience.idealCustomerProfile,
                        journey: e.target.value
                      }
                    }
                  }
                })}
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                placeholder="Example: Want to go from struggling with technical details to having a professional, easy-to-maintain website..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip text={tooltips.worksheet.targetAudience.idealCustomerProfile.journey} />
              </div>
            </div>
          </FormField>

          {/* Desires */}
          <FormField
            label="What are their key desires?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.desires?.[0]}
            helper="List what they truly want to achieve"
          >
            <ArrayInput
              label="Desires"
              values={data.worksheet.targetAudience.idealCustomerProfile?.desires || []}
              onChange={(values) => onChange({
                ...data,
                worksheet: {
                  ...data.worksheet,
                  targetAudience: {
                    ...data.worksheet.targetAudience,
                    idealCustomerProfile: {
                      ...data.worksheet.targetAudience.idealCustomerProfile,
                      desires: values
                    }
                  }
                }
              })}
              placeholder="Add a desire..."
              required
            />
          </FormField>

          {/* Desired State */}
          <FormField
            label="What's their desired end state?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.desiredState}
            helper="Paint a picture of their ideal situation after using your solution"
          >
            <div className="relative">
              <textarea
                value={data.worksheet.targetAudience.idealCustomerProfile?.desiredState || ''}
                onChange={(e) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    targetAudience: {
                      ...data.worksheet.targetAudience,
                      idealCustomerProfile: {
                        ...data.worksheet.targetAudience.idealCustomerProfile,
                        desiredState: e.target.value
                      }
                    }
                  }
                })}
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                placeholder="Example: Having a professional website they can easily update without technical knowledge..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip text={tooltips.worksheet.targetAudience.idealCustomerProfile.desiredState} />
              </div>
            </div>
          </FormField>

          {/* Gap */}
          <FormField
            label="What's the gap between their current and desired state?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.gap}
            helper="Identify what's holding them back from achieving their goals"
          >
            <div className="relative">
              <textarea
                value={data.worksheet.targetAudience.idealCustomerProfile?.gap || ''}
                onChange={(e) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    targetAudience: {
                      ...data.worksheet.targetAudience,
                      idealCustomerProfile: {
                        ...data.worksheet.targetAudience.idealCustomerProfile,
                        gap: e.target.value
                      }
                    }
                  }
                })}
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                placeholder="Example: Lack of technical skills and time to learn complex web development..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip text={tooltips.worksheet.targetAudience.idealCustomerProfile.gap} />
              </div>
            </div>
          </FormField>

          {/* Unique Selling Point */}
          <FormField
            label="What's your unique selling point?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.uniqueSellingPoint}
            helper="How does your solution uniquely address their needs?"
          >
            <div className="relative">
              <textarea
                value={data.worksheet.targetAudience.idealCustomerProfile?.uniqueSellingPoint || ''}
                onChange={(e) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    targetAudience: {
                      ...data.worksheet.targetAudience,
                      idealCustomerProfile: {
                        ...data.worksheet.targetAudience.idealCustomerProfile,
                        uniqueSellingPoint: e.target.value
                      }
                    }
                  }
                })}
                className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                placeholder="Example: Our no-code website builder specifically designed for non-technical entrepreneurs..."
              />
              <div className="absolute right-2 top-2">
                <Tooltip text={tooltips.worksheet.targetAudience.idealCustomerProfile.uniqueSellingPoint} />
              </div>
            </div>
          </FormField>

          {/* Benefits */}
          <FormField
            label="What are the key benefits of your solution?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.benefits?.[0]}
            helper="List the specific benefits they'll gain"
          >
            <ArrayInput
              label="Benefits"
              values={data.worksheet.targetAudience.idealCustomerProfile?.benefits || []}
              onChange={(values) => onChange({
                ...data,
                worksheet: {
                  ...data.worksheet,
                  targetAudience: {
                    ...data.worksheet.targetAudience,
                    idealCustomerProfile: {
                      ...data.worksheet.targetAudience.idealCustomerProfile,
                      benefits: values
                    }
                  }
                }
              })}
              placeholder="Add a benefit..."
              required
            />
          </FormField>

          {/* Objections */}
          <FormField
            label="What objections might they have?"
            required
            error={errors?.worksheet?.targetAudience?.idealCustomerProfile?.objections?.[0]}
            helper="List potential concerns or hesitations"
          >
            <ArrayInput
              label="Objections"
              values={data.worksheet.targetAudience.idealCustomerProfile?.objections || []}
              onChange={(values) => onChange({
                ...data,
                worksheet: {
                  ...data.worksheet,
                  targetAudience: {
                    ...data.worksheet.targetAudience,
                    idealCustomerProfile: {
                      ...data.worksheet.targetAudience.idealCustomerProfile,
                      objections: values
                    }
                  }
                }
              })}
              placeholder="Add an objection..."
              required
            />
          </FormField>
        </div>
      </Section>

      {/* Customer Journey */}
      <Section title="Map Out Your Ideal Customer Journey" subtitle="Understanding how customers discover, evaluate, and engage with your brand">
        <div className="space-y-8">
          {/* Awareness Stage */}
          <div className="bg-[#2D3748] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">A. Awareness</h3>
            <p className="text-[#E2E8F0] mb-6">
              How do new prospects first find out about you? Consider your signature style and preferred platforms.
            </p>
            <FormField
              label="Primary Awareness Channels"
              required
              error={errors?.worksheet?.customerJourney?.awarenessChannels?.[0]}
              helper="List 2-3 main channels where your ideal customers will discover you"
            >
              <ArrayInput
                label="Awareness Channels"
                values={data.worksheet.customerJourney?.awareness || []}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    customerJourney: {
                      ...data.worksheet.customerJourney,
                      awareness: values
                    }
                  }
                })}
                placeholder="Add a channel (e.g., YouTube, Twitter, LinkedIn)..."
                required
              />
            </FormField>
          </div>

          {/* Consideration Stage */}
          <div className="bg-[#2D3748] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">B. Consideration</h3>
            <p className="text-[#E2E8F0] mb-6">
              What trust-building elements do prospects need to see to be convinced you're the right solution?
            </p>
            <FormField
              label="Trust-Building Elements"
              required
              error={errors?.worksheet?.customerJourney?.considerationElements?.[0]}
              helper="List 2-3 elements that build credibility and trust"
            >
              <ArrayInput
                label="Trust Elements"
                values={data.worksheet.customerJourney?.consideration || []}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    customerJourney: {
                      ...data.worksheet.customerJourney,
                      consideration: values
                    }
                  }
                })}
                placeholder="Add an element (e.g., case studies, tutorials, transformation stories)..."
                required
              />
            </FormField>
          </div>

          {/* Decision Stage */}
          <div className="bg-[#2D3748] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">C. Decision/Purchase</h3>
            <p className="text-[#E2E8F0] mb-6">
              How do you want customers to complete their purchase or sign up for your services?
            </p>
            <FormField
              label="Purchase/Signup Process"
              required
              error={errors?.worksheet?.customerJourney?.decisionProcess}
              helper="Detail your ideal purchase or signup process"
            >
              <div className="relative">
                <textarea
                  value={data.worksheet.customerJourney?.decision || ''}
                  onChange={(e) => onChange({
                    ...data,
                    worksheet: {
                      ...data.worksheet,
                      customerJourney: {
                        ...data.worksheet.customerJourney,
                        decision: e.target.value
                      }
                    }
                  })}
                  className="w-full bg-[#1A202C] text-[#E2E8F0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px]"
                  placeholder="Example: Simple checkout page with clear pricing tiers and FAQ section..."
                />
                <div className="absolute right-2 top-2">
                  <Tooltip text={tooltips.worksheet.customerJourney.decisionProcess} />
                </div>
              </div>
            </FormField>
          </div>

          {/* Retention Stage */}
          <div className="bg-[#2D3748] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">D. Retention & Referral</h3>
            <p className="text-[#E2E8F0] mb-6">
              How will you keep customers engaged and encourage them to refer others?
            </p>
            <FormField
              label="Engagement Strategies"
              required
              error={errors?.worksheet?.customerJourney?.retentionStrategies?.[0]}
              helper="List your strategies for ongoing engagement and referrals"
            >
              <ArrayInput
                label="Retention Strategies"
                values={data.worksheet.customerJourney?.retention || []}
                onChange={(values) => onChange({
                  ...data,
                  worksheet: {
                    ...data.worksheet,
                    customerJourney: {
                      ...data.worksheet.customerJourney,
                      retention: values
                    }
                  }
                })}
                placeholder="Add a strategy (e.g., monthly Q&A calls, exclusive community)..."
                required
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
                values={data.worksheet.swot?.strengths || []}
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
                placeholder="Add a strength..."
                required
              />
            </div>

            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Weaknesses"
                values={data.worksheet.swot?.weaknesses || []}
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
                placeholder="Add a weakness..."
                required
              />
            </div>

            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Opportunities"
                values={data.worksheet.swot?.opportunities || []}
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
                placeholder="Add an opportunity..."
                required
              />
            </div>

            <div className="bg-[#2D3748] rounded-lg p-6">
              <ArrayInput
                label="Threats"
                values={data.worksheet.swot?.threats || []}
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
                placeholder="Add a threat..."
                required
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Complete Worksheet Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleDownloadPDF}
          disabled={!data.worksheet.businessName || generatingPDF}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium
            transition-all duration-200
            ${!data.worksheet.businessName || generatingPDF
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer'
            }
          `}
        >
          {generatingPDF ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FiDownload className="w-5 h-5" />
              <span>Download Worksheet</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
