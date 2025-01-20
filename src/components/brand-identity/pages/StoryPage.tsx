import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import TextArea from '@/components/common/TextArea';

type StoryData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['story'];

interface StoryPageProps {
  data: StoryData;
  onChange: (data: StoryData) => void;
}

export default function StoryPage({ data, onChange }: StoryPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Brand Story: Where Authenticity Shines</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Personal stories build trust and connection with your audience. When you share your journey, 
            your struggles, and your wins, you make your brand relatable and human. Your story is unique 
            to you and helps create an emotional connection with your audience.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea
            label="What pivotal experience led you here?"
            value={data.pivotalExperience}
            onChange={(value) => onChange({ ...data, pivotalExperience: value })}
            placeholder="Share the key moment or experience that sparked your journey..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Think about the moment that made you realize this was your path.
          </p>
        </div>

        <div>
          <TextArea
            label="Which struggle or aha-moment defines your motivation?"
            value={data.definingMoment}
            onChange={(value) => onChange({ ...data, definingMoment: value })}
            placeholder="Describe a challenge you overcame or insight that changed everything..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Your struggles and breakthroughs can inspire others facing similar challenges.
          </p>
        </div>

        <div>
          <TextArea
            label="Why should your audience care about your journey?"
            value={data.audienceRelevance}
            onChange={(value) => onChange({ ...data, audienceRelevance: value })}
            placeholder="Connect your story to your audience's needs and aspirations..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Help your audience see themselves in your story and understand how it relates to them.
          </p>
        </div>
      </div>
    </div>
  );
}
