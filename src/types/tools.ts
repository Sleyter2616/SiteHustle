export type ToolCategory = 'website' | 'app' | 'automation' | 'database' | 'ai' | 'lowcode' | 'integration';

export type LearningCurve = 'Low' | 'Moderate' | 'High';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  keyFeatures: string[];
  useCases: string[];
  learningCurve: LearningCurve;
  pricing?: {
    startingAt: string;
    model: 'free' | 'freemium' | 'paid' | 'usage';
  };
  url?: string;
  logo?: string;
}

export const websiteBuilders: Tool[] = [
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'website',
    description: 'Professional-grade visual web development platform',
    keyFeatures: [
      'Advanced visual design controls',
      'Built-in CMS',
      'Custom animations',
      'Responsive design tools'
    ],
    useCases: [
      'Marketing websites',
      'Portfolio sites',
      'E-commerce stores',
      'Custom web applications'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: '$12/month',
      model: 'freemium'
    },
    url: 'https://webflow.com'
  },
  {
    id: 'bubble',
    name: 'Bubble',
    category: 'website',
    description: 'No-code platform for web applications',
    keyFeatures: [
      'Visual programming',
      'Database management',
      'API connections',
      'User authentication'
    ],
    useCases: [
      'Web applications',
      'Marketplaces',
      'Social platforms',
      'Internal tools'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: '$25/month',
      model: 'freemium'
    },
    url: 'https://bubble.io'
  },
  {
    id: 'wix',
    name: 'Wix',
    category: 'website',
    description: 'User-friendly website builder with AI capabilities',
    keyFeatures: [
      'Drag-and-drop editor',
      'AI site generator',
      'App market',
      'Built-in SEO tools'
    ],
    useCases: [
      'Small business websites',
      'Online stores',
      'Blogs',
      'Portfolios'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$16/month',
      model: 'freemium'
    },
    url: 'https://wix.com'
  }
];

export const appBuilders: Tool[] = [
  {
    id: 'glide',
    name: 'Glide',
    category: 'app',
    description: 'Create apps from spreadsheets',
    keyFeatures: [
      'Google Sheets integration',
      'Pre-built components',
      'Quick deployment',
      'Real-time updates'
    ],
    useCases: [
      'Internal tools',
      'Business directories',
      'Project trackers',
      'Event apps'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$32/month',
      model: 'freemium'
    },
    url: 'https://www.glideapps.com'
  },
  {
    id: 'adalo',
    name: 'Adalo',
    category: 'app',
    description: 'Visual app builder for iOS and Android',
    keyFeatures: [
      'Native app building',
      'Custom components',
      'Database management',
      'Third-party integrations'
    ],
    useCases: [
      'Mobile apps',
      'Membership platforms',
      'Delivery apps',
      'Educational apps'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$50/month',
      model: 'freemium'
    },
    url: 'https://www.adalo.com'
  },
  {
    id: 'thunkable',
    name: 'Thunkable',
    category: 'app',
    description: 'Cross-platform app development platform',
    keyFeatures: [
      'Drag-and-drop interface',
      'Block-based coding',
      'AI capabilities',
      'Cloud data storage'
    ],
    useCases: [
      'Educational apps',
      'Social apps',
      'Games',
      'Utility apps'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$21/month',
      model: 'freemium'
    },
    url: 'https://thunkable.com'
  }
];

