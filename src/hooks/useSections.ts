// src/hooks/useSections.ts
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Pillar1Data } from '@/types/pillar1';
import {
  generateBrandIdentityPDF,
  generateVisionPDF,
  generateExecutionRoadmapPDF,
  // generateWireframePDF, <-- removed
  validateBrandIdentity,
  validateVision,
  validateExecutionRoadmap,
  // validateWireframe <-- removed
} from '@/utils/pdfUtils'

// Now we define only 3 sections for Pillar 1:
const sectionConfig = {
  1: {
    key: 'brandIdentity',
    validateFn: validateBrandIdentity,
    pdfFn: generateBrandIdentityPDF,
    title: 'Who You Are & Why'
  },
  2: {
    key: 'vision',
    validateFn: validateVision,
    pdfFn: generateVisionPDF,
    title: 'Vision & Goals'
  },
  3: {
    key: 'executionRoadmap',
    validateFn: validateExecutionRoadmap,
    pdfFn: generateExecutionRoadmapPDF,
    title: '30-Day Roadmap'
  }
  // removed wireframe
};

interface SectionValidationState {
  brandIdentity: boolean;
  vision: boolean;
  executionRoadmap: boolean;
}

interface UseSectionsProps {
  data: Pillar1Data | null;
}

export function useSections({ data }: UseSectionsProps) {
  const [activeSection, setActiveSection] = useState(1);
  const [sectionValidation, setSectionValidation] = useState<SectionValidationState>({
    brandIdentity: false,
    vision: false,
    executionRoadmap: false
  });
  const [downloadedPdfs, setDownloadedPdfs] = useState<SectionValidationState>({
    brandIdentity: false,
    vision: false,
    executionRoadmap: false
  });

  // Re-validate each time data changes
  useEffect(() => {
    setSectionValidation({
      brandIdentity: validateBrandIdentity(data?.brandIdentity).success,
      vision: validateVision(data?.vision).success,
      executionRoadmap: validateExecutionRoadmap(data?.executionRoadmap).success
    });
  }, [data]);

  // Basic gating logic: can't jump to section N if N-1 not done + PDF not downloaded
  function canAccessSection(targetSection: number): boolean {
    if (targetSection === 1) return true;
    const prevSection = targetSection - 1;
    const prevKey = sectionConfig[prevSection].key;
    return sectionValidation[prevKey] && downloadedPdfs[prevKey];
  }

  async function handleDownloadPDF(sectionNumber: number) {
    if (!data) {
      toast.error('No data to generate PDF');
      return;
    }
    const cfg = sectionConfig[sectionNumber];
    // Validate data for the section
    const result = cfg.validateFn(data[cfg.key]);
    if (!result.success) {
      toast.error(`Please fill out all required fields for ${cfg.title} first.`);
      return;
    }
    try {
      const outcome = cfg.pdfFn(data[cfg.key]);
      // If it's Vision (react-pdf approach), we handle an async promise
      if (outcome instanceof Promise) {
        await outcome; 
      } else {
        // brandIdentity or roadmap returns a jsPDF doc
        outcome.save(`${cfg.title}.pdf`);
      }
      toast.success(`${cfg.title} PDF downloaded successfully!`);
      setDownloadedPdfs(prev => ({ ...prev, [cfg.key]: true }));
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast.error(`Failed to generate ${cfg.title} PDF. Please try again.`);
    }
  }

  function handleNext() {
    const nextSec = activeSection + 1;
    // Now that we have only 3 sections, if nextSec > 3, do nothing
    if (nextSec > 3) return;
    if (!canAccessSection(nextSec)) {
      const { title } = sectionConfig[activeSection];
      toast.error(`Please complete and download the ${title} PDF first`);
      return;
    }
    setActiveSection(nextSec);
  }

  function goToSection(targetSection: number) {
    if (!canAccessSection(targetSection)) {
      const { title } = sectionConfig[targetSection - 1];
      toast.error(`Please complete and download the ${title} PDF first`);
      return;
    }
    setActiveSection(targetSection);
  }

  return {
    activeSection,
    sectionValidation,
    downloadedPdfs,
    handleDownloadPDF,
    goToSection,
    handleNext,
    canAccessSection,
    sectionConfig
  };
}