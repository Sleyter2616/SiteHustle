// src/utils/worksheetValidationAndPdf.ts

import { jsPDF } from 'jspdf';
import { toast } from 'react-hot-toast';
import {
  Pillar1Data,
  BrandIdentityData,
  VisionData,
  ExecutionRoadmapData,
  WireframeData
} from '@/types/pillar1';

/***************************************************************
  worksheetValidationAndPdf.ts
  - Contains validation functions for Brand Identity, Vision, etc.
  - Contains PDF generation functions for each worksheet.
***************************************************************/

// If you need VisionWorksheetPDF from react-pdf, you can import it here
// import { VisionWorksheetPDF } from '@/components/vision/VisionWorksheet';

/***********************************************************************
  1) VALIDATION
***********************************************************************/

// Helper functions
const isNonEmptyString = (str: string | undefined | null): boolean =>
  typeof str === 'string' && str.trim().length > 0;

const isNonEmptyArray = (arr: any[] | undefined | null): boolean =>
  Array.isArray(arr) && arr.length > 0 && arr.every(item => isNonEmptyString(item));

interface ValidationResult {
  success: boolean;
  errors: Record<string, string[]>;
}

/* ------------------------------------------------------------------
   BRAND IDENTITY VALIDATION
------------------------------------------------------------------ */
export const validateReflection = (data: Pillar1Data['brandIdentity']['reflection']): ValidationResult => {
  const errors: Record<string, string[]> = {};
  if (!data?.whoIAm || !isNonEmptyString(data.whoIAm) ||
      !data?.whoIAmNot || !isNonEmptyString(data.whoIAmNot) ||
      !data?.whyBuildBrand || !isNonEmptyString(data.whyBuildBrand)) {
    errors['reflection'] = ['Please fill out all reflection fields'];
  }
  return { success: Object.keys(errors).length === 0, errors };
};

export const validatePersonality = (data: Pillar1Data['brandIdentity']['personality']): ValidationResult => {
  const errors: Record<string, string[]> = {};
  if (!data?.communicationStyle || !isNonEmptyString(data.communicationStyle) ||
      !data?.toneAndVoice || !isNonEmptyString(data.toneAndVoice) ||
      !data?.passionateExpression || !isNonEmptyString(data.passionateExpression) ||
      !data?.brandPersonality || !isNonEmptyString(data.brandPersonality)) {
    errors['personality'] = ['Please fill out all personality fields'];
  }
  return { success: Object.keys(errors).length === 0, errors };
};

export const validateStory = (data: Pillar1Data['brandIdentity']['story']): ValidationResult => {
  const errors: Record<string, string[]> = {};
  if (!data?.pivotalExperience || !isNonEmptyString(data.pivotalExperience) ||
      !data?.definingMoment || !isNonEmptyString(data.definingMoment) ||
      !data?.audienceRelevance || !isNonEmptyString(data.audienceRelevance)) {
    errors['story'] = ['Please fill out all story fields'];
  }
  return { success: Object.keys(errors).length === 0, errors };
};

export const validateDifferentiation = (data: Pillar1Data['brandIdentity']['differentiation']): ValidationResult => {
  const errors: Record<string, string[]> = {};
  if (!data?.uniqueApproach || !isNonEmptyString(data.uniqueApproach) ||
      !data?.uniqueResources || !isNonEmptyString(data.uniqueResources) ||
      !data?.competitivePerception || !isNonEmptyString(data.competitivePerception)) {
    errors['differentiation'] = ['Please fill out all differentiation fields'];
  }
  return { success: Object.keys(errors).length === 0, errors };
};

export const validateBrandIdentity = (data?: Pillar1Data['brandIdentity']): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No brand identity data provided'] } };
  }

  const reflectionResult = validateReflection(data.reflection);
  const personalityResult = validatePersonality(data.personality);
  const storyResult = validateStory(data.story);
  const differentiationResult = validateDifferentiation(data.differentiation);

  const errors: Record<string, string[]> = {
    ...(!reflectionResult.success ? reflectionResult.errors : {}),
    ...(!personalityResult.success ? personalityResult.errors : {}),
    ...(!storyResult.success ? storyResult.errors : {}),
    ...(!differentiationResult.success ? differentiationResult.errors : {})
  };

  return { success: Object.keys(errors).length === 0, errors };
};

