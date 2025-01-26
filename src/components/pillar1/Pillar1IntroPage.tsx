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
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="space-y-3">
            <li>1. Complete each section's worksheet</li>
            <li>2. Download your completed PDF</li>
            <li>3. Move on to the next section</li>
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
