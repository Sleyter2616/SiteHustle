import React, { useState, useEffect } from 'react';
import { validateBrandIdentity, validateVision, validateExecutionRoadmap, validateWireframe } from '@/utils/brandIdentityValidation';
import BrandIdentityWorksheet from '../brand-identity/BrandIdentityWorksheet';
import VisionWorksheet from '../vision/VisionWorksheet';
import WireframeWorksheet from '../wireframe/WireframeWorksheet';
import ExecutionRoadmapWorksheet from '../execution-roadmap/ExecutionRoadmapWorksheet';
import { generateBrandIdentityPDF, generateVisionWorksheetPDF, generateExecutionRoadmapPDF, generateWireframePDF } from '@/utils/pdfUtils';
import { Pillar1Data } from '@/types/pillar1';
import { toast } from 'react-hot-toast';

interface Pillar1ContentProps {
  data: Pillar1Data | null;
  onDataChange: (data: Pillar1Data) => void;
}

interface SectionConfig {
  key: string;
  validateFn: (data: any) => { success: boolean };
  pdfFn: (data: any) => any;
  pdfFilename: string;
  title: string;
}

const sectionConfig: Record<number, SectionConfig> = {
  1: {
    key: 'brandIdentity',
    validateFn: validateBrandIdentity,
    pdfFn: generateBrandIdentityPDF,
    pdfFilename: 'brand-identity-worksheet.pdf',
    title: 'Who You Are & Why'
  },
  2: {
    key: 'vision',
    validateFn: validateVision,
    pdfFn: generateVisionWorksheetPDF,
    pdfFilename: 'vision-worksheet.pdf',
    title: 'Vision & Goals'
  },
  3: {
    key: 'executionRoadmap',
    validateFn: validateExecutionRoadmap,
    pdfFn: generateExecutionRoadmapPDF,
    pdfFilename: 'execution-roadmap.pdf',
    title: '30-Day Roadmap'
  },
  4: {
    key: 'wireframe',
    validateFn: validateWireframe,
    pdfFn: generateWireframePDF,
    pdfFilename: 'wireframe-plan.pdf',
    title: 'Wireframe Template'
  }
};

