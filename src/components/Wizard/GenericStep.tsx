import React, { ChangeEvent } from 'react';
import { StepComponentProps } from '@/types/wizard';

interface FieldMapping {
  label: string;
  tooltip: string;
  placeholder: string;
  minLength?: number;
  isArray?: boolean;
}

interface GenericStepProps<T> extends StepComponentProps<T> {
  fieldMappings: Record<keyof T, FieldMapping>;
}

const GenericStep = <T extends Record<string, any>>({
  data,
  onDataChange,
  isActive,
  fieldMappings,
}: GenericStepProps<T>) => {
  const handleChange = (field: keyof T) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Handle array fields by splitting on newlines
    const finalValue = fieldMappings[field].isArray 
      ? newValue.split('\n').filter(line => line.trim() !== '')
      : newValue;

    onDataChange({
      ...data,
      userInput: {
        ...data.userInput,
        [field]: finalValue,
      },
    });
  };

  const getFieldValue = (field: keyof T): string => {
    const value = data.userInput?.[field];
    if (Array.isArray(value)) {
      return value.join('\n');
    }
    return value || '';
  };

  return (
    <div className="space-y-8">
      {Object.entries(fieldMappings).map(([field, config]) => (
        <div 
          key={field as string} 
          className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transform transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <label 
              htmlFor={`field-${field}`}
              className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            >
              {config.label}
              {config.minLength && (
                <span className="ml-2 text-xs text-gray-500">
                  (min. {config.minLength} characters)
                </span>
              )}
            </label>
            <div 
              className="cursor-help"
              title={config.tooltip}
            >
              <svg 
                className="w-4 h-4 text-[#A0AEC0]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mb-2">
            {config.tooltip}
          </p>

          <textarea
            id={`field-${field}`}
            value={getFieldValue(field as keyof T)}
            onChange={handleChange(field as keyof T)}
            disabled={!isActive}
            placeholder={config.placeholder}
            rows={config.isArray ? 6 : 4}
            className={`
              w-full bg-gray-800/50 border border-gray-700 rounded-lg 
              px-4 py-3 text-white placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              ${config.isArray ? 'whitespace-pre-wrap' : ''}
            `}
          />

          {config.isArray && (
            <p className="mt-2 text-sm text-gray-400">
              Enter multiple items, one per line
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GenericStep;
