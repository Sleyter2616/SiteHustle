'use client'

import Header from '../../components/layout/Header'
import { FiMessageSquare, FiClock } from 'react-icons/fi'

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-4 bg-[#6C63FF]/10 rounded-full mb-6">
              <FiMessageSquare className="w-8 h-8 text-[#6C63FF]" />
            </div>

            <h1 className="text-3xl font-bold text-[#E2E8F0] mb-4">
              AI Chat Coming Soon!
            </h1>
            
            <p className="text-[#94A3B8] mb-8">
              We're building a powerful AI assistant to help answer your questions instantly.
              Stay tuned for the launch!
            </p>

            <div className="bg-[#1E293B] rounded-xl p-8 mb-8">
              <h2 className="text-xl font-semibold text-[#E2E8F0] mb-4">
                What to Expect
              </h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <div className="p-1 mt-1 bg-[#334155] rounded">
                    <FiMessageSquare className="w-4 h-4 text-[#6C63FF]" />
                  </div>
                  <div>
                    <div className="text-[#E2E8F0] font-medium">
                      Instant Answers
                    </div>
                    <div className="text-[#94A3B8]">
                      Get immediate responses to your questions about the course, pillars, or technical setup
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 mt-1 bg-[#334155] rounded">
                    <FiClock className="w-4 h-4 text-[#6C63FF]" />
                  </div>
                  <div>
                    <div className="text-[#E2E8F0] font-medium">
                      24/7 Availability
                    </div>
                    <div className="text-[#94A3B8]">
                      Get help anytime, anywhere, without waiting for support hours
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="/faq"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[#6C63FF] hover:bg-[#5753D8] text-white transition-colors duration-200"
              >
                Browse FAQ
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition-colors duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
