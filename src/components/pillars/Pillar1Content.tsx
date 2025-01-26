'use client'

import React, { useEffect, useState } from 'react';
import { Pillar1Data } from '@/types/pillar1';
import { useSections } from '@/hooks/useSections';
import { savePillar1Data, loadPillar1Data } from '@/utils/storage';

import BrandIdentityWorksheet from '../pillar1/brand-identity/BrandIdentityWorksheet';
import VisionWorksheet from '../pillar1/vision/VisionWorksheet';
import ExecutionRoadmapWorksheet from '../pillar1/execution-roadmap/ExecutionRoadmapWorksheet';
import Pillar1IntroPage from '../pillar1/Pillar1IntroPage';
import Pillar1ConclusionPage from '../pillar1/Pillar1ConclusionPage';

import { toast } from 'react-hot-toast';

// Example optional backend calls for persistent storage
async function fetchPillar1DataFromServer(): Promise<Pillar1Data | null> {
  try {
    const res = await fetch('/api/pillar1');
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const remote = await res.json();
    return remote as Pillar1Data;
  } catch (err) {
    console.error('Error fetching Pillar1Data:', err);
    return null;
  }
}

async function sendPillar1DataToServer(data: Pillar1Data) {
  try {
    const res = await fetch('/api/pillar1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  } catch (err) {
    console.error('Error saving Pillar1Data:', err);
  }
}

interface Pillar1ContentProps {
  data: Pillar1Data | null;
  onDataChange: (updated: Pillar1Data) => void;
  /** 
   * Optionally pass down a handleComplete or something else 
   * if parent wants to re-use it. But typically we do it here. 
   */
}

export default function Pillar1Content({ data, onDataChange }: Pillar1ContentProps) {
  const {
    activeSection,
    sectionValidation,
    downloadedPdfs,
    handleDownloadPDF,
    goToSection,
    handleNext,
    canAccessSection,
    sectionConfig
  } = useSections({ data });

  const [loadingServerData, setLoadingServerData] = useState(false);

  // On mount, try local storage, then server
  useEffect(() => {
    (async () => {
      if (!data) {
        const local = loadPillar1Data();
        if (local) {
          onDataChange(local);
        } else {
          setLoadingServerData(true);
          const fromServer = await fetchPillar1DataFromServer();
          if (fromServer) {
            onDataChange(fromServer);
            savePillar1Data(fromServer);
          }
          setLoadingServerData(false);
        }
      }
    })();
  }, [data, onDataChange]);

  // Whenever data updates, store locally
  useEffect(() => {
    if (data) {
      savePillar1Data(data);
    }
  }, [data]);

  // We define handleComplete here to demonstrate how we might call a parent's function
  // or do a local POST. But the “real” handleComplete might be in a parent like PillarContent.
  const handleComplete = async () => {
    try {
      // Example local logic or could call parent's prop
      console.log('Completing Pillar 1...');
      // Possibly call a parent's handleComplete? 
      // or do our own server logic:
      // e.g. fetch('/api/pillar1/complete', { method: 'POST', ... })
      // or we might call 'sendPillar1DataToServer(data!)'
      toast.success('Pillar 1 completed!');
    } catch (err) {
      console.error(err);
      toast.error('Error completing Pillar 1.');
    }
  };

  const handleDownloadAndSync = async (sectionIndex: number) => {
    await handleDownloadPDF(sectionIndex);
    const sec = sectionConfig[sectionIndex];
    if (downloadedPdfs[sec.key] && data) {
      await sendPillar1DataToServer(data);
      toast.success(`Data synced for ${sec.title}`);
    }
  };

  function handleSectionDataChange(sectionKey: keyof Pillar1Data, newValue: any) {
    if (!data) return;
    const updated = { ...data, [sectionKey]: newValue };
    onDataChange(updated);
    savePillar1Data(updated);
  }

  function renderCompletionStatus(sectionNum: number) {
    if (sectionNum === 0 || sectionNum === 4) {
      return null;
    }
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
    if (loadingServerData) {
      return <div className="p-4 text-gray-400">Loading data from server...</div>;
    }

    if (sectionNum !== 0 && sectionNum !== 4 && !canAccessSection(sectionNum)) {
      return <div className="p-4 text-gray-500">Complete previous section first.</div>;
    }

    switch (sectionNum) {
      case 0:
        return (
          <Pillar1IntroPage
            onNextSection={handleNext}
          />
        );

      case 1:
        return (
          <>
            <BrandIdentityWorksheet
              data={data?.brandIdentity}
              onChange={(val) => handleSectionDataChange('brandIdentity', val)}
              onPdfDownloaded={() => handleDownloadAndSync(1)}
              onNextSection={handleNext}
              pdfDownloaded={downloadedPdfs.brandIdentity}
              isValid={sectionValidation.brandIdentity}
            />
            {renderCompletionStatus(1)}
          </>
        );

      case 2:
        return (
          <>
            <VisionWorksheet
              data={data?.vision}
              onChange={(val) => handleSectionDataChange('vision', val)}
              onPdfDownloaded={() => handleDownloadAndSync(2)}
              onNextSection={handleNext}
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
              data={data?.executionRoadmap}
              onChange={(val) => handleSectionDataChange('executionRoadmap', val)}
              onPdfDownloaded={() => handleDownloadAndSync(3)}
              onNextSection={handleNext}
              pdfDownloaded={downloadedPdfs.executionRoadmap}
              isValid={sectionValidation.executionRoadmap}
            />
            {renderCompletionStatus(3)}
          </>
        );

      case 4:
        return (
          <Pillar1ConclusionPage
            data={data || {} as Pillar1Data}
            onCompletePillar={handleComplete}
          />
        );

      default:
        return null;
    }
  }

  function overallCompletionPercent() {
    const completedCount = ['brandIdentity', 'vision', 'executionRoadmap'].filter(
      (key) => sectionValidation[key]
    ).length;
    const totalMainSections = 3;
    return (completedCount / totalMainSections) * 100;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Navigation Tabs */}
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

      {renderSection(activeSection)}

      {/* Overall Progress */}
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
