import React from 'react';
import { pdf, Document, DocumentProps } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';
import { toast } from 'react-hot-toast';
import {
  BrandIdentityData,
  ExecutionRoadmapData,
  WireframeData,
  VisionData
} from '@/types/pillar1';
import { VisionWorksheetPDF } from '@/components/vision/VisionWorksheet'; // must return <Page> from @react-pdf/renderer

// Reuse existing helpers
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
     - Reflection, Personality, Story, Differentiation
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

  /***************************
   * Reflection
   ***************************/
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Reflection', 20, y);
  y += 6;
  // SECTION VALUE PROP:
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
    // INPUT VALUE PROP
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const whoIAmVP = `Articulating who you are ensures your brand voice is rooted in authenticity, 
fostering trust and relatability.`;
    const whoIAmVPLines = doc.splitTextToSize(whoIAmVP, 170);
    doc.text(whoIAmVPLines, 30, y);
    y += whoIAmVPLines.length * 5 + 4;

    // Show user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.reflection.whoIAm, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // whoIAmNot
  if (data.reflection?.whoIAmNot) {
    doc.text('Who I Am Not:', 20, y);
    y += 6;
    // INPUT VALUE PROP
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const whoIAmNotVP = `Knowing what you don't stand for helps define clear boundaries and 
keeps your brand experience consistent.`;
    const whoIAmNotLines = doc.splitTextToSize(whoIAmNotVP, 170);
    doc.text(whoIAmNotLines, 30, y);
    y += whoIAmNotLines.length * 5 + 4;

    // Show user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.reflection.whoIAmNot, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  // whyBuildBrand
  if (data.reflection?.whyBuildBrand) {
    doc.text('Why Build This Brand:', 20, y);
    y += 6;
    // INPUT VALUE PROP
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const whyBrandVP = `Defining your deeper motivation aligns your brand with a purpose that 
customers can champion, fueling loyalty and advocacy.`;
    const whyBrandLines = doc.splitTextToSize(whyBrandVP, 170);
    doc.text(whyBrandLines, 30, y);
    y += whyBrandLines.length * 5 + 4;

    // Show user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.reflection.whyBuildBrand, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  /***************************
   * Personality
   ***************************/
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Personality', 20, y);
  y += 6;
  // SECTION VALUE PROP
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

    // user data
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.personality.toneAndVoice, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.personality.passionateExpression, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.personality.brandPersonality, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  /***************************
   * Story
   ***************************/
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Story', 20, y);
  y += 6;
  // SECTION VALUE PROP
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.story.pivotalExperience, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.story.definingMoment, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.story.audienceRelevance, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  /***************************
   * Differentiation
   ***************************/
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Differentiation', 20, y);
  y += 6;
  // SECTION VALUE PROP
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.differentiation.uniqueApproach, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.differentiation.uniqueResources, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
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

    // user data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.differentiation.competitivePerception, 170);
    doc.text(lines, 30, y);
    y += lines.length * 6 + 4;
    y = maybeAddPage(doc, y);
  }

  return doc;
}

/************************************************************
 2) EXECUTION ROADMAP (jsPDF) [unchanged, no additional VPs requested]
************************************************************/
export function generateExecutionRoadmapPDF(data?: ExecutionRoadmapData): jsPDF {
  const doc = new jsPDF();
  let y = 20;

  y = addSectionTitle(doc, '30-Day Execution Roadmap', y);
  y = addExplanation(
    doc,
    'A roadmap sets short-term goals, weekly milestones, content plans, and immediate actions—helping you maintain momentum.',
    y
  );

  if (!data) {
    y += 10;
    doc.text('No Execution Roadmap data provided.', 20, y);
    return doc;
  }

  y += 10;
  if (data.thirtyDayGoal) {
    doc.text(`30-Day Goal: ${data.thirtyDayGoal}`, 20, y);
    y += 8;
  }
  if (data.weeklyMilestones && data.weeklyMilestones.length > 0) {
    doc.text('Weekly Milestones:', 20, y);
    y += 6;
    data.weeklyMilestones.forEach((mile) => {
      doc.text(`• ${mile}`, 30, y);
      y += 6;
      y = maybeAddPage(doc, y);
    });
    y += 4;
  }
  if (data.contentPlan) {
    doc.text(`Content Plan: ${data.contentPlan}`, 20, y);
    y += 8;
    y = maybeAddPage(doc, y);
  }
  if (data.immediateActions && data.immediateActions.length > 0) {
    doc.text('Immediate Actions:', 20, y);
    y += 6;
    data.immediateActions.forEach((action) => {
      doc.text(`• ${action}`, 30, y);
      y += 6;
      y = maybeAddPage(doc, y);
    });
    y += 4;
  }

  return doc;
}

/************************************************************
 3) WIREFRAME (jsPDF) [unchanged, no additional VPs requested]
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
 4) VISION (react-pdf) [unchanged, no additional VPs requested]
************************************************************/
export async function generateVisionWorksheetPDF(data?: VisionData): Promise<void> {
  try {
    const docElem = React.createElement(
      Document,
      {} as DocumentProps,
      React.createElement(VisionWorksheetPDF, { data })
    );
    const blob = await pdf(docElem).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = data?.businessName ? `${data.businessName}-vision.pdf` : 'vision-worksheet.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error generating Vision PDF:', err);
    toast.error('Failed to generate Vision PDF. Please try again.');
    throw err;
  }
}
