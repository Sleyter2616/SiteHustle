import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PillarContent from '@/components/pillars/PillarContent'

export default async function PillarPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: pillar } = await supabase
    .from('pillars')
    .select('*')
    .eq('id', id)
    .single()

  if (!pillar) {
    redirect('/dashboard')
  }

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('pillar_id', id)
    .single()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PillarContent 
        pillar={pillar} 
        progress={progress} 
        userId={session.user.id} 
      />
    </div>
  )
}
