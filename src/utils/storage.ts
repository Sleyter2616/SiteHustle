import { Pillar1Data } from '@/types/pillar1';

const STORAGE_KEYS = {
  PILLAR1_DATA: 'pillar1Data'
} as const;

export function savePillar1Data(data: Pillar1Data | null): void {
  if (!data) {
    localStorage.removeItem(STORAGE_KEYS.PILLAR1_DATA);
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEYS.PILLAR1_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving pillar 1 data:', error);
  }
}

export function loadPillar1Data(): Pillar1Data | null {
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.PILLAR1_DATA);
    if (!storedData) return null;
    
    return JSON.parse(storedData) as Pillar1Data;
  } catch (error) {
    console.error('Error loading pillar 1 data:', error);
    return null;
  }
}
