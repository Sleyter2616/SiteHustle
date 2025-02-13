'use client';
import React from 'react';
import { StepComponentProps } from '@/types/wizard';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { generateBusinessPlanDocument } from '@/utils/generateDocument';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

interface ConclusionStepProps extends StepComponentProps<any> {
  onNextModule?: () => void;
}

const ConclusionStep: React.FC<ConclusionStepProps> = ({ data, isActive, onNextModule }) => {
  const router = useRouter();

  if (!isActive) return null;

  let aiOutputDisplay = 'No AI output available.';
  let sections = {
    idea_market: '',
    branding: '',
    execution: '',
    review: ''
  };

  try {
    const parsedOutput = JSON.parse(data.aiOutput);
    sections = {
      idea_market: parsedOutput.idea_market || '',
      branding: parsedOutput.branding || '',
      execution: parsedOutput.execution || '',
      review: parsedOutput.review || ''
    };
  } catch (error) {
    console.error('Error parsing AI output:', error);
  }

  const handleDownloadPDF = () => {
    // Generate the PDF document from the complete aggregated wizard data (data.userInput)
    const pdfBlob = generateBusinessPlanDocument(data.userInput);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Business_Plan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Your Business Plan is Ready!</h1>
        <p className="text-gray-400">Review your AI-generated business plan below and download the complete PDF version.</p>
      </div>

      <div className="space-y-6">
        {/* Market Analysis Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-blue-500/20">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Market Analysis & Opportunity</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.idea_market}</p>
          </div>
        </div>

        {/* Branding Strategy Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">Branding Strategy</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.branding}</p>
          </div>
        </div>

        {/* Execution Plan Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-green-500/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Execution Plan</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.execution}</p>
          </div>
        </div>

        {/* Final Review Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-yellow-500/20">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Expert Review & Recommendations</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.review}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FiDownload className="w-5 h-5" />
          Download Business Plan PDF
        </button>
        
        <button
          onClick={onNextModule}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
          Continue to Tool & Automation Planning
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ConclusionStep;