import React from 'react';
import { FiArrowRight, FiTarget, FiUser, FiMap } from 'react-icons/fi';

interface Pillar1IntroPageProps {
  onNextSection?: () => void;
}

export default function Pillar1IntroPage({ onNextSection }: Pillar1IntroPageProps) {
  const sections = [
    {
      title: "Brand Identity",
      description: "Define your brand's core values, personality, and unique story that will resonate with your audience.",
      icon: <FiUser className="w-8 h-8" />,
    },
    {
      title: "Vision & Goals",
      description: "Set clear objectives and create a compelling vision that will guide your brand's growth.",
      icon: <FiTarget className="w-8 h-8" />,
    },
    {
      title: "Execution Plan",
      description: "Develop an actionable roadmap to bring your brand strategy to life in the next 30 days.",
      icon: <FiMap className="w-8 h-8" />,
    },
  ];

  const handleStart = () => {
    onNextSection?.();
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="bg-[#1a2236] rounded-xl p-8 text-white mb-16 transform transition-all duration-300 hover:scale-105
                      border border-gray-700 hover:border-purple-500 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              Brand Foundation & Strategy
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Build a strong foundation for your business by defining your brand identity, setting clear goals, 
              and creating an actionable roadmap for success.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className="bg-[#1a2236] rounded-xl p-8 shadow-lg 
                        transform hover:scale-105 transition-all duration-300
                        border border-gray-700 hover:border-purple-500"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 inline-block mb-4">
                {section.icon}
              </div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* What You'll Create Section */}
        <div className="bg-[#1a2236] rounded-xl p-8 shadow-lg mb-16 
                      transform hover:scale-105 transition-all duration-300
                      border border-gray-700 hover:border-purple-500">
          <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
            What You'll Create
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Brand Identity PDF
              </h3>
              <p className="text-gray-300">
                A comprehensive guide defining your brand's personality, values, and unique story.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Vision & Goals PDF
              </h3>
              <p className="text-gray-300">
                Clear documentation of your mission, vision, and strategic objectives.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Execution Roadmap PDF
              </h3>
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
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-medium 
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                     inline-flex items-center gap-3"
          >
            Get Started
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
