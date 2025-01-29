'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function SocialLogin() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setLoading(provider)
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.error(`Failed to sign in with ${provider}`)
      }
    } catch (error) {
      toast.error(`An unexpected error occurred`)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#334155]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#1E293B] text-[#94A3B8]">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocialLogin('google')}
          disabled={loading === 'google'}
          className="flex justify-center items-center px-4 py-2 border border-[#334155] rounded-lg hover:bg-[#2D3748] transition-colors"
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          <span className="text-[#E2E8F0]">
            {loading === 'google' ? 'Loading...' : 'Google'}
          </span>
        </button>

        <button
          onClick={() => handleSocialLogin('apple')}
          disabled={loading === 'apple'}
          className="flex justify-center items-center px-4 py-2 border border-[#334155] rounded-lg hover:bg-[#2D3748] transition-colors"
        >
          <FaApple className="h-5 w-5 mr-2 text-[#E2E8F0]" />
          <span className="text-[#E2E8F0]">
            {loading === 'apple' ? 'Loading...' : 'Apple'}
          </span>
        </button>
      </div>
    </div>
  )
}
