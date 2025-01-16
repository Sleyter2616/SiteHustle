'use client'

import { useState } from 'react'
import Header from '../../components/layout/Header'
import ResourceCard, { ResourceItem } from '../../components/resources/ResourceCard'
import { FiSearch } from 'react-icons/fi'

// Sample data - replace with actual data from your backend
const RESOURCES: { category: string; items: ResourceItem[] }[] = [
  {
    category: 'Getting Started',
    items: [
      {
        id: 'welcome-guide',
        title: 'Welcome Guide',
        description: 'Essential information to help you get started with SiteHustle',
        type: 'pdf',
        url: '#',
        isNew: true,
        lastUpdated: 'Jan 15, 2025'
      },
      {
        id: 'platform-overview',
        title: 'Platform Overview',
        description: 'A comprehensive video tour of the SiteHustle platform',
        type: 'video',
        url: '#',
        featured: true
      }
    ]
  },
  {
    category: 'Foundation Building (Pillar 1)',
    items: [
      {
        id: 'goal-setting',
        title: 'Goal-Setting Worksheet',
        description: 'Define your goals and create an actionable plan',
        type: 'pdf',
        url: '#',
        pillar: 1
      },
      {
        id: 'foundation-checklist',
        title: 'Foundation Checklist',
        description: 'Track your progress through the foundation phase',
        type: 'doc',
        url: '#',
        pillar: 1,
        lastUpdated: 'Jan 10, 2025'
      }
    ]
  },
  {
    category: 'Market Research (Pillar 2)',
    items: [
      {
        id: 'market-research-template',
        title: 'Market Research Template',
        description: 'Excel template for tracking market research findings',
        type: 'excel',
        url: '#',
        pillar: 2
      },
      {
        id: 'competitor-analysis',
        title: 'Competitor Analysis Worksheet',
        description: 'Analyze your competition and find market gaps',
        type: 'pdf',
        url: '#',
        pillar: 2,
        isNew: true
      }
    ]
  },
  {
    category: 'Content Creation (Pillar 3)',
    items: [
      {
        id: 'content-calendar',
        title: 'Content Calendar Template',
        description: 'Plan and organize your content strategy',
        type: 'excel',
        url: '#',
        pillar: 3,
        isLocked: true
      },
      {
        id: 'seo-checklist',
        title: 'SEO Optimization Checklist',
        description: 'Ensure your content is properly optimized for search engines',
        type: 'pdf',
        url: '#',
        pillar: 3,
        isLocked: true
      }
    ]
  },
  {
    category: 'Traffic Generation (Pillar 4)',
    items: [
      {
        id: 'traffic-sources',
        title: 'Traffic Sources Guide',
        description: 'Comprehensive guide to different traffic sources',
        type: 'pdf',
        url: '#',
        pillar: 4,
        isLocked: true
      }
    ]
  },
  {
    category: 'Monetization (Pillar 5)',
    items: [
      {
        id: 'monetization-calculator',
        title: 'Revenue Calculator',
        description: 'Calculate potential earnings from different monetization methods',
        type: 'excel',
        url: '#',
        pillar: 5,
        isLocked: true
      }
    ]
  },
  {
    category: 'Scaling & Automation (Pillar 6)',
    items: [
      {
        id: 'automation-tools',
        title: 'Automation Tools Guide',
        description: 'Overview of recommended automation tools and setup guides',
        type: 'pdf',
        url: '#',
        pillar: 6,
        isLocked: true
      }
    ]
  }
]

export default function ResourcesPage() {
  const [selectedPillar, setSelectedPillar] = useState<number | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const currentPillar = 2 // Replace with actual user progress

  const filteredResources = RESOURCES.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesPillar = selectedPillar === 'all' || !item.pillar || item.pillar === selectedPillar
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesPillar && matchesSearch
    })
  })).filter(category => category.items.length > 0)

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Page Header */}
          <div className="max-w-3xl mb-8">
            <h1 className="text-3xl font-bold text-[#E2E8F0] mb-4">
              Resources
            </h1>
            <p className="text-[#94A3B8]">
              Access guides, templates, and tools to help you succeed in your journey.
              You're currently on Pillar {currentPillar}.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg border border-[#2D3748] focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>

            {/* Pillar Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPillar('all')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  selectedPillar === 'all'
                    ? 'bg-[#6C63FF] text-white'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                All Resources
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

          {/* Resources Grid */}
          <div className="space-y-12">
            {filteredResources.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-6">
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      currentPillar={currentPillar}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#94A3B8]">
                  No resources found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
