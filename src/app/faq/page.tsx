'use client'

import { useState } from 'react'
import Header from '../../components/layout/Header'
import FaqAccordion from '../../components/faq/FaqAccordion'
import { FaBook, FaLaptopCode, FaHeadset, FaCreditCard } from 'react-icons/fa'

const faqCategories = [
  {
    title: "Course Basics",
    icon: FaBook,
    items: [
      {
        question: "What is SiteHustle?",
        answer: "SiteHustle is a comprehensive program designed to help you build and launch your own profitable web development business. We focus on practical skills, real-world projects, and proven business strategies."
      },
      {
        question: "Who is this course for?",
        answer: "This course is perfect for beginners who want to start a web development business, as well as experienced developers looking to transition into freelancing or starting their own agency."
      },
      {
        question: "How long does the course take to complete?",
        answer: "The course is self-paced and structured into 6 pillars. Most students complete it within 3-6 months while building their business alongside the training."
      }
    ]
  },
  {
    title: "Technical Setup",
    icon: FaLaptopCode,
    items: [
      {
        question: "What technical requirements do I need?",
        answer: "You'll need a computer (Windows, Mac, or Linux) with a stable internet connection. We'll guide you through installing all necessary software and tools."
      },
      {
        question: "Do I need coding experience?",
        answer: "No prior coding experience is required. We'll teach you everything from the ground up, using a step-by-step approach that's perfect for beginners."
      }
    ]
  },
  {
    title: "Support & Calls",
    icon: FaHeadset,
    items: [
      {
        question: "What kind of support is available?",
        answer: "You'll have access to our dedicated support team, weekly group coaching calls, and our private community where you can get help 24/7."
      },
      {
        question: "How do the coaching calls work?",
        answer: "We host weekly group coaching calls where you can ask questions, get feedback on your work, and learn from other students' experiences. All calls are recorded if you can't attend live."
      }
    ]
  },
  {
    title: "Billing & Refunds",
    icon: FaCreditCard,
    items: [
      {
        question: "What's your refund policy?",
        answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the program, simply let us know within 30 days of your purchase for a full refund."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees! Your one-time payment includes lifetime access to the course content, community, and all future updates."
      }
    ]
  }
]

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    (selectedCategory ? category.title === selectedCategory : true) &&
    category.items.length > 0
  )

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl font-bold text-[#E2E8F0] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[#94A3B8]">
              Find quick answers to common questions about our 6-pillar program.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="max-w-md">
              <div className="relative">
                <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] rounded-lg border border-[#2D3748] focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  !selectedCategory
                    ? 'bg-[#6C63FF] text-white'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                All Categories
              </button>
              {faqCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.title}
                    onClick={() => setSelectedCategory(category.title)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      selectedCategory === category.title
                        ? 'bg-[#6C63FF] text-white'
                        : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#E2E8F0]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title}>
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-6 h-6 text-[#6C63FF]" />
                    <h2 className="text-xl font-semibold text-[#E2E8F0]">
                      {category.title}
                    </h2>
                  </div>
                  <FaqAccordion items={category.items} />
                </div>
              )
            })}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#94A3B8]">
                  No questions found. Try adjusting your search.
                </p>
              </div>
            )}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 p-8 bg-[#1E293B] rounded-xl text-center">
            <h3 className="text-xl font-semibold text-[#E2E8F0] mb-4">
              Still Have Questions?
            </h3>
            <p className="text-[#94A3B8] mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#6C63FF] hover:bg-[#5753D8] text-white rounded-lg transition-colors duration-200"
            >
              <FaHeadset className="w-5 h-5" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
