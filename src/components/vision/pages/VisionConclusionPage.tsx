import React from 'react';

interface VisionConclusionPageProps {}

export default function VisionConclusionPage({}: VisionConclusionPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Wrapping Up Your Vision & Goals</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            You've completed an in-depth look at your business vision, short- and long-term goals, 
            target audience, customer journey, and opportunities/threats. This is the cornerstone 
            of your strategic plan going forward.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-3">Your Vision Journey</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Clarified your mission and guiding principles</li>
            <li>Defined concrete business goals for multiple time horizons</li>
            <li>Mapped out your ideal customer segments and their journeys</li>
            <li>Conducted a SWOT analysis to identify strategic moves</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Next Steps</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Action Items</h4>
              <p className="text-gray-300">
                Review your newly formed vision document, share with key stakeholders, 
                and set up accountability check-ins to track progress on your goals.
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Coming Up in Next Pillar</h4>
              <p className="text-gray-300">
                Now that your vision is established, you'll focus on selecting the right 
                no-code tools and AI integrations to bring it to life with minimal friction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}