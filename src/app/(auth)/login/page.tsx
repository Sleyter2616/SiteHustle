import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LoginForm from '../../../components/auth/LoginForm'

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center">
      <div className="container-custom max-w-md">
        <Link href="/" className="flex items-center mb-8">
          <span className="text-2xl font-bold heading-gradient">SiteHustle</span>
        </Link>
        <div className="bg-[#1E293B] rounded-xl p-8 shadow-xl border border-[#334155]">
          <h1 className="text-2xl font-bold text-[#E2E8F0] mb-6">Welcome back</h1>
          <LoginForm />
          <div className="mt-4 text-center">
            <p className="text-[#94A3B8]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#6C63FF] hover:text-[#4D9FFF]">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
