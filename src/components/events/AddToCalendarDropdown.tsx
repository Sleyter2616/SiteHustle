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
  calendarUrl?: string
}

export default function AddToCalendarDropdown({
  title,
  description,
  startDate,
  startTime,
  duration = 60,
  location,
  calendarUrl
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

  const handleAddToCalendar = (type: 'google' | 'outlook' | 'ics') => {
    if (calendarUrl) {
      window.open(calendarUrl, '_blank')
      return
    }

    const eventData = {
      title,
      description,
      startDate,
      startTime,
      duration,
      location: location || 'Online via Zoom'
    }

    switch (type) {
      case 'google':
        window.open(formatGoogleCalendarUrl(eventData), '_blank')
        break
      case 'outlook':
        window.open(formatOutlookCalendarUrl(eventData), '_blank')
        break
      case 'ics':
        downloadICSFile(eventData, `${title.toLowerCase().replace(/\s+/g, '-')}.ics`)
        break
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#2D3748] text-[#E2E8F0] rounded-lg hover:bg-[#374151] transition-colors"
      >
        <FiCalendar className="w-4 h-4" />
        <span>Add to Calendar</span>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] rounded-lg shadow-lg overflow-hidden z-50">
          <button
            onClick={() => handleAddToCalendar('google')}
            className="flex items-center gap-3 w-full px-4 py-2 text-[#E2E8F0] hover:bg-[#2D3748] transition-colors"
          >
            <SiGooglecalendar className="w-4 h-4" />
            <span>Google Calendar</span>
          </button>
          <button
            onClick={() => handleAddToCalendar('outlook')}
            className="flex items-center gap-3 w-full px-4 py-2 text-[#E2E8F0] hover:bg-[#2D3748] transition-colors"
          >
            <BsMicrosoft className="w-4 h-4" />
            <span>Outlook</span>
          </button>
          <button
            onClick={() => handleAddToCalendar('ics')}
            className="flex items-center gap-3 w-full px-4 py-2 text-[#E2E8F0] hover:bg-[#2D3748] transition-colors"
          >
            <FiCalendar className="w-4 h-4" />
            <span>Download .ics</span>
          </button>
        </div>
      )}
    </div>
  )
}
