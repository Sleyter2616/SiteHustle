'use client'

import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  ctaText?: string
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaText = 'Get Started'
}: PricingCardProps) {
  return (
    <div className={`card relative ${isPopular ? 'border-2 border-[#6C63FF]' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6C63FF] text-white px-4 py-1 rounded-full text-sm">
          Most Popular
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#E2E8F0] mb-2">{name}</h3>
        <div className="text-4xl font-bold text-[#E2E8F0] mb-4">
          {price}
          <span className="text-base font-normal text-[#94A3B8]">/month</span>
        </div>
        <p className="text-[#94A3B8]">{description}</p>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <FiCheck className="w-5 h-5 text-[#6C63FF] mt-0.5" />
            <span className="text-[#94A3B8]">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/login"
        className={`block text-center py-3 px-6 rounded-lg transition-colors duration-200 ${
          isPopular
            ? 'bg-[#6C63FF] hover:bg-[#5753D8] text-white'
            : 'border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white'
        }`}
      >
        {ctaText}
      </Link>
    </div>
  )
}
