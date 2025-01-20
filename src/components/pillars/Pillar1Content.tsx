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
    setDownloadedPdfs(prev => ({
      ...prev,
      brandIdentity: false,
      vision: false,
      executionRoadmap: false,
      wireframe: false
    }));
  }, [data]);

  useEffect(() => {
    // Validate each section whenever data changes
    const brandIdentityValidation = validateBrandIdentity(data?.brandIdentity);
    const visionValidation = validateVision(data?.vision);
    const executionRoadmapValidation = validateExecutionRoadmap(data?.executionRoadmap);
    const wireframeValidation = validateWireframe(data?.wireframe);

    setSectionValidation({
      brandIdentity: brandIdentityValidation.success,
      vision: visionValidation.success,
      executionRoadmap: executionRoadmapValidation.success,
      wireframe: wireframeValidation.success
    });
  }, [data]);

  const handleDownloadPDF = async (section: string) => {
    if (!data) return;

    let doc;
    switch (section) {
      case 'brandIdentity':
        if (validateBrandIdentity(data.brandIdentity).success) {
          doc = generateBrandIdentityPDF(data.brandIdentity);
          doc.save('brand-identity-worksheet.pdf');
          setDownloadedPdfs(prev => ({ ...prev, brandIdentity: true }));
        }
        break;
      case 'vision':
        if (validateVision(data.vision).success) {
          doc = generateVisionWorksheetPDF(data.vision);
          doc.save('vision-worksheet.pdf');
          setDownloadedPdfs(prev => ({ ...prev, vision: true }));
        }
        break;
      case 'executionRoadmap':
        if (validateExecutionRoadmap(data.executionRoadmap).success) {
          doc = generateExecutionRoadmapPDF(data.executionRoadmap);
          doc.save('execution-roadmap.pdf');
          setDownloadedPdfs(prev => ({ ...prev, executionRoadmap: true }));
        }
        break;
      case 'wireframe':
        if (validateWireframe(data.wireframe).success) {
          doc = generateWireframePDF(data.wireframe);
          doc.save('wireframe-plan.pdf');
          setDownloadedPdfs(prev => ({ ...prev, wireframe: true }));
        }
        break;
    }
  };

  const handleNext = () => {
    if (activeSection === 1 && !downloadedPdfs.brandIdentity) {
      toast.error('Please complete and download the Brand Identity PDF first');
      return;
    }
    if (activeSection === 2 && !downloadedPdfs.vision) {
      toast.error('Please complete and download the Vision Worksheet PDF first');
      return;
    }
    if (activeSection === 3 && !downloadedPdfs.executionRoadmap) {
      toast.error('Please complete and download the Execution Roadmap PDF first');
      return;
    }
    setActiveSection(prev => Math.min(prev + 1, 4));
  };

  const handleSectionClick = (section: number) => {
    if (section === 2 && !downloadedPdfs.brandIdentity) {
      toast.error('Please complete and download the Brand Identity PDF first');
      return;
    }
    if (section === 3 && !downloadedPdfs.vision) {
      toast.error('Please complete and download the Vision Worksheet PDF first');
      return;
    }
    if (section === 4 && !downloadedPdfs.executionRoadmap) {
      toast.error('Please complete and download the Execution Roadmap PDF first');
      return;
    }
    setActiveSection(section);
  };

  const isNextSectionAvailable = (currentSection: number) => {
    switch (currentSection) {
      case 1:
        return sectionValidation.brandIdentity && downloadedPdfs.brandIdentity;
      case 2:
        return sectionValidation.vision && downloadedPdfs.vision;
      case 3:
        return sectionValidation.executionRoadmap && downloadedPdfs.executionRoadmap;
      case 4:
        return sectionValidation.wireframe && downloadedPdfs.wireframe;
      default:
        return false;
    }
  };

  const renderCompletionStatus = (section: number) => {
    const getValidationStatus = () => {
      switch (section) {
        case 1:
          return sectionValidation.brandIdentity;
        case 2:
          return sectionValidation.vision;
        case 3:
          return sectionValidation.executionRoadmap;
        case 4:
          return sectionValidation.wireframe;
        default:
          return false;
      }
    };

    const getPdfStatus = () => {
      switch (section) {
        case 1:
          return downloadedPdfs.brandIdentity;
        case 2:
          return downloadedPdfs.vision;
        case 3:
          return downloadedPdfs.executionRoadmap;
        case 4:
          return downloadedPdfs.wireframe;
        default:
          return false;
      }
    };

    const isValid = getValidationStatus();
    const hasPdf = getPdfStatus();

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
              onClick={() => handleDownloadPDF('wireframe')}
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
            {[
              { id: 1, name: 'Who You Are & Why' },
              { id: 2, name: 'Vision & Goals' },
              { id: 3, name: '30-Day Roadmap' },
              { id: 4, name: 'Wireframe Template' }
            ].map((tab) => {
              const isDisabled = 
                (tab.id === 2 && !downloadedPdfs.brandIdentity) ||
                (tab.id === 3 && !isNextSectionAvailable(2)) ||
                (tab.id === 4 && !isNextSectionAvailable(3));
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && handleSectionClick(tab.id)}
                  disabled={isDisabled}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeSection === tab.id
                      ? 'border-blue-500 text-blue-500'
                      : isDisabled
                        ? 'border-transparent text-gray-400 cursor-not-allowed'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
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
              width: `${
                ((sectionValidation.brandIdentity ? 1 : 0) +
                 (sectionValidation.vision ? 1 : 0) +
                 (sectionValidation.executionRoadmap ? 1 : 0) +
                 (sectionValidation.wireframe ? 1 : 0)) * 25
              }%`
            }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          {((sectionValidation.brandIdentity ? 1 : 0) +
            (sectionValidation.vision ? 1 : 0) +
            (sectionValidation.executionRoadmap ? 1 : 0) +
            (sectionValidation.wireframe ? 1 : 0)) * 25}% Complete
        </div>
      </div>
    </div>
  );
};
