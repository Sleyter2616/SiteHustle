// src/mappings/pillar1Mapping.ts

export interface FieldMapping {
  label: string;
  tooltip: string;
  placeholder: string;
  minLength?: number;
  isArray?: boolean;
}

export const visionMapping: Record<string, FieldMapping> = {
  businessName: {
    label: 'What is your business name?',
    tooltip: 'Enter the official name of your business.',
    placeholder: 'e.g. Acme Corporation',
    minLength: 3,
  },
  tagline: {
    label: 'What is your tagline?',
    tooltip: 'A short, catchy phrase that represents your brand.',
    placeholder: 'e.g. Innovation for a better future',
    minLength: 5,
  },
  missionStatement: {
    label: 'What is your mission statement?',
    tooltip: 'Describe how you speak when you\'re most passionate. Your mission statement captures your core purpose.',
    placeholder: 'e.g. To innovate and lead in technology solutions...',
    minLength: 10,
  },
  visionStatement: {
    label: 'What is your vision statement?',
    tooltip: 'Describe your brand\'s overall personality and long-term aspirations.',
    placeholder: 'e.g. To transform the digital landscape...',
    minLength: 10,
  },
  coreValues: {
    label: 'What are your core values?',
    tooltip: 'List the guiding principles of your business.',
    placeholder: 'e.g. Integrity, Innovation, Customer-Centricity',
    minLength: 3,
    isArray: true,
  },
  'businessGoals.shortTerm': {
    label: 'What are your Short-Term Goals (6-12 Months)?',
    tooltip: 'Define specific goals achievable within the next year.',
    placeholder: 'e.g. Launch MVP, acquire first 100 customers...',
    minLength: 10,
  },
  'businessGoals.midTerm': {
    label: 'What are your Mid-Term Goals (1-2 Years)?',
    tooltip: 'Define goals for the next 1-2 years.',
    placeholder: 'e.g. Expand to new market, reach $X revenue...',
    minLength: 10,
  },
  'businessGoals.longTerm': {
    label: 'What are your Long-Term Goals (3-5 Years)?',
    tooltip: 'Define your long-term vision and aspirations.',
    placeholder: 'e.g. Become industry leader, IPO...',
    minLength: 10,
  },
  'businessGoals.websiteGoals': {
    label: 'What are your specific website goals?',
    tooltip: 'Define what you want to achieve with your website.',
    placeholder: 'e.g. Generate leads, showcase portfolio...',
    minLength: 10,
  },
  'businessGoals.successIndicators': {
    label: 'How will you measure success?',
    tooltip: 'Define specific metrics and KPIs.',
    placeholder: 'e.g. Monthly recurring revenue, customer satisfaction score...',
    minLength: 10,
  },
  'businessGoals.goalPriorities': {
    label: 'What are your top priorities?',
    tooltip: 'List your goals in order of importance.',
    placeholder: '1) X, 2) Y, 3) Z...',
    minLength: 10,
  },
  'businessGoals.actionPlan': {
    label: 'What is your action plan?',
    tooltip: 'Detail the steps to achieve your goals.',
    placeholder: 'List specific actions and timelines...',
    minLength: 20,
  },
  'businessGoals.challenges': {
    label: 'What challenges do you anticipate?',
    tooltip: 'List potential obstacles and solutions.',
    placeholder: 'Challenge 1: ... Solution: ...',
    minLength: 20,
  },
  'businessGoals.accountability': {
    label: 'How will you stay accountable?',
    tooltip: 'Define responsibility and check-in frequency.',
    placeholder: 'Who is responsible? How often will you review progress?',
    minLength: 10,
  },
  'customerJourney.awareness': {
    label: 'How will customers discover your business?',
    tooltip: 'List channels and methods for customer acquisition.',
    placeholder: 'e.g. Social media, SEO, referrals...',
    minLength: 10,
    isArray: true,
  },
  'customerJourney.consideration': {
    label: 'How will you capture and maintain their interest?',
    tooltip: 'Describe your engagement strategy.',
    placeholder: 'e.g. Content marketing, email newsletters...',
    minLength: 10,
    isArray: true,
  },
  'customerJourney.decision': {
    label: 'What will convince them to choose your business?',
    tooltip: 'Describe your conversion strategy.',
    placeholder: 'e.g. Unique value proposition, social proof...',
    minLength: 10,
  },
  'customerJourney.retention': {
    label: 'How will you maintain long-term relationships?',
    tooltip: 'Describe your customer retention strategy.',
    placeholder: 'e.g. Loyalty program, regular check-ins...',
    minLength: 10,
    isArray: true,
  },
  'targetAudience.idealCustomerProfile.problem': {
    label: 'What problem does your customer face?',
    tooltip: 'Describe the main challenge your customer needs to solve.',
    placeholder: 'e.g. Difficulty in managing time...',
    minLength: 10,
  },
  'targetAudience.idealCustomerProfile.journey': {
    label: 'What is their current situation?',
    tooltip: 'Describe their day-to-day experience with the problem.',
    placeholder: 'e.g. Currently using manual processes...',
    minLength: 20,
  },
  'targetAudience.idealCustomerProfile.desires': {
    label: 'What do they want to achieve?',
    tooltip: 'List their goals and aspirations.',
    placeholder: 'e.g. Save time, reduce stress...',
    minLength: 5,
    isArray: true,
  },
  'targetAudience.idealCustomerProfile.desiredState': {
    label: 'What is their ideal outcome?',
    tooltip: 'Describe what success looks like for them.',
    placeholder: 'e.g. Automated workflow, more free time...',
    minLength: 10,
  },
  'targetAudience.idealCustomerProfile.gap': {
    label: 'What\'s stopping them from reaching their goal?',
    tooltip: 'Identify obstacles and barriers.',
    placeholder: 'e.g. Lack of knowledge, limited budget...',
    minLength: 10,
  },
  'targetAudience.idealCustomerProfile.uniqueSellingPoint': {
    label: 'How do you uniquely solve their problem?',
    tooltip: 'Describe your unique solution.',
    placeholder: 'e.g. Our AI-powered approach...',
    minLength: 20,
  },
  'targetAudience.idealCustomerProfile.benefits': {
    label: 'What benefits do you provide?',
    tooltip: 'List the key benefits of your solution.',
    placeholder: 'e.g. 50% time savings, improved accuracy...',
    minLength: 5,
    isArray: true,
  },
  'targetAudience.idealCustomerProfile.objections': {
    label: 'What objections might they have?',
    tooltip: 'List potential concerns and how you address them.',
    placeholder: 'e.g. Price too high, complex implementation...',
    minLength: 5,
    isArray: true,
  }
};

