'use client'

import Link from 'next/link'
import Header from '../../components/layout/Header'
import { FaEnvelope, FaRobot, FaQuestionCircle } from 'react-icons/fa'
import SupportForm from '../../components/support/SupportForm'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#E2E8F0] mb-4">Contact Support</h1>
              <p className="text-[#94A3B8] mb-6">
                For general questions or issues, fill out the form below.
                We typically respond within 24-48 hours.
              </p>
              <Link 
                href="/faq" 
                className="inline-flex items-center gap-2 text-[#5865F2] hover:text-[#4752C4] transition-colors"
              >
                <FaQuestionCircle className="w-5 h-5" />
                <span>Check our FAQ for quick answers</span>
              </Link>
            </div>

            {/* Urgent Support Card */}
            <div className="bg-[#1E293B] rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <FaEnvelope className="w-6 h-6 text-[#5865F2] mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-[#E2E8F0] mb-2">Email Us Directly</h2>
                  <p className="text-[#94A3B8] mb-2">
                    For urgent inquiries, email us at:{' '}
                    <a 
                      href="mailto:support@sitehustle.com" 
                      className="text-[#5865F2] hover:text-[#4752C4] transition-colors"
                    >
                      support@sitehustle.com
                    </a>
                  </p>
                  <p className="text-sm text-[#64748B]">
                    * Please include your account email and any relevant details
                  </p>
                </div>
              </div>
            </div>

            {/* Support Form */}
            <div className="bg-[#1E293B] rounded-lg p-8">
              <SupportForm />
            </div>

            {/* Help Bot */}
            <div className="mt-8 text-center">
              <button
                onClick={() => alert('AI Help Bot coming soon!')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D3748] text-[#94A3B8] rounded-lg hover:bg-[#374151] transition-colors"
              >
                <FaRobot className="w-5 h-5" />
                <span>Try our AI Help Bot (Beta)</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
