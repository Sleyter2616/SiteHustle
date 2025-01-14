'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../lib/supabase'

type Pillar = Database['public']['Tables']['pillars']['Row']
type Progress = Database['public']['Tables']['user_progress']['Row']

interface PillarContentProps {
  pillar: Pillar
  progress: Progress | null
  userId: string
}

export default function PillarContent({ pillar, progress, userId }: PillarContentProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{pillar.title}</h1>
        <p className="mt-2 text-lg text-gray-600">{pillar.description}</p>
      </div>

      <div className="prose max-w-none">
        {/* Add your pillar content here */}
        <h2>Content Coming Soon</h2>
        <p>This section will contain the detailed content for this pillar.</p>
      </div>

      <div className="border-t pt-8">
        <button
          onClick={handleComplete}
          disabled={isUpdating || (progress?.completed)}
          className={`rounded-md px-6 py-3 text-base font-medium text-white shadow-sm ${
            progress?.completed
              ? 'bg-green-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {progress?.completed ? 'Completed!' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  )
}
