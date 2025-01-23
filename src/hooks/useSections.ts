
/***************************************
 FILE 4: src/hooks/useSections.ts
***************************************/
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Pillar1Data } from '@/types/pillar1';
import {
  validateBrandIdentity,
  validateVision,
  validateExecutionRoadmap,
  validateWireframe
} from '@/utils/brandIdentityValidation';
import {
  generateBrandIdentityPDF,
  generateVisionWorksheetPDF,
  generateExecutionRoadmapPDF,
  generateWireframePDF
} from '@/utils/pdfUtils';

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
    pdfFn: generateVisionWorksheetPDF,
    title: 'Vision & Goals'
  },
  3: {
    key: 'executionRoadmap',
    validateFn: validateExecutionRoadmap,
    pdfFn: generateExecutionRoadmapPDF,
    title: '30-Day Roadmap'
  },
  4: {
    key: 'wireframe',
    validateFn: validateWireframe,
    pdfFn: generateWireframePDF,
    title: 'Wireframe Template'
  }
};

interface SectionValidationState {
  brandIdentity: boolean;
  vision: boolean;
  executionRoadmap: boolean;
  wireframe: boolean;
}

interface UseSectionsProps {
  data: Pillar1Data | null;
}

export function useSections({ data }: UseSectionsProps) {
  const [activeSection, setActiveSection] = useState(1);
  const [sectionValidation, setSectionValidation] = useState<SectionValidationState>({
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    wireframe: false
  });
  const [downloadedPdfs, setDownloadedPdfs] = useState<SectionValidationState>({
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    wireframe: false
  });

  // Re-validate each time data changes
  useEffect(() => {
    setSectionValidation({
      brandIdentity: validateBrandIdentity(data?.brandIdentity).success,
      vision: validateVision(data?.vision).success,
      executionRoadmap: validateExecutionRoadmap(data?.executionRoadmap).success,
      wireframe: validateWireframe(data?.wireframe).success
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
      // If pdfFn returns a Promise<void>, we await
      const outcome = cfg.pdfFn(data[cfg.key]);
      if (outcome instanceof Promise) {
        await outcome; // Vision
      } else {
        // brandIdentity, roadmap, wireframe: returns jsPDF doc
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
    if (nextSec > 4) return;
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
