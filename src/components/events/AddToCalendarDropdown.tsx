'use client'

import { useState, useRef, useEffect } from 'react'
import { FiCalendar, FiChevronDown } from 'react-icons/fi'
import { SiGooglecalendar } from 'react-icons/si'
import { BsMicrosoft } from 'react-icons/bs'
import { formatGoogleCalendarUrl, formatOutlookCalendarUrl, downloadICSFile } from '../../utils/calendar'

interface AddToCalendarProps {
  title: string
  description: string
  startDate: string
  startTime: string
  duration?: number
  location?: string
}

export default function AddToCalendarDropdown({
  title,
  description,
  startDate,
  startTime,
  duration = 60,
  location = 'Online via Zoom'
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const eventData = {
    title,
    description,
    startDate,
    startTime,
    duration,
    location
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white rounded-lg transition-colors duration-200"
      >
        <FiCalendar className="w-4 h-4" />
        <span>Add to Calendar</span>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1E293B] shadow-lg border border-[#2D3748] z-10">
          <div className="py-2">
            <a
              href={formatGoogleCalendarUrl(eventData)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-[#E2E8F0] hover:bg-[#2D3748] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <SiGooglecalendar className="w-4 h-4" />
              <span>Google Calendar</span>
            </a>
            <a
              href={formatOutlookCalendarUrl(eventData)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-[#E2E8F0] hover:bg-[#2D3748] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <BsMicrosoft className="w-4 h-4" />
              <span>Outlook Calendar</span>
            </a>
            <button
              onClick={() => {
                downloadICSFile(eventData, `${title.toLowerCase().replace(/\s+/g, '-')}.ics`)
                setIsOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2 text-[#E2E8F0] hover:bg-[#2D3748] transition-colors duration-200 w-full text-left"
            >
              <FiCalendar className="w-4 h-4" />
              <span>Download .ics</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
