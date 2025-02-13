import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Header from '../../components/layout/Header'
import PillarGrid from '../../components/dashboard/PillarGrid'
import ProgressBar from '../../components/dashboard/ProgressBar'
import EventCard from '../../components/dashboard/EventCard'
import AnnouncementList from '../../components/dashboard/AnnouncementList'

const SAMPLE_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'New Resource: Content Creation Templates Pack',
    date: 'January 15, 2025',
    type: 'resource' as const,
    link: '/resources/content-templates'
  },
  {
    id: '2',
    title: 'Pillar 2 Q&A Recording Now Available',
    date: 'January 14, 2025',
    type: 'recording' as const,
    link: '/resources/recordings/pillar-2-qa'
  }
]

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Get user's progress (replace with actual DB query)
  const completedPillars = 2
  const totalPillars = 6

  // Get user's name from email
  const userName = session.user.email?.split('@')[0] || 'there'

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-[#E2E8F0] mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-[#94A3B8]">
              You're on Pillar {completedPillars + 1}. Keep up the momentum!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Bar */}
              <div className="card">
                <ProgressBar completed={completedPillars} total={totalPillars} type='pillars' />
              </div>

              {/* Pillars Grid */}
              <PillarGrid />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Business Planning Wizard */}
              <div>
                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                  Business Planning
                </h2>
                <div className="card bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-400/30 transition-all">
                  <a href="/business-planning-wizard" className="block p-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Business Plan Wizard</h3>
                    <p className="text-[#94A3B8] text-sm">Create your AI-powered business plan with our step-by-step wizard.</p>
                  </a>
                </div>
              </div>

              {/* Next Call */}
              <div>
                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                  Upcoming Call
                </h2>
                <EventCard
                  date="January 16, 2025"
                  time="2:00 PM EST"
                  title="Pillar 2: Market Research Deep Dive"
                  type="call"
                  link="https://zoom.us/j/123456789"
                />
              </div>

              {/* Announcements */}
              <div>
                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                  Latest Updates
                </h2>
                <AnnouncementList announcements={SAMPLE_ANNOUNCEMENTS} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
