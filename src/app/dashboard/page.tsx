import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Header from '../../components/layout/Header'
import PillarCard from '../../components/dashboard/PillarCard'
import { Pillar } from '../../types/pillar'

// Sample pillar data - replace with Supabase fetch
const PILLARS: Pillar[] = [
  {
    id: 1,
    title: "Foundation Building",
    description: "Master the fundamental skills and mindset required for digital success.",
    isLocked: false,
    icon: "FiHome"
  },
  {
    id: 2,
    title: "Market Research",
    description: "Learn to identify profitable niches and understand your target audience.",
    isLocked: false,
    icon: "FiSearch"
  },
  {
    id: 3,
    title: "Content Creation",
    description: "Develop high-quality content that engages and converts your audience.",
    isLocked: true,
    icon: "FiEdit"
  },
  {
    id: 4,
    title: "Traffic Generation",
    description: "Master various traffic sources to grow your online presence.",
    isLocked: true,
    icon: "FiTrendingUp"
  },
  {
    id: 5,
    title: "Monetization",
    description: "Implement effective strategies to monetize your digital assets.",
    isLocked: true,
    icon: "FiDollarSign"
  },
  {
    id: 6,
    title: "Scaling & Automation",
    description: "Scale your success and automate processes for sustainable growth.",
    isLocked: true,
    icon: "FiZap"
  }
]

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      <main className="container-custom pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-[#E2E8F0] mb-2">
              Your Digital Journey
            </h1>
            <p className="text-[#94A3B8]">
              Welcome back, {session.user.email?.split('@')[0]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