/* ------------------------------------------------------------------
   VISION VALIDATION
------------------------------------------------------------------ */
export const validateVision = (data?: VisionData): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No vision data provided'] } };
  }

  const errors: Record<string, string[]> = {};

  // basic info
  if (!isNonEmptyString(data.businessName) ||
      !isNonEmptyString(data.tagline) ||
      !isNonEmptyString(data.missionStatement) ||
      !isNonEmptyArray(data.coreValues)) {
    errors['basicInfo'] = ['Please complete all basic information fields'];
  }

  // business goals
  if (!data.businessGoals?.shortTerm || !isNonEmptyString(data.businessGoals.shortTerm) ||
      !data.businessGoals?.midTerm || !isNonEmptyString(data.businessGoals.midTerm) ||
      !data.businessGoals?.longTerm || !isNonEmptyString(data.businessGoals.longTerm) ||
      !data.businessGoals?.websiteGoals || !isNonEmptyString(data.businessGoals.websiteGoals) ||
      !data.businessGoals?.successIndicators || !isNonEmptyString(data.businessGoals.successIndicators)) {
    errors['businessGoals'] = ['Please complete all business goals'];
  }

  // swot
  if (!data.swot?.strengths || !isNonEmptyArray(data.swot.strengths) ||
      !data.swot?.weaknesses || !isNonEmptyArray(data.swot.weaknesses) ||
      !data.swot?.opportunities || !isNonEmptyArray(data.swot.opportunities) ||
      !data.swot?.threats || !isNonEmptyArray(data.swot.threats)) {
    errors['swot'] = ['Please complete all SWOT analysis sections'];
  }

  return { success: Object.keys(errors).length === 0, errors };
};

/* ------------------------------------------------------------------
   EXECUTION ROADMAP VALIDATION
------------------------------------------------------------------ */
export const validateExecutionRoadmap = (
  data?: Pillar1Data['executionRoadmap']
): ValidationResult => {
  if (!data) {
    return {
      success: false,
      errors: { general: ['No execution roadmap data provided'] }
    };
  }

  const errors: Record<string, string[]> = {};

  // Must provide a valid 30-day goal (non-empty string).
  if (!isNonEmptyString(data.thirtyDayGoal)) {
    errors['thirtyDayGoal'] = ['Please set your 30-day goal'];
  }

  // Weekly milestones: check if array length meets your requirement (e.g. at least 4).
  if (!data.weeklyMilestones || data.weeklyMilestones.length < 4) {
    errors['weeklyMilestones'] = [
      'Please set at least 4 weekly milestones to break down your 30-day goal'
    ];
  } else {
    // Optionally, also check if each milestone is non-empty
    data.weeklyMilestones.forEach((mile, index) => {
      if (!isNonEmptyString(mile)) {
        errors[`weeklyMilestones.${index}`] = [
          `Week ${index + 1} milestone cannot be empty`
        ];
      }
    });
  }

  // Content plan: must be a valid non-empty string
  if (!isNonEmptyString(data.contentPlan)) {
    errors['contentPlan'] = ['Please complete your content plan'];
  }

  // Immediate actions: check if array length meets your requirement (e.g. at least 3).
  if (!data.immediateActions || data.immediateActions.length < 3) {
    errors['immediateActions'] = [
      'Please list at least 3 immediate actions to kick-start your roadmap'
    ];
  } else {
    // Optionally, also check each immediate action is non-empty
    data.immediateActions.forEach((action, index) => {
      if (!isNonEmptyString(action)) {
        errors[`immediateActions.${index}`] = [
          `Action ${index + 1} cannot be empty`
        ];
      }
    });
  }

  return { success: Object.keys(errors).length === 0, errors };
};

/* ------------------------------------------------------------------
   WIREFRAME VALIDATION
------------------------------------------------------------------ */
export const validateWireframe = (data?: Pillar1Data['wireframe']): ValidationResult => {
  if (!data) {
    return { success: false, errors: { general: ['No wireframe data provided'] } };
  }

  const errors: Record<string, string[]> = {};

  // layout
  if (!data.layout?.header || !isNonEmptyString(data.layout.header) ||
      !data.layout?.navigation || !isNonEmptyString(data.layout.navigation) ||
      !data.layout?.mainContent || !isNonEmptyString(data.layout.mainContent) ||
      !data.layout?.footer || !isNonEmptyString(data.layout.footer)) {
    errors['layout'] = ['Please complete all layout sections'];
  }
  // components
  if (!data.components?.callToAction || !isNonEmptyString(data.components.callToAction) ||
      !data.components?.featuredSections || !isNonEmptyArray(data.components.featuredSections) ||
      !data.components?.contentBlocks || !isNonEmptyArray(data.components.contentBlocks)) {
    errors['components'] = ['Please complete all component sections'];
  }
  // styling
  if (!data.styling?.colorScheme || !isNonEmptyString(data.styling.colorScheme) ||
      !data.styling?.typography || !isNonEmptyString(data.styling.typography) ||
      !data.styling?.spacing || !isNonEmptyString(data.styling.spacing)) {
    errors['styling'] = ['Please complete all styling sections'];
  }

  return { success: Object.keys(errors).length === 0, errors };
};

/***********************************************************************
  2) PDF GENERATION
***********************************************************************/

// Helper routines for consistent PDF layout
function addSectionTitle(doc: jsPDF, title: string, y: number) {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  return y + 10;
}

function addExplanation(doc: jsPDF, text: string, y: number) {
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, 170);
  doc.text(lines, 20, y);
  return y + 6 + lines.length * 5;
}

function maybeAddPage(doc: jsPDF, currentY: number): number {
  if (currentY > 265) {
    doc.addPage();
    return 20;
  }
  return currentY;
}

