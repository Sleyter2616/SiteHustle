import React from 'react';
import { Pillar1Data } from '@/types/pillar1Types';
import TextArea from '@/components/common/TextArea';

type ReflectionData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['reflection'];

interface ReflectionPageProps {
  data: ReflectionData;
  onChange: (data: ReflectionData) => void;
}

export default function ReflectionPage({ data, onChange }: ReflectionPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who You Are & Why Clarity Matters</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            In the world of modern branding, personal authenticity is what truly resonates. It's about connecting 
            with your audience on a human level, showing up as your unique self, not a carbon copy of someone else.
          </p>
          <p>
            When you understand who you are, what you stand for, and why you're doing this, your brand becomes 
            more magnetic. These reflections will serve as the bedrock for your brand, ensuring everything you 
            create is both authentic and impactful.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <TextArea
            label="Who Am I, Really?"
            value={data.whoIAm}
            onChange={(value) => onChange({ ...data, whoIAm: value })}
            placeholder="Reflect on your authentic self, your values, and what makes you unique..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Consider your core values, passions, and what makes you uniquely you.
          </p>
        </div>

        <div>
          <TextArea
            label="Who Am I Not?"
            value={data.whoIAmNot}
            onChange={(value) => onChange({ ...data, whoIAmNot: value })}
            placeholder="What approaches or personas don't align with your authentic self..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Understanding what doesn't align with you is just as important as knowing who you are.
          </p>
        </div>

        <div>
          <TextArea
            label="Why Build This Brand?"
            value={data.whyBuildBrand}
            onChange={(value) => onChange({ ...data, whyBuildBrand: value })}
            placeholder="Share your deeper motivation for building this brand..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            What drives you to create this brand? What impact do you want to make?
          </p>
        </div>
      </div>
    </div>
  );
}
