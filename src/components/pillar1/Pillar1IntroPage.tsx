import React from 'react';

interface Pillar1IntroPageProps {
  onNextSection: () => void;
}

export default function Pillar1IntroPage({ onNextSection }: Pillar1IntroPageProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Brand Foundation & Strategy</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-xl mb-6">
          Before diving into design, marketing, or content creation, it's crucial to define
          who you are, what you stand for, and where you're heading. This clarity ensures that
          every subsequent choice aligns with your authentic vision.
        </p>

        <p className="text-xl mb-6">
          This pillar will guide you through establishing a strong foundation for your brand and developing 
          a clear strategy for success.
        </p>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">What You'll Accomplish</h2>
          <ul className="space-y-3">
            <li>✓ Define your brand's identity and core values</li>
            <li>✓ Create a compelling vision and mission statement</li>
            <li>✓ Develop an execution roadmap for your brand</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Components</h2>
          <ul className="space-y-3">
            <li>
              <strong>Brand Identity:</strong> Solidify the traits, tone, and story that make
              your presence uniquely yours
            </li>
            <li>
              <strong>Vision & Goals:</strong> Set short- and long-term targets to keep you on
              track and motivated
            </li>
            <li>
              <strong>Execution Roadmap:</strong> Lay out actionable steps for the next month
              to build momentum
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="space-y-3">
            <li>1. Complete each section's worksheet thoughtfully and thoroughly</li>
            <li>2. Save your progress as you go</li>
            <li>3. Download your completed strategy document</li>
            <li>4. Move on to implement your plan</li>
          </ol>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onNextSection}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Begin Your Brand Journey
          </button>
        </div>
      </div>
    </div>
  );
}
