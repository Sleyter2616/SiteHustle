'use client'

import { FiCalendar, FiPlay, FiClock } from 'react-icons/fi'

interface PastEventProps {
  title: string
  date: string
  recordingUrl: string
  duration?: string
  highlights?: string[]
  pillar?: number
}

export default function PastEventCard({
  title,
  date,
  recordingUrl,
  duration,
  highlights,
  pillar
}: PastEventProps) {
  return (
    <div className="bg-[#1E293B] rounded-xl p-6">
      {pillar && (
        <div className="inline-block px-3 py-1 mb-4 text-sm bg-[#6C63FF]/10 text-[#6C63FF] rounded-full">
          Pillar {pillar}
        </div>
      )}

      <h3 className="text-xl font-semibold text-[#E2E8F0] mb-3">{title}</h3>
      
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        {duration && (
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      {highlights && highlights.length > 0 && (
        <ul className="mb-6 space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[#94A3B8]">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <a
        href={recordingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white rounded-lg transition-colors duration-200"
      >
        <FiPlay className="w-4 h-4" />
        <span>Watch Recording</span>
      </a>
    </div>
  )
}
