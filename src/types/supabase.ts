export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pillar_1_data: {
        Row: {
          id: string
          user_id: string
          business_info: Json
          swot_analysis: Json
          target_audience: Json
          goals: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_info?: Json
          swot_analysis?: Json
          target_audience?: Json
          goals?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_info?: Json
          swot_analysis?: Json
          target_audience?: Json
          goals?: Json
          created_at?: string
          updated_at?: string
        }
      }
      pillar_2_data: {
        Row: {
          id: string
          user_id: string
          progress: Json
          selected_tools: Json
          matrix_scores: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          progress?: Json
          selected_tools?: Json
          matrix_scores?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          progress?: Json
          selected_tools?: Json
          matrix_scores?: Json
          created_at?: string
          updated_at?: string
        }
      }
      pillar_3_data: {
        Row: {
          id: string
          user_id: string
          selected_platform: string | null
          progress: Json
          setup: Json
          pages: Json
          testing: Json
          custom_domain: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          selected_platform?: string | null
          progress?: Json
          setup?: Json
          pages?: Json
          testing?: Json
          custom_domain?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          selected_platform?: string | null
          progress?: Json
          setup?: Json
          pages?: Json
          testing?: Json
          custom_domain?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
