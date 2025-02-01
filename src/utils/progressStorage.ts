// src/utils/progressStorage.ts

interface PillarProgress {
  completedSections: number[];
  lastActiveSection: number;
  isComplete: boolean;
  downloadedPdfs: number[];
}

interface UserProgress {
  pillar1?: PillarProgress;
  pillar2?: PillarProgress;
  pillar3?: PillarProgress;
  pillar4?: PillarProgress;
}

const PROGRESS_KEY = 'sitehustle_progress';

export function saveProgress(pillarNum: number, progress: PillarProgress): void {
  try {
    // Get existing progress
    const existingProgress: UserProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    
    // Update progress for specific pillar
    existingProgress[`pillar${pillarNum}`] = progress;
    
    // Save back to localStorage
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(existingProgress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function getProgress(pillarNum: number): PillarProgress | null {
  try {
    const progress: UserProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    return progress[`pillar${pillarNum}`] || null;
  } catch (error) {
    console.error('Error getting progress:', error);
    return null;
  }
}

export function markSectionComplete(pillarNum: number, sectionNum: number): void {
  try {
    const progress = getProgress(pillarNum) || {
      completedSections: [],
      lastActiveSection: 0,
      isComplete: false,
      downloadedPdfs: []
    };
    
    if (!progress.completedSections.includes(sectionNum)) {
      progress.completedSections.push(sectionNum);
    }
    
    saveProgress(pillarNum, progress);
  } catch (error) {
    console.error('Error marking section complete:', error);
  }
}

export function updateLastActiveSection(pillarNum: number, sectionNum: number): void {
  try {
    const progress = getProgress(pillarNum) || {
      completedSections: [],
      lastActiveSection: 0,
      isComplete: false,
      downloadedPdfs: []
    };
    
    progress.lastActiveSection = sectionNum;
    saveProgress(pillarNum, progress);
  } catch (error) {
    console.error('Error updating last active section:', error);
  }
}

export function markPillarComplete(pillarNum: number): void {
  try {
    const progress = getProgress(pillarNum) || {
      completedSections: [],
      lastActiveSection: 0,
      isComplete: false,
      downloadedPdfs: []
    };
    
    progress.isComplete = true;
    saveProgress(pillarNum, progress);
  } catch (error) {
    console.error('Error marking pillar complete:', error);
  }
}

export function isPillarComplete(pillarNum: number): boolean {
  const progress = getProgress(pillarNum);
  return progress?.isComplete || false;
}

export function getLastActiveSection(pillarNum: number): number {
  const progress = getProgress(pillarNum);
  return progress?.lastActiveSection || 0;
}

export function isSectionComplete(pillarNum: number, sectionNum: number): boolean {
  const progress = getProgress(pillarNum);
  return progress?.completedSections.includes(sectionNum) || false;
}

export function markPdfDownloaded(pillarNum: number, sectionNum: number): void {
  try {
    const progress = getProgress(pillarNum) || {
      completedSections: [],
      lastActiveSection: 0,
      isComplete: false,
      downloadedPdfs: []
    };
    
    if (!progress.downloadedPdfs.includes(sectionNum)) {
      progress.downloadedPdfs.push(sectionNum);
    }
    
    saveProgress(pillarNum, progress);
  } catch (error) {
    console.error('Error marking PDF downloaded:', error);
  }
}

export function isPdfDownloaded(pillarNum: number, sectionNum: number): boolean {
  const progress = getProgress(pillarNum);
  return progress?.downloadedPdfs?.includes(sectionNum) || false;
}
