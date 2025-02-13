import { WizardData } from '@/types/wizard';

export function buildFinalPrompt(_data: WizardData): string {
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
