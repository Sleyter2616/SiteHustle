import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import TextArea from '@/components/common/TextArea';

type PersonalityData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['personality'];

interface PersonalityPageProps {
  data: PersonalityData;
  onChange: (data: PersonalityData) => void;
}

export default function PersonalityPage({ data, onChange }: PersonalityPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Finding Your Brand Personality & Voice</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Your brand's tone and voice are how you communicate with your audience. A consistent 
            approach builds trust, helps people remember you, and ensures your message aligns with your values.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Casual & Friendly</h3>
              <p className="text-sm text-gray-300">
                Imagine chatting with a friend over coffee, relaxed and approachable.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Authoritative & Professional</h3>
              <p className="text-sm text-gray-300">
                Clearly stated facts, data-driven insights, precise language.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Energetic & Inspiring</h3>
              <p className="text-sm text-gray-300">
                Enthusiastic, motivational, uses strong verbs, forward-looking.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Quirky & Humorous</h3>
              <p className="text-sm text-gray-300">
                Playful, uses lighthearted language and unexpected turns of phrase.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea
            label="What's your preferred communication style with customers?"
            value={data.communicationStyle}
            onChange={(value) => onChange({ ...data, communicationStyle: value })}
            placeholder="Formal or chatty? Professional or casual?"
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Think about how you naturally communicate when you're at your best.
          </p>
        </div>

        <div>
          <TextArea
            label="How do you want your brand to sound?"
            value={data.toneAndVoice}
            onChange={(value) => onChange({ ...data, toneAndVoice: value })}
            placeholder="Describe your ideal brand voice..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Consider how you want your audience to feel when they read your content.
          </p>
        </div>

        <div>
          <TextArea
            label="How do you speak when you're most passionate?"
            value={data.passionateExpression}
            onChange={(value) => onChange({ ...data, passionateExpression: value })}
            placeholder="Describe how you communicate when you're excited about your work..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Your natural enthusiasm can be a powerful part of your brand voice.
          </p>
        </div>

        <div>
          <TextArea
            label="What's your brand's personality?"
            value={data.brandPersonality}
            onChange={(value) => onChange({ ...data, brandPersonality: value })}
            placeholder="Straightforward or creative? Serious or playful?"
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Remember to stay true to your brand values in how you express yourself.
          </p>
        </div>
      </div>
    </div>
  );
}
