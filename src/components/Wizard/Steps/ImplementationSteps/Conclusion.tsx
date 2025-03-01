'use client';
import React from 'react';
import { StepComponentProps, WizardData } from '@/types/wizard';
import { useRouter } from 'next/navigation';
import { generateImplementationPlanDocument } from '@/utils/generateDocument';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

interface ConclusionStepProps extends StepComponentProps<WizardData> {
  onNextModule: () => void;
}

const Conclusion: React.FC<ConclusionStepProps> = ({ data, isActive, onNextModule }) => {
  if (!isActive) return null;

  let aiOutputDisplay = 'No AI output available.';
  try {
    const parsedOutput = JSON.parse(data.aiOutput);
    aiOutputDisplay = typeof parsedOutput === 'string' ? parsedOutput : JSON.stringify(parsedOutput, null, 2);
  } catch (error) {
    console.error('Error parsing AI output:', error);
  }

  const handleDownloadPDF = () => {
    const pdfBlob = generateImplementationPlanDocument(data.userInput);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Implementation_Plan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Your Implementation Plan is Ready!</h1>
        <p className="text-gray-400">Review the AI-generated implementation plan below. You can download a PDF version or continue to the next module.</p>
      </div>

      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 overflow-auto">
        <pre className="whitespace-pre-wrap text-gray-300">{aiOutputDisplay}</pre>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FiDownload className="w-5 h-5" />
          Download Implementation Plan PDF
        </button>
        
        <button
          onClick={onNextModule}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Continue to Next Module
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
