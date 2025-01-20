/** @jsxImportSource @react-pdf/renderer */
import React from 'react';
import { pdf, Document } from '@react-pdf/renderer';
import { VisionWorksheetPDF } from '../components/pdf/VisionWorksheetPDF';
import { Pillar1Data, BrandIdentityData, VisionData, ExecutionRoadmapData, WireframeData } from '../types/pillar1';
import { jsPDF } from 'jspdf';

const generateSectionTitle = (doc: jsPDF, title: string, y: number) => {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, y);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  return y + 10;
};

const generateField = (doc: jsPDF, label: string, value: string | string[], y: number) => {
  doc.setFont('helvetica', 'bold');
  doc.text(label, 20, y);
  doc.setFont('helvetica', 'normal');
  
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      doc.text(`• ${item}`, 30, y + 6 + (index * 6));
    });
    return y + 6 + (value.length * 6);
  } else {
    const lines = doc.splitTextToSize(value, 170);
    doc.text(lines, 30, y + 6);
    return y + 6 + (lines.length * 6);
  }
};

export const generateBrandIdentityPDF = (data?: BrandIdentityData) => {
  if (!data) return new jsPDF();
  
  const doc = new jsPDF();
  let y = 20;

  y = generateSectionTitle(doc, 'Brand Identity Worksheet', y);
  
  // Reflection
  y = generateSectionTitle(doc, 'Who You Are', y + 10);
  y = generateField(doc, 'Who Am I?', data?.reflection?.whoIAm || '', y);
  y = generateField(doc, 'Who Am I Not?', data?.reflection?.whoIAmNot || '', y + 5);
  y = generateField(doc, 'Why Build This Brand?', data?.reflection?.whyBuildBrand || '', y + 5);

  // Personality
  y = generateSectionTitle(doc, 'Brand Personality', y + 10);
  y = generateField(doc, 'Communication Style:', data?.personality?.communicationStyle || '', y);
  y = generateField(doc, 'Tone and Voice:', data?.personality?.toneAndVoice || '', y + 5);
  y = generateField(doc, 'Passionate Expression:', data?.personality?.passionateExpression || '', y + 5);
  y = generateField(doc, 'Brand Personality:', data?.personality?.brandPersonality || '', y + 5);

  // Story
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  y = generateSectionTitle(doc, 'Brand Story', y + 10);
  y = generateField(doc, 'Pivotal Experience:', data?.story?.pivotalExperience || '', y);
  y = generateField(doc, 'Defining Moment:', data?.story?.definingMoment || '', y + 5);
  y = generateField(doc, 'Audience Relevance:', data?.story?.audienceRelevance || '', y + 5);

  // Differentiation
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  y = generateSectionTitle(doc, 'Differentiation', y + 10);
  y = generateField(doc, 'Unique Approach:', data?.differentiation?.uniqueApproach || '', y);
  y = generateField(doc, 'Unique Resources:', data?.differentiation?.uniqueResources || '', y + 5);
  y = generateField(doc, 'Competitive Perception:', data?.differentiation?.competitivePerception || '', y + 5);

  return doc;
};

export const generateExecutionRoadmapPDF = (data?: ExecutionRoadmapData) => {
  if (!data) return new jsPDF();
  
  const doc = new jsPDF();
  let y = 20;

  y = generateSectionTitle(doc, '30-Day Execution Roadmap', y);
  y = generateField(doc, '30-Day Goal:', data?.thirtyDayGoal || '', y + 10);
  y = generateField(doc, 'Weekly Milestones:', data?.weeklyMilestones || [], y + 10);
  y = generateField(doc, 'Content Plan:', data?.contentPlan || '', y + 10);
  y = generateField(doc, 'Immediate Actions:', data?.immediateActions || [], y + 10);

  return doc;
};

export const generateWireframePDF = (data?: WireframeData) => {
  if (!data) return new jsPDF();
  
  const doc = new jsPDF();
  let y = 20;

  y = generateSectionTitle(doc, 'Website Wireframe Plan', y);
  
  // Layout
  y = generateSectionTitle(doc, 'Layout', y + 10);
  y = generateField(doc, 'Header:', data?.layout?.header || '', y);
  y = generateField(doc, 'Navigation:', data?.layout?.navigation || '', y + 5);
  y = generateField(doc, 'Main Content:', data?.layout?.mainContent || '', y + 5);
  y = generateField(doc, 'Footer:', data?.layout?.footer || '', y + 5);

  // Components
  y = generateSectionTitle(doc, 'Components', y + 10);
  y = generateField(doc, 'Call to Action:', data?.components?.callToAction || '', y);
  y = generateField(doc, 'Featured Sections:', data?.components?.featuredSections || [], y + 5);
  y = generateField(doc, 'Content Blocks:', data?.components?.contentBlocks || [], y + 5);

  // Styling
  y = generateSectionTitle(doc, 'Styling', y + 10);
  y = generateField(doc, 'Color Scheme:', data?.styling?.colorScheme || '', y);
  y = generateField(doc, 'Typography:', data?.styling?.typography || '', y + 5);
  y = generateField(doc, 'Spacing:', data?.styling?.spacing || '', y + 5);

  return doc;
};

export const generateVisionWorksheetPDF = async (data?: VisionData) => {
  try {
    // Create the PDF document
    const blob = await pdf((
      React.createElement(Document, {}, 
        React.createElement(VisionWorksheetPDF, { data })
      )
    )).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data?.businessName || 'vision'}-worksheet.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
