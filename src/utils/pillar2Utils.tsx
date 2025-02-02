import { Pillar2Data } from '@/types/pillar2'
import { jsPDF } from 'jspdf'

// Helper functions for PDF generation
const addSectionTitle = (doc: jsPDF, title: string, y: number): number => {
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 20, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  return y + 10
}

const addContent = (doc: jsPDF, content: string, y: number): number => {
  doc.setFontSize(12)
  const lines = doc.splitTextToSize(content, 170)
  doc.text(lines, 20, y)
  return y + lines.length * 7
}

const maybeAddPage = (doc: jsPDF, y: number): number => {
  if (y > 270) {
    doc.addPage()
    return 20
  }
  return y
}

export const generatePillar2PDF = (data: Pillar2Data): jsPDF => {
  const doc = new jsPDF()
  let y = 20

  // Title
  y = addSectionTitle(doc, 'Pillar 2: Tool Selection & AI Bootcamp', y)
  y += 10

  // Overview
  y = addSectionTitle(doc, 'Overview', y)
  y = addContent(doc, data.toolsLandscape?.overviewNotes || 'No overview notes provided.', y)
  y = maybeAddPage(doc, y + 10)

  // Tools Landscape
  y = addSectionTitle(doc, 'Tools Landscape', y)
  const toolsContent = `Selected Tools: ${data.toolsLandscape.selectedTools.join(', ')}\n\nTool Ratings:\n` +
    Object.entries(data.toolsLandscape.toolRatings)
      .map(([tool, rating]) => `${tool}: ${rating}/5`)
      .join('\n')
  y = addContent(doc, toolsContent, y)
  y = maybeAddPage(doc, y + 10)

  // Decision Matrix
  y = addSectionTitle(doc, 'Decision Matrix', y)
  const matrixContent = Object.entries(data.decisionMatrix)
    .map(([tool, scores]) => 
      `${tool}:\n` +
      `- Ease of Use: ${scores.easeOfUse}/5\n` +
      `- Cost: ${scores.cost}/5\n` +
      `- Scalability: ${scores.scalability}/5\n` +
      `- AI Integration: ${scores.aiIntegration}/5`
    ).join('\n\n')
  y = addContent(doc, matrixContent, y)
  y = maybeAddPage(doc, y + 10)

  // AI Bootcamp Module
  y = addSectionTitle(doc, 'AI Bootcamp Module', y)
  const bootcampContent = [
    'Content Draft:',
    data.aiBootcampModule.contentDraft,
    '\nVisual Assets:',
    data.aiBootcampModule.visualAssets.join(', '),
    '\nAutomation Workflow:',
    data.aiBootcampModule.automationWorkflow,
    '\nResearch Summary:',
    data.aiBootcampModule.researchSummary
  ].join('\n')
  y = addContent(doc, bootcampContent, y)
  y = maybeAddPage(doc, y + 10)

  // Setup & Configuration
  y = addSectionTitle(doc, 'Setup & Configuration', y)
  const setupContent = [
    `Account Setup: ${data.setupGuides.accountSetupComplete ? 'Complete' : 'Incomplete'}`,
    '\nIntegration Notes:',
    data.setupGuides.integrationNotes
  ].join('\n')
  y = addContent(doc, setupContent, y)
  y = maybeAddPage(doc, y + 10)

  // Best Practices
  y = addSectionTitle(doc, 'Best Practices', y)
  const practicesContent = [
    'Recommendations:',
    data.bestPractices.recommendations.join('\n'),
    '\nPro Tips:',
    data.bestPractices.proTips
  ].join('\n')
  y = addContent(doc, practicesContent, y)

  return doc
}

export const validatePillar2Data = (data: Pillar2Data): boolean => {
  // Basic validation rules
  if (!data) return false

  // Check if required fields are present and not empty
  const hasRequiredFields = 
    data.toolsLandscape?.selectedTools?.length > 0 &&
    Object.keys(data.decisionMatrix).length > 0 &&
    data.aiBootcampModule?.contentDraft?.trim().length > 0 &&
    data.setupGuides?.integrationNotes?.trim().length > 0

  // Check if at least one tool has been evaluated
  const hasToolEvaluation = 
    Object.keys(data.toolsLandscape.toolRatings).length > 0

  // Check if AI bootcamp module has required content
  const hasAiBootcampContent = 
    data.aiBootcampModule.contentDraft.trim().length > 0 &&
    data.aiBootcampModule.automationWorkflow.trim().length > 0

  return hasRequiredFields && hasToolEvaluation && hasAiBootcampContent
}

export function getCompletionPercentage(data: Pillar2Data): number {
  if (!data) return 0

  const totalSteps = 5
  let completedSteps = 0

  if (data.toolsLandscape?.selectedTools?.length > 0) completedSteps++
  if (Object.keys(data.decisionMatrix || {}).length > 0) completedSteps++
  if (data.aiBootcampModule?.contentDraft?.trim().length > 0) completedSteps++
  if (data.setupGuides?.setupSteps?.length > 0) completedSteps++
  if (data.bestPractices?.recommendations?.length > 0) completedSteps++

  return Math.round((completedSteps / totalSteps) * 100)
}