import Link from 'next/link'
import { FiCalendar, FiUsers, FiLifeBuoy, FiRefreshCw } from 'react-icons/fi'
import Header from '../../components/layout/Header'
import PageHero from '../../components/shared/PageHero'
import ProgramFeature from '../../components/pricing/ProgramFeature'

const PROGRAM_FEATURES = [
  {
    title: '12 Weeks of Guided Content',
    description: 'Deep dive into all 6 pillars with structured, actionable lessons designed for real-world application.'
  },
  {
    title: 'Weekly Group Coaching Calls',
    description: 'Get direct feedback, ask questions, and learn from peers in live interactive sessions.'
  },
  {
    title: 'Lifetime Community Access',
    description: 'Join our thriving community of entrepreneurs for ongoing support, networking, and collaboration.'
  },
  {
    title: 'Lifetime Updates & Resources',
    description: 'Access future course updates, new materials, and expanded resources at no additional cost.'
  }
]

const PROGRAM_HIGHLIGHTS = [
  {
    icon: FiCalendar,
    title: 'Structured 12-Week Program',
    description: 'Follow a proven roadmap that builds your digital business step by step.'
  },
  {
    icon: FiUsers,
    title: 'Active Community',
    description: 'Connect with ambitious entrepreneurs who share your drive for success.'
  },
  {
    icon: FiLifeBuoy,
    title: 'Ongoing Support',
    description: 'Get help when you need it through group calls and our community platform.'
  },
  {
    icon: FiRefreshCw,
    title: 'Future-Proof Investment',
    description: 'Access all future updates and improvements at no extra cost.'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <PageHero
        title="All-In, One-Time Investment for Transformational Results"
        subtitle="Experience 12 weeks of immersive coaching + lifetime resources to build and scale your digital success."
      />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Pricing Card */}
            <div className="card border-2 border-[#6C63FF] lg:sticky lg:top-8">
              <div className="text-center mb-8">
                <div className="text-sm font-semibold text-[#6C63FF] mb-2">LIMITED TIME OFFER</div>
                <div className="text-4xl font-bold text-[#E2E8F0] mb-4">
                  $1,497
                  <span className="text-base font-normal text-[#94A3B8] ml-2">one-time payment</span>
                </div>
                <p className="text-[#94A3B8]">
                  No monthly fees, no hidden costs—just one investment for lifetime access.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {PROGRAM_FEATURES.map((feature) => (
                  <ProgramFeature key={feature.title} {...feature} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/checkout"
                  className="block w-full py-4 px-8 bg-[#6C63FF] hover:bg-[#5753D8] text-white rounded-lg transition-colors duration-200 font-semibold"
                >
                  Secure Your Spot Now
                </Link>
                <p className="mt-4 text-sm text-[#94A3B8]">
                  Next cohort starts February 1st, 2025 — Limited spots available
                </p>
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-12">
              {/* Why Choose Us */}
              <div>
                <h2 className="text-2xl font-bold mb-6 heading-gradient">
                  Why Choose Our Program?
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {PROGRAM_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-start space-x-4">
                      <div className="text-[#6C63FF]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#E2E8F0] mb-2">{title}</h3>
                        <p className="text-[#94A3B8] text-sm">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6 heading-gradient">
                  Your Return on Investment
                </h2>
                <div className="space-y-4">
                  <p className="text-[#94A3B8]">
                    This is not just another course—it's a comprehensive program designed to 
                    transform your digital business journey. Our structured approach ensures you:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2 text-[#94A3B8]">
                      <span className="text-[#6C63FF]">•</span>
                      <span>Launch and scale your digital business with confidence</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#94A3B8]">
                      <span className="text-[#6C63FF]">•</span>
                      <span>Create multiple income streams through proven strategies</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#94A3B8]">
                      <span className="text-[#6C63FF]">•</span>
                      <span>Build a network of successful entrepreneurs and mentors</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-[#1E293B] p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-[#E2E8F0]">
                  Our Promise to You
                </h3>
                <p className="text-[#94A3B8]">
                  We're so confident in our program that we offer a 30-day money-back guarantee. 
                  If you're not completely satisfied with the program and can show you've participated 
                  in the first 4 weeks, we'll refund your investment—no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#1E293B]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12 heading-gradient">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#E2E8F0]">
                  When does the next cohort start?
                </h3>
                <p className="text-[#94A3B8]">
                  Our next cohort begins February 1st, 2025. We keep cohorts small to ensure 
                  quality interaction and support, so spots are limited.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#E2E8F0]">
                  How much time should I commit weekly?
                </h3>
                <p className="text-[#94A3B8]">
                  Plan for 5-7 hours per week, including the group coaching call, course content, 
                  and implementation work. The program is designed to fit alongside your current commitments.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#E2E8F0]">
                  What happens after the 12 weeks?
                </h3>
                <p className="text-[#94A3B8]">
                  You'll have lifetime access to all course materials, the community, and future updates. 
                  You can also join future cohort calls to refresh your knowledge or help new members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