export const automationTools: Tool[] = [
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    description: 'User-friendly automation platform with thousands of app integrations',
    keyFeatures: [
      'Visual workflow builder',
      '5,000+ app integrations',
      'Multi-step Zaps',
      'Built-in app actions'
    ],
    useCases: [
      'Marketing automations',
      'Data synchronization',
      'Notification systems',
      'Form processing'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$19.99/month',
      model: 'freemium'
    },
    url: 'https://zapier.com'
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    category: 'automation',
    description: 'Advanced visual automation platform with powerful branching',
    keyFeatures: [
      'Complex scenario builder',
      'Advanced branching logic',
      'Data mapping tools',
      'Error handling'
    ],
    useCases: [
      'Complex workflows',
      'Data transformations',
      'API integrations',
      'Business process automation'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: '$9/month',
      model: 'freemium'
    },
    url: 'https://www.make.com'
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    description: 'Open-source workflow automation tool',
    keyFeatures: [
      'Self-hosted option',
      'Node-based workflows',
      'Custom functions',
      'API creation'
    ],
    useCases: [
      'Privacy-focused automation',
      'Custom integrations',
      'Developer workflows',
      'Enterprise automation'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: 'Free',
      model: 'free'
    },
    url: 'https://n8n.io'
  },
  {
    id: 'relevanceai',
    name: 'Relevance AI',
    category: 'automation',
    description: 'AI-powered workflow automation platform',
    keyFeatures: [
      'AI-driven automation',
      'Natural language processing',
      'Custom AI agents',
      'Data transformation'
    ],
    useCases: [
      'AI workflow automation',
      'Content generation',
      'Data analysis',
      'Customer service automation'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$49/month',
      model: 'paid'
    },
    url: 'https://relevance.ai'
  }
];

export const databaseTools: Tool[] = [
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'database',
    description: 'Spreadsheet-database hybrid with powerful features',
    keyFeatures: [
      'Visual database builder',
      'Custom views',
      'Automation scripts',
      'Rich field types'
    ],
    useCases: [
      'Project management',
      'Content calendars',
      'Inventory tracking',
      'CRM systems'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$10/month',
      model: 'freemium'
    },
    url: 'https://airtable.com'
  },
  {
    id: 'notion',
    name: 'Notion + Super',
    category: 'database',
    description: 'All-in-one workspace with database capabilities',
    keyFeatures: [
      'Document-database hybrid',
      'Website publishing',
      'Templates',
      'Collaboration tools'
    ],
    useCases: [
      'Knowledge bases',
      'Team wikis',
      'Project documentation',
      'Simple websites'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$8/month',
      model: 'freemium'
    },
    url: 'https://notion.so'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    description: 'Open source Firebase alternative with PostgreSQL',
    keyFeatures: [
      'PostgreSQL database',
      'Real-time subscriptions',
      'Auth & user management',
      'Auto-generated APIs'
    ],
    useCases: [
      'Web applications',
      'Real-time features',
      'User authentication',
      'Data storage'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: 'Free',
      model: 'freemium'
    },
    url: 'https://supabase.com'
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'database',
    description: 'Google\'s app development platform',
    keyFeatures: [
      'Real-time database',
      'Authentication',
      'Cloud functions',
      'Push notifications'
    ],
    useCases: [
      'Mobile apps',
      'Real-time chat',
      'Social features',
      'User analytics'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: 'Free',
      model: 'freemium'
    },
    url: 'https://firebase.google.com'
  }
];

