'use client'

import { FiCalendar, FiVideo } from 'react-icons/fi'

interface EventCardProps {
  date: string
  time: string
  title: string
  type: 'call' | 'event'
  link?: string
}

export default function EventCard({ date, time, title, type, link }: EventCardProps) {
  return (
    <div className="bg-[#1E293B] rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#E2E8F0] mb-2">{title}</h3>
          <div className="flex items-center space-x-4 text-sm text-[#94A3B8]">
            <div className="flex items-center space-x-2">
              <FiCalendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiVideo className="w-4 h-4" />
              <span>{time}</span>
            </div>
          </div>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#6C63FF] hover:bg-[#5753D8] text-white rounded-lg text-sm transition-colors duration-200"
          >
            Join Call
          </a>
        )}
      </div>
    </div>
  )
}
