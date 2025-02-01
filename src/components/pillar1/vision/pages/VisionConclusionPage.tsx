import React from 'react';

interface VisionConclusionPageProps {}

export default function VisionConclusionPage({}: VisionConclusionPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Wrapping Up Your Vision & Goals</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Congratulations on developing a comprehensive roadmap for your business vision! By clearly defining your mission, setting tangible goals, pinpointing your ideal audience, mapping a customer journey, and analyzing your SWOT, you've established a robust foundation for growth.
          </p>
          <p className="mt-4">
            Remember, your vision is a living document. Regularly revisit and refine each section as you gather feedback and encounter new market dynamics. Embrace the evolution of your vision and use it as a catalyst for continuous improvement and innovation.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-3">Your Vision Journey Highlights</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Clearly defined your mission and guiding principles</li>
            <li>Set meaningful and time-bound business goals</li>
            <li>Identified and understood your ideal customers and their challenges</li>
            <li>Created a detailed customer journey from discovery to loyalty</li>
            <li>Performed a thorough SWOT analysis to understand your market position</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Next Steps</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Action Items</h4>
              <p className="text-gray-300">
                Schedule a review session with your key stakeholders to discuss this vision document. Use their insights to refine your strategy, adjust your goals, and ensure that your vision remains aligned with your evolving business landscape.
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Coming Up in the Next Pillar</h4>
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