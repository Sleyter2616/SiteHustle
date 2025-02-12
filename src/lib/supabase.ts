import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export type Database = {
  public: {
    Tables: {
      pillars: {
        Row: {
          id: number
          title: string
          description: string
          order: number
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          order: number
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: number
          user_id: string
          pillar_id: number
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          pillar_id: number
          completed?: boolean
          completed_at?: string | null
        }
      }
      wizard_steps: {
        Row: {
          user_id: string
          step_id: string
          user_input: any
          ai_output: string
          updated_at: string
        }
        Insert: {
          user_id: string
          step_id: string
          user_input: any
          ai_output: string
          updated_at?: string
        }
      }
    }
  }
}

export interface WizardStepData {
  user_id: string;
  step_id: string;
  user_input: any;
  ai_output: string;
  updated_at: string;
}

export class SaveError extends Error {
  constructor(message: string, public readonly attempt: number) {
    super(message);
    this.name = 'SaveError';
  }
}

export async function saveWizardStep(
  userId: string,
  stepId: string,
  data: { userInput: any; aiOutput: string }
): Promise<void> {
  const supabase = createClientComponentClient();
  console.log('Saving wizard step with:', {
    userId,
    stepId,
    data,
  });

  const { error } = await supabase
    .from('wizard_steps')
    .upsert({
      user_id: userId,
      step_id: stepId,
      user_input: data.userInput,
      ai_output: data.aiOutput,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,step_id'
    });

  if (error) {
    console.error('Supabase error details:', error);
    throw new SaveError(`Error saving wizard step: ${error.message}`, 1);
  }
}

export async function saveWithRetry(
  userId: string,
  stepId: string,
  data: { userInput: any; aiOutput: string },
  maxRetries = 1
): Promise<void> {
  let lastError: SaveError | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await saveWizardStep(userId, stepId, data);
      return;
    } catch (error) {
      lastError = error instanceof SaveError ? error : new SaveError(String(error), attempt + 1);
      
      if (attempt === maxRetries - 1) {
        throw lastError;
      }
      
      // Exponential backoff delay
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

export async function loadWizardData(userId: string): Promise<WizardStepData[]> {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('wizard_steps')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(`Error loading wizard data: ${error.message}`);
  }

  return data || [];
}