/************************************************************
  1) BRAND IDENTITY (jsPDF)
************************************************************/
export function generateBrandIdentityPDF(data?: BrandIdentityData): jsPDF {
  const doc = new jsPDF();
  let y = 20;

  // Title & Explanation
  y = addSectionTitle(doc, 'Brand Identity Worksheet', y);
  y = addExplanation(
    doc,
    'A strong brand identity clarifies who you are, why you exist, and how you communicate—building recognition and trust. Below are the key elements of your brand foundation.',
    y
  );

  if (!data) {
    y += 10;
    doc.text('No Brand Identity data provided.', 20, y);
    return doc;
  }

  // Reflection
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Reflection', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const reflectionValueProp = `Understanding your authentic self is the foundation of a genuine brand, 
helping you resonate deeply with your audience and stand out in a crowded market.`;
  const reflectionVPLines = doc.splitTextToSize(reflectionValueProp, 170);
  doc.text(reflectionVPLines, 20, (y += 6));
  y += reflectionVPLines.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  // whoIAm
  if (data.reflection?.whoIAm) {
    doc.text('Who I Am:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const whoIAmVP = `Articulating who you are ensures your brand voice is rooted in authenticity, 
fostering trust and relatability.`;
    const whoIAmVPLines = doc.splitTextToSize(whoIAmVP, 170);
    doc.text(whoIAmVPLines, 30, y);
    y += whoIAmVPLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const whoIAmLines = doc.splitTextToSize(data.reflection.whoIAm, 170);
    doc.text(whoIAmLines, 30, y);
    y += whoIAmLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // whoIAmNot
  if (data.reflection?.whoIAmNot) {
    doc.text('Who I Am Not:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const whoIAmNotVP = `Knowing what you don't stand for helps define clear boundaries 
and keeps your brand experience consistent.`;
    const whoIAmNotLines = doc.splitTextToSize(whoIAmNotVP, 170);
    doc.text(whoIAmNotLines, 30, y);
    y += whoIAmNotLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const whoIAmNotUser = doc.splitTextToSize(data.reflection.whoIAmNot, 170);
    doc.text(whoIAmNotUser, 30, y);
    y += whoIAmNotUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // whyBuildBrand
  if (data.reflection?.whyBuildBrand) {
    doc.text('Why Build This Brand:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const whyBrandVP = `Defining your deeper motivation aligns your brand with a purpose 
that customers can champion, fueling loyalty and advocacy.`;
    const whyBrandLines = doc.splitTextToSize(whyBrandVP, 170);
    doc.text(whyBrandLines, 30, y);
    y += whyBrandLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const whyBuildBrandLines = doc.splitTextToSize(data.reflection.whyBuildBrand, 170);
    doc.text(whyBuildBrandLines, 30, y);
    y += whyBuildBrandLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // Personality
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Personality', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const personalityValueProp = `Defining a brand personality makes your message memorable 
and relatable, creating an emotional bond with your target audience.`;
  const personalityVP = doc.splitTextToSize(personalityValueProp, 170);
  doc.text(personalityVP, 20, (y += 6));
  y += personalityVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.personality?.communicationStyle) {
    doc.text('Communication Style:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const commStyleVP = `Choosing a distinct communication style ensures 
all brand interactions sound authentically you, increasing recognition.`;
    const commLines = doc.splitTextToSize(commStyleVP, 170);
    doc.text(commLines, 30, y);
    y += commLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.personality.communicationStyle, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.personality?.toneAndVoice) {
    doc.text('Tone & Voice:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const toneVP = `A consistent tone and voice build familiarity, 
making your audience feel at home whenever they engage with your brand.`;
    const toneLines = doc.splitTextToSize(toneVP, 170);
    doc.text(toneLines, 30, y);
    y += toneLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const tvLines = doc.splitTextToSize(data.personality.toneAndVoice, 170);
    doc.text(tvLines, 30, y);
    y += tvLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.personality?.passionateExpression) {
    doc.text('Passionate Expression:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const passExprVP = `Capturing your peak enthusiasm influences your brand's energy, 
inspiring and attracting like-minded customers.`;
    const passExprLines = doc.splitTextToSize(passExprVP, 170);
    doc.text(passExprLines, 30, y);
    y += passExprLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const passUser = doc.splitTextToSize(data.personality.passionateExpression, 170);
    doc.text(passUser, 30, y);
    y += passUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.personality?.brandPersonality) {
    doc.text('Brand Personality:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const brandPersVP = `Embodying a clear personality lets your brand 
stand out and forges a deeper emotional resonance with your audience.`;
    const brandPersLines = doc.splitTextToSize(brandPersVP, 170);
    doc.text(brandPersLines, 30, y);
    y += brandPersLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const brandPersUser = doc.splitTextToSize(data.personality.brandPersonality, 170);
    doc.text(brandPersUser, 30, y);
    y += brandPersUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // Story
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Story', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const storyValueProp = `Sharing a genuine story humanizes your brand, 
allowing customers to connect on a personal level beyond products or services.`;
  const storyVP = doc.splitTextToSize(storyValueProp, 170);
  doc.text(storyVP, 20, (y += 6));
  y += storyVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.story?.pivotalExperience) {
    doc.text('Pivotal Experience:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const pivotVP = `Identifying that key turning point highlights 
the heart of your brand's journey, inviting empathy and curiosity.`;
    const pivotLines = doc.splitTextToSize(pivotVP, 170);
    doc.text(pivotLines, 30, y);
    y += pivotLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const pivotUser = doc.splitTextToSize(data.story.pivotalExperience, 170);
    doc.text(pivotUser, 30, y);
    y += pivotUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.story?.definingMoment) {
    doc.text('Defining Moment:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const definingVP = `Pinpointing your brand's defining moment 
reveals the emotional core driving your purpose.`;
    const defLines = doc.splitTextToSize(definingVP, 170);
    doc.text(defLines, 30, y);
    y += defLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const defUser = doc.splitTextToSize(data.story.definingMoment, 170);
    doc.text(defUser, 30, y);
    y += defUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.story?.audienceRelevance) {
    doc.text('Audience Relevance:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const audienceVP = `Connecting your story with audience needs 
makes them feel part of your journey, fostering loyalty.`;
    const audLines = doc.splitTextToSize(audienceVP, 170);
    doc.text(audLines, 30, y);
    y += audLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const arUser = doc.splitTextToSize(data.story.audienceRelevance, 170);
    doc.text(arUser, 30, y);
    y += arUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // Differentiation
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Differentiation', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const diffValueProp = `Highlighting how you stand out builds a compelling reason 
for customers to choose you over competitors.`;
  const diffVP = doc.splitTextToSize(diffValueProp, 170);
  doc.text(diffVP, 20, (y += 6));
  y += diffVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.differentiation?.uniqueApproach) {
    doc.text('Unique Approach:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const uniqueAppVP = `Your fresh perspective or specialized method 
offers a clear advantage, resonating with niche customer needs.`;
    const uniqAppLines = doc.splitTextToSize(uniqueAppVP, 170);
    doc.text(uniqAppLines, 30, y);
    y += uniqAppLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const uaUser = doc.splitTextToSize(data.differentiation.uniqueApproach, 170);
    doc.text(uaUser, 30, y);
    y += uaUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.differentiation?.uniqueResources) {
    doc.text('Unique Resources:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const uniqueResVP = `Highlighting special tools, connections, or skills 
proves that you bring exclusive assets to the table.`;
    const uniqResLines = doc.splitTextToSize(uniqueResVP, 170);
    doc.text(uniqResLines, 30, y);
    y += uniqResLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const urUser = doc.splitTextToSize(data.differentiation.uniqueResources, 170);
    doc.text(urUser, 30, y);
    y += urUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  if (data.differentiation?.competitivePerception) {
    doc.text('Competitive Perception:', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const compPercVP = `Defining how you want to be perceived relative 
to competitors clarifies your brand's unique angle and value.`;
    const compPercLines = doc.splitTextToSize(compPercVP, 170);
    doc.text(compPercLines, 30, y);
    y += compPercLines.length * 5 + 4;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const cpUser = doc.splitTextToSize(data.differentiation.competitivePerception, 170);
    doc.text(cpUser, 30, y);
    y += cpUser.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  return doc;
}
/************************************************************
  EXECUTION ROADMAP (jsPDF) - Enhanced
************************************************************/

export function generateExecutionRoadmapPDF(data?: ExecutionRoadmapData): jsPDF {
  const doc = new jsPDF();
  let y = 20;

  // Title & Explanation (similar style to Brand Identity / Vision)
  y = addSectionTitle(doc, '30-Day Execution Roadmap', y);
  y = addExplanation(
    doc,
    'A short-term roadmap helps you focus on the most immediate goals and actions. ' +
      'By breaking your plan into weekly milestones, content strategy, and immediate next steps, ' +
      'you set a clear path toward meaningful progress.',
    y
  );

  // Check if data exists
  if (!data) {
    y += 10;
    doc.text('No Execution Roadmap data provided.', 20, y);
    return doc;
  }

  // ----------------------------------------
  // SECTION 1: 30-DAY GOAL
  // ----------------------------------------
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('1) 30-Day Goal', 20, y);
  y += 6;
  // quick "value prop" explanation
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const goalValueProp = `Defining a specific 30-day goal helps you maintain focus and motivation. 
It's your short-term "North Star"—the outcome you aim to achieve within a tight timeframe.`;
  const goalVP = doc.splitTextToSize(goalValueProp, 170);
  doc.text(goalVP, 20, (y += 6));
  y += goalVP.length * 5 + 4;

  // Show user’s 30-day goal
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.thirtyDayGoal) {
    doc.text('Your 30-Day Goal:', 20, y);
    y += 6;

    // If you want to italicize a line of explanation first:
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const userGoalIntro = `This is the central outcome you're striving for over the next month.`;
    const userGoalIntroLines = doc.splitTextToSize(userGoalIntro, 170);
    doc.text(userGoalIntroLines, 30, y);
    y += userGoalIntroLines.length * 5 + 4;

    // Then show user-provided data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const goalLines = doc.splitTextToSize(data.thirtyDayGoal, 170);
    doc.text(goalLines, 30, y);
    y += goalLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // ----------------------------------------
  // SECTION 2: WEEKLY MILESTONES
  // ----------------------------------------
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('2) Weekly Milestones', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const milestonesValueProp = `Breaking your 30-day goal into weekly targets helps track progress 
incrementally. Each milestone ensures you're taking consistent steps toward your main objective.`;
  const milestonesVP = doc.splitTextToSize(milestonesValueProp, 170);
  doc.text(milestonesVP, 20, (y += 6));
  y += milestonesVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.weeklyMilestones && data.weeklyMilestones.length > 0) {
    data.weeklyMilestones.forEach((mile, idx) => {
      if (!mile) return; // skip empty lines if you like

      doc.text(`Week ${idx + 1}:`, 20, y);
      y += 6;

      // small italic explanation line
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      const milestoneIntro = `Your focus or outcome for week ${idx + 1}.`;
      const milestoneIntroLines = doc.splitTextToSize(milestoneIntro, 170);
      doc.text(milestoneIntroLines, 30, y);
      y += milestoneIntroLines.length * 5 + 4;

      // user-provided data
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const mileLines = doc.splitTextToSize(mile, 170);
      doc.text(mileLines, 30, y);
      y += mileLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    });
  }

  // ----------------------------------------
  // SECTION 3: CONTENT PLAN
  // ----------------------------------------
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('3) Content Plan', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const contentValueProp = `Your content strategy ensures consistent engagement with your audience. 
Whether it's social media, newsletters, or blog posts, planning content in advance keeps you on track.`;
  const contentVP = doc.splitTextToSize(contentValueProp, 170);
  doc.text(contentVP, 20, (y += 6));
  y += contentVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.contentPlan) {
    doc.text('Your Content Strategy:', 20, y);
    y += 6;

    // optional italic explanation
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const cpIntro = `Outline the types of content you'll create (videos, posts, emails), 
how often, and where you'll publish.`;
    const cpIntroLines = doc.splitTextToSize(cpIntro, 170);
    doc.text(cpIntroLines, 30, y);
    y += cpIntroLines.length * 5 + 4;

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const cpLines = doc.splitTextToSize(data.contentPlan, 170);
    doc.text(cpLines, 30, y);
    y += cpLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // ----------------------------------------
  // SECTION 4: IMMEDIATE ACTIONS
  // ----------------------------------------
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('4) Immediate Actions', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const actionsValueProp = `These are the most urgent steps you can take right now to kickstart progress. 
They should be concrete tasks you can complete in the coming days to build momentum toward your goal.`;
  const actionsVP = doc.splitTextToSize(actionsValueProp, 170);
  doc.text(actionsVP, 20, (y += 6));
  y += actionsVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.immediateActions && data.immediateActions.length > 0) {
    data.immediateActions.forEach((action, idx) => {
      if (!action) return;

      doc.text(`Action ${idx + 1}:`, 20, y);
      y += 6;

      // optional line
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      const actionIntro = `A clear, next-step task to move you closer to your weekly milestones and 30-day goal.`;
      const actionIntroLines = doc.splitTextToSize(actionIntro, 170);
      doc.text(actionIntroLines, 30, y);
      y += actionIntroLines.length * 5 + 4;

      // user data
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const actionLines = doc.splitTextToSize(action, 170);
      doc.text(actionLines, 30, y);
      y += actionLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    });
  }

  return doc;
}

/************************************************************
  3) WIREFRAME (jsPDF)
************************************************************/
export function generateWireframePDF(data?: WireframeData): jsPDF {
  const doc = new jsPDF();
  let y = 20;

  y = addSectionTitle(doc, 'Website Wireframe Plan', y);
  y = addExplanation(
    doc,
    'A thoughtful wireframe organizes layout, components, and styling for a user-friendly website aligned with your brand.',
    y
  );

  if (!data) {
    y += 10;
    doc.text('No Wireframe data provided.', 20, y);
    return doc;
  }

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Layout', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.layout?.header) {
    doc.text(`Header: ${data.layout.header}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.layout?.navigation) {
    doc.text(`Navigation: ${data.layout.navigation}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.layout?.mainContent) {
    doc.text(`Main Content: ${data.layout.mainContent}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.layout?.footer) {
    doc.text(`Footer: ${data.layout.footer}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Components', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.components?.callToAction) {
    doc.text(`Call to Action: ${data.components.callToAction}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.components?.featuredSections && data.components.featuredSections.length > 0) {
    doc.text('Featured Sections:', 20, y);
    y += 6;
    data.components.featuredSections.forEach((sect) => {
      doc.text(`• ${sect}`, 30, y);
      y += 6;
      y = maybeAddPage(doc, y);
    });
    y += 4;
  }
  if (data.components?.contentBlocks && data.components.contentBlocks.length > 0) {
    doc.text('Content Blocks:', 20, y);
    y += 6;
    data.components.contentBlocks.forEach((block) => {
      doc.text(`• ${block}`, 30, y);
      y += 6;
      y = maybeAddPage(doc, y);
    });
    y += 4;
  }

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Styling', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.styling?.colorScheme) {
    doc.text(`Color Scheme: ${data.styling.colorScheme}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.styling?.typography) {
    doc.text(`Typography: ${data.styling.typography}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.styling?.spacing) {
    doc.text(`Spacing: ${data.styling.spacing}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }

  return doc;
}

/************************************************************
  4) VISION (jsPDF) - Detailed approach
************************************************************/
export function generateVisionPDF(data?: VisionData): jsPDF {
  const doc = new jsPDF();
  let y = 20;

  // Title & Explanation
  y = addSectionTitle(doc, 'Vision & Goals Worksheet', y);
  y = addExplanation(
    doc,
    'A strong vision clarifies your purpose, sets meaningful goals, and outlines who you serve and how. Below is your strategic foundation.',
    y
  );

  if (!data) {
    y += 10;
    doc.text('No Vision data provided.', 20, y);
    return doc;
  }

  // SECTION 1: VISION CLARITY
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('1) Vision Clarity', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const visionValueProp = `A concise mission, clear tagline, and well-defined vision statement guide 
all aspects of your business strategy, ensuring consistent messaging and direction.`;
  const visionVP = doc.splitTextToSize(visionValueProp, 170);
  doc.text(visionVP, 20, (y += 6));
  y += visionVP.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.businessName) {
    doc.text(`Business Name: ${data.businessName}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.tagline) {
    doc.text(`Tagline: ${data.tagline}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.missionStatement) {
    doc.text('Mission Statement:', 20, y);
    y += 6;
    const missionLines = doc.splitTextToSize(data.missionStatement, 170);
    doc.text(missionLines, 30, y);
    y += missionLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }
  if (data.visionStatement) {
    doc.text('Vision Statement:', 20, y);
    y += 6;
    const vsLines = doc.splitTextToSize(data.visionStatement, 170);
    doc.text(vsLines, 30, y);
    y += vsLines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }
  if (data.coreValues && data.coreValues.length > 0) {
    doc.text('Core Values:', 20, y);
    y += 6;
    data.coreValues.forEach((val) => {
      doc.text(`• ${val}`, 30, y);
      y += 6;
      y = maybeAddPage(doc, y);
    });
    y += 4;
  }

  // SECTION 2: GOALS
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('2) Business Goals', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const goalsVP = `Defining short-term, mid-term, and long-term goals provides actionable 
milestones to track growth and success.`;
  const goalsVPLines = doc.splitTextToSize(goalsVP, 170);
  doc.text(goalsVPLines, 20, (y += 6));
  y += goalsVPLines.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.businessGoals) {
    const {
      shortTerm,
      midTerm,
      longTerm,
      websiteGoals,
      successIndicators,
      attendance,
      engagement,
      financial,
      contentDelivery,
      networking,
      goalPriorities,
      actionPlan,
      challenges,
      accountability,
      summary,
      nextSteps
    } = data.businessGoals;

    // Show shortTerm, midTerm, longTerm, etc.
    if (shortTerm) {
      doc.text('Short-Term (6-12 months):', 20, y);
      y += 6;
      const stLines = doc.splitTextToSize(shortTerm, 170);
      doc.text(stLines, 30, y);
      y += stLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
    if (midTerm) {
      doc.text('Mid-Term (1-2 years):', 20, y);
      y += 6;
      const mtLines = doc.splitTextToSize(midTerm, 170);
      doc.text(mtLines, 30, y);
      y += mtLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
    if (longTerm) {
      doc.text('Long-Term (3-5 years):', 20, y);
      y += 6;
      const ltLines = doc.splitTextToSize(longTerm, 170);
      doc.text(ltLines, 30, y);
      y += ltLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
    if (websiteGoals) {
      doc.text('Website Goals:', 20, y);
      y += 6;
      const wgLines = doc.splitTextToSize(websiteGoals, 170);
      doc.text(wgLines, 30, y);
      y += wgLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
    if (successIndicators) {
      doc.text('Success Indicators:', 20, y);
      y += 6;
      const siLines = doc.splitTextToSize(successIndicators, 170);
      doc.text(siLines, 30, y);
      y += siLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }

    // Also show the new SMART fields (attendance, engagement, etc.)
    const showSmartGoal = (title: string, obj: any) => {
      if (!obj) return;
      y += 6;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 20, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      const categories = ['specific', 'measurable', 'achievable', 'relevant', 'timeBound'];
      categories.forEach(cat => {
        if (obj[cat]) {
          doc.text(`${cat.toUpperCase()}:`, 30, y);
          y += 5;
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          const lines = doc.splitTextToSize(obj[cat], 160);
          doc.text(lines, 35, y);
          y += lines.length * 6 + 4;
          y = maybeAddPage(doc, y);
          // restore italic for next label
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
        }
      });
    };

    showSmartGoal('Attendance Goals', attendance);
    showSmartGoal('Engagement Goals', engagement);
    showSmartGoal('Financial Goals', financial);
    showSmartGoal('Content Delivery Goals', contentDelivery);
    showSmartGoal('Networking Goals', networking);

    // Additional text fields: goalPriorities, actionPlan, etc.
    const showAdditionalField = (fieldLabel: string, val?: string) => {
      if (!val) return;
      y += 6;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(fieldLabel, 20, y);
      y += 6;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(val, 170);
      doc.text(lines, 30, y);
      y += lines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    };

    showAdditionalField('Goal Priorities', goalPriorities);
    showAdditionalField('Action Plan', actionPlan);
    showAdditionalField('Challenges & Solutions', challenges);
    showAdditionalField('Accountability & Monitoring', accountability);
    showAdditionalField('Summary & Alignment', summary);
    showAdditionalField('Next Steps', nextSteps);
  }

  // SECTION 3: TARGET AUDIENCE
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('3) Target Audience', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const taVP = `Pinpointing your audience's needs and desires ensures your offerings 
speak directly to those you aim to serve, improving engagement and conversions.`;
  const taVPArr = doc.splitTextToSize(taVP, 170);
  doc.text(taVPArr, 20, (y += 6));
  y += taVPArr.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.targetAudience) {
    const { primaryProfile, secondaryAudiences, painPoints, idealCustomerProfile } = data.targetAudience;

    if (primaryProfile) {
      doc.text('Primary Audience Profile:', 20, y);
      y += 6;
      const lines = doc.splitTextToSize(primaryProfile, 170);
      doc.text(lines, 30, y);
      y += lines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
    if (secondaryAudiences && secondaryAudiences.length) {
      doc.text('Secondary Audiences:', 20, y);
      y += 6;
      secondaryAudiences.forEach((aud) => {
        doc.text(`• ${aud}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (painPoints && painPoints.length) {
      doc.text('Pain Points:', 20, y);
      y += 6;
      painPoints.forEach((pp) => {
        doc.text(`• ${pp}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (idealCustomerProfile) {
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.text('Ideal Customer Profile', 20, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      y += 8;

      const {
        problem,
        journey,
        desires,
        desiredState,
        gap,
        uniqueSellingPoint,
        benefits,
        objections
      } = idealCustomerProfile;

      if (problem) {
        doc.text('Problem:', 20, y);
        y += 6;
        const lines = doc.splitTextToSize(problem, 170);
        doc.text(lines, 30, y);
        y += lines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
      if (journey) {
        doc.text('Journey:', 20, y);
        y += 6;
        const lines = doc.splitTextToSize(journey, 170);
        doc.text(lines, 30, y);
        y += lines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
      if (desires && desires.length) {
        doc.text('Desires:', 20, y);
        y += 6;
        desires.forEach((ds) => {
          doc.text(`• ${ds}`, 30, y);
          y += 6;
          y = maybeAddPage(doc, y);
        });
        y += 4;
      }
      if (desiredState) {
        doc.text('Desired State:', 20, y);
        y += 6;
        const lines = doc.splitTextToSize(desiredState, 170);
        doc.text(lines, 30, y);
        y += lines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
      if (gap) {
        doc.text('Gap:', 20, y);
        y += 6;
        const lines = doc.splitTextToSize(gap, 170);
        doc.text(lines, 30, y);
        y += lines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
      if (uniqueSellingPoint) {
        doc.text('Unique Selling Point:', 20, y);
        y += 6;
        const lines = doc.splitTextToSize(uniqueSellingPoint, 170);
        doc.text(lines, 30, y);
        y += lines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
      if (benefits && benefits.length) {
        doc.text('Benefits:', 20, y);
        y += 6;
        benefits.forEach((b) => {
          doc.text(`• ${b}`, 30, y);
          y += 6;
          y = maybeAddPage(doc, y);
        });
        y += 4;
      }
      if (objections && objections.length) {
        doc.text('Common Objections:', 20, y);
        y += 6;
        objections.forEach((obj) => {
          doc.text(`• ${obj}`, 30, y);
          y += 6;
          y = maybeAddPage(doc, y);
        });
        y += 4;
      }
    }
  }

  // SECTION 4: CUSTOMER JOURNEY
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('4) Customer Journey', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const journeyVP = `Mapping each phase of the customer journey helps you create tailored 
content and touchpoints that guide them from awareness to loyalty.`;
  const journeyVPArr = doc.splitTextToSize(journeyVP, 170);
  doc.text(journeyVPArr, 20, (y += 6));
  y += journeyVPArr.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.customerJourney) {
    const { awareness, consideration, decision, retention } = data.customerJourney;

    if (awareness && awareness.length) {
      doc.text('Awareness Channels:', 20, y);
      y += 6;
      awareness.forEach((item) => {
        doc.text(`• ${item}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (consideration && consideration.length) {
      doc.text('Consideration / Trust-Building:', 20, y);
      y += 6;
      consideration.forEach((item) => {
        doc.text(`• ${item}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (decision) {
      doc.text('Decision / Purchase Process:', 20, y);
      y += 6;
      const decLines = doc.splitTextToSize(decision, 170);
      doc.text(decLines, 30, y);
      y += decLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
    if (retention && retention.length) {
      doc.text('Retention & Referral Strategies:', 20, y);
      y += 6;
      retention.forEach((item) => {
        doc.text(`• ${item}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
  }

  // SECTION 5: SWOT
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('5) SWOT Analysis', 20, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const swotVP = `Assessing strengths, weaknesses, opportunities, and threats 
enables strategic planning that builds on advantages and mitigates risks.`;
  const swotVPArr = doc.splitTextToSize(swotVP, 170);
  doc.text(swotVPArr, 20, (y += 6));
  y += swotVPArr.length * 5 + 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  if (data.swot) {
    const { strengths, weaknesses, opportunities, threats, matchingStrengthsToOpp,
      addressWeaknessesThreats,
      swotPriorities,
      actionSteps,
      responsibilities,
      swotSummary } = data.swot;

    if (strengths && strengths.length) {
      doc.text('Strengths:', 20, y);
      y += 6;
      strengths.forEach((s) => {
        doc.text(`• ${s}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (weaknesses && weaknesses.length) {
      doc.text('Weaknesses:', 20, y);
      y += 6;
      weaknesses.forEach((w) => {
        doc.text(`• ${w}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (opportunities && opportunities.length) {
      doc.text('Opportunities:', 20, y);
      y += 6;
      opportunities.forEach((opp) => {
        doc.text(`• ${opp}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (threats && threats.length) {
      doc.text('Threats:', 20, y);
      y += 6;
      threats.forEach((t) => {
        doc.text(`• ${t}`, 30, y);
        y += 6;
        y = maybeAddPage(doc, y);
      });
      y += 4;
    }
    if (matchingStrengthsToOpp || addressWeaknessesThreats) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('SWOT: Matching & Converting', 20, y);
      y += 6;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      const matchExplain = `Now that you've identified S/W/O/T, consider how to leverage strengths to seize
  opportunities and address weaknesses to prevent threats. This transforms insights into strategy.`;
      const matchLines = doc.splitTextToSize(matchExplain, 170);
      doc.text(matchLines, 20, (y += 6));
      y += matchLines.length * 5 + 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
  
      if (matchingStrengthsToOpp) {
        doc.text('Leveraging Strengths & Opportunities:', 20, y);
        y += 6;
        const soLines = doc.splitTextToSize(matchingStrengthsToOpp, 170);
        doc.text(soLines, 30, y);
        y += soLines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
  
      if (addressWeaknessesThreats) {
        doc.text('Addressing Weaknesses & Threats:', 20, y);
        y += 6;
        const wtLines = doc.splitTextToSize(addressWeaknessesThreats, 170);
        doc.text(wtLines, 30, y);
        y += wtLines.length * 6 + 4;
        y = maybeAddPage(doc, y);
      }
    }
  
    if (swotPriorities) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('SWOT Prioritization', 20, y);
      y += 6;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      const prioExplain = `List which SWOT factors need immediate attention. This ensures you tackle
  the most critical items first and optimize resource allocation.`;
      const prioLines = doc.splitTextToSize(prioExplain, 170);
      doc.text(prioLines, 20, (y += 6));
      y += prioLines.length * 5 + 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
  
      const pLines = doc.splitTextToSize(swotPriorities, 170);
      doc.text(pLines, 30, y);
      y += pLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
  
    if (actionSteps) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Action Steps & Timelines', 20, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      const asExplain = `Define the specific tasks, milestones, and deadlines to turn
  SWOT insights into tangible outcomes.`;
      const asLines = doc.splitTextToSize(asExplain, 170);
      doc.text(asLines, 20, (y += 6));
      y += asLines.length * 5 + 4;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
  
      const aLines = doc.splitTextToSize(actionSteps, 170);
      doc.text(aLines, 30, y);
      y += aLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
  
    if (responsibilities) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Assigning Responsibilities', 20, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      const respExplain = `Clearly define who owns each SWOT-related task. Regular check-ins ensure
  everyone stays accountable and progress is tracked effectively.`;
      const respLines = doc.splitTextToSize(respExplain, 170);
      doc.text(respLines, 20, (y += 6));
      y += respLines.length * 5 + 4;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
  
      const rLines = doc.splitTextToSize(responsibilities, 170);
      doc.text(rLines, 30, y);
      y += rLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
  
    if (swotSummary) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('SWOT Summary & Next Steps', 20, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      const sumExplain = `Wrap up how the SWOT analysis informs your overall strategy and the immediate
  actions you’ll take to maintain momentum.`;
      const sumLines = doc.splitTextToSize(sumExplain, 170);
      doc.text(sumLines, 20, (y += 6));
      y += sumLines.length * 5 + 4;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
  
      const sLines = doc.splitTextToSize(swotSummary, 170);
      doc.text(sLines, 30, y);
      y += sLines.length * 6 + 4;
      y = maybeAddPage(doc, y);
    }
  }
  return doc;
}
