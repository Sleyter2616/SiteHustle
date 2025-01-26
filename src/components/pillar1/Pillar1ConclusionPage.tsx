import React from 'react';
import { Pillar1Data } from '@/types/pillar1';

interface Pillar1ConclusionPageProps {
  data: Pillar1Data;
  onCompletePillar?: () => void;
}

export default function Pillar1ConclusionPage({ data, onCompletePillar }: Pillar1ConclusionPageProps) {


  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Congratulations! 🎉</h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-xl">
          You’ve successfully completed the <strong>Brand Foundation & Strategy</strong> pillar! 
          Let’s recap the PDFs you’ve created and how they’ll shape your business going forward.
        </p>
      </div>

      {/* Summaries of the PDFs */}
      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold">How to Use Your PDFs</h2>

        {/* Brand Identity PDF */}
        <div>
          <h3 className="text-lg font-medium text-blue-400 mb-1">1. Brand Identity PDF</h3>
          <p className="text-gray-300">
            This document clarifies who you are as a brand—your values, personality, and story. 
            Use it whenever you create marketing materials, write content, or hire new team members 
            so they fully grasp the essence of your brand.
          </p>
        </div>

        {/* Vision PDF */}
        <div>
          <h3 className="text-lg font-medium text-blue-400 mb-1">2. Vision & Goals PDF</h3>
          <p className="text-gray-300">
            This worksheet outlines your broader mission, specific objectives, and target audience insights. 
            Treat it as your strategic compass, ensuring every new initiative or partnership aligns 
            with your high-level vision. Revisit it each quarter to measure progress and adjust goals.
          </p>
        </div>

        {/* Execution Roadmap PDF */}
        <div>
          <h3 className="text-lg font-medium text-blue-400 mb-1">3. Execution Roadmap PDF</h3>
          <p className="text-gray-300">
            This is your actionable 30-day plan. It’s not just a static reference—use it to track weekly milestones, 
            content objectives, and immediate action items. Mark items off as you complete them to maintain momentum.
          </p>
        </div>

        <p className="text-gray-300 mt-4">
          Altogether, these three documents paint a holistic picture of your brand’s current positioning and 
          short-term tactics. They’re living assets—update them as you learn new things about your audience, 
          refine your services, or shift your brand messaging.
        </p>
      </div>

      {/* Quick Recap + Next Steps */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Quick Recap of Your Pillar 1 Achievements</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>
            Refined your <strong>brand identity</strong> (authentic reflection, personality, story, differentiation).
          </li>
          <li>
            Clarified your <strong>vision & goals</strong> (short-term, mid-term, and long-term objectives).
          </li>
          <li>
            Outlined an actionable <strong>execution roadmap</strong> (30-day goal, weekly milestones, content plan, immediate actions).
          </li>
        </ul>
      </div>

      {/* Example: Display a snippet from the user’s brand or mission, if present */}
      {data.brandIdentity?.reflection?.whoIAm && (
        <div className="bg-blue-900/50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-300">Your Core Identity</h3>
          <p className="text-gray-100">{data.brandIdentity.reflection.whoIAm}</p>
        </div>
      )}

      {/* Next Pillar CTA */}
      <div className="bg-blue-900 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">Ready for Pillar 2?</h2>
        <p className="text-gray-200 mb-4">
          In the next pillar, you’ll begin selecting the <strong>no-code and AI tools</strong> to build or enhance 
          your online presence. You’ll see how each choice aligns with the brand identity and goals you’ve just clarified.
        </p>
        <button
          onClick={onCompletePillar}
          className="
            bg-purple-600 hover:bg-purple-700
            text-white font-semibold px-6 py-3
            rounded-lg
          "
        >
          Move on to Pillar 2
        </button>
      </div>

      {/* Support or Help */}
      <div className="bg-gray-800 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-100">Need Any Support?</h2>
        <p className="text-gray-300">
          Remember, your brand strategy is an evolving guidepost. If you have questions or 
          need extra help, check out our community resources, reach out to a mentor, or consult 
          with our branding experts to further refine your approach.
        </p>
      </div>
    </div>
  );
}
