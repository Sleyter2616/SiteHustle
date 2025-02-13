import { WizardData } from '@/types/wizard';

export function buildFinalBusinessPlanPrompt(_data: WizardData): string {
  // Instead of aggregating user data, return a generic example prompt.
  const finalPrompt = `
Please generate a refined and comprehensive business plan based on the following example information:

Business Vision:
- Business Name: Example Corp
- Tagline: Innovating the Future
- Mission Statement: To lead with innovation and creativity.
- Vision Statement: To transform the industry through cutting-edge technology.
- Core Values: Innovation, Integrity, Excellence

Brand Identity:
Reflection:
  - Who I Am: A visionary leader with a passion for progress.
  - Who I Am Not: Not afraid to challenge the status quo.
  - Why Build Brand: To make a meaningful impact in the market.
Personality:
  - Communication Style: Clear, concise, and approachable.
  - Tone and Voice: Professional yet friendly.
  - Passionate Expression: Energetic and authentic.
  - Brand Personality: Bold, innovative, and trustworthy.
Story:
  - Pivotal Experience: Overcoming significant challenges to drive growth.
  - Defining Moment: A breakthrough that redefined our approach.
  - Audience Relevance: Connecting deeply with customer needs.
Differentiation:
  - Unique Approach: Combining technology with human insight.
  - Unique Resources: Leveraging cutting-edge tools and expert teams.
  - Competitive Perception: Positioned as a leader in innovation.

Execution Plan:
- 30-Day Goal: Launch MVP with core features.
- Weekly Milestones: Plan, develop, test, and iterate.
- Content Plan: Create engaging and informative content.
- Immediate Actions: Automate key workflows and streamline operations.

Please provide actionable recommendations and next steps based on this example information.
`;
  return finalPrompt;
}


export function buildToolAutomationFinalPrompt(data: WizardData): string {
  // Extract inputs from the respective sections.
  // If data is missing, default to 'Not specified' for clarity.
  const businessLogic = data.logic?.userInput || {};
  const lookAndFeel = data.lookFeel?.userInput || {};
  const automation = data.automation?.userInput || {};

  // Construct the final prompt using the provided data.
  // This prompt asks for a detailed action plan for tool and automation integration,
  // covering backend architecture, design, and specific automation recommendations.
  const prompt = `
Please generate a comprehensive action plan for implementing the following business strategy. Use the details provided below to recommend specific tools, automations, and technical integrations tailored to the user's requirements.

1. Business Logic Refinement:
- **Backend Architecture Requirements:** ${businessLogic.backendArchitecture || 'Not specified'}
- **API Integration Needs:** ${businessLogic.apiNeeds || 'Not specified'}
- **Scalability Considerations:** ${businessLogic.scalability || 'Not specified'}
- **Security Requirements:** ${businessLogic.security || 'Not specified'}
- **Additional Business Logic Notes:** ${businessLogic.additionalNotes || 'Not specified'}

2. Look & Feel and Customer Experience:
- **Desired Design Style:** ${lookAndFeel.designStyle || 'Not specified'}
- **Tone and Voice:** ${lookAndFeel.tone || 'Not specified'}
- **Key Design Elements:** ${lookAndFeel.designElements || 'Not specified'}
- **Competitor Analysis Insights:** ${lookAndFeel.competitorInsights || 'Not specified'}
- **Target Customer Experience:** ${lookAndFeel.customerExperience || 'Not specified'}

3. Tool & Automation Preferences:
- **Technical Expertise Level:** ${automation.techExpertise || 'Not specified'}
- **Selected Automation Preferences:** ${Array.isArray(automation.automationPreferences) ? automation.automationPreferences.join(', ') : 'Not specified'}
- **Additional Notes on Tools & Integrations:** ${automation.additionalNotes || 'Not specified'}

Based on the above details, please provide:
- A detailed, step-by-step implementation plan.
- Recommended tools and integrations that align with the user's technical expertise and business needs.
- Guidance on backend and frontend integration strategies.
- A roadmap for automating key business processes.

Ensure your recommendations are actionable and include any relevant insights or potential pitfalls.
  `;
  
  return prompt;
}