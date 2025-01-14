'use client'

import { FiStar } from 'react-icons/fi'

interface TestimonialProps {
  quote: string
  author: string
  role: string
}

export default function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className="w-5 h-5 text-[#6C63FF] fill-current" />
        ))}
      </div>
      <blockquote className="text-lg text-[#E2E8F0] mb-4 max-w-2xl mx-auto">
        "{quote}"
      </blockquote>
      <cite className="not-italic">
        <div className="font-semibold text-[#E2E8F0]">{author}</div>
        <div className="text-sm text-[#94A3B8]">{role}</div>
      </cite>
    </div>
  )
}
