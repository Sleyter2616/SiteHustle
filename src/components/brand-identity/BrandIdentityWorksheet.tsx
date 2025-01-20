import React, { useState } from 'react';
import { Pillar1Data } from '@/types/pillar1';
import ReflectionPage from './pages/ReflectionPage';
import PersonalityPage from './pages/PersonalityPage';
import StoryPage from './pages/StoryPage';
import DifferentiationPage from './pages/DifferentiationPage';
import { FiArrowLeft, FiArrowRight, FiDownload } from 'react-icons/fi';
import { generateBrandIdentityPDF } from '@/utils/pdfUtils';
import { toast } from 'react-hot-toast';

interface BrandIdentityWorksheetProps {
  data: Pillar1Data['brandIdentity'];
  onChange: (data: Pillar1Data['brandIdentity']) => void;
  onPdfDownloaded?: () => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
}

export default function BrandIdentityWorksheet({ 
  data, 
  onChange,
  onPdfDownloaded,
  onNextSection,
  pdfDownloaded = false
}: BrandIdentityWorksheetProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const totalPages = 4;

  const isDataComplete = () => {
    if (!data) return false;
    
    const { reflection, personality, story, differentiation } = data;
    
    const isReflectionComplete = reflection?.whoIAm && reflection.whoIAmNot && reflection.whyBuildBrand;
    const isPersonalityComplete = personality?.communicationStyle && personality.toneAndVoice && 
                                personality.passionateExpression && personality.brandPersonality;
    const isStoryComplete = story?.pivotalExperience && story.definingMoment && story.audienceRelevance;
    const isDifferentiationComplete = differentiation?.uniqueApproach && differentiation.uniqueResources && 
                                    differentiation.competitivePerception;

    return isReflectionComplete && isPersonalityComplete && isStoryComplete && isDifferentiationComplete;
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (onNextSection && pdfDownloaded) {
      onNextSection();
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownloadPDF = async () => {
    if (!isDataComplete()) {
      toast.error('Please complete all sections before downloading the PDF');
      return;
    }

    try {
      setIsGeneratingPDF(true);
      const doc = generateBrandIdentityPDF(data);
      doc.save('brand-identity-worksheet.pdf');
      toast.success('Brand Identity PDF downloaded successfully!');
      if (onPdfDownloaded) {
        onPdfDownloaded();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderPage = () => {
    const defaultBrandIdentity = data || {
      reflection: { whoIAm: '', whoIAmNot: '', whyBuildBrand: '' },
      personality: { communicationStyle: '', toneAndVoice: '', passionateExpression: '', brandPersonality: '' },
      story: { pivotalExperience: '', definingMoment: '', audienceRelevance: '' },
      differentiation: { uniqueApproach: '', uniqueResources: '', competitivePerception: '' }
    };

    switch (currentPage) {
      case 1:
        return (
          <ReflectionPage
            data={defaultBrandIdentity.reflection}
            onChange={(reflection) => onChange({ 
              ...defaultBrandIdentity,
              reflection
            })}
          />
        );
      case 2:
        return (
          <PersonalityPage
            data={defaultBrandIdentity.personality}
            onChange={(personality) => onChange({
              ...defaultBrandIdentity,
              personality
            })}
          />
        );
      case 3:
        return (
          <StoryPage
            data={defaultBrandIdentity.story}
            onChange={(story) => onChange({
              ...defaultBrandIdentity,
              story
            })}
          />
        );
      case 4:
        return (
          <DifferentiationPage
            data={defaultBrandIdentity.differentiation}
            onChange={(differentiation) => onChange({
              ...defaultBrandIdentity,
              differentiation
            })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {renderPage()}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
          disabled={currentPage === 1}
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isGeneratingPDF || !isDataComplete()}
          >
            <FiDownload />
            <span>{isGeneratingPDF ? 'Generating PDF...' : !isDataComplete() ? 'Complete All Sections First' : 'Download PDF'}</span>
          </button>
          <button
            onClick={handleNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              currentPage === totalPages && !pdfDownloaded
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
            disabled={currentPage === totalPages && !pdfDownloaded}
          >
            <span>{currentPage === totalPages ? 'Next Section' : 'Next'}</span>
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
