import Image from 'next/image'
import Link from 'next/link'
import { FiTarget, FiHeart, FiTrendingUp } from 'react-icons/fi'
import Header from '../../components/layout/Header'
import PageHero from '../../components/shared/PageHero'

const VALUES = [
  {
    icon: FiTarget,
    title: 'Purpose-Driven',
    description: 'Every feature and lesson is designed with a clear purpose: to help you succeed in the digital landscape.'
  },
  {
    icon: FiHeart,
    title: 'Community First',
    description: 'We believe in the power of community learning and support. Your success is our success.'
  },
  {
    icon: FiTrendingUp,
    title: 'Continuous Growth',
    description: 'We are constantly evolving and improving, just like the entrepreneurs we serve.'
  }
]

const MILESTONES = [
  {
    year: '2025',
    title: 'Platform Launch',
    description: 'SiteHustle was born from a vision to democratize digital success'
  },
  {
    year: '2025',
    title: '1,000+ Members',
    description: 'Reached our first milestone of helping over 1,000 entrepreneurs'
  },
  {
    year: '2026',
    title: 'Community Growth',
    description: 'Expanded our platform with community features and mentorship'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <PageHero
        title="Our Story & Mission"
        subtitle="Learn how we started and why we're passionate about empowering digital entrepreneurs."
      />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 heading-gradient">
                Empowering Digital Success
              </h2>
              <p className="text-[#94A3B8] mb-6">
                SiteHustle was born from a simple observation: while there's abundant information about digital entrepreneurship, 
                there wasn't a structured, systematic approach to building and scaling online businesses.
              </p>
              <p className="text-[#94A3B8]">
                Our 6-pillar framework combines years of experience and research into a clear, actionable pathway. 
                We believe everyone deserves the opportunity to build a successful digital business, regardless of their 
                starting point.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/about-hero.png"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1E293B]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 heading-gradient">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="inline-block p-4 rounded-full bg-[#0F172A] text-[#6C63FF] mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#E2E8F0]">{title}</h3>
                <p className="text-[#94A3B8]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 heading-gradient">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            {MILESTONES.map(({ year, title, description }, index) => (
              <div key={index} className="flex items-start space-x-8 mb-12 last:mb-0">
                <div className="text-2xl font-bold text-[#6C63FF] whitespace-nowrap">
                  {year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#E2E8F0]">{title}</h3>
                  <p className="text-[#94A3B8]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1E293B]">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-gradient">
            Join Us on This Journey
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-2xl mx-auto">
            We'd love for you to be part of our growing community of digital entrepreneurs.
            Together, we can build something amazing.
          </p>
          <Link href="/login" className="btn-primary">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  )
}
