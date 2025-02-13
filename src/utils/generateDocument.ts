// src/utils/generateDocument.ts
import { WizardData } from '@/types/wizard';
import { VisionData, BrandIdentityData, ExecutionRoadmapData } from '@/types/pillar1';
import jsPDF from 'jspdf';
import { buildFinalPrompt } from './buildFinalPrompt';

function addWrappedText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + (lines.length * 7); // Return the new Y position
}

export function generatePlanDocument(data: WizardData): Blob {
  const doc = new jsPDF();
  let yPosition = 20;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - (margin * 2);

  // Extract data from each section
  const vision = data.idea_market?.userInput as VisionData || {};
  const branding = data.branding?.userInput as BrandIdentityData || {};
  const execution = data.execution?.userInput as ExecutionRoadmapData || {};

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "Business Plan", margin, yPosition, maxWidth);
  yPosition += 10;

  // Business Vision Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "1. Business Vision", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(doc, `Business Name: ${vision.businessName || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Tagline: ${vision.tagline || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Mission Statement: ${vision.missionStatement || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Vision Statement: ${vision.visionStatement || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Core Values: ${Array.isArray(vision.coreValues) ? vision.coreValues.join(', ') : '-'}`, margin, yPosition, maxWidth);
  yPosition += 10;

  // Brand Identity Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "2. Brand Identity", margin, yPosition, maxWidth);
  yPosition += 5;

  // Reflection subsection
  doc.setFontSize(14);
  yPosition = addWrappedText(doc, "Reflection", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(doc, `Who I Am: ${branding.reflection?.whoIAm || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Who I Am Not: ${branding.reflection?.whoIAmNot || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Why Build Brand: ${branding.reflection?.whyBuildBrand || '-'}`, margin, yPosition, maxWidth);
  yPosition += 5;

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Personality subsection
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "Personality", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(doc, `Communication Style: ${branding.personality?.communicationStyle || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Tone and Voice: ${branding.personality?.toneAndVoice || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Passionate Expression: ${branding.personality?.passionateExpression || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Brand Personality: ${branding.personality?.brandPersonality || '-'}`, margin, yPosition, maxWidth);
  yPosition += 5;

  // Story subsection
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "Story", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(doc, `Pivotal Experience: ${branding.story?.pivotalExperience || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Defining Moment: ${branding.story?.definingMoment || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Audience Relevance: ${branding.story?.audienceRelevance || '-'}`, margin, yPosition, maxWidth);
  yPosition += 5;

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Differentiation subsection
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "Differentiation", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(doc, `Unique Approach: ${branding.differentiation?.uniqueApproach || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Unique Resources: ${branding.differentiation?.uniqueResources || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Competitive Perception: ${branding.differentiation?.competitivePerception || '-'}`, margin, yPosition, maxWidth);
  yPosition += 10;

  // Execution Plan Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "3. Execution Plan", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(doc, `30-Day Goal: ${execution.thirtyDayGoal || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Weekly Milestones: ${Array.isArray(execution.weeklyMilestones) ? execution.weeklyMilestones.join(', ') : '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Content Plan: ${execution.contentPlan || '-'}`, margin, yPosition, maxWidth);
  yPosition = addWrappedText(doc, `Immediate Actions: ${Array.isArray(execution.immediateActions) ? execution.immediateActions.join(', ') : '-'}`, margin, yPosition, maxWidth);
  yPosition += 10;

  // Add a new page for the AI Analysis
  doc.addPage();
  yPosition = 20;

  // AI Analysis Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(doc, "4. AI Business Plan Analysis", margin, yPosition, maxWidth);
  yPosition += 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const finalPrompt = buildFinalPrompt(data);
  yPosition = addWrappedText(doc, finalPrompt, margin, yPosition, maxWidth);

  // Return the PDF as a Blob
  return doc.output('blob');
}
