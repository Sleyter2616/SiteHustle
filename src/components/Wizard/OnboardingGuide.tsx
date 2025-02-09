import React, { useState, useEffect } from 'react';
import { FiX, FiHelpCircle } from 'react-icons/fi';

interface Props {
  currentStep: number;
}

const OnboardingGuide: React.FC<Props> = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('onboardingGuideDismissed');
    if (dismissed === 'true') {
      setIsOpen(false);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('onboardingGuideDismissed', 'true');
    setIsOpen(false);
    setHasBeenClosed(true);
  };

  const getStepGuide = () => {
    switch (currentStep) {
      case 0:
        return {
          title: 'Vision & Mission',
          description: 'Start by defining your business vision, mission statement, and core values. These will guide all future decisions.',
        };
      case 1:
        return {
          title: 'Brand Identity',
          description: 'Create an authentic brand personality that resonates with your target audience and reflects your values.',
        };
      case 2:
        return {
          title: 'Customer Journey',
          description: 'Map out how customers will discover, evaluate, and engage with your business.',
        };
      case 3:
        return {
          title: 'Execution Plan',
          description: 'Break down your vision into actionable steps with a 30-day roadmap for success.',
        };
      default:
        return {
          title: 'Welcome to SiteHustle Wizard! 👋',
          description: 'Let\'s build your online business step by step. Each section will guide you through the process.',
        };
    }
  };

  const guide = getStepGuide();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
        title="Show help guide"
      >
        <FiHelpCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`
      fixed inset-x-4 bottom-4 sm:max-w-sm sm:right-4 sm:left-auto
      bg-[#1a2236] rounded-xl p-6 shadow-xl border border-gray-700
      transform transition-all duration-500 ease-in-out
      ${hasBeenClosed ? 'animate-slide-in-bottom' : ''}
    `}>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors duration-200"
        title="Close guide"
      >
        <FiX className="w-5 h-5" />
      </button>

      <h3 className="text-lg font-semibold text-white mb-2">
        {guide.title}
      </h3>

      <p className="text-gray-400 text-sm">
        {guide.description}
      </p>

      <div className="mt-4 text-xs text-gray-500">
        Step {currentStep + 1} of 4
      </div>
    </div>
  );
};

export default OnboardingGuide;
