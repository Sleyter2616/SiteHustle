import React, { useState } from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import ReflectionPage from './pages/ReflectionPage';
import PersonalityPage from './pages/PersonalityPage';
import StoryPage from './pages/StoryPage';
import DifferentiationPage from './pages/DifferentiationPage';
import ExecutionRoadmapPage from './pages/ExecutionRoadmapPage';
import ConclusionPage from './pages/ConclusionPage';

interface BrandIdentityWorksheetProps {
  data: Pillar1Data;
  onChange: (data: Partial<Pillar1Data>) => void;
  onComplete?: () => void;
}

export default function BrandIdentityWorksheet({ data, onChange, onComplete }: BrandIdentityWorksheetProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPage = () => {
    const defaultBrandIdentity = data.brandIdentity || {
      reflection: { whoIAm: '', whoIAmNot: '', whyBuildBrand: '' },
      personality: { communicationStyle: '', toneAndVoice: '', passionateExpression: '', brandPersonality: '' },
      story: { pivotalExperience: '', definingMoment: '', audienceRelevance: '' },
      differentiation: { uniqueApproach: '', uniqueResources: '', competitivePerception: '' }
    };

    const defaultExecutionRoadmap = data.executionRoadmap || {
      thirtyDayGoal: '',
      weeklyMilestones: ['', '', '', ''],
      contentPlan: '',
      immediateActions: []
    };

    switch (currentPage) {
      case 1:
        return (
          <ReflectionPage
            data={defaultBrandIdentity.reflection}
            onChange={(reflection) => onChange({ 
              brandIdentity: { ...defaultBrandIdentity, reflection }
            })}
          />
        );
      case 2:
        return (
          <PersonalityPage
            data={defaultBrandIdentity.personality}
            onChange={(personality) => onChange({ 
              brandIdentity: { ...defaultBrandIdentity, personality }
            })}
          />
        );
      case 3:
        return (
          <StoryPage
            data={defaultBrandIdentity.story}
            onChange={(story) => onChange({ 
              brandIdentity: { ...defaultBrandIdentity, story }
            })}
          />
        );
      case 4:
        return (
          <DifferentiationPage
            data={defaultBrandIdentity.differentiation}
            onChange={(differentiation) => onChange({ 
              brandIdentity: { ...defaultBrandIdentity, differentiation }
            })}
          />
        );
      case 5:
        return (
          <ExecutionRoadmapPage
            data={defaultExecutionRoadmap}
            onChange={(executionRoadmap) => onChange({ executionRoadmap })}
          />
        );
      case 6:
        return (
          <ConclusionPage
            data={data}
            onComplete={onComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Brand Identity</h1>
        <p className="text-gray-300">
          Build a strong foundation for your brand by defining who you are and how you communicate.
        </p>
      </div>

      {renderPage()}

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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          {currentPage === totalPages ? 'Complete' : 'Next'}
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
    </div>
  );
}
