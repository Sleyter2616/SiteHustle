import React from 'react';
import { Pillar1Data } from '@/types/pillar1';

interface ConclusionPageProps {
  data: Pillar1Data;
  onComplete?: () => void;
}

export default function ConclusionPage({ data, onComplete }: ConclusionPageProps) {
  const handleComplete = () => {
    onComplete?.();
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Wrapping Up Pillar 1: Onward to Tool Selection</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            In this pillar, you've gained crucial self-awareness, refined your brand identity, 
            and aligned your message with your ideal customer. These are your pillars of truth 
            that are going to let your content resonate with a unique audience.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-3">Your Brand Identity Journey</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Defined who you are (and aren't)</li>
            <li>Established your brand voice and personality</li>
            <li>Crafted your authentic brand story</li>
            <li>Identified your unique differentiators</li>
            <li>Created a 30-day action plan</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Next Steps</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Action Items</h4>
              <p className="text-gray-300">
                Revisit your notes and highlight 2 immediate actions you can take to strengthen 
                your brand identity.
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Coming Up in Pillar 2</h4>
              <p className="text-gray-300">
                Next, we'll pick the right no-code or low-code tools to bring your vision to life. 
                We'll focus on selecting tools that align with your brand identity and help you 
                create a consistent, professional presence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleComplete}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Complete Pillar 1
        </button>
      </div>
    </div>
  );
}
