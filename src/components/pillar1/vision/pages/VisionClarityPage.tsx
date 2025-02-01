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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Vision Clarity
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Define the core elements of your business vision. These foundational pieces will guide your brand's direction and help maintain consistency across all touchpoints.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Business Name */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-400">Business Name</h3>
              <p className="text-gray-400 mt-1">The official name of your business</p>
            </div>
            <Tooltip content="Choose a name that's memorable and reflects your brand identity">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400" />
              </div>
            </Tooltip>
          </div>
          <input
            type="text"
            value={data?.businessName || ''}
            onChange={(e) => updateField('businessName', e.target.value)}
            className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your business name"
          />
          {errors?.businessName && (
            <p className="mt-2 text-red-400 text-sm">{errors.businessName}</p>
          )}
        </div>

        {/* Tagline */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-400">Tagline</h3>
              <p className="text-gray-400 mt-1">A memorable phrase that captures your brand's essence</p>
            </div>
            <Tooltip content="Keep it short, memorable, and aligned with your brand values">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400" />
              </div>
            </Tooltip>
          </div>
          <input
            type="text"
            value={data?.tagline || ''}
            onChange={(e) => updateField('tagline', e.target.value)}
            className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your tagline"
          />
          {errors?.tagline && (
            <p className="mt-2 text-red-400 text-sm">{errors.tagline}</p>
          )}
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-400">Mission Statement</h3>
              <p className="text-gray-400 mt-1">What your business aims to achieve</p>
            </div>
            <Tooltip content="Focus on your purpose and the value you provide to customers">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400" />
              </div>
            </Tooltip>
          </div>
          <textarea
            value={data?.missionStatement || ''}
            onChange={(e) => updateField('missionStatement', e.target.value)}
            className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
            placeholder="Enter your mission statement"
          />
          {errors?.missionStatement && (
            <p className="mt-2 text-red-400 text-sm">{errors.missionStatement}</p>
          )}
        </div>

        {/* Vision Statement */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-400">Vision Statement</h3>
              <p className="text-gray-400 mt-1">Your long-term aspirations and goals</p>
            </div>
            <Tooltip content="Describe where you want your business to be in the future">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400" />
              </div>
            </Tooltip>
          </div>
          <textarea
            value={data?.visionStatement || ''}
            onChange={(e) => updateField('visionStatement', e.target.value)}
            className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
            placeholder="Enter your vision statement"
          />
          {errors?.visionStatement && (
            <p className="mt-2 text-red-400 text-sm">{errors.visionStatement}</p>
          )}
        </div>

        {/* Core Values */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-400">Core Values</h3>
              <p className="text-gray-400 mt-1">The principles that guide your business</p>
            </div>
            <Tooltip content="List the fundamental beliefs that shape your business culture">
              <div className="cursor-help">
                <FiInfo className="w-5 h-5 text-gray-400" />
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