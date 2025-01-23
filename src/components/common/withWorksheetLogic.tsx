
/***********************************************************************
  2) withWorksheetLogic.tsx
     - Ensures we call `config.generatePdf(props.data)` and `doc.save(...)`
     - Sets `pdfDownloaded` to true after a successful download so the 
       button in VisionWorksheet toggles to "Next Section."
***********************************************************************/
import React, { useState, ComponentType } from 'react';
import { toast } from 'react-hot-toast';

export interface WithWorksheetLogicProps {
  data?: any;          // Make optional
  onChange?: (data: any) => void;
  isValid?: boolean;
  onPdfDownloaded?: () => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
  errors?: Record<string, string[]>;
  currentPage?: number;
}

interface WorksheetConfig {
  generatePdf: (data: any) => any;         // Must return a jsPDF or similar doc
  isDataComplete: (data: any) => boolean;
  pdfFileName: string;
  title: string;
  description: string;
  maxPages?: number;
}

export function withWorksheetLogic<P extends WithWorksheetLogicProps>(
  WrappedComponent: ComponentType<P>,
  config: WorksheetConfig
) {
  return function WithWorksheetLogicComponent(props: P) {
    const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [localPdfDownloaded, setLocalPdfDownloaded] = useState<boolean>(props.pdfDownloaded || false);

    const maxPages = config.maxPages || 4;

    const handleNext = async () => {
      if (currentPage === maxPages) {
        // final page logic
        if (!localPdfDownloaded) {
          await handleDownloadPDF();
        } else if (props.onNextSection) {
          props.onNextSection();
        }
        return;
      }
      setCurrentPage(prev => Math.min(prev + 1, maxPages));
    };

    const handleBack = () => {
      setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleDownloadPDF = async () => {
      if (!config.isDataComplete(props.data)) {
        toast.error('Please complete all fields before downloading the PDF.');
        return;
      }
      try {
        setIsGeneratingPDF(true);
        const doc = await config.generatePdf(props.data);
        doc.save(config.pdfFileName);
        toast.success(`${config.title} PDF downloaded successfully!`);

        // Mark that we have downloaded the PDF
        setLocalPdfDownloaded(true);

        // Also call the parent's onPdfDownloaded if available
        if (props.onPdfDownloaded) {
          props.onPdfDownloaded();
        }

      } catch (error) {
        console.error('Error generating PDF:', error);
        toast.error('Failed to generate PDF. Please try again.');
      } finally {
        setIsGeneratingPDF(false);
      }
    };

    /*
      We'll merge localPdfDownloaded with props.pdfDownloaded 
      so the child sees the updated state (pdfDownloaded = true)
    */
    const finalProps = {
      ...props,
      pdfDownloaded: localPdfDownloaded,  // override with local state
      currentPage
    };

    return (
      <div className="space-y-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
          <p className="text-gray-300">{config.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / maxPages) * 100}%` }}
          />
        </div>

        {/* Child Page(s) */}
        <WrappedComponent {...(finalProps as P)} />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === maxPages && !config.isDataComplete(props.data)}
            className={`px-4 py-2 rounded ${
              currentPage === maxPages && !config.isDataComplete(props.data)
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {currentPage === maxPages
              ? localPdfDownloaded
                ? 'Next Section'
                : isGeneratingPDF
                  ? 'Generating PDF...'
                  : 'Download PDF'
              : 'Next'
            }
          </button>
        </div>

        {/* Page Dots */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: maxPages }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full mx-1 ${
                currentPage === idx + 1 ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
}
