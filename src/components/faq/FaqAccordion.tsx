'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[#2D3748] rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-[#1E293B] hover:bg-[#2D3748] transition-colors duration-200"
          >
            <span className="text-left text-[#E2E8F0] font-medium">
              {item.question}
            </span>
            <FiChevronDown
              className={`w-5 h-5 text-[#94A3B8] transition-transform duration-200 ${
                expandedIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedIndex === index && (
            <div className="px-6 py-4 bg-[#1E293B]/50">
              <p className="text-[#94A3B8] whitespace-pre-wrap">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
