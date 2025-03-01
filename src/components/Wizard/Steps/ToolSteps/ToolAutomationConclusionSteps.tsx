'use client';
import React from 'react';
import { StepComponentProps, WizardData } from '@/types/wizard';
import { useRouter } from 'next/navigation';
import { generateToolAutomationPlanDocument } from '@/utils/generateDocument';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

interface ToolAutomationConclusionStepProps extends StepComponentProps<WizardData> {
  onNextModule?: () => void;
}

const ToolAutomationConclusionStep: React.FC<ToolAutomationConclusionStepProps> = ({ data, isActive, onNextModule }) => {
  const router = useRouter();

  if (!isActive) return null;

  // Parse the AI output from review data (expects a JSON string with keys for each section)
  let aiOutputDisplay = 'No AI output available.';
  let sections = {
    logic: '',
    lookFeel: '',
    automation: '',
    review: ''
  };

  try {
    const parsedOutput = JSON.parse(data.aiOutput);
    sections = {
      logic: parsedOutput.logic || '',
      lookFeel: parsedOutput.lookFeel || '',
      automation: parsedOutput.automation || '',
      review: parsedOutput.review || ''
    };
  } catch (error) {
    console.error('Error parsing AI output:', error);
  }

  const handleDownloadPDF = () => {
    // Generate PDF from the final aggregated userInput data
    const pdfBlob = generateToolAutomationPlanDocument(data.userInput);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tool_Automation_Plan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Your Tool & Automation Plan is Ready!</h1>
        <p className="text-gray-400">Review the final AI-generated plan below and download the complete PDF version.</p>
      </div>

      <div className="space-y-6">
        {/* Business Logic & Architecture Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-blue-500/20">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Business Logic & Architecture</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.logic}</p>
          </div>
        </div>

        {/* Look & Feel and Customer Experience Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">Look & Feel and Customer Experience</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.lookFeel}</p>
          </div>
        </div>

        {/* Tool & Automation Recommendations Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-green-500/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Tool & Automation Recommendations</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.automation}</p>
          </div>
        </div>

        {/* Expert Review & Final Recommendations Section */}
        <div className="bg-[#1a2236] rounded-xl p-6 border border-yellow-500/20">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Expert Review & Final Recommendations</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{sections.review}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FiDownload className="w-5 h-5" />
          Download Plan PDF
        </button>
        
        <button
          onClick={() => router.push('/implementation-wizard')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
           >
          Continue to Implementation
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ToolAutomationConclusionStep;