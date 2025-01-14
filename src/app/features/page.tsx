import Link from 'next/link'
import { FiTarget, FiUsers, FiBarChart2, FiAward, FiMessageCircle, FiLifeBuoy } from 'react-icons/fi'
import Header from '../../components/layout/Header'
import PageHero from '../../components/shared/PageHero'

const FEATURES = [
  {
    title: 'Interactive Learning Paths',
    description: 'Custom-tailored learning journeys that adapt to your progress and goals. Each pillar builds upon the last, ensuring a solid foundation.',
    icon: FiTarget,
    points: ['Personalized progression system', 'Hands-on practical exercises', 'Real-world applications']
  },
  {
    title: 'Community Support',
    description: 'Connect with fellow entrepreneurs and learn from their experiences. Share insights, ask questions, and grow together.',
    icon: FiUsers,
    points: ['Peer networking opportunities', 'Expert mentorship access', 'Weekly live Q&A sessions']
  },
  {
    title: 'Progress Analytics',
    description: 'Track your journey with detailed analytics and insights. Understand your strengths and areas for improvement.',
    icon: FiBarChart2,
    points: ['Visual progress tracking', 'Skill gap analysis', 'Performance metrics']
  },
  {
    title: 'Achievement System',
    description: 'Stay motivated with our gamified achievement system. Earn badges and rewards as you master new skills.',
    icon: FiAward,
    points: ['Skill badges', 'Progress milestones', 'Achievement sharing']
  },
  {
    title: 'Discussion Forums',
    description: 'Engage in meaningful discussions about each pillar. Learn from others experiences and share your own insights.',
    icon: FiMessageCircle,
    points: ['Topic-based discussions', 'Expert contributions', 'Resource sharing']
  },
  {
    title: '24/7 Support',
    description: 'Get help whenever you need it. Our support team and extensive documentation are always available.',
    icon: FiLifeBuoy,
    points: ['Live chat support', 'Comprehensive guides', 'Video tutorials']
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <PageHero
        title="Discover the Features that Propel Your Digital Journey"
        subtitle="Every feature is designed to accelerate your growth and maximize your potential in the digital landscape."
      />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(({ title, description, icon: Icon, points }) => (
              <div key={title} className="card">
                <div className="mb-6 text-[#6C63FF]">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#E2E8F0]">{title}</h3>
                <p className="text-[#94A3B8] mb-4">{description}</p>
                <ul className="space-y-2">
                  {points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-[#94A3B8]">
                      <span className="text-[#6C63FF] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1E293B]">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-gradient">
            Ready to explore these features?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who are already leveraging our platform to build successful digital businesses.
          </p>
          <Link href="/login" className="btn-primary">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  )
}
