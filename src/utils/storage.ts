import { Pillar1Data } from '@/types/pillar1';

/**
 * Save to the server (Supabase)
 */
export async function savePillar1Data(data: Pillar1Data | null): Promise<void> {
  if (!data) return;
  
  try {
    const response = await fetch('/api/pillar1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error saving pillar 1 data:', error);
    throw error;
  }
}

/**
 * Load from the server (Supabase)
 */
export async function loadPillar1Data(): Promise<Pillar1Data | null> {
  try {
    const response = await fetch('/api/pillar1');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    // If the server returns `null`, we pass that on
    return result as Pillar1Data | null;
  } catch (error) {
    console.error('Error loading pillar 1 data:', error);
    return null;
  }
}
