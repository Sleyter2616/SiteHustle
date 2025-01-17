'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../lib/supabase'
import Pillar1Content from './Pillar1Content'
import Pillar2Content from './Pillar2Content'
import Pillar3Content from './Pillar3Content'
import Pillar4Content from './Pillar4Content'
import Pillar5Content from './Pillar5Content'
import Pillar6Content  from './Pillar6Content'

type Pillar = Database['public']['Tables']['pillars']['Row']
type Progress = Database['public']['Tables']['user_progress']['Row']

interface PillarContentProps {
  userId: string
  pillar: Pillar
  progress: Progress | null
}

export default function PillarContent({ pillar, progress, userId }: PillarContentProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    console.log('Pillar ID:', pillar.id, typeof pillar.id)
  }, [pillar.id])

  const handleComplete = async () => {
    setIsUpdating(true)
    try {
      if (progress) {
        await supabase
          .from('user_progress')
          .update({ 
            completed: true,
            completed_at: new Date().toISOString()
          })
          .eq('id', progress.id)
      } else {
        await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            pillar_id: pillar.id,
            completed: true,
            completed_at: new Date().toISOString()
          })
      }
      router.refresh()
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const renderPillarContent = () => {
    // Convert pillar.id to string for comparison
    const pillarId = String(pillar.id)
    console.log('Rendering content for pillar:', pillarId)
    
    switch (pillarId) {
      case '1':
        return <Pillar1Content />
      case '2':
        return <Pillar2Content />
      case '3':
        return <Pillar3Content />
      case '4':
        return <Pillar4Content />
      case '5':
          return <Pillar5Content />
      case '6':
        return <Pillar6Content />
      default:
        return (
          <div className="prose max-w-none text-[#94A3B8]">
            <h2 className="text-[#E2E8F0]">Content Coming Soon</h2>
            <p>This section will contain the detailed content for this pillar.</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#E2E8F0] mb-4">{pillar.title}</h1>
        <p className="text-lg text-[#94A3B8]">{pillar.description}</p>
      </div>

      {renderPillarContent()}

      <div className="border-t border-[#1E293B] pt-8">
        <button
          onClick={handleComplete}
          disabled={isUpdating || (progress?.completed)}
          className={`rounded-md px-6 py-3 text-base font-medium text-white shadow-sm ${
            progress?.completed
              ? 'bg-[#10B981] cursor-not-allowed'
              : 'bg-[#5865F2] hover:bg-[#4752C4]'
          }`}
        >
          {progress?.completed ? 'Completed!' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  )
}
