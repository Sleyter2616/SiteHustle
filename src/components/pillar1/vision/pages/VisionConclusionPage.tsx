import React from 'react';

interface VisionConclusionPageProps {}

export default function VisionConclusionPage({}: VisionConclusionPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Wrapping Up Your Vision & Goals</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            You've built a detailed roadmap of your business vision. By clarifying your mission,
            identifying tangible goals, pinpointing your ideal audience, crafting a supportive
            customer journey, and analyzing your SWOT, you have the core framework to scale successfully.
          </p>
          <p className="mt-4">
            Keep refining each section as you gather feedback and real-world insights.
            A vision is never static—it evolves with your growth and changing market dynamics.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-3">Your Vision Journey Highlights</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Articulated your fundamental mission and guiding principles</li>
            <li>Laid out meaningful, time-bound business goals</li>
            <li>Profiled your ideal customers and their core challenges</li>
            <li>Built a step-by-step customer journey from discovery to loyalty</li>
            <li>Conducted a SWOT analysis to anticipate strengths, weaknesses, and market shifts</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Next Steps</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Action Items</h4>
              <p className="text-gray-300">
                Revisit your newly formed vision document with key stakeholders.
                Schedule check-ins to track progress, adapt goals as needed, and maintain accountability.
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Coming Up in the Next Pillar</h4>
              <p className="text-gray-300">
                With your vision established, you’ll move into selecting the right no-code and
                AI-based tools to streamline execution. You’ll see how each choice aligns with
                your brand identity and the strategic goals outlined here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}