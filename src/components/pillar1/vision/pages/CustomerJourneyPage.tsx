import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { FiInfo } from 'react-icons/fi';

interface CustomerJourneyPageProps {
  data?: VisionData["customerJourney"];
  onChange: (data: VisionData["customerJourney"]) => void;
  errors?: Record<string, string[]>;
}

export default function CustomerJourneyPage({ data, onChange, errors }: CustomerJourneyPageProps) {
  const updateCustomerJourney = (field: string, value: any) => {
    const updatedData = {
      ...data,
      [field]: value,
    };
    console.log("Updated Customer Journey Data:", updatedData);
    onChange(updatedData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Customer Journey
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          The customer journey is the story of how someone transforms from a stranger into a loyal advocate for your brand. 
          Each touchpoint is an opportunity to build trust, provide value, and strengthen the relationship.
        </p>
        <p className="mt-4">
          Here, we'll map out every step of this journey—from first awareness to lasting loyalty. By understanding and 
          optimizing each interaction, you'll create a seamless experience that turns casual interest into strong 
          relationships and sustained growth.
        </p>
      </div>

      <div className="space-y-6">
        {/* Awareness */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Awareness Stage</h3>
          <FormField
            label="How will customers discover your business?"
            required
            error={errors?.['awareness']?.[0]}
            tooltip="Think about marketing channels, content strategy, and brand visibility."
          >
            <textarea
              value={data?.awareness || ''}
              onChange={(e) => updateCustomerJourney('awareness', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Describe how customers will become aware of your business..."
            />
          </FormField>
        </div>

        {/* Consideration */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Consideration Stage</h3>
          <FormField
            label="How will you capture and maintain their interest?"
            required
            error={errors?.['consideration']?.[0]}
            tooltip="Consider content strategy, value proposition, and engagement tactics."
          >
            <textarea
              value={data?.consideration || ''}
              onChange={(e) => updateCustomerJourney('consideration', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Describe how you'll maintain customer interest..."
            />
          </FormField>
        </div>

        {/* Decision */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Decision Stage</h3>
          <FormField
            label="What will convince them to choose your business?"
            required
            error={errors?.['decision']?.[0]}
            tooltip="Think about pricing, features, social proof, and competitive advantages."
          >
            <textarea
              value={data?.decision || ''}
              onChange={(e) => updateCustomerJourney('decision', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Describe what will drive customer decisions..."
            />
          </FormField>
        </div>

        {/* Retention */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Retention Stage</h3>
          <FormField
            label="How will you retain and delight customers?"
            required
            error={errors?.['retention']?.[0]}
            tooltip="Think about customer service, loyalty programs, and ongoing value delivery."
          >
            <textarea
              value={data?.retention || ''}
              onChange={(e) => updateCustomerJourney('retention', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Describe your customer retention strategy..."
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}