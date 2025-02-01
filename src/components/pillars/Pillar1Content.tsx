'use client';

import React, { useEffect, useState } from 'react';
import { Pillar1Data } from '@/types/pillar1';
import { useSections } from '@/hooks/useSections';
import { loadPillar1Data, savePillar1Data } from '@/utils/storage';
import { useRouter } from 'next/navigation';
import {
  saveProgress,
  getProgress,
  markSectionComplete,
  updateLastActiveSection,
  markPillarComplete,
  isPillarComplete,
  getLastActiveSection
} from '@/utils/progressStorage';

import BrandIdentityWorksheet from '../pillar1/brand-identity/BrandIdentityWorksheet';
import VisionWorksheet from '../pillar1/vision/VisionWorksheet';
import ExecutionRoadmapWorksheet from '../pillar1/execution-roadmap/ExecutionRoadmapWorksheet';
import Pillar1IntroPage from '../pillar1/Pillar1IntroPage';
import Pillar1ConclusionPage from '../pillar1/Pillar1ConclusionPage';

import { toast } from 'react-hot-toast';

interface Pillar1ContentProps {
  // If you want to pass in existing data from props, or start with null
  data?: Pillar1Data | null;
  onDataChange?: (updated: Pillar1Data) => void;
}

// Provide a function returning a 'blank' Pillar1Data to avoid field issues
function getEmptyPillar1Data(): Pillar1Data {
  return {
    brandIdentity: {
      reflection: {
        whoIAm: '',
        whoIAmNot: '',
        whyBuildBrand: ''
      },
      personality: {
        communicationStyle: '',
        toneAndVoice: '',
        passionateExpression: '',
        brandPersonality: ''
      },
      story: {
        pivotalExperience: '',
        definingMoment: '',
        audienceRelevance: ''
      },
      differentiation: {
        uniqueApproach: '',
        uniqueResources: '',
        competitivePerception: ''
      }
    },
    vision: {
      businessName: '',
      tagline: '',
      missionStatement: '',
      visionStatement: '',
      coreValues: [],
      businessGoals: {
        shortTerm: '',
        midTerm: '',
        longTerm: '',
        websiteGoals: '',
        successIndicators: ''
      },
      swot: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      },
      customerJourney: {
        awareness: [],
        consideration: [],
        decision: '',
        retention: []
      },
      targetAudience: {
        primaryProfile: '',
        secondaryAudiences: [],
        painPoints: [],
        idealCustomerProfile: {
          problem: '',
          journey: '',
          desires: [],
          desiredState: '',
          gap: '',
          uniqueSellingPoint: '',
          benefits: [],
          objections: []
        }
      }
    },
    executionRoadmap: {
      thirtyDayGoal: '',
      weeklyMilestones: [],
      contentPlan: '',
      immediateActions: []
    }
  };
}

