'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-[#0F172A]/90 backdrop-blur-lg border-b border-[#334155]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold heading-gradient">SiteHustle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="nav-link">Features</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/login" className="btn-primary">
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#94A3B8] hover:text-[#E2E8F0]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#334155]">
            <div className="flex flex-col space-y-4">
              <Link href="/features" className="nav-link px-2">Features</Link>
              <Link href="/pricing" className="nav-link px-2">Pricing</Link>
              <Link href="/about" className="nav-link px-2">About</Link>
              <Link href="/login" className="btn-primary text-center">
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
