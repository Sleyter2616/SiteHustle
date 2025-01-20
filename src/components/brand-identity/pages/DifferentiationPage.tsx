import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import TextArea from '@/components/common/TextArea';

type DifferentiationData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['differentiation'];

interface DifferentiationPageProps {
  data: DifferentiationData;
  onChange: (data: DifferentiationData) => void;
}

export default function DifferentiationPage({ data, onChange }: DifferentiationPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How Do You Stand Out?</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            The online landscape is competitive—so why do customers pick you over someone else? 
            Your differentiation is what sets you apart. These answers should complement your 
            Unique Selling Point (USP) defined earlier in the ICP section of this Pillar.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea
            label="What's a common approach in your niche that you do better—or differently?"
            value={data.uniqueApproach}
            onChange={(value) => onChange({ ...data, uniqueApproach: value })}
            placeholder="Describe how your approach differs from the standard in your industry..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Focus on what makes your approach unique and why it works better for your audience.
          </p>
        </div>

        <div>
          <TextArea
            label="What unique resources or knowledge do you have?"
            value={data.uniqueResources}
            onChange={(value) => onChange({ ...data, uniqueResources: value })}
            placeholder="List your unique skills, experiences, or resources..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Consider both tangible resources and intangible assets like experience or relationships.
          </p>
        </div>

        <div>
          <TextArea
            label="How do you want to be perceived compared to your top competitors?"
            value={data.competitivePerception}
            onChange={(value) => onChange({ ...data, competitivePerception: value })}
            placeholder="Describe how you want customers to see you vs. competitors..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Think about the key differences that make you the better choice for your ideal customer.
          </p>
        </div>
      </div>
    </div>
  );
}
