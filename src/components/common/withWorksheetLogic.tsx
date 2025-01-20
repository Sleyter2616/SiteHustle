import React, { useState, ComponentType } from 'react';
import { toast } from 'react-hot-toast';

export interface WithWorksheetLogicProps {
  data: any;
  onChange: (data: any) => void;
  onPdfDownloaded?: () => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
  errors?: Record<string, string[]>;
}

interface WorksheetConfig {
  generatePdf: (data: any) => any;
  isDataComplete: (data: any) => boolean;
  pdfFileName: string;
  title: string;
  description: string;
}

export function withWorksheetLogic<P extends WithWorksheetLogicProps>(
  WrappedComponent: ComponentType<P>,
  config: WorksheetConfig
) {
  return function WithWorksheetLogicComponent(props: P) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const totalPages = 4;

    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      } else if (props.onNextSection && props.pdfDownloaded) {
        props.onNextSection();
      }
    };

    const handleBack = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleDownloadPDF = async () => {
      if (!config.isDataComplete(props.data)) {
        toast.error('Please complete all sections before downloading the PDF');
        return;
      }

      try {
        setIsGeneratingPDF(true);
        const doc = config.generatePdf(props.data);
        doc.save(config.pdfFileName);
        toast.success(`${config.title} PDF downloaded successfully!`);
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

    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
          <p className="text-gray-300">{config.description}</p>
        </div>

        <WrappedComponent
          {...props}
        />

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
            disabled={currentPage === totalPages && !props.pdfDownloaded}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages && !props.pdfDownloaded
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {currentPage === totalPages ? 'Next Section' : 'Next'}
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {currentPage === totalPages && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF || !config.isDataComplete(props.data)}
              className={`px-4 py-2 rounded ${
                isGeneratingPDF || !config.isDataComplete(props.data)
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isGeneratingPDF 
                ? 'Generating PDF...' 
                : !config.isDataComplete(props.data)
                  ? 'Complete All Sections First'
                  : `Download ${config.title} PDF`
              }
            </button>
          </div>
        )}
      </div>
    );
  };
}
