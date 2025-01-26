// src/components/pillar1/introConclusion/Pillar1ConclusionPage.tsx

import React from 'react';

interface Pillar1ConclusionPageProps {
  // Possibly accept a callback to move to Pillar 2
  onNextPillar?: () => void;
}

export default function Pillar1ConclusionPage({ onNextPillar }: Pillar1ConclusionPageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Wrapping Up Pillar 1</h1>
        <p className="text-gray-300 leading-relaxed">
          Congratulations! You’ve completed the foundational steps of your business—ensuring a
          clear brand identity, a solid vision for growth, and an actionable roadmap to guide
          your next moves.
        </p>
      </div>

      {/* Key Takeaways */}
      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Key Takeaways</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
          <li>
            <strong>Brand Identity:</strong> You’ve crystallized the core elements that define 
            how you present yourself to your audience.
          </li>
          <li>
            <strong>Vision & Goals:</strong> Your short-, mid-, and long-term targets are set, 
            alongside any specific SMART goals for special initiatives like events or conferences.
          </li>
          <li>
            <strong>Execution Roadmap:</strong> You have a clear 30-day action plan, weekly milestones, 
            and immediate tasks to maintain momentum.
          </li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Next Steps</h3>
        <div className="bg-gray-700 p-4 rounded space-y-2">
          <p className="text-gray-300">
            Now that you have clarity, it's time to move forward! In the upcoming pillars, 
            you’ll dive deeper into:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>No-code platform selection & AI integrations</li>
            <li>Wireframing your website or platform</li>
            <li>Persona development & advanced marketing tactics</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      {onNextPillar && (
        <div className="mt-6">
          <button
            onClick={onNextPillar}
            className="px-6 py-3 bg-green-600 rounded-md text-white hover:bg-green-700"
          >
            Proceed to Pillar 2
          </button>
        </div>
      )}
    </div>
  );
}
