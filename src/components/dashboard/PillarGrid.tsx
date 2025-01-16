'use client'

import { FiHome, FiSearch, FiEdit, FiTrendingUp, FiDollarSign, FiZap, FiLock, FiCheck } from 'react-icons/fi'
import Link from 'next/link'

const PILLARS = [
  {
    id: 1,
    title: "Foundation Building",
    description: "Master the fundamental skills and mindset required for digital success.",
    isLocked: false,
    isCompleted: true,
    icon: FiHome
  },
  {
    id: 2,
    title: "Market Research",
    description: "Learn to identify profitable niches and understand your target audience.",
    isLocked: false,
    isCompleted: true,
    icon: FiSearch
  },
  {
    id: 3,
    title: "Content Creation",
    description: "Develop high-quality content that engages and converts your audience.",
    isLocked: false,
    isCompleted: false,
    icon: FiEdit
  },
  {
    id: 4,
    title: "Traffic Generation",
    description: "Master various traffic sources to grow your online presence.",
    isLocked: true,
    isCompleted: false,
    icon: FiTrendingUp
  },
  {
    id: 5,
    title: "Monetization",
    description: "Implement effective strategies to monetize your digital assets.",
    isLocked: true,
    isCompleted: false,
    icon: FiDollarSign
  },
  {
    id: 6,
    title: "Scaling & Automation",
    description: "Scale your success and automate processes for sustainable growth.",
    isLocked: true,
    isCompleted: false,
    icon: FiZap
  }
]

export default function PillarGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PILLARS.map((pillar) => (
        <div
          key={pillar.id}
          className={`relative group overflow-hidden rounded-xl ${
            pillar.isLocked
              ? 'bg-[#1E293B]/50'
              : 'bg-[#1E293B] hover:scale-[1.02] transition-transform duration-200'
          }`}
        >
          {/* Card Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                pillar.isLocked ? 'bg-[#334155]' : 'bg-[#6C63FF]/10'
              }`}>
                {<pillar.icon className={`w-6 h-6 ${
                  pillar.isLocked ? 'text-[#94A3B8]' : 'text-[#6C63FF]'
                }`} />}
              </div>
              {pillar.isCompleted && (
                <div className="flex items-center space-x-2 text-green-400">
                  <FiCheck className="w-5 h-5" />
                  <span className="text-sm">Completed</span>
                </div>
              )}
            </div>

            <h3 className={`text-xl font-semibold mb-2 ${
              pillar.isLocked ? 'text-[#94A3B8]' : 'text-[#E2E8F0]'
            }`}>
              {pillar.title}
            </h3>
            
            <p className={`text-sm mb-4 ${
              pillar.isLocked ? 'text-[#64748B]' : 'text-[#94A3B8]'
            }`}>
              {pillar.description}
            </p>

            {pillar.isLocked ? (
              <div className="flex items-center space-x-2 text-[#64748B]">
                <FiLock className="w-4 h-4" />
                <span className="text-sm">Complete prior pillars first</span>
              </div>
            ) : (
              <Link
                href={`/pillars/${pillar.id}`}
                className="inline-flex items-center space-x-2 text-[#6C63FF] hover:text-[#5753D8] transition-colors duration-200"
              >
                <span>View Pillar</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Hover Effect Gradient */}
          {!pillar.isLocked && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          )}
        </div>
      ))}
    </div>
  )
}
