import Link from 'next/link'
import { FiArrowRight, FiLayers, FiTarget, FiTrendingUp, FiDollarSign, FiZap, FiBook } from 'react-icons/fi'
import Header from '../components/layout/Header'
import FeatureCard from '../components/home/FeatureCard'
import Testimonial from '../components/home/Testimonial'

const FEATURES = [
  {
    title: "Structured Learning",
    description: "Master the fundamentals through carefully crafted modules.",
    icon: "FiBook",
    bulletPoints: [
      "Step-by-step modules with actionable lessons",
      "Clear progression path from beginner to advanced"
    ]
  },
  {
    title: "Track Progress",
    description: "Monitor your journey with detailed progress tracking.",
    icon: "FiTarget",
    bulletPoints: [
      "Visual progress indicators for each pillar",
      "Achievement system to celebrate milestones"
    ]
  },
  {
    title: "Measurable Growth",
    description: "See your skills and knowledge expand with each completed pillar.",
    icon: "FiTrendingUp",
    bulletPoints: [
      "Data-driven insights on your progress",
      "Regular check-ins to ensure understanding"
    ]
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom text-center max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 heading-gradient">
            Master the 6 Pillars of Digital Success
          </h1>
          <p className="text-xl text-[#94A3B8] mb-8 max-w-3xl mx-auto">
            Whether you're a solopreneur or building a small business, track your progress 
            and unlock new skills to achieve your digital goals.
          </p>
          
          {/* Bullet Points */}
          <ul className="mb-8 space-y-3 max-w-2xl mx-auto">
            <li className="flex items-center justify-center space-x-2 text-[#E2E8F0]">
              <FiLayers className="text-[#6C63FF]" />
              <span>Save time with structured, actionable modules</span>
            </li>
            <li className="flex items-center justify-center space-x-2 text-[#E2E8F0]">
              <FiTarget className="text-[#6C63FF]" />
              <span>Never get stuck—track progress easily</span>
            </li>
            <li className="flex items-center justify-center space-x-2 text-[#E2E8F0]">
              <FiZap className="text-[#6C63FF]" />
              <span>Scale your business or side hustle quickly</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-primary flex items-center">
              Start Your Journey
              <FiArrowRight className="ml-2" />
            </Link>
            <Link 
              href="/about" 
              className="text-[#6C63FF] border-2 border-[#6C63FF] hover:bg-[#6C63FF] hover:text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Learn More
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
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <Testimonial
              quote="SiteHustle helped me transform my side project into a thriving online business. The structured approach and progress tracking kept me focused and motivated."
              author="Sarah Chen"
              role="Digital Entrepreneur"
            />
            <Testimonial
              quote="As a freelance developer, I needed a systematic way to grow my business. SiteHustle's 6 pillars framework gave me the roadmap I was missing."
              author="Marcus Rodriguez"
              role="Full-Stack Developer"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#334155]">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-2">
              Ready to take your hustle to the next level?
            </h3>
            <Link href="/login" className="text-[#6C63FF] hover:text-[#4D9FFF] font-medium">
              Join now →
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-[#94A3B8] mb-4 md:mb-0">
              2025 SiteHustle. All rights reserved.
            </p>
            <div className="flex space-x-6">
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
