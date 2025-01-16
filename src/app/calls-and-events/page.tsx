'use client'

import { useState } from 'react'
import Header from '../../components/layout/Header'
import UpcomingEventCard from '../../components/events/UpcomingEventCard'
import PastEventCard from '../../components/events/PastEventCard'
import CountdownTimer from '../../components/events/CountdownTimer'
import { FiCalendar, FiClock, FiVideo, FiMic, FiSettings } from 'react-icons/fi'

// Sample data - replace with actual data from your backend
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Pillar 2: Market Research Deep Dive",
    date: "January 16, 2025",
    time: "2:00 PM EST",
    description: "Join us for an in-depth exploration of market research strategies. We'll cover competitor analysis, niche selection, and audience research techniques.",
    joinUrl: "https://zoom.us/j/123456789",
    calendarUrl: "https://calendar.google.com/event?123",
    pillar: 2,
    attendeeCount: 15
  },
  {
    id: 2,
    title: "Content Creation Workshop",
    date: "January 23, 2025",
    time: "3:00 PM EST",
    description: "Learn how to create compelling content that resonates with your audience. Live demonstration and Q&A session included.",
    joinUrl: "https://zoom.us/j/987654321",
    calendarUrl: "https://calendar.google.com/event?456",
    pillar: 3,
    attendeeCount: 8
  }
]

const PAST_EVENTS = [
  {
    id: 1,
    title: "Foundation Building Masterclass",
    date: "January 9, 2025",
    recordingUrl: "https://youtube.com/watch?v=123",
    duration: "1h 15min",
    highlights: [
      "00:00 - Introduction",
      "10:15 - Setting up your digital workspace",
      "25:30 - Mindset and goal setting",
      "45:00 - Planning your success roadmap",
      "1:05:00 - Q&A Session"
    ],
    pillar: 1
  },
  {
    id: 2,
    title: "Market Research Basics",
    date: "January 2, 2025",
    recordingUrl: "https://youtube.com/watch?v=456",
    duration: "1h 30min",
    highlights: [
      "00:00 - Welcome",
      "05:30 - Finding profitable niches",
      "30:45 - Understanding your target audience",
      "55:20 - Competition analysis framework",
      "1:15:00 - Live examples and Q&A"
    ],
    pillar: 2
  }
]

const CALL_TIPS = [
  {
    icon: FiVideo,
    title: "Video Setup",
    tips: [
      "Use a neutral background",
      "Ensure good lighting (face the light source)",
      "Position camera at eye level"
    ]
  },
  {
    icon: FiMic,
    title: "Audio Quality",
    tips: [
      "Use headphones to prevent echo",
      "Stay muted when not speaking",
      "Find a quiet space"
    ]
  },
  {
    icon: FiSettings,
    title: "Technical Prep",
    tips: [
      "Join 5 minutes early",
      "Check your internet connection",
      "Have Zoom/Meet app updated"
    ]
  }
]

export default function CallsAndEventsPage() {
  const [selectedPillar, setSelectedPillar] = useState<number | 'all'>('all')
  const currentPillar = 2 // Replace with actual user progress

  const filteredUpcoming = selectedPillar === 'all'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter(event => event.pillar === selectedPillar)

  const filteredPast = selectedPillar === 'all'
    ? PAST_EVENTS
    : PAST_EVENTS.filter(event => event.pillar === selectedPillar)

  const handleRsvp = (eventId: number, attending: boolean) => {
    // Implement RSVP logic here
    console.log(`User RSVP'd ${attending ? 'yes' : 'no'} to event ${eventId}`)
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl font-bold text-[#E2E8F0] mb-4">
              Calls & Events
            </h1>
            <p className="text-[#94A3B8]">
              Join our live sessions for deep dives into each pillar, get your questions answered,
              and watch recordings of past events.
            </p>
          </div>

          {/* Progress & Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[#94A3B8]">
                You're on Pillar {currentPillar} of 6
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPillar('all')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  selectedPillar === 'all'
                    ? 'bg-[#6C63FF] text-white'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                All Events
              </button>
              {[1, 2, 3, 4, 5, 6].map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    selectedPillar === pillar
                      ? 'bg-[#6C63FF] text-white'
                      : pillar === currentPillar
                      ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                      : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                  }`}
                >
                  Pillar {pillar}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Events */}
              <section>
                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                  Upcoming Sessions
                </h2>
                <div className="space-y-4">
                  {filteredUpcoming.length > 0 ? (
                    filteredUpcoming.map((event) => (
                      <UpcomingEventCard
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        time={event.time}
                        description={event.description}
                        joinUrl={event.joinUrl}
                        calendarUrl={event.calendarUrl}
                        pillar={event.pillar}
                        attendeeCount={event.attendeeCount}
                        onRsvp={(attending) => handleRsvp(event.id, attending)}
                      />
                    ))
                  ) : (
                    <div className="bg-[#1E293B] rounded-xl p-6 text-center">
                      <p className="text-[#94A3B8]">No upcoming sessions</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Past Events */}
              <section>
                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                  Past Sessions
                </h2>
                <div className="space-y-4">
                  {filteredPast.length > 0 ? (
                    filteredPast.map((event) => (
                      <PastEventCard
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        recordingUrl={event.recordingUrl}
                        duration={event.duration}
                        highlights={event.highlights}
                        pillar={event.pillar}
                      />
                    ))
                  ) : (
                    <div className="bg-[#1E293B] rounded-xl p-6 text-center">
                      <p className="text-[#94A3B8]">No past sessions</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Next Call */}
              {UPCOMING_EVENTS[0] && (
                <div className="bg-[#1E293B] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#E2E8F0] mb-4">
                    Next Call
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-[#6C63FF]" />
                      <span className="text-[#E2E8F0]">
                        {UPCOMING_EVENTS[0].date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiClock className="w-5 h-5 text-[#6C63FF]" />
                      <span className="text-[#E2E8F0]">
                        {UPCOMING_EVENTS[0].time}
                      </span>
                    </div>
                    <CountdownTimer
                      targetDate={UPCOMING_EVENTS[0].date}
                      targetTime={UPCOMING_EVENTS[0].time}
                    />
                    <a
                      href={UPCOMING_EVENTS[0].joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-[#6C63FF] hover:bg-[#5753D8] text-white text-center rounded-lg transition-colors duration-200"
                    >
                      Join Next Call
                    </a>
                  </div>
                </div>
              )}

              {/* Call Tips */}
              <div className="bg-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#E2E8F0]">
                    Call Tips
                  </h3>
                  <a
                    href="https://zoom.us/test"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#6C63FF] hover:text-[#5753D8]"
                  >
                    Test My Setup →
                  </a>
                </div>
                <div className="space-y-6">
                  {CALL_TIPS.map(({ icon: Icon, title, tips }) => (
                    <div key={title}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-[#6C63FF]" />
                        <h4 className="text-[#E2E8F0] font-medium">{title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#6C63FF]" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