export const aiTools: Tool[] = [
  {
    id: 'bolt',
    name: 'Bolt',
    category: 'ai',
    description: 'AI-assisted platform for rapid web creation and prototyping',
    keyFeatures: [
      'AI layout suggestions',
      'Content generation',
      'Rapid prototyping',
      'Design assistance'
    ],
    useCases: [
      'Quick MVPs',
      'Landing pages',
      'Marketing sites',
      'Portfolio sites'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$29/month',
      model: 'freemium'
    },
    url: 'https://bolt.new'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'website',
    description: 'AI-powered website builder',
    keyFeatures: [
      'AI design assistance',
      'Quick prototyping',
      'Modern templates',
      'SEO optimization'
    ],
    useCases: [
      'Landing pages',
      'Personal websites',
      'Small business sites',
      'Portfolios'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$19/month',
      model: 'freemium'
    },
    url: 'https://codeium.com/windsurf'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT (GPT-4)',
    category: 'ai',
    description: 'Advanced language model for conversation and content generation',
    keyFeatures: [
      'Natural language processing',
      'Content generation',
      'Code assistance',
      'Problem solving'
    ],
    useCases: [
      'Customer support',
      'Content creation',
      'Programming help',
      'Research assistance'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$20/month',
      model: 'freemium'
    },
    url: 'https://chat.openai.com'
  },
  {
    id: 'jasper',
    name: 'Jasper.ai',
    category: 'ai',
    description: 'AI content creation platform for marketing and business',
    keyFeatures: [
      'Marketing copy generation',
      'Blog post writing',
      'Social media content',
      'SEO optimization'
    ],
    useCases: [
      'Marketing content',
      'Product descriptions',
      'Email campaigns',
      'Social media posts'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$49/month',
      model: 'paid'
    },
    url: 'https://jasper.ai'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'ai',
    description: 'AI image generation through natural language',
    keyFeatures: [
      'Text-to-image generation',
      'Style customization',
      'High-quality output',
      'Discord integration'
    ],
    useCases: [
      'Custom graphics',
      'Marketing visuals',
      'Concept art',
      'Product mockups'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$10/month',
      model: 'paid'
    },
    url: 'https://midjourney.com'
  },
  {
    id: 'descript',
    name: 'Descript',
    category: 'ai',
    description: 'AI-powered audio and video editing platform',
    keyFeatures: [
      'Transcription',
      'Video editing',
      'Voice cloning',
      'Screen recording'
    ],
    useCases: [
      'Podcast editing',
      'Video content',
      'Tutorial creation',
      'Meeting recordings'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$12/month',
      model: 'freemium'
    },
    url: 'https://www.descript.com'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'ai',
    description: 'Google\'s advanced multimodal AI model combining language understanding and visual reasoning',
    keyFeatures: [
      'Multimodal understanding',
      'Advanced reasoning capabilities',
      'Code generation and analysis',
      'Image and text integration',
      'Real-time processing'
    ],
    useCases: [
      'Complex problem solving',
      'Visual content analysis',
      'Technical documentation',
      'Educational content',
      'Research assistance'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$10/month',
      model: 'freemium'
    },
    url: 'https://deepmind.google/technologies/gemini/'
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'ai',
    description: 'Advanced AI assistant known for nuanced understanding and extensive context window',
    keyFeatures: [
      'Large context window (100K tokens)',
      'Constitutional AI principles',
      'Advanced reasoning',
      'Detailed analysis',
      'Code generation'
    ],
    useCases: [
      'Research synthesis',
      'Document analysis',
      'Content creation',
      'Programming assistance',
      'Data analysis'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$20/month',
      model: 'paid'
    },
    url: 'https://anthropic.com/claude'
  },
  {
    id: 'elevenlabs',
    name: 'Eleven Labs',
    category: 'ai',
    description: 'State-of-the-art AI voice synthesis platform with emotion and multilingual support',
    keyFeatures: [
      'Voice cloning technology',
      'Emotion control',
      'Multi-language support',
      'Real-time voice generation',
      'API integration'
    ],
    useCases: [
      'Podcast production',
      'Video narration',
      'Game character voices',
      'Audiobook creation',
      'Accessibility solutions'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$5/month',
      model: 'freemium'
    },
    url: 'https://elevenlabs.io'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'ai',
    description: 'AI-powered search engine with real-time information synthesis and citation',
    keyFeatures: [
      'Real-time information retrieval',
      'Source citation',
      'Conversational interface',
      'Multi-modal search',
      'Academic research support'
    ],
    useCases: [
      'Research assistance',
      'Fact checking',
      'Learning complex topics',
      'Market research',
      'Technical documentation'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$20/month',
      model: 'freemium'
    },
    url: 'https://www.perplexity.ai'
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude Pro',
    category: 'ai',
    description: 'Enterprise-grade AI assistant with advanced reasoning and ethical constraints',
    keyFeatures: [
      'Extended context processing',
      'Ethical AI guidelines',
      'Advanced analysis tools',
      'Custom model training',
      'Enterprise security'
    ],
    useCases: [
      'Enterprise automation',
      'Complex analysis',
      'Policy compliance',
      'Research synthesis',
      'Content generation'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: '$100/month',
      model: 'paid'
    },
    url: 'https://anthropic.com/enterprise'
  },
  {
    id: 'bard',
    name: 'Google Bard',
    category: 'ai',
    description: 'Google\'s conversational AI with real-time information access and integration',
    keyFeatures: [
      'Real-time web access',
      'Google Workspace integration',
      'Multi-modal input',
      'Code generation',
      'Data visualization'
    ],
    useCases: [
      'Information synthesis',
      'Creative writing',
      'Programming help',
      'Data analysis',
      'Learning assistance'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: 'Free',
      model: 'freemium'
    },
    url: 'https://bard.google.com'
  },
];

