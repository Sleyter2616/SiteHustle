'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiMenu, FiX, FiMessageSquare, FiHelpCircle } from 'react-icons/fi'
import UserMenu from '../auth/UserMenu'
import GlobalSearch from '../search/GlobalSearch'

const PUBLIC_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' }
]

const MEMBER_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/calls-and-events', label: 'Calls & Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Support' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setEmail(session?.user?.email ?? null)
    }
    getUser()
  }, [supabase.auth])

  const isLoggedIn = !!email
  const navLinks = isLoggedIn ? MEMBER_LINKS : PUBLIC_LINKS

  return (
    <header className="fixed w-full top-0 z-50 bg-[#0F172A]/90 backdrop-blur-lg border-b border-[#334155]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <span className="text-xl font-bold heading-gradient">SiteHustle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${
                  pathname === href ? 'text-[#6C63FF]' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                }`}
              >
                {label}
              </Link>
            ))}
            
            {isLoggedIn && (
              <>
                <Link
                  href="/ai-chat"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20 transition-colors duration-200"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  <span>AI Chat</span>
                </Link>
                <GlobalSearch />
              </>
            )}
            
            {email ? (
              <UserMenu email={email} />
            ) : (
              <Link href="/login" className="btn-primary">
                Get Started
              </Link>
            )}
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
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link px-2 ${
                    pathname === href ? 'text-[#6C63FF]' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
                  }`}
                >
                  {label}
                </Link>
              ))}
              
              {isLoggedIn && (
                <Link
                  href="/ai-chat"
                  className="flex items-center gap-2 px-2 py-1.5 text-[#6C63FF]"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  <span>AI Chat</span>
                </Link>
              )}
              
              {email ? (
                <UserMenu email={email} />
              ) : (
                <Link href="/login" className="btn-primary text-center">
                  Get Started
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
