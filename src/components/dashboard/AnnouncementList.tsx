'use client'

import { FiInfo } from 'react-icons/fi'

interface Announcement {
  id: string
  title: string
  date: string
  type: 'update' | 'resource' | 'recording'
  link?: string
}

interface AnnouncementListProps {
  announcements: Announcement[]
}

export default function AnnouncementList({ announcements }: AnnouncementListProps) {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="flex items-start space-x-3 p-4 bg-[#1E293B] rounded-lg"
        >
          <div className="mt-1">
            <FiInfo className="w-5 h-5 text-[#6C63FF]" />
          </div>
          <div>
            <h4 className="text-[#E2E8F0] font-medium mb-1">
              {announcement.title}
            </h4>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#94A3B8]">{announcement.date}</span>
              {announcement.link && (
                <a
                  href={announcement.link}
                  className="text-sm text-[#6C63FF] hover:text-[#5753D8] transition-colors duration-200"
                >
                  View Details →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
