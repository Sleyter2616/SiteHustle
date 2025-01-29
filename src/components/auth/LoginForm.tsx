'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import SocialLogin from './SocialLogin'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-[#94A3B8]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-[#334155] rounded-lg bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-[#94A3B8]" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="block w-full pl-10 pr-3 py-2 border border-[#334155] rounded-lg bg-[#1E293B] text-[#E2E8F0] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-[#E2E8F0] bg-[#6C63FF] hover:bg-[#5B4FFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C63FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <SocialLogin />
    </div>
  )
}
