// src/components/Wizard/GenericStep.tsx
import React, { ChangeEvent } from 'react';
import { StepComponentProps } from '@/types/wizard';
import { FieldMapping } from '@/mappings/pillar1Mapping';

interface GenericStepProps<T> extends StepComponentProps<T> {
  fieldMappings: Record<keyof T, FieldMapping>;
}

/**
 * Helper function to set a nested value on an object using dot-notation.
 * It mutates the provided object, so use it on a copy.
 */
function setNestedValue(obj: any, key: string, value: any): void {
  const keys = key.split('.');
  const lastKey = keys.pop();
  let pointer = obj;
  keys.forEach((k) => {
    if (!pointer[k]) {
      pointer[k] = {};
    }
    pointer = pointer[k];
  });
  pointer[lastKey!] = value;
}

function getValue(obj: any, key: string): any {
  return key.split('.').reduce((acc, curr) => (acc ? acc[curr] : undefined), obj);
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
      
    // Create a new userInput object (shallow copy) and update the nested value using dot notation
    const newUserInput = { ...data.userInput };
    setNestedValue(newUserInput, field as string, finalValue);

    onDataChange({
      ...data,
      userInput: newUserInput,
    });
  };

  const getFieldValue = (field: keyof T): string => {
    const value = getValue(data.userInput, field as string);
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