import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PillarContent from '../../../../components/pillars/PillarContent'

export default async function PillarPage({
  params: { id },
}: {
  params: { id: string }
}) {
  console.log('PillarPage: Rendering with ID:', id)

  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    console.log('PillarPage: No session, redirecting to login')
    redirect('/login')
  }

  console.log('PillarPage: Fetching pillar data for ID:', id)
  const { data: pillar } = await supabase
    .from('pillars')
    .select('*')
    .eq('id', id)
    .single()

  if (!pillar) {
    console.log('PillarPage: No pillar found, redirecting to dashboard')
    redirect('/dashboard')
  }

  console.log('PillarPage: Found pillar:', pillar)
  console.log('PillarPage: Fetching progress for user:', session.user.id)

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('pillar_id', id)
    .single()

  console.log('PillarPage: Progress data:', progress)

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