export const lowCodeTools: Tool[] = [
  {
    id: 'powerapps',
    name: 'Microsoft Power Apps',
    category: 'lowcode',
    description: 'Enterprise-grade low-code development platform',
    keyFeatures: [
      'Office 365 integration',
      'Drag-and-drop builder',
      'Custom connectors',
      'Mobile-ready apps'
    ],
    useCases: [
      'Internal tools',
      'Business processes',
      'Data collection apps',
      'Workflow automation'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$10/user/month',
      model: 'paid'
    },
    url: 'https://powerapps.microsoft.com'
  },
  {
    id: 'retool',
    name: 'Retool',
    category: 'lowcode',
    description: 'Build internal tools and dashboards quickly',
    keyFeatures: [
      'Custom components',
      'Database integration',
      'API connections',
      'Drag-and-drop UI'
    ],
    useCases: [
      'Admin panels',
      'Dashboards',
      'CRUD applications',
      'Data management'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$10/user/month',
      model: 'freemium'
    },
    url: 'https://retool.com'
  },
  {
    id: 'filemaker',
    name: 'Claris FileMaker',
    category: 'lowcode',
    description: 'Mature platform for custom business solutions',
    keyFeatures: [
      'Custom databases',
      'Cross-platform deployment',
      'Script automation',
      'Integration options'
    ],
    useCases: [
      'Business workflows',
      'Inventory management',
      'CRM systems',
      'Legacy upgrades'
    ],
    learningCurve: 'High',
    pricing: {
      startingAt: '$19/user/month',
      model: 'paid'
    },
    url: 'https://www.claris.com/filemaker'
  }
];

export const integrationTools: Tool[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'integration',
    description: 'Complete payments platform for online business',
    keyFeatures: [
      'Payment processing',
      'Subscription management',
      'Invoicing',
      'Fraud prevention'
    ],
    useCases: [
      'E-commerce',
      'SaaS billing',
      'Marketplace payments',
      'Subscription services'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '2.9% + 30¢',
      model: 'usage'
    },
    url: 'https://stripe.com'
  },
  {
    id: 'memberstack',
    name: 'Memberstack',
    category: 'integration',
    description: 'User authentication and payments for no-code sites',
    keyFeatures: [
      'User management',
      'Payment processing',
      'Access control',
      'No-code integration'
    ],
    useCases: [
      'Membership sites',
      'Course platforms',
      'Premium content',
      'Digital products'
    ],
    learningCurve: 'Low',
    pricing: {
      startingAt: '$29/month',
      model: 'freemium'
    },
    url: 'https://www.memberstack.com'
  },
  {
    id: 'intercom',
    name: 'Intercom',
    category: 'integration',
    description: 'Customer messaging and support platform',
    keyFeatures: [
      'Live chat',
      'Chatbots',
      'Knowledge base',
      'Customer data platform'
    ],
    useCases: [
      'Customer support',
      'Lead generation',
      'User onboarding',
      'Marketing automation'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: '$39/month',
      model: 'paid'
    },
    url: 'https://www.intercom.com'
  },
  {
    id: 'analytics',
    name: 'Google Analytics',
    category: 'integration',
    description: 'Web analytics and reporting platform',
    keyFeatures: [
      'Traffic analysis',
      'User behavior tracking',
      'Conversion tracking',
      'Custom reports'
    ],
    useCases: [
      'Website analytics',
      'Marketing analysis',
      'User journey tracking',
      'E-commerce tracking'
    ],
    learningCurve: 'Moderate',
    pricing: {
      startingAt: 'Free',
      model: 'freemium'
    },
    url: 'https://analytics.google.com'
  }
];
