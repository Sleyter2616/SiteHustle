'use client'

import { FiHome, FiSearch, FiEdit, FiTrendingUp, FiDollarSign, FiZap, FiLock, FiCheck, FiTool } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const PILLARS = [
  {
    id: 1,
    title: "Business Foundations",
    description: "Define your business goals, target audience, and unique value proposition.",
    isLocked: false,
    isCompleted: true,
    icon: FiHome
  },
  {
    id: 2,
    title: "Tool Selection & AI Bootcamp",
    description: "Choose your no-code tools and master AI-powered automation.",
    isLocked: false,
    isCompleted: false,
    icon: FiTool
  },
  {
    id: 3,
    title: "Website Building",
    description: "Build your professional website or web application.",
    isLocked: true,
    isCompleted: false,
    icon: FiEdit
  },
  {
    id: 4,
    title: "Growth & Marketing",
    description: "Implement strategies to attract and convert customers.",
    isLocked: true,
    isCompleted: false,
    icon: FiTrendingUp
  },
  {
    id: 5,
    title: "Monetization",
    description: "Set up payment systems and optimize revenue streams.",
    isLocked: true,
    isCompleted: false,
    icon: FiDollarSign
  },
  {
    id: 6,
    title: "Automation & Scale",
    description: "Automate processes and prepare for business growth.",
    isLocked: true,
    isCompleted: false,
    icon: FiZap
  }
]

export default function PillarGrid() {
  const router = useRouter()

  const handlePillarClick = (pillar: typeof PILLARS[0], e: React.MouseEvent) => {
    e.preventDefault()
    if (!pillar.isLocked) {
      console.log('Navigating to pillar:', pillar.id)
      router.push(`/pillars/${pillar.id}`)
    }
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PILLARS.map((pillar) => (
        <div
          key={pillar.id}
          onClick={(e) => handlePillarClick(pillar, e)}
          className={`relative group rounded-lg p-6 ${
            pillar.isLocked
              ? 'bg-[#1E293B]/50 cursor-not-allowed'
              : 'bg-[#1E293B] hover:bg-[#2D3748] transition-colors cursor-pointer'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${
              pillar.isLocked ? 'bg-[#2D3748]/50' : 'bg-[#2D3748]'
            }`}>
              <pillar.icon className={`w-6 h-6 ${
                pillar.isLocked ? 'text-[#64748B]' : 'text-[#5865F2]'
              }`} />
            </div>
            {pillar.isLocked ? (
              <FiLock className="w-5 h-5 text-[#64748B]" />
            ) : pillar.isCompleted ? (
              <div className="flex items-center gap-2 text-[#10B981]">
                <FiCheck className="w-5 h-5" />
                <span className="text-sm">Completed</span>
              </div>
            ) : null}
          </div>

          <h3 className={`text-xl font-semibold mb-2 ${
            pillar.isLocked ? 'text-[#64748B]' : 'text-[#E2E8F0]'
          }`}>
            {pillar.title}
          </h3>

          <p className={`text-sm ${
            pillar.isLocked ? 'text-[#475569]' : 'text-[#94A3B8]'
          }`}>
            {pillar.description}
          </p>

          {pillar.isLocked && (
            <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FiLock className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
                <p className="text-[#64748B]">Complete previous pillar to unlock</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
