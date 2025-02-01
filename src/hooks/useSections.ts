import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Pillar1Data } from '@/types/pillar1';
import {
  generateBrandIdentityPDF,
  generateVisionPDF,
  generateExecutionRoadmapPDF,
  validateBrandIdentity,
  validateVision,
  validateExecutionRoadmap,
} from '@/utils/pdfUtils';
import { 
  getLastActiveSection, 
  markPdfDownloaded, 
  isPdfDownloaded 
} from '@/utils/progressStorage';

// Now we define 5 sections for Pillar 1:
const sectionConfig = {
  0: {
    key: 'intro',
    validateFn: () => true,
    pdfFn: null,
    title: 'Introduction',
    shouldSave: false
  },
  1: {
    key: 'brandIdentity',
    validateFn: validateBrandIdentity,
    pdfFn: generateBrandIdentityPDF,
    title: 'Brand Identity',
    shouldSave: true
  },
  2: {
    key: 'vision',
    validateFn: validateVision,
    pdfFn: generateVisionPDF,
    title: 'Vision & Goals',
    shouldSave: true
  },
  3: {
    key: 'executionRoadmap',
    validateFn: validateExecutionRoadmap,
    pdfFn: generateExecutionRoadmapPDF,
    title: 'Execution Plan',
    shouldSave: true
  },
  4: {
    key: 'conclusion',
    validateFn: () => true,
    pdfFn: null,
    title: 'Completion',
    shouldSave: false
  }
};

interface SectionValidationState {
  intro: boolean;
  brandIdentity: boolean;
  vision: boolean;
  executionRoadmap: boolean;
  conclusion: boolean;
}

interface UseSectionsProps {
  data: Pillar1Data | null;
  pillarNumber: number;
  // Accept an optional function for saving data:
  saveDataToServer?: (data: Pillar1Data) => Promise<void>;
}

export function useSections({ data, pillarNumber, saveDataToServer }: UseSectionsProps) {
  // Initialize with stored section or 0
  const [activeSection, setActiveSection] = useState(() => {
    const lastSection = getLastActiveSection(pillarNumber);
    return lastSection || 0;
  });

  // Whether each section is valid
  const [sectionValidation, setSectionValidation] = useState<SectionValidationState>({
    intro: true,
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    conclusion: false
  });

  // Initialize downloaded PDFs from storage
  const [downloadedPdfs, setDownloadedPdfs] = useState<SectionValidationState>(() => ({
    intro: false,
    brandIdentity: isPdfDownloaded(pillarNumber, 1),
    vision: isPdfDownloaded(pillarNumber, 2),
    executionRoadmap: isPdfDownloaded(pillarNumber, 3),
    conclusion: false
  }));

  // On data changes, re-validate
  useEffect(() => {
    setSectionValidation({
      intro: true,
      brandIdentity: validateBrandIdentity(data?.brandIdentity).success,
      vision: validateVision(data?.vision).success,
      executionRoadmap: validateExecutionRoadmap(data?.executionRoadmap).success,
      conclusion: true
    });
  }, [data]);

  // Checking if user can go to that section
  function canAccessSection(targetSection: number): boolean {
    if (targetSection === 0 || targetSection === 4) return true;
    
    // If we have data for this section, allow access
    const sectionKey = sectionConfig[targetSection].key;
    if (data && data[sectionKey]) {
      return true;
    }

    // Otherwise, check if previous section is completed
    const prevSection = targetSection - 1;
    const prevKey = sectionConfig[prevSection].key;
    return sectionValidation[prevKey];
  }

  // Handle PDF download
  async function handleDownloadPdf(e: React.MouseEvent, sectionIndex: number) {
    e.preventDefault();
    const section = sectionConfig[sectionIndex];
    if (!section.pdfFn || !data) return;

    try {
      await section.pdfFn(data);
      setDownloadedPdfs(prev => ({
        ...prev,
        [section.key]: true
      }));
      markPdfDownloaded(pillarNumber, sectionIndex);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  }

  // When user moves to the next section
  const handleNext = async () => {
    const currentCfg = sectionConfig[activeSection];
    if (saveDataToServer && data && currentCfg.shouldSave) {
      try {
        await saveDataToServer(data);
        // Remove toast here since it's shown in Pillar1Content
        // toast.success('Progress saved');
      } catch (error) {
        console.error('Error saving progress:', error);
        toast.error('Failed to save progress');
        return;
      }
    }

    const nextSec = activeSection + 1;
    if (nextSec < Object.keys(sectionConfig).length) {
      setActiveSection(nextSec);
    } else {
      toast.success('You have reached the final section');
    }
  };

  function goToSection(targetSection: number) {
    if (!canAccessSection(targetSection)) {
      const { title } = sectionConfig[targetSection - 1];
      toast.error(`Please complete and download the ${title} PDF first.`);
      return;
    }
    setActiveSection(targetSection);
  }

  return {
    activeSection,
    sectionValidation,
    downloadedPdfs,
    handleDownloadPdf,
    goToSection,
    handleNext,
    canAccessSection,
    sectionConfig
  };
}