import React from 'react';

interface TextAreaProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function TextArea({
  label,
  value = '',
  onChange,
  placeholder,
  rows = 3,
  required = true,
  error,
  className = '',
}: TextAreaProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between">
        <label className="block text-sm font-medium text-gray-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-3 py-2 bg-gray-800 border rounded-md
          text-gray-200 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${error ? 'focus:border-red-500' : 'focus:border-blue-500'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
