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
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Crafting Your Brand Story</h2>
        <div className="prose prose-invert max-w-none">
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
      </div>

      <div className="space-y-6">
        {/* Pivotal Experience */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-200">
              What pivotal experience led you here?
            </h3>
            <Tooltip content="Pinpoint the major turning point or catalyst that inspired you to build your brand.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <TextArea
            value={data?.pivotalExperience}
            onChange={(value) => onChange({ ...data, pivotalExperience: value })}
            placeholder="Share a specific event or realization that sparked your path..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Anchoring your brand in a real-life turning point helps the audience see how 
            you’ve earned your insights or expertise.
          </p>
        </div>

        {/* Defining Moment */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-200">
              Which struggle or aha-moment defines your motivation?
            </h3>
            <Tooltip content="Identify a key challenge or eye-opening realization that shaped your brand’s direction.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <TextArea
            value={data?.definingMoment}
            onChange={(value) => onChange({ ...data, definingMoment: value })}
            placeholder="Describe a major challenge or realization that fueled your mission..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            This glimpse into your journey reveals the raw passion driving your brand forward.
          </p>
        </div>

        {/* Audience Relevance */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-200">
              Why should your audience care about your journey?
            </h3>
            <Tooltip content="Explain how your personal story connects with the needs, goals, or struggles of your ideal audience.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <TextArea
            value={data?.audienceRelevance}
            onChange={(value) => onChange({ ...data, audienceRelevance: value })}
            placeholder="Connect your personal story to your audience’s needs, hopes, or fears..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Show how your experiences can guide or inspire others facing similar challenges.
          </p>
        </div>
      </div>
    </div>
  );
}