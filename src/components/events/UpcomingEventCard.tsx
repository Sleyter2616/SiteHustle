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
  calendarUrl?: string
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
  attendeeCount,
  onRsvp
}: UpcomingEventProps) {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [isAttending, setIsAttending] = useState(false)

  const handleRsvp = (attending: boolean) => {
    setIsAttending(attending)
    setHasResponded(true)
    onRsvp?.(attending)
    setIsRsvpOpen(false)
  }

  return (
    <div className="bg-[#1E293B] rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold text-[#E2E8F0]">{title}</h3>
        
        {pillar && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6C63FF]/10 text-[#6C63FF]">
            Pillar {pillar}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <FiCalendar className="w-5 h-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <FiClock className="w-5 h-5" />
            <span>{time}</span>
          </div>
          {attendeeCount !== undefined && (
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <FiUsers className="w-5 h-5" />
              <span>{attendeeCount} attending</span>
            </div>
          )}
        </div>

        <p className="text-[#94A3B8]">{description}</p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {!hasResponded ? (
            <>
              <button
                onClick={() => setIsRsvpOpen(!isRsvpOpen)}
                className="px-4 py-2 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5753D8] transition-colors"
              >
                RSVP
              </button>
              {isRsvpOpen && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRsvp(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
                  >
                    <FiCheck className="w-4 h-4" />
                    <span>Yes</span>
                  </button>
                  <button
                    onClick={() => handleRsvp(false)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                    <span>No</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isAttending ? 'bg-[#059669]/10 text-[#059669]' : 'bg-[#DC2626]/10 text-[#DC2626]'
            }`}>
              {isAttending ? (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>You're attending</span>
                </>
              ) : (
                <>
                  <FiX className="w-4 h-4" />
                  <span>Not attending</span>
                </>
              )}
            </div>
          )}

          {isAttending && (
            <>
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#2D3748] text-[#E2E8F0] rounded-lg hover:bg-[#374151] transition-colors"
              >
                <FiVideo className="w-4 h-4" />
                <span>Join Call</span>
              </a>
              <AddToCalendarDropdown 
                title={title}
                description={description}
                startDate={date}
                startTime={time}
                location={joinUrl}
                calendarUrl={calendarUrl}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
