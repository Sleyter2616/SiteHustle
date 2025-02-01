import React from 'react';
import { FiArrowRight, FiTarget, FiBriefcase, FiCompass } from 'react-icons/fi';

interface Pillar1IntroPageProps {
  onStart?: () => void;
  onNextSection?: () => void;
}

export default function Pillar1IntroPage({ onStart, onNextSection }: Pillar1IntroPageProps) {
  const handleStart = () => {
    onStart?.();
    onNextSection?.();
  };

  const sections = [
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Define your unique brand personality, story, and what sets you apart from competitors."
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Vision & Goals",
      description: "Set clear objectives and understand your target audience to guide your business growth."
    },
    {
      icon: <FiCompass className="w-8 h-8" />,
      title: "Execution Roadmap",
      description: "Create an actionable 30-day plan with weekly milestones to achieve your goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Brand Foundation & Strategy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Build a strong foundation for your business by defining your brand identity, setting clear goals, 
            and creating an actionable roadmap for success.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-lg 
                        transform hover:scale-105 transition-all duration-300
                        border border-gray-700 hover:border-blue-500"
            >
              <div className="text-blue-400 mb-4">
                {section.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {section.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* What You'll Create Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-semibold text-blue-400 mb-8">
            What You'll Create
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Brand Identity PDF</h3>
              <p className="text-gray-300">
                A comprehensive guide defining your brand's personality, values, and unique story.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Vision & Goals PDF</h3>
              <p className="text-gray-300">
                Clear documentation of your mission, vision, and strategic objectives.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Execution Roadmap PDF</h3>
              <p className="text-gray-300">
                A detailed 30-day action plan with specific milestones and tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleStart}
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold
                     bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600
                     text-white rounded-xl shadow-lg hover:shadow-xl
                     transform hover:scale-105 transition-all duration-300"
          >
            Get Started
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
