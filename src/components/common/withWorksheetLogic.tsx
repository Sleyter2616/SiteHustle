/***********************************************************************
  withWorksheetLogic.tsx
  - Restored forward navigation logic and final PDF gating at the parent.
***********************************************************************/
import React, { useState, ComponentType } from 'react';
import { toast } from 'react-hot-toast';

export interface WithWorksheetLogicProps {
  data?: any;
  onChange?: (data: any) => void;
  isValid?: boolean;
  onPdfDownloaded?: () => void;
  onNextSection?: () => void; // Called when final step is complete
  pdfDownloaded?: boolean;    // If parent's state indicates PDF is downloaded
  errors?: Record<string, string[]>;
  currentPage?: number;
}

interface WorksheetConfig {
  generatePdf: (data: any) => any;      // Must return a jsPDF doc or Promise
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
    const [localPdfDownloaded, setLocalPdfDownloaded] = useState<boolean>(
      props.pdfDownloaded || false
    );

    const maxPages = config.maxPages || 4;

    // Moves forward one page if not final, else handle final logic
    const handleNext = async () => {
      // If we're not on the last page, just go to the next page
      if (currentPage < maxPages) {
        setCurrentPage((prev) => Math.min(prev + 1, maxPages));
        return;
      }

      // If we're on the final page and PDF is downloaded, move to next section
      if (localPdfDownloaded && props.onNextSection) {
        props.onNextSection();
      }
    };

    // Moves backward one page
    const handleBack = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    // Download PDF logic
    const handleDownloadPDF = async (e?: React.MouseEvent) => {
      // Prevent any form submission
      e?.preventDefault();
      e?.stopPropagation();
      
      // Validate data completeness
      if (!config.isDataComplete(props.data)) {
        toast.error('Please complete all fields before downloading the PDF.');
        return;
      }
      try {
        setIsGeneratingPDF(true);
        // generatePdf may return a jsPDF doc or a Promise
        const docOrPromise = await config.generatePdf(props.data);

        // If docOrPromise is a jsPDF doc, we do docOrPromise.save(...)
        // If it's async or the function already handled .save(), adjust as needed
        if (docOrPromise && typeof docOrPromise.save === 'function') {
          // Use a timeout to prevent the save from triggering a page reload
            docOrPromise.save(config.pdfFileName);
         
        }
        toast.success(`${config.title} PDF downloaded successfully!`);
        setLocalPdfDownloaded(true); // Mark local PDF as downloaded

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

    // This merges the parent's pdfDownloaded with our local state
    const finalProps = {
      ...props,
      pdfDownloaded: localPdfDownloaded, // override with local state
      currentPage
    };

    return (
      <div className="space-y-8">
        {/* Title & Description */}
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

        {/* Child Component (Worksheet) */}
        <WrappedComponent {...(finalProps as P)} />

        {/* Bottom Navigation */}
        <div className="flex justify-between mt-8">
          {/* Back button */}
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

          {/* 
            If NOT on last page, show a simple "Next" button.
            If on the last page, show "Next Section" gating logic.
          */}
          {currentPage < maxPages ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Next
            </button>
          ) : (
            <div className="flex gap-4">
              {/* Next Section Button */}
              {props.onNextSection && (
                <button
                  onClick={() => {
                    if (localPdfDownloaded && props.onNextSection) {
                      props.onNextSection();
                    }
                  }}
                  disabled={!localPdfDownloaded}
                  className={`px-4 py-2 rounded ${
                    !localPdfDownloaded
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Next Section
                </button>
              )}
            </div>
          )}
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