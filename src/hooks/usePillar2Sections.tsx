import { useState } from 'react';
import { Pillar2Data } from '@/types/pillar2';
import { getLastActiveSection, isPdfDownloaded } from '@/utils/progressStorage';

// Define the default section configuration for Pillar 2
const defaultSectionConfig = {
  0: { title: 'Intro' },
  1: { title: 'Tools Landscape' },
  2: { title: 'Decision Matrix' },
  3: { title: 'AI Bootcamp' },
  4: { title: 'Setup & Configuration' },
  5: { title: 'Best Practices' },
  6: { title: 'Conclusion' }
};

export interface UsePillar2SectionsProps {
  data: Pillar2Data | null;
  saveDataToServer?: (data: Pillar2Data) => Promise<void>;
}

export function usePillar2Sections({ data, saveDataToServer }: UsePillar2SectionsProps) {
  // Initialize the active section from storage or default to 0
  const [activeSection, setActiveSection] = useState<number>(() => {
    const lastSection = getLastActiveSection(2);
    return lastSection || 0;
  });

  // Use the default section configuration
  const sectionConfig = defaultSectionConfig;

  // Function to navigate to a specific section
  const goToSection = (section: number) => {
    setActiveSection(section);
    // Additional logic (e.g., saving progress) can be added here
  };

  // For this implementation, we assume every section is accessible
  const canAccessSection = (_: number) => true;

  // State for tracking downloaded PDFs for each section
  const [downloadedPdfs, setDownloadedPdfs] = useState({
    intro: false,
    toolsLandscape: isPdfDownloaded(2, 1),
    decisionMatrix: isPdfDownloaded(2, 2),
    aiBootcamp: false,
    setupConfiguration: false,
    bestPractices: false,
    conclusion: false,
  });

  // Handler to move to the next section if available
  const handleNextSection = () => {
    const nextSection = activeSection + 1;
    if (nextSection < Object.keys(sectionConfig).length) {
      setActiveSection(nextSection);
    }
  };

  // State for validation of each section (dummy initial values)
  const [sectionValidation, setSectionValidation] = useState({
    intro: true,
    toolsLandscape: false,
    decisionMatrix: false,
    aiBootcamp: false,
    setupConfiguration: false,
    bestPractices: false,
    conclusion: false,
  });

  return {
    activeSection,
    sectionConfig,
    goToSection,
    canAccessSection,
    downloadedPdfs,
    setDownloadedPdfs,
    handleNextSection,
    sectionValidation,
    setSectionValidation,
  };
}
