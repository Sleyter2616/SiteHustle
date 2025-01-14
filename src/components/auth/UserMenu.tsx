'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi'

export default function UserMenu({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
      >
        <FiUser className="w-5 h-5" />
        <span className="hidden md:inline">{email?.split('@')[0]}</span>
        <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1E293B] border border-[#334155] shadow-xl z-20">
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left flex items-center space-x-2 text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#334155] transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
