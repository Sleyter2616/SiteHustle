// src/hooks/useSections.ts
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
    validateFn: () => true, // Intro is always valid
    pdfFn: null,
    title: 'Introduction'
  },
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
    title: 'Execution Plan'
  },
  4: {
    key: 'conclusion',
    validateFn: () => true, // Conclusion is always valid
    pdfFn: null,
    title: 'Completion'
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
}

export function useSections({ data }: UseSectionsProps) {
  const [activeSection, setActiveSection] = useState(0);

  // This holds whether the user’s *data* for each worksheet is valid
  const [sectionValidation, setSectionValidation] = useState<SectionValidationState>({
    intro: true,
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    conclusion: false
  });

  // This holds whether they have *downloaded the PDF* for each section
  const [downloadedPdfs, setDownloadedPdfs] = useState<SectionValidationState>({
    intro: false,
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    conclusion: false
  });

  // Re-validate each time data changes
  useEffect(() => {
    setSectionValidation({
      intro: true,
      brandIdentity: validateBrandIdentity(data?.brandIdentity).success,
      vision: validateVision(data?.vision).success,
      executionRoadmap: validateExecutionRoadmap(data?.executionRoadmap).success,
      conclusion: true
    });
  }, [data]);

  /**
   * Can the user open a particular section? By default:
   * - Section 0 (intro) is always open
   * - For others: previous section must be "valid" AND if the previous section has a PDF, it must be downloaded
   */
  function canAccessSection(targetSection: number): boolean {
    // 1) Always can access intro
    if (targetSection === 0) return true;

    // 2) Identify previous
    const prevSection = targetSection - 1;
    const prevKey = sectionConfig[prevSection].key;
    const prevPdfFn = sectionConfig[prevSection].pdfFn;

    // 3) Must have valid data for previous
    const isPrevValid = sectionValidation[prevKey];

    // 4) If the previous section *has* a PDF function, we also require that PDF to be downloaded
    //    If pdfFn is null (Intro/Conclusion), skip the PDF gating
    if (prevPdfFn) {
      const isPrevPdfDownloaded = downloadedPdfs[prevKey];
      return isPrevValid && isPrevPdfDownloaded;
    } else {
      // If there's no PDF for the previous section, *only* check data validity (if needed).
      return isPrevValid;
    }
  }

  /**
   * Called when user tries to download the PDF for a given section
   */
  async function handleDownloadPDF(sectionNumber: number) {
    if (!data) {
      toast.error('No data to generate PDF');
      return;
    }
    const cfg = sectionConfig[sectionNumber];

    // If this section has no PDF function, skip
    if (!cfg.pdfFn) {
      toast.error(`No PDF available for ${cfg.title}.`);
      return;
    }

    // Validate data for the section
    const validationResult = cfg.validateFn(data[cfg.key]);
    if (!validationResult.success) {
      toast.error(`Please fill out all required fields for ${cfg.title} first.`);
      return;
    }

    try {
      // Generate and save PDF
      const docOrPromise = cfg.pdfFn(data[cfg.key]);
      // Some PDF generators return a Promise, others just return doc
      if (docOrPromise instanceof Promise) {
        // If using a react-pdf approach
        await docOrPromise;
      } else {
        // If it’s just a jsPDF doc
        docOrPromise.save(`${cfg.title}.pdf`);
      }

      toast.success(`${cfg.title} PDF downloaded successfully!`);
      setDownloadedPdfs(prev => ({ ...prev, [cfg.key]: true }));
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast.error(`Failed to generate ${cfg.title} PDF. Please try again.`);
    }
  }

  /**
   * Called when user tries to go forward to the next section
   */
  function handleNext() {
    const nextSec = activeSection + 1;
    if (nextSec > 4) {
      // We have only 5 sections (0..4). If we are at the final, do nothing or show a finish message
      toast.success('You have reached the final section');
      return;
    }

    // If we can’t access the next section, block
    if (!canAccessSection(nextSec)) {
      const { title } = sectionConfig[activeSection];
      // Maybe you skip the PDF gating for intro/conclusion
      // But if the user is in brandIdentity => next is vision => we do gating
      toast.error(`Please complete and download the ${title} PDF first, or ensure data is valid.`);
      return;
    }

    setActiveSection(nextSec);
  }

  /**
   * Called when the user tries to jump directly to a section
   */
  function goToSection(targetSection: number) {
    if (!canAccessSection(targetSection)) {
      // if not accessible, show error
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
    handleDownloadPDF,
    goToSection,
    handleNext,
    canAccessSection,
    sectionConfig
  };
}