export default function Pillar1Content({
  data: initialData = null,
  onDataChange
}: Pillar1ContentProps) {
  // We store local data in a state so we can track typed changes w/o spamming server
  const [pillar1Data, setPillar1Data] = useState<Pillar1Data | null>(initialData);
  const [loading, setLoading] = useState(false);

  const {
    activeSection,
    sectionValidation,
    downloadedPdfs,
    handleDownloadPdf,
    goToSection,
    handleNext,
    canAccessSection,
    sectionConfig
  } = useSections({
    data: pillar1Data,
    pillarNumber: 1,
    saveDataToServer: saveDataToServer
  });

  const router = useRouter();

  // Load initial active section from storage
  useEffect(() => {
    const lastSection = getLastActiveSection(1);
    if (lastSection > 0) {
      goToSection(lastSection);
    }
  }, []);

  // On mount: if we have no data (null), load from server
  useEffect(() => {
    if (!pillar1Data) {
      setLoading(true);
      loadPillar1Data()
        .then((res) => {
          if (res) {
            setPillar1Data(res);
            onDataChange?.(res);
          } else {
            // server returned null => create empty
            const empty = getEmptyPillar1Data();
            setPillar1Data(empty);
            onDataChange?.(empty);
          }
        })
        .catch((err) => {
          console.error('Error loading Pillar1Data:', err);
          toast.error('Failed to load Pillar 1 data from server.');
        })
        .finally(() => setLoading(false));
    }
    // if we do have data from props, do nothing
  }, [pillar1Data, onDataChange]);

  // Save final to server
  async function saveDataToServer(dataToSave: Pillar1Data) {
    setLoading(true);
    try {
      await savePillar1Data(dataToSave); // calls /api/pillar1
      onDataChange?.(dataToSave);       // if parent wants to track changes
    } catch (err) {
      console.error(err);
      toast.error('Failed to save your data');
    } finally {
      setLoading(false);
    }
  }

  // Called from sub-pages *only* for local merges
  function handleLocalDataChange(sectionKey: keyof Pillar1Data, updatedVal: any) {
    if (!pillar1Data) return;
    const updated = { ...pillar1Data, [sectionKey]: updatedVal };
    setPillar1Data(updated);
    // No immediate server call => “type, type, type, local only”
  }

  // Called when user clicks “Next Section”
  async function handleNextSection() {
    if (!pillar1Data) return;
    setLoading(true);
    try {
      // Save data before moving to next section
      await saveDataToServer(pillar1Data);
      // Mark current section as complete
      markSectionComplete(1, activeSection);
      // Move to next section
      handleNext();
      // Update last active section
      updateLastActiveSection(1, activeSection + 1);
      toast.success('Progress saved');
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    } finally {
      setLoading(false);
    }
  }

  // Called when user downloads PDF => after success => sync
  async function handleDownloadAndSync(sectionIndex: number) {
    if (!pillar1Data) return;
    setLoading(true);
    try {
      // First save the data
      await saveDataToServer(pillar1Data);
      // Then download PDF
      await handleDownloadPdf(new MouseEvent('click') as any, sectionIndex);
      const sec = sectionConfig[sectionIndex];
      if (downloadedPdfs[sec.key]) {
        toast.success(`PDF downloaded for ${sec.title}`);
      }
    } catch (error) {
      console.error('Error during download and sync:', error);
      toast.error('Failed to save progress or download PDF');
    } finally {
      setLoading(false);
    }
  }

  // Called if they complete the entire pillar
  const handleCompletePillar = async (sectionIndex: number) => {
    if (!pillar1Data) return;
    setLoading(true);
    try {
      // Save the data
      await saveDataToServer(pillar1Data);
      // Mark pillar as complete
      markPillarComplete(1);
      toast.success('Pillar 1 completed! Moving to Pillar 2...');
      // Navigate to pillar 2
      router.push('/pillars/2');
    } catch (error) {
      console.error('Error completing pillar:', error);
      toast.error('Failed to complete pillar');
    } finally {
      setLoading(false);
    }
  };

  // Update last active section whenever section changes
  useEffect(() => {
    updateLastActiveSection(1, activeSection);
  }, [activeSection]);

  // Renders a small completion hint
  function renderCompletionStatus(sectionNum: number) {
    if (sectionNum === 0 || sectionNum === 4) return null;
    const cfg = sectionConfig[sectionNum];
    const valid = sectionValidation[cfg.key];
    const hasPdf = downloadedPdfs[cfg.key];
    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Section Completion Requirements:</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className={valid ? 'text-green-500 mr-2' : 'text-gray-400 mr-2'}>
              {valid ? '✓' : '○'}
            </span>
            Fill out all required fields
          </li>
          <li className="flex items-center">
            <span className={hasPdf ? 'text-green-500 mr-2' : 'text-gray-400 mr-2'}>
              {hasPdf ? '✓' : '○'}
            </span>
            Download section PDF
          </li>
        </ul>
        {!valid && (
          <p className="mt-2 text-sm text-yellow-500">
            Please complete all fields to enable PDF download
          </p>
        )}
        {valid && !hasPdf && (
          <p className="mt-2 text-sm text-yellow-500">
            Please download the PDF to proceed to the next section
          </p>
        )}
      </div>
    );
  }

  function renderSection(sectionNum: number) {
    if (loading) {
      return <div>Loading or Saving Data...</div>;
    }

    // Allow access to any section if we have data
    if (pillar1Data) {
      const sectionKey = sectionConfig[sectionNum]?.key;
      if (sectionKey && pillar1Data[sectionKey]) {
        // Render the section if we have data for it
        switch (sectionNum) {
          case 0:
            return (
              <Pillar1IntroPage
                onNextSection={handleNextSection}
              />
            );
          case 1:
            return (
              <>
                {renderCompletionStatus(1)}
                <BrandIdentityWorksheet
                  data={pillar1Data?.brandIdentity}
                  onChange={(val) => handleLocalDataChange('brandIdentity', val)}
                  onPdfDownloaded={() => handleDownloadAndSync(1)}
                  onNextSection={handleNextSection}
                  pdfDownloaded={downloadedPdfs.brandIdentity}
                  isValid={sectionValidation.brandIdentity}
                />
              </>
            );
          case 2:
            return (
              <>
                <VisionWorksheet
                  data={pillar1Data?.vision}
                  onChange={(val) => handleLocalDataChange('vision', val)}
                  onPdfDownloaded={() => handleDownloadAndSync(2)}
                  onNextSection={handleNextSection}
                  pdfDownloaded={downloadedPdfs.vision}
                  isValid={sectionValidation.vision}
                />
                {renderCompletionStatus(2)}
              </>
            );
          case 3:
            return (
              <>
                <ExecutionRoadmapWorksheet
                  data={pillar1Data?.executionRoadmap}
                  onChange={(val) => handleLocalDataChange('executionRoadmap', val)}
                  onPdfDownloaded={() => handleDownloadAndSync(3)}
                  onNextSection={handleNextSection}
                  pdfDownloaded={downloadedPdfs.executionRoadmap}
                  isValid={sectionValidation.executionRoadmap}
                />
                {renderCompletionStatus(3)}
              </>
            );
          case 4:
            return (
              <Pillar1ConclusionPage
                data={pillar1Data || getEmptyPillar1Data()}
                onCompletePillar={() => handleCompletePillar(1)}
              />
            );
          default:
            return null;
        }
      }
    }

    // If we don't have data for this section and it's not accessible, show message
    if (sectionNum !== 0 && sectionNum !== 4 && !canAccessSection(sectionNum)) {
      return <div className="p-4 text-gray-500">Complete previous section first.</div>;
    }

    // Default section rendering
    switch (sectionNum) {
      case 0:
        return (
          <Pillar1IntroPage
            onNextSection={handleNextSection}
          />
        );
      case 1:
        return (
          <>
            {renderCompletionStatus(1)}
            <BrandIdentityWorksheet
              data={pillar1Data?.brandIdentity}
              onChange={(val) => handleLocalDataChange('brandIdentity', val)}
              onPdfDownloaded={() => handleDownloadAndSync(1)}
              onNextSection={handleNextSection}
              pdfDownloaded={downloadedPdfs.brandIdentity}
              isValid={sectionValidation.brandIdentity}
            />
          </>
        );
      case 2:
        return (
          <>
            <VisionWorksheet
              data={pillar1Data?.vision}
              onChange={(val) => handleLocalDataChange('vision', val)}
              onPdfDownloaded={() => handleDownloadAndSync(2)}
              onNextSection={handleNextSection}
              pdfDownloaded={downloadedPdfs.vision}
              isValid={sectionValidation.vision}
            />
            {renderCompletionStatus(2)}
          </>
        );
      case 3:
        return (
          <>
            <ExecutionRoadmapWorksheet
              data={pillar1Data?.executionRoadmap}
              onChange={(val) => handleLocalDataChange('executionRoadmap', val)}
              onPdfDownloaded={() => handleDownloadAndSync(3)}
              onNextSection={handleNextSection}
              pdfDownloaded={downloadedPdfs.executionRoadmap}
              isValid={sectionValidation.executionRoadmap}
            />
            {renderCompletionStatus(3)}
          </>
        );
      case 4:
        return (
          <Pillar1ConclusionPage
            data={pillar1Data || getEmptyPillar1Data()}
            onCompletePillar={() => handleCompletePillar(1)}
          />
        );
      default:
        return null;
    }
  }

  function overallCompletionPercent() {
    const validSections = ['brandIdentity', 'vision', 'executionRoadmap'];
    const completedCount = validSections.filter((key) => sectionValidation[key]).length;
    return (completedCount / validSections.length) * 100;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Tabs for Intro => 0, brand =>1, vision =>2, roadmap =>3, conclusion =>4 */}
      <div className="border-b border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {Object.entries(sectionConfig).map(([id, cfg]) => {
            const sectionId = parseInt(id);
            const disabled = (sectionId !== 0 && sectionId !== 4) && !canAccessSection(sectionId);
            return (
              <button
                key={sectionId}
                onClick={() => !disabled && goToSection(sectionId)}
                disabled={disabled}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeSection === sectionId
                    ? 'border-blue-500 text-blue-500'
                    : disabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }
                `}
              >
                {cfg.title}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Render whichever sub-page is active */}
      {renderSection(activeSection)}

      {/* Overall progress bar */}
      <div className="mt-8">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${overallCompletionPercent()}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          {Math.round(overallCompletionPercent())}% Complete
        </div>
      </div>
    </div>
  );
}