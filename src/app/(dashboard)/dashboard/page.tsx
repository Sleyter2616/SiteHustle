import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PillarGrid from '@/components/dashboard/PillarGrid'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch pillars and user progress
  const { data: pillars } = await supabase
    .from('pillars')
    .select('*')
    .order('order')

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', session.user.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Your Journey</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your progress through the 6 pillars of digital success.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <PillarGrid pillars={pillars || []} progress={progress || []} />
      </div>
    </div>
  )
}
