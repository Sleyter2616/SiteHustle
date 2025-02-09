// src/components/brand-identity/pages/PersonalityPage.tsx

import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

type PersonalityData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['personality'];

interface PersonalityPageProps {
  data: PersonalityData;
  onChange: (data: PersonalityData) => void;
}

export default function PersonalityPage({ data, onChange }: PersonalityPageProps) {
  return (
    <div className="space-y-8">
      {/* Header & Opening */}
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Shaping Your Brand Personality & Voice
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Your brand’s personality is how you “sound” and “feel” to others. A recognizable tone 
          builds instant familiarity and trust—people know what to expect each time they encounter you.
        </p>
        <p className="mt-4">
          In this section, consider which tone, style, and voice traits naturally match who you 
          are. Authentic communication helps your message reach the right audience on a human level.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {/* Communication Style */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              What’s your preferred communication style with customers?
            </h3>
            <Tooltip content="Consider how formal or casual your interactions should be for brand consistency.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
          Whether it’s formal, chatty, or somewhere in between, consistency in style reinforces credibility.
          </p>
          <TextArea
            value={data?.communicationStyle}
            onChange={(value) => onChange({ ...data, communicationStyle: value })}
            placeholder="Formal and polished, casual and friendly, or something else?"
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Think about the energy you want to convey every time you engage with your audience.
          </p>
        </div>

        {/* Tone & Voice */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              How do you want your brand to sound?
            </h3>
            <Tooltip content="Reflect on the feelings you want to invoke in your audience when they read or hear from you.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
          Consider the emotional response you’re hoping to evoke. Perhaps you’re looking to reassure, 
          energize, or even challenge your audience.
          </p>
          <TextArea
            value={data?.toneAndVoice}
            onChange={(value) => onChange({ ...data, toneAndVoice: value })}
            placeholder="Describe your dream brand voice in a short paragraph..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            A strong tone and voice can make your brand more memorable and approachable.
          </p>
        </div>

        {/* Passionate Expression */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              How do you speak when you're most passionate?
            </h3>
            <Tooltip content="Think about the tone or style you naturally fall into when you're energized about a topic.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
          Identifying your “peak enthusiasm style” helps capture the spark that makes your 
          content unique and inspiring.
          </p>
          <TextArea
            value={data?.passionateExpression}
            onChange={(value) => onChange({ ...data, passionateExpression: value })}
            placeholder="Reflect on times you've been truly excited about your work..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Sharing this energy can create an authentic bond with your audience.
          </p>
        </div>

        {/* Brand Personality */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 
                      transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              What’s your brand’s overall personality?
            </h3>
            <Tooltip content="Consider traits that best describe your brand's character and long-term perception.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Go beyond a single descriptor—are you bold, friendly, witty, or calm? This is how 
            your audience will feel about your brand after repeated interactions.
          </p>
          <TextArea
            value={data?.brandPersonality}
            onChange={(value) => onChange({ ...data, brandPersonality: value })}
            placeholder='E.g., "Playful, smart, approachable," or "Bold, technical, confident."'
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Remain consistent: the personality you shape here sets a standard for all brand expressions.
          </p>
        </div>
      </div>
    </div>
  );
}