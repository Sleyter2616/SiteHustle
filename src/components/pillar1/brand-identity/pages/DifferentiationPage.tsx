// src/components/brand-identity/pages/DifferentiationPage.tsx

import React from 'react';
import { Pillar1Data } from '@/types/pillar1';
import TextArea from '@/components/common/TextArea';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

type DifferentiationData = NonNullable<NonNullable<Pillar1Data['brandIdentity']>>['differentiation'];

interface DifferentiationPageProps {
  data: DifferentiationData;
  onChange: (data: DifferentiationData) => void;
}

export default function DifferentiationPage({ data, onChange }: DifferentiationPageProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Standing Out in a Crowded Market</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            There are countless brands vying for attention. Differentiation means identifying 
            how you excel beyond the standard approach—through your unique methods, skills, or resources.
          </p>
          <p className="mt-4">
            By clarifying what you do better or differently, you show customers and clients why 
            you’re the best fit for their needs. Your distinct edge can become a magnet for 
            those who resonate with your approach.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Unique Approach */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-200">
              What's a common approach in your niche that you do better—or differently?
            </h3>
            <Tooltip content="Reflect on typical strategies in your field and pinpoint how your approach stands out.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <TextArea
            value={data?.uniqueApproach}
            onChange={(value) => onChange({ ...data, uniqueApproach: value })}
            placeholder="Explain how your methods diverge from the norm..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            This might include specialized knowledge or an original strategy that others simply can’t copy.
          </p>
        </div>

        {/* Unique Resources */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-200">
              What unique resources or knowledge do you have?
            </h3>
            <Tooltip content="Consider intellectual property, specialized experience, or unique connections you bring.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <TextArea
            value={data?.uniqueResources}
            onChange={(value) => onChange({ ...data, uniqueResources: value })}
            placeholder="List any special tools, experiences, or insider connections..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            These resources can be intellectual (skills, insight) or tangible (apps, networks).
          </p>
        </div>

        {/* Competitive Perception */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-200">
              How do you want to be perceived compared to competitors?
            </h3>
            <Tooltip content="Think about the impression you want potential clients to hold about you, versus others.">
              <div className="cursor-help">
                <FiInfo className="w-4 h-4 text-[#A0AEC0]" />
              </div>
            </Tooltip>
          </div>
          <TextArea
            value={data?.competitivePerception}
            onChange={(value) => onChange({ ...data, competitivePerception: value })}
            placeholder="Describe the impression you want your audience to hold about you, vs. others..."
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            This shapes the story you tell about why you’re the better (or more aligned) choice 
            for your ideal clients.
          </p>
        </div>
      </div>
    </div>
  );
}