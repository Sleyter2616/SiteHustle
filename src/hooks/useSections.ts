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
  // Accept an optional function for saving data:
  saveDataToServer?: (data: Pillar1Data) => Promise<void>;
}

export function useSections({ data, saveDataToServer }: UseSectionsProps) {
  const [activeSection, setActiveSection] = useState(0);

  // Whether each section is valid
  const [sectionValidation, setSectionValidation] = useState<SectionValidationState>({
    intro: true,
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    conclusion: false
  });

  // Whether each PDF has been downloaded
  const [downloadedPdfs, setDownloadedPdfs] = useState<SectionValidationState>({
    intro: false,
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    conclusion: false
  });

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
    if (targetSection === 0) return true;
    const prevSection = targetSection - 1;
    const prevKey = sectionConfig[prevSection].key;
    const prevPdfFn = sectionConfig[prevSection].pdfFn;

    const isPrevValid = sectionValidation[prevKey];
    if (prevPdfFn) {
      const isPrevPdfDownloaded = downloadedPdfs[prevKey];
      return isPrevValid && isPrevPdfDownloaded;
    } else {
      return isPrevValid;
    }
  }

  // Download PDF for a section. No next-section logic here.
  async function handleDownloadPdf(e: React.MouseEvent, sectionNumber: number) {
    e.preventDefault();
    e.stopPropagation();

    if (!data) {
      toast.error('No data to generate PDF');
      return;
    }
    const cfg = sectionConfig[sectionNumber];
    if (!cfg.pdfFn) {
      toast.error(`No PDF available for ${cfg.title}`);
      return;
    }

    // Validate the data
    const validationResult = cfg.validateFn(data[cfg.key]);
    if (!validationResult.success) {
      toast.error(`Please fill out all required fields for ${cfg.title} first.`);
      return;
    }

    try {
      // 1) Optionally save data if shouldSave is true
      if (saveDataToServer && cfg.shouldSave) {
        await saveDataToServer(data);
        // We intentionally do NOT show a success toast here to avoid double toast
      }

      // 2) Generate PDF
      const docOrPromise = cfg.pdfFn(data[cfg.key]);
      if (docOrPromise instanceof Promise) {
        await docOrPromise;
      } else {
        docOrPromise.save(`${cfg.title}.pdf`);
      }

      // 3) Show single success toast
      setDownloadedPdfs(prev => ({ ...prev, [cfg.key]: true }));
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast.error(`Failed to generate ${cfg.title} PDF. Please try again.`);
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