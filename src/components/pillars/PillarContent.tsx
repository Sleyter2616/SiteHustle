'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../lib/supabase'
import Pillar1Content from './Pillar1Content'
import Pillar2Content from './Pillar2Content'
import Pillar3Content from './Pillar3Content'
import Pillar4Content from './Pillar4Content'
import Pillar5Content from './Pillar5Content'
import Pillar6Content from './Pillar6Content'

type Pillar = Database['public']['Tables']['pillars']['Row']
type Progress = Database['public']['Tables']['user_progress']['Row']

interface PillarContentProps {
  userId: string
  pillar: Pillar
  progress: Progress | null
}

export default function PillarContent({ pillar, progress, userId }: PillarContentProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [pillarData, setPillarData] = useState<any>(null) // or more specific if you want
  const router = useRouter()
  const supabase = createClientComponentClient()

  // This handles user_progress "Completed" toggling
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

  // Called when sub-components (e.g. Pillar1Content) change data
  const handleDataChange = (newData: any) => {
    setPillarData(newData)
    // Up to you if you want to do local or server saving here.
    // We'll add a separate "Save" button to do the actual POST to /api/pillar1.
  }

  // NEW: Manually save Pillar 1 data to /api/pillar1
  const handleSavePillar1 = async () => {
    try {
      // Optional: only do this if pillar is Pillar 1
      if (String(pillar.id) !== '1') {
        console.log('Save only applies to Pillar 1 in this example.')
        return
      }
      if (!pillarData) {
        console.log('No Pillar 1 data to save.')
        return
      }
      const res = await fetch('/api/pillar1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pillarData) // This must match your Pillar1Data shape
      })
      if (!res.ok) {
        throw new Error(`Failed to save Pillar1 data: ${res.status}`)
      }
      console.log('Pillar 1 data saved successfully.')
      // Optionally show a toast or UI feedback
    } catch (error) {
      console.error('Error saving Pillar 1 data:', error)
    }
  }

  const renderPillarContent = () => {
    const pillarId = String(pillar.id)
    switch (pillarId) {
      case '1':
        return <Pillar1Content data={pillarData} onDataChange={handleDataChange} />
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#E2E8F0] mb-4">{pillar.title}</h1>
      <p className="text-lg text-[#94A3B8] mb-8">{pillar.description}</p>

      {renderPillarContent()}

      <div className="border-t border-[#1E293B] pt-8 flex gap-4">
        {/* NEW: Add a Save button for Pillar 1 */}
        {String(pillar.id) === '1' && (
          <button
            onClick={handleSavePillar1}
            className="rounded-md px-6 py-3 text-base font-medium text-white shadow-sm bg-[#3B82F6] hover:bg-[#2563EB]"
          >
            Save Pillar 1 Data
          </button>
        )}
      </div>
    </div>
  )
}