export const brandingMapping: Record<string, FieldMapping> = {
  'reflection.whoIAm': {
    label: 'Who Am I, Really?',
    tooltip: 'Think about what makes you "you"—your values, quirks, life experiences.',
    placeholder: 'Consider your top values, skills, and personal philosophies...',
    minLength: 20,
  },
  'reflection.whoIAmNot': {
    label: 'Who Am I Not?',
    tooltip: 'Define what doesn\'t align with you to prevent confusion.',
    placeholder: 'Which mindsets, approaches, or behaviors feel inauthentic to you?',
    minLength: 20,
  },
  'reflection.whyBuildBrand': {
    label: 'Why Build This Brand?',
    tooltip: 'Pinpoint the core purpose behind your brand.',
    placeholder: 'Explain your motivation and the impact you want to make...',
    minLength: 20,
  },
  'personality.communicationStyle': {
    label: 'What\'s your preferred communication style with customers?',
    tooltip: 'Consider how formal or casual your interactions should be.',
    placeholder: 'Formal and polished, casual and friendly, or something else?',
    minLength: 10,
  },
  'personality.toneAndVoice': {
    label: 'How do you want your brand to sound?',
    tooltip: 'Consider the emotional response you want to evoke.',
    placeholder: 'e.g. Professional but approachable, Fun and energetic...',
    minLength: 10,
  },
  'personality.passionateExpression': {
    label: 'How do you speak when you\'re most passionate?',
    tooltip: 'Think about your natural style when energized.',
    placeholder: 'Describe your authentic communication style...',
    minLength: 10,
  },
  'personality.brandPersonality': {
    label: 'What personality traits define your brand?',
    tooltip: 'List 3-5 key personality traits that define your brand.',
    placeholder: 'e.g. Bold, Friendly, Innovative, Trustworthy...',
    minLength: 10,
  },
  'story.pivotalExperience': {
    label: 'What pivotal experience led you here?',
    tooltip: 'Share a specific event or realization that sparked your path.',
    placeholder: 'Describe a key moment that inspired your brand...',
    minLength: 20,
  },
  'story.definingMoment': {
    label: 'Which struggle or aha-moment defines your motivation?',
    tooltip: 'Share a challenge that shaped your perspective or approach.',
    placeholder: 'Describe a major challenge or realization...',
    minLength: 20,
  },
  'story.audienceRelevance': {
    label: 'Why should your audience care about your journey?',
    tooltip: 'Connect your story to your audience\'s needs and aspirations.',
    placeholder: 'Explain how your experience helps solve their problems...',
    minLength: 20,
  },
  'differentiation.uniqueApproach': {
    label: 'What\'s a common approach in your niche that you do better—or differently?',
    tooltip: 'Reflect on typical strategies in your field and pinpoint how your approach stands out.',
    placeholder: 'Explain how your methods diverge from the norm...',
    minLength: 20,
  },
  'differentiation.uniqueResources': {
    label: 'What unique resources or knowledge do you have?',
    tooltip: 'Consider intellectual property, specialized experience, or unique connections you bring.',
    placeholder: 'List any special tools, experiences, or insider connections...',
    minLength: 20,
  },
  'differentiation.competitivePerception': {
    label: 'How do you want to be perceived compared to competitors?',
    tooltip: 'Think about the impression you want potential clients to hold about you, versus others.',
    placeholder: 'Describe how you want to be seen in the market...',
    minLength: 20,
  }
};

export const executionMapping: Record<string, FieldMapping> = {
  thirtyDayGoal: {
    label: 'What is your 30-day goal?',
    tooltip: 'Choose a specific, measurable objective you can realistically achieve within 30 days.',
    placeholder: 'e.g. Launch MVP, Get first 20 leads...',
    minLength: 10,
  },
  weeklyMilestones: {
    label: 'What are your weekly milestones?',
    tooltip: 'Break down your 30-day goal into weekly targets.',
    placeholder: 'List your weekly goals...',
    minLength: 5,
    isArray: true,
  },
  contentPlan: {
    label: 'What is your content strategy?',
    tooltip: 'Outline your approach to creating and sharing content with your audience.',
    placeholder: 'Describe your content types, channels, and frequency...',
    minLength: 20,
  },
  immediateActions: {
    label: 'What are your immediate actions?',
    tooltip: 'List specific tasks you can start right away.',
    placeholder: 'List 3 actionable tasks...',
    minLength: 5,
    isArray: true,
  }
};
