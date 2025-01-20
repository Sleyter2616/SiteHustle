import React, { useState } from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import VisionClarityPage from './pages/VisionClarityPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import GoalsPage from './pages/GoalsPage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import { FiArrowLeft, FiArrowRight, FiDownload } from 'react-icons/fi';
import { generateVisionWorksheetPDF } from '@/utils/pdfUtils';
import { toast } from 'react-hot-toast';

interface VisionWorksheetProps {
  data: Pillar1Data;
  onChange: (data: Pillar1Data) => void;
  errors?: Record<string, string[]>;
}

const TOTAL_PAGES = 5;

export default function VisionWorksheet({ data, onChange, errors }: VisionWorksheetProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownload = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateVisionWorksheetPDF(data);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }}
        />
      </div>
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <VisionClarityPage data={data} onChange={onChange} errors={errors} />;
      case 2:
        return <TargetAudiencePage data={data} onChange={onChange} errors={errors} />;
      case 3:
        return <GoalsPage data={data} onChange={onChange} errors={errors} />;
      case 4:
        return <CustomerJourneyPage data={data} onChange={onChange} errors={errors} />;
      case 5:
        return <SwotAnalysisPage data={data} onChange={onChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A202C] text-white p-8">
      {renderProgressBar()}
      
      <div className="max-w-4xl mx-auto">
        {renderCurrentPage()}
        
        <div className="flex justify-between mt-8">
          {currentPage > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <FiArrowLeft />
              Previous
            </button>
          )}
          
          <div className="flex-1" />
          
          {currentPage === TOTAL_PAGES ? (
            <button
              onClick={handleDownload}
              disabled={isGeneratingPDF}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isGeneratingPDF
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 transition-colors'
              }`}
            >
              <FiDownload />
              {isGeneratingPDF ? 'Generating...' : 'Download Worksheet'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
            >
              Next
              <FiArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
