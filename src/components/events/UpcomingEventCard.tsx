'use client'

import { useState } from 'react'
import { FiCalendar, FiClock, FiVideo, FiCheck, FiX, FiUsers } from 'react-icons/fi'
import AddToCalendarDropdown from './AddToCalendarDropdown'

interface UpcomingEventProps {
  title: string
  date: string
  time: string
  description: string
  joinUrl: string
  calendarUrl: string
  pillar?: number
  attendeeCount?: number
  onRsvp?: (attending: boolean) => void
}

export default function UpcomingEventCard({
  title,
  date,
  time,
  description,
  joinUrl,
  calendarUrl,
  pillar,
  attendeeCount = 0,
  onRsvp
}: UpcomingEventProps) {
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not-attending' | null>(null)

  const handleRsvp = (attending: boolean) => {
    setRsvpStatus(attending ? 'attending' : 'not-attending')
    onRsvp?.(attending)
  }

  const getButtonStyles = (isAttending: boolean) => {
    if (isAttending) {
      return rsvpStatus === 'attending'
        ? 'bg-green-500 text-white'
        : 'bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20'
    } else {
      return rsvpStatus === 'not-attending'
        ? 'bg-red-500 text-white'
        : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
    }
  }

  return (
    <div className="bg-[#1E293B] rounded-xl p-6 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start justify-between mb-4">
        {pillar && (
          <div className="inline-block px-3 py-1 text-sm bg-[#6C63FF]/10 text-[#6C63FF] rounded-full">
            Pillar {pillar}
          </div>
        )}
        {attendeeCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <FiUsers className="w-4 h-4" />
            <span>{attendeeCount} attending</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-[#E2E8F0] mb-3">{title}</h3>
      
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>

      <p className="text-[#94A3B8] mb-6">{description}</p>

      <div className="flex flex-wrap gap-3">
        {rsvpStatus === 'attending' ? (
          <div className="flex flex-wrap gap-3">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#6C63FF] hover:bg-[#5753D8] text-white rounded-lg transition-colors duration-200"
            >
              <FiVideo className="w-4 h-4" />
              <span>Join Call</span>
            </a>
            <AddToCalendarDropdown
              title={title}
              description={description}
              startDate={date}
              startTime={time}
              calendarUrl={calendarUrl}
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleRsvp(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${getButtonStyles(true)}`}
            >
              <FiCheck className="w-4 h-4" />
              <span>I'll Attend</span>
            </button>
            <button
              onClick={() => handleRsvp(false)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${getButtonStyles(false)}`}
            >
              <FiX className="w-4 h-4" />
              <span>Can't Make It</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
