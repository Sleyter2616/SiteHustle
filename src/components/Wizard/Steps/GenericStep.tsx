'use client';
import React, { ChangeEvent } from 'react';
import { StepComponentProps } from '@/types/wizard';
import { FieldMapping } from '@/mappings/commonMappingTypes';

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

  const handleChange = (field: keyof T, value: any) => {
    const newUserInput = { ...data.userInput };
    setNestedValue(newUserInput, field as string, value);
    onDataChange({
      ...data,
      userInput: newUserInput,
    });
  };

  const renderInput = (field: keyof T, config: FieldMapping) => {
    const fieldValue = getValue(data.userInput, String(field));
    switch (config.inputType) {
      case 'dropdown':
        return (
          <select
            id={`field-${String(field)}`}
            value={fieldValue || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            disabled={!isActive}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
          >
            <option value="">{config.placeholder}</option>
            {config.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkboxGroup':
        {
          // For checkboxGroup, we expect fieldValue to be an array of strings.
          const currentValues: string[] = Array.isArray(fieldValue) ? fieldValue : [];
          return (
            <div className="space-y-2">
              {config.options?.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={currentValues.includes(option)}
                    onChange={(e) => {
                      let newValues = [...currentValues];
                      if (e.target.checked) {
                        newValues.push(option);
                      } else {
                        newValues = newValues.filter((val) => val !== option);
                      }
                      handleChange(field, newValues);
                    }}
                    disabled={!isActive}
                    className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-700 bg-gray-800/50 focus:ring-purple-500/50"
                  />
                  <span className="ml-2 text-white">{option}</span>
                </label>
              ))}
            </div>
          );
        }
      case 'textarea':
      default:
        return (
          <textarea
            id={`field-${String(field)}`}
            value={Array.isArray(fieldValue) ? fieldValue.join('\n') : fieldValue || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(field, config.isArray ? e.target.value.split('\n').filter(line => line.trim() !== '') : e.target.value)}
            disabled={!isActive}
            placeholder={config.placeholder}
            rows={config.isArray ? 6 : 4}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(fieldMappings).map(([field, config]) => (
        <div 
          key={field}
          className="bg-[#1a2236] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500 transform transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <label 
              htmlFor={`field-${field}`}
              className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            >
              {config.label}
              {config.minLength && config.inputType !== 'checkboxGroup' && (
                <span className="ml-2 text-xs text-gray-500">
                  (min. {config.minLength} characters)
                </span>
              )}
            </label>
            <div className="cursor-help" title={config.tooltip}>
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
          <p className="text-sm text-gray-400 mb-2">{config.tooltip}</p>
          {renderInput(field as keyof T, config)}
          {config.isArray && config.inputType !== 'checkboxGroup' && (
            <p className="mt-2 text-sm text-gray-400">Enter multiple items, one per line</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GenericStep;