export default function Pillar1Content({ data, onDataChange }: Pillar1ContentProps) {
  const [activeSection, setActiveSection] = useState(1);
  const [sectionValidation, setSectionValidation] = useState({
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    wireframe: false
  });

  const [downloadedPdfs, setDownloadedPdfs] = useState({
    brandIdentity: false,
    vision: false,
    executionRoadmap: false,
    wireframe: false
  });

  useEffect(() => {
    // Reset PDF download status when section data changes
    setDownloadedPdfs({
      brandIdentity: false,
      vision: false,
      executionRoadmap: false,
      wireframe: false
    });
  }, [data]);

  useEffect(() => {
    // Validate each section whenever data changes
    setSectionValidation({
      brandIdentity: validateBrandIdentity(data?.brandIdentity).success,
      vision: validateVision(data?.vision).success,
      executionRoadmap: validateExecutionRoadmap(data?.executionRoadmap).success,
      wireframe: validateWireframe(data?.wireframe).success
    });
  }, [data]);

  const handleDownloadPDF = (sectionNumber: number) => {
    if (!data) return;
    const { key, validateFn, pdfFn, pdfFilename } = sectionConfig[sectionNumber];
  
    const result = validateFn(data[key]);
    if (result.success) {
      const doc = pdfFn(data[key]);
      doc.save(pdfFilename);
      setDownloadedPdfs(prev => ({ ...prev, [key]: true }));
    }
  };
  

  const handleNext = () => {
    const currentConfig = sectionConfig[activeSection];
    if (!downloadedPdfs[currentConfig.key]) {
      toast.error(`Please complete and download the ${currentConfig.title} PDF first`);
      return;
    }
    setActiveSection(prev => Math.min(prev + 1, 4));
  };

  const handleSectionClick = (section: number) => {
    // Check if all previous sections are completed
    for (let i = 1; i < section; i++) {
      const prevConfig = sectionConfig[i];
      if (!downloadedPdfs[prevConfig.key]) {
        toast.error(`Please complete and download the ${prevConfig.title} PDF first`);
        return;
      }
    }
    setActiveSection(section);
  };

  const isNextSectionAvailable = (currentSection: number) => {
    const config = sectionConfig[currentSection];
    return sectionValidation[config.key] && downloadedPdfs[config.key];
  };

  const renderCompletionStatus = (section: number) => {
    const config = sectionConfig[section];
    const isValid = sectionValidation[config.key];
    const hasPdf = downloadedPdfs[config.key];

    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Section Completion Requirements:</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className={`mr-2 ${isValid ? 'text-green-500' : 'text-gray-400'}`}>
              {isValid ? '✓' : '○'}
            </span>
            Fill out all required fields
          </li>
          <li className="flex items-center">
            <span className={`mr-2 ${hasPdf ? 'text-green-500' : 'text-gray-400'}`}>
              {hasPdf ? '✓' : '○'}
            </span>
            Download section PDF
          </li>
        </ul>
        {!isValid && (
          <p className="mt-2 text-sm text-yellow-500">
            Please complete all fields to enable PDF download
          </p>
        )}
        {isValid && !hasPdf && (
          <p className="mt-2 text-sm text-yellow-500">
            Please download the PDF to proceed to the next section
          </p>
        )}
      </div>
    );
  };

  const renderSection = (sectionNumber: number) => {
    const config = sectionConfig[sectionNumber];
    const canAccess = sectionNumber === 1 || 
      (sectionNumber === 2 && isNextSectionAvailable(1)) ||
      (sectionNumber === 3 && isNextSectionAvailable(2)) ||
      (sectionNumber === 4 && isNextSectionAvailable(3));

    if (!canAccess) {
      return (
        <div className="p-4 text-gray-500">
          Please complete the previous section before proceeding.
        </div>
      );
    }

    switch (sectionNumber) {
      case 1:
        return (
          <div>
            <BrandIdentityWorksheet
              data={data?.brandIdentity}
              onChange={(brandIdentity) => onDataChange({ ...data, brandIdentity })}
              onPdfDownloaded={() => setDownloadedPdfs(prev => ({ ...prev, brandIdentity: true }))}
              onNextSection={() => setActiveSection(2)}
              pdfDownloaded={downloadedPdfs.brandIdentity}
              currentPage={1}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <VisionWorksheet
              data={data?.vision}
              onChange={(vision) => onDataChange({ ...data, vision })}
              onPdfDownloaded={() => setDownloadedPdfs(prev => ({ ...prev, vision: true }))}
              onNextSection={() => setActiveSection(3)}
              pdfDownloaded={downloadedPdfs.vision}
              currentPage={2}
            />
            {renderCompletionStatus(2)}
          </div>
        );
      case 3:
        return (
          <div>
            <ExecutionRoadmapWorksheet
              data={data?.executionRoadmap}
              onChange={(executionRoadmap) => onDataChange({ ...data, executionRoadmap })}
              onPdfDownloaded={() => setDownloadedPdfs(prev => ({ ...prev, executionRoadmap: true }))}
              onNextSection={() => setActiveSection(4)}
              pdfDownloaded={downloadedPdfs.executionRoadmap}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <WireframeWorksheet
              data={data?.wireframe}
              onChange={(wireframe) => onDataChange({ ...data, wireframe })}
            />
            <button
              onClick={() => handleDownloadPDF(4)}
              disabled={!sectionValidation.wireframe}
              className={`mt-4 px-4 py-2 rounded ${
                !sectionValidation.wireframe
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : downloadedPdfs.wireframe
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {downloadedPdfs.wireframe ? 'PDF Downloaded ✓' : 'Download Wireframe Plan PDF'}
            </button>
            {renderCompletionStatus(4)}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {Object.entries(sectionConfig).map(([id, config]) => {
              const sectionId = parseInt(id);
              const isDisabled = sectionId > 1 && !isNextSectionAvailable(sectionId - 1);
              
              return (
                <button
                  key={sectionId}
                  onClick={() => !isDisabled && handleSectionClick(sectionId)}
                  disabled={isDisabled}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeSection === sectionId
                      ? 'border-blue-500 text-blue-500'
                      : isDisabled
                        ? 'border-transparent text-gray-400 cursor-not-allowed'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }
                  `}
                >
                  {config.title}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {renderSection(activeSection)}

      {/* Progress indicator */}
      <div className="mt-8">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{
              width: `${Object.values(sectionValidation).filter(Boolean).length * 25}%`
            }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          {Object.values(sectionValidation).filter(Boolean).length * 25}% Complete
        </div>
      </div>
    </div>
  );
};
