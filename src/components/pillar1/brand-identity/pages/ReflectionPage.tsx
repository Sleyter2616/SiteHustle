// src/components/brand-identity/pages/ReflectionPage.tsx

import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';
import FormField from '@/components/common/FormField';

type ReflectionData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['reflection'];

interface ReflectionPageProps {
  data: ReflectionData;
  onChange: (data: ReflectionData) => void;
}

export default function ReflectionPage({ data, onChange }: ReflectionPageProps) {
  return (
    <div className="space-y-8">
      {/* Header & Opening */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Reflection: Defining Who You Are
        </h2>
        <div className="prose prose-invert max-w-none leading-relaxed">
          <p className="text-lg text-gray-300">
            Personal branding has grown into a major force in modern business, allowing individuals 
            to stand out in a crowded marketplace. By clarifying exactly who you are—and who you 
            aren’t—you create a foundation that connects authentically with the people you want to serve.
          </p>
          <p className="text-lg text-gray-300 mt-4">
            This section invites you to explore your unique strengths, motivations, and personal style.
            The clarity you gain here will fuel every aspect of your brand, from the way you communicate, 
            to the solutions you offer, to the “feeling” people get when interacting with you.
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {/* Who Am I, Really? */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Who Am I, Really?</h3>
          <p className="text-sm text-gray-400 mb-2">
            Think about what makes you “you”—your values, your quirks, your life experiences. 
            This honest reflection sets the tone for everything your brand represents.
          </p>

          <FormField
            label="Who Am I, Really?"
            tooltip="Identify your core values, passions, and personal philosophies. These define your brand's authentic backbone."
          >
            <TextArea
              value={data?.whoIAm}
              onChange={(value) => onChange({ ...data, whoIAm: value })}
              placeholder="Consider your top values, skills, and any personal philosophies..."
              rows={4}
            />
          </FormField>

          <p className="mt-2 text-sm text-gray-400">
            Authenticity is key: the more genuine you are, the more resonant your brand will be.
          </p>
        </div>

        {/* Who Am I Not? */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Who Am I Not?</h3>
          <p className="text-sm text-gray-400 mb-2">
            Defining what doesn’t align with you is just as crucial. This prevents confusion 
            and keeps your brand message consistent.
          </p>

          <FormField
            label="Who Am I Not?"
            tooltip="Clarifying what you refuse to be or do ensures your brand stays authentic and never strays into 'not you.'"
          >
            <TextArea
              value={data?.whoIAmNot}
              onChange={(value) => onChange({ ...data, whoIAmNot: value })}
              placeholder="Which mindsets, approaches, or behaviors feel inauthentic to you?"
              rows={4}
            />
          </FormField>

          <p className="mt-2 text-sm text-gray-400">
            Being clear on what you avoid helps you remain true to your core identity.
          </p>
        </div>

        {/* Why Build This Brand? */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Why Build This Brand?</h3>
          <p className="text-sm text-gray-400 mb-2">
            This question defines your deeper motivation. It’s not just about monetization—it’s 
            about the impact you want to make and the people you aim to uplift or inspire.
          </p>

          <FormField
            label="Why Build This Brand?"
            tooltip="Pinpoint the core purpose behind your brand: who you serve, what difference you want to make, and why it matters."
          >
            <TextArea
              value={data?.whyBuildBrand}
              onChange={(value) => onChange({ ...data, whyBuildBrand: value })}
              placeholder="Share the deeper drive behind your brand ambitions..."
              rows={4}
            />
          </FormField>

          <p className="mt-2 text-sm text-gray-400">
            A clear purpose helps unify your decisions and keeps you focused through challenges.
          </p>
        </div>
      </div>
    </div>
  );
}