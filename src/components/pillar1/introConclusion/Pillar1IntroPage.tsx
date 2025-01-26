// src/components/pillar1/introConclusion/Pillar1IntroPage.tsx

import React from 'react';

interface Pillar1IntroPageProps {
  // If needed, you can accept props like onBegin or data
  onBegin?: () => void;
}

export default function Pillar1IntroPage({ onBegin }: Pillar1IntroPageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Pillar 1: Laying the Foundation</h1>
        <p className="text-gray-300 leading-relaxed">
          Pillar 1 focuses on shaping the core building blocks of your online business:
          <strong> Brand Identity</strong>, <strong>Vision</strong>, and an actionable
          <strong> Execution Roadmap</strong>. 
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Why This Matters</h2>
        <p className="text-gray-300">
          Before you dive into design, marketing, or content creation, it’s crucial to define
          who you are, what you stand for, and where you’re heading. This clarity ensures that
          every subsequent choice—be it branding colors, platform selection, or growth strategy—
          aligns with your authentic vision.
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4">
          <li>
            <strong>Brand Identity:</strong> Solidify the traits, tone, and story that make
            your presence uniquely yours.
          </li>
          <li>
            <strong>Vision & Goals:</strong> Set short- and long-term targets to keep you on
            track and motivated.
          </li>
          <li>
            <strong>Execution Roadmap:</strong> Lay out actionable steps for the next month
            to build momentum.
          </li>
        </ul>
      </div>

      {/* CTA */}
      {onBegin && (
        <div className="mt-6">
          <button
            onClick={onBegin}
            className="px-6 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-700"
          >
            Start Pillar 1
          </button>
        </div>
      )}
    </div>
  );
}
