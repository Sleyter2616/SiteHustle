// src/components/brand-identity/pages/ConclusionPage.tsx

import React from 'react';
import { FiInfo } from 'react-icons/fi';
import Tooltip from '@/components/common/Tooltip';

interface ConclusionPageProps {
}

export default function ConclusionPage({  }: ConclusionPageProps) {

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Conclusion: Your Brand Identity Journey
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          You’ve clarified who you are, how you want to speak, what stories set you apart, 
          and the unique advantage you bring to your niche. This foundation will shape every 
          part of your brand—from visuals to messaging to the audience experience.
        </p>
        <p className="mt-4">
          Remember to revisit and refine your answers as your brand evolves. True clarity 
          emerges over time as you put yourself out there and gather real-world feedback.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Key Achievements
            </h3>
            <Tooltip content="Reflect on the most important insights you've gained about your brand.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Identified your authentic identity and boundaries</li>
            <li>Mapped out a distinct brand personality and voice</li>
            <li>Crafted an engaging personal story for deeper audience connection</li>
            <li>Pinpointed your unique differentiators vs. the competition</li>
          </ul>
        </div>

        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Next Steps
            </h3>
            <Tooltip content="Plan concrete actions to implement your brand identity.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <h4 className="font-medium mb-2">Put Your Identity into Action</h4>
          <p className="text-gray-300">
            Start sharing pieces of your brand identity online. Whether it’s updating 
            your social profiles, writing your first brand-focused posts, or networking 
            in communities, consistent action builds familiarity and trust.
          </p>
          <h4 className="font-medium mb-2">Looking Ahead</h4>
          <p className="text-gray-300">
            In the next pillars, you’ll learn how to refine your site or platform 
            to reflect this identity. Keep building on what you’ve created here, and 
            watch your audience resonate with the authenticity you offer.
          </p>
        </div>
      </div>
    </div>
  );
}