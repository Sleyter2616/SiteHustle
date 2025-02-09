import React from 'react';
import { VisionData } from '@/types/pillar1';
import FormField, { ArrayInput } from '@/components/common/FormField';
import Tooltip from '@/components/common/Tooltip';
import { tooltips } from '@/utils/pillar1Validation';
import { FiInfo } from 'react-icons/fi';

// Define a type for the clarity portion of VisionData
type VisionClarityData = Pick<VisionData, 'businessName' | 'tagline' | 'missionStatement' | 'visionStatement' | 'coreValues'>;

interface VisionClarityPageProps {
  data?: VisionClarityData;
  onChange: (data: VisionClarityData) => void;
  errors?: Record<string, string[]>;
}

export default function VisionClarityPage({ data, onChange, errors }: VisionClarityPageProps) {
  const updateField = (field: keyof VisionClarityData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h2 className="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Vision Clarity
      </h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <p>
          Your vision is the north star that guides every decision in your business journey. It's more than just a statement—it's 
          the embodiment of your aspirations, values, and the change you want to create in the world.
        </p>
        <p className="mt-4">
          In this section, we'll craft a compelling vision that resonates with both you and your future audience. By defining your 
          core purpose and values, you'll create a foundation that attracts the right opportunities and inspires others to join your mission.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Business Name */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                What is your business name?
              </h3>
              <p className="mt-2 text-gray-300">
                The official name of your business
              </p>
            </div>
            <Tooltip content="Choose a name that's memorable and reflects your brand identity">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <input
            type="text"
            value={data?.businessName || ''}
            onChange={(e) => updateField('businessName', e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="Enter your business name"
          />
          {errors?.businessName && (
            <p className="mt-2 text-red-400 text-sm">{errors.businessName}</p>
          )}
        </div>

        {/* Tagline */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                What is your tagline?
              </h3>
              <p className="mt-2 text-gray-300">
                A memorable phrase that captures your brand's essence
              </p>
            </div>
            <Tooltip content="Keep it short, memorable, and aligned with your brand values">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <input
            type="text"
            value={data?.tagline || ''}
            onChange={(e) => updateField('tagline', e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            placeholder="Enter your tagline"
          />
          {errors?.tagline && (
            <p className="mt-2 text-red-400 text-sm">{errors.tagline}</p>
          )}
        </div>

        {/* Mission Statement */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                How do you speak when you're most passionate?
              </h3>
              <p className="mt-2 text-gray-300">
                Identifying your "peak enthusiasm style" helps capture the spark that makes your content unique and inspiring.
              </p>
            </div>
            <Tooltip content="Your mission statement should reflect your core purpose and values">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <textarea
            value={data?.missionStatement || ''}
            onChange={(e) => updateField('missionStatement', e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 min-h-[120px] resize-y"
            placeholder="Write your mission statement..."
            rows={4}
          />
          {errors?.missionStatement && (
            <p className="mt-2 text-red-400 text-sm">{errors.missionStatement}</p>
          )}
        </div>

        {/* Vision Statement */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                What's your brand's overall personality?
              </h3>
              <p className="mt-2 text-gray-300">
                Go beyond a single descriptor—are you bold, friendly, witty, or calm? This is how your audience will feel about your brand after repeated interactions.
              </p>
            </div>
            <Tooltip content="Your vision statement should paint a picture of your desired future impact">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <textarea
            value={data?.visionStatement || ''}
            onChange={(e) => updateField('visionStatement', e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 min-h-[120px] resize-y"
            placeholder="Write your vision statement..."
            rows={4}
          />
          {errors?.visionStatement && (
            <p className="mt-2 text-red-400 text-sm">{errors.visionStatement}</p>
          )}
        </div>

        {/* Core Values */}
        <div className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                What are your core values?
              </h3>
              <p className="mt-2 text-gray-300">
                Your core values guide decision-making and shape your brand's culture. They should resonate with both your team and your audience.
              </p>
            </div>
            <Tooltip content="Core values are the fundamental beliefs that guide your business decisions">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </Tooltip>
          </div>
          <ArrayInput
            label="Core Values"
            values={data?.coreValues || []}
            onChange={(values) => updateField('coreValues', values)}
            required
            placeholder="Add a core value..."
          />
          {errors?.coreValues && (
            <p className="mt-2 text-red-400 text-sm">{errors.coreValues}</p>
          )}
        </div>
      </div>
    </div>
  );
}