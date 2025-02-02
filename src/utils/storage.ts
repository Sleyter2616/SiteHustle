import { Pillar1Data } from '@/types/pillar1'
import { Pillar2Data } from '@/types/pillar2'

type PillarData = Pillar1Data | Pillar2Data

/**
 * Save pillar data to the server (Supabase)
 */
export async function savePillarData(pillarNumber: number, data: PillarData | null): Promise<void> {
  if (!data) return

  try {
    const response = await fetch(`/api/pillar${pillarNumber}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error(`Error saving pillar ${pillarNumber} data:`, error)
    throw error
  }
}

/**
 * Load pillar data from the server (Supabase)
 */
export async function loadPillarData<T extends PillarData>(pillarNumber: number): Promise<T | null> {
  try {
    const response = await fetch(`/api/pillar${pillarNumber}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    // If the server returns `null`, we pass that on
    return result as T | null
  } catch (error) {
    console.error(`Error loading pillar ${pillarNumber} data:`, error)
    return null
  }
}
