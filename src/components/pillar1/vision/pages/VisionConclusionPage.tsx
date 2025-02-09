import React from 'react';

interface VisionConclusionPageProps {}

export default function VisionConclusionPage({}: VisionConclusionPageProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Vision & Goals Recap
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Congratulations on completing this foundational work! You've crafted a clear vision, set meaningful goals, 
          identified your ideal audience, analyzed your position, and mapped out the customer journey. These aren't just 
          exercises—they're the blueprint for your success.
        </p>
        <p className="mt-4">
          As you move forward, remember that this is a living document. Your vision and goals will evolve as you grow and 
          learn. Return to these insights regularly, celebrate your progress, and adjust your course as needed. You've laid 
          the groundwork for something remarkable—now it's time to bring it to life.
        </p>
      </div>

      <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Your Vision Journey Highlights
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Clearly defined your mission and guiding principles</li>
            <li>Set meaningful and time-bound business goals</li>
            <li>Identified and understood your ideal customers and their challenges</li>
            <li>Created a detailed customer journey from discovery to loyalty</li>
            <li>Performed a thorough SWOT analysis to understand your market position</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Next Steps
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium mb-2 text-gray-200">Action Items</h4>
              <p className="text-gray-300">
                Schedule a review session with your key stakeholders to discuss this vision document. Use their insights to refine your strategy, adjust your goals, and ensure that your vision remains aligned with your evolving business landscape.
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium mb-2 text-gray-200">Coming Up in the Next Pillar</h4>
              <p className="text-gray-300">
                With your vision solidified, you'll soon explore the optimal no-code and AI-based tools that can bring your strategy to life. Discover how these tools can streamline your execution and further align with your brand identity and strategic objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}