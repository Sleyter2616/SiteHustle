import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Header from '../components/layout/Header'
import { FiArrowRight, FiLayers, FiTarget, FiTrendingUp } from 'react-icons/fi'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 heading-gradient">
            Master the 6 Pillars of Digital Success
          </h1>
          <p className="text-xl md:text-2xl text-[#94A3B8] mb-12 max-w-3xl mx-auto">
            Track your progress, unlock new skills, and build your digital empire one pillar at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-primary flex items-center">
              Start Your Journey
              <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/about" className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1E293B]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 heading-gradient">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="mb-4 text-[#6C63FF]">
                <FiLayers size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#E2E8F0]">Structured Learning</h3>
              <p className="text-[#94A3B8]">
                Progress through carefully crafted pillars designed to build your skills systematically.
              </p>
            </div>
            <div className="card">
              <div className="mb-4 text-[#4D9FFF]">
                <FiTarget size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#E2E8F0]">Track Progress</h3>
              <p className="text-[#94A3B8]">
                Monitor your journey with detailed progress tracking and achievements.
              </p>
            </div>
            <div className="card">
              <div className="mb-4 text-[#6C63FF]">
                <FiTrendingUp size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#E2E8F0]">Measurable Growth</h3>
              <p className="text-[#94A3B8]">
                See your skills and knowledge expand with each completed pillar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#334155]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-[#94A3B8]"> 2025 SiteHustle. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="nav-link">Privacy</a>
              <a href="#" className="nav-link">Terms</a>
              <a href="#" className="nav-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
