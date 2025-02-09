// src/components/brand-identity/pages/StoryPage.tsx

import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

type StoryData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['story'];

interface StoryPageProps {
  data: StoryData;
  onChange: (data: StoryData) => void;
}

export default function StoryPage({ data, onChange }: StoryPageProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Crafting Your Brand Story
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          A personal brand story is what makes you truly memorable. When you openly share 
          your journey—the challenges, breakthroughs, and lessons learned—you give people 
          a reason to connect with you on a deeper level.
        </p>
        <p className="mt-4">
          Reflect on the moments that shaped you and why your brand matters. Your story 
          can build trust quickly by revealing the human side behind your venture.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              What pivotal experience led you here?
            </h3>
            <Tooltip content="Think about the key moment that sparked your entrepreneurial journey.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Anchoring your brand in a real-life turning point helps the audience see how 
            you've grown and what drives you forward.
          </p>
          <TextArea
            value={data.pivotalExperience}
            onChange={(value) => onChange({ ...data, pivotalExperience: value })}
            placeholder="Share a specific event or realization that sparked your path..."
            rows={4}
          />
        </div>

        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Which struggle or aha-moment defines your motivation?
            </h3>
            <Tooltip content="Share a challenge that shaped your perspective or approach.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            This glimpse into your journey reveals the raw passion driving your brand forward.
          </p>
          <TextArea
            value={data.definingMoment}
            onChange={(value) => onChange({ ...data, definingMoment: value })}
            placeholder="Describe a major challenge or realization that fueled your mission..."
            rows={4}
          />
        </div>

        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Why should your audience care about your journey?
            </h3>
            <Tooltip content="Connect your story to your audience's needs and aspirations.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Show how your experiences can guide or inspire others facing similar challenges.
          </p>
          <TextArea
            value={data.audienceRelevance}
            onChange={(value) => onChange({ ...data, audienceRelevance: value })}
            placeholder="Connect your personal story to your audience's needs, hopes, or fears..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}