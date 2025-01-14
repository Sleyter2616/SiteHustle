import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
    }
  }
}
