// src/components/common/CollapsibleSection.tsx
import React, { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#2D3748] p-6 rounded-lg mb-6">
      <div
        className="cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold mb-0">{title}</h3>
        <button
          type="button"
          className="text-sm text-gray-300 underline ml-4"
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}