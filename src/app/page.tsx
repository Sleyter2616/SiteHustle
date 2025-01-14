import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="max-w-3xl text-center text-white">
        <h1 className="text-5xl font-bold mb-6">
          Master the 6 Pillars of Digital Success
        </h1>
        <p className="text-xl mb-8">
          Track your progress, unlock new skills, and build your digital empire one pillar at a time.
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
