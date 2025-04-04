export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alpha_score_categories: {
        Row: {
          id: string
          alpha_score_id: string
          category: string
          score: number
          metrics: Json
          created_at: string
        }
        Insert: {
          id?: string
          alpha_score_id: string
          category: string
          score: number
          metrics: Json
          created_at?: string
        }
        Update: {
          id?: string
          alpha_score_id?: string
          category?: string
          score?: number
          metrics?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alpha_score_categories_alpha_score_id_fkey"
            columns: ["alpha_score_id"]
            isOneToOne: false
            referencedRelation: "alpha_scores"
            referencedColumns: ["id"]
          }
        ]
      }
      alpha_scores: {
        Row: {
          id: string
          user_id: string
          total_score: number
          recorded_at: string
          sprint_id: string | null
          quarter: number
          year: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_score: number
          recorded_at?: string
          sprint_id?: string | null
          quarter: number
          year: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_score?: number
          recorded_at?: string
          sprint_id?: string | null
          quarter?: number
          year?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alpha_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alpha_scores_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          }
        ]
      }
      annual_challenge_prep_steps: {
        Row: {
          id: string
          challenge_id: string
          step: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          challenge_id: string
          step: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string
          step?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "annual_challenge_prep_steps_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "annual_challenges"
            referencedColumns: ["id"]
          }
        ]
      }
      annual_challenges: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          vision: string
          purpose: string
          start_date: string
          end_date: string
          status: Database["public"]["Enums"]["challenge_status"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          vision: string
          purpose: string
          start_date: string
          end_date: string
          status?: Database["public"]["Enums"]["challenge_status"]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          vision?: string
          purpose?: string
          start_date?: string
          end_date?: string
          status?: Database["public"]["Enums"]["challenge_status"]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "annual_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      challenge_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      habit_completions: {
        Row: {
          id: string
          habit_id: string
          completed_date: string
          created_at: string
        }
        Insert: {
          id?: string
          habit_id: string
          completed_date: string
          created_at?: string
        }
        Update: {
          id?: string
          habit_id?: string
          completed_date?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          }
        ]
      }
      habits: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          domain: Database["public"]["Enums"]["habit_domain"]
          active: boolean
          is_pinned: boolean
          streak: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          domain: Database["public"]["Enums"]["habit_domain"]
          active?: boolean
          is_pinned?: boolean
          streak?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          domain?: Database["public"]["Enums"]["habit_domain"]
          active?: boolean
          is_pinned?: boolean
          streak?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "habits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ikigai_components: {
        Row: {
          id: string
          user_id: string
          love: string
          good: string
          paid: string
          needs: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          love: string
          good: string
          paid: string
          needs: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          love?: string
          good?: string
          paid?: string
          needs?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ikigai_components_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mission_statements: {
        Row: {
          id: string
          user_id: string
          statement: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          statement: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          statement?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_statements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      monthly_challenges: {
        Row: {
          id: string
          user_id: string
          category_id: string
          title: string
          description: string | null
          success_criteria: string | null
          start_date: string
          end_date: string
          status: Database["public"]["Enums"]["challenge_status"]
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          title: string
          description?: string | null
          success_criteria?: string | null
          start_date: string
          end_date: string
          status?: Database["public"]["Enums"]["challenge_status"]
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          title?: string
          description?: string | null
          success_criteria?: string | null
          start_date?: string
          end_date?: string
          status?: Database["public"]["Enums"]["challenge_status"]
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_challenges_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "challenge_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sprint_objectives: {
        Row: {
          id: string
          sprint_id: string
          title: string
          description: string | null
          progress: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          sprint_id: string
          title: string
          description?: string | null
          progress?: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          sprint_id?: string
          title?: string
          description?: string | null
          progress?: number
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sprint_objectives_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          }
        ]
      }
      sprints: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          description?: string | null
          start_date: string
          end_date: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          description?: string | null
          start_date?: string
          end_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sprints_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      vision_goals: {
        Row: {
          id: string
          user_id: string
          timeframe: string
          statement: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          timeframe: string
          statement: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          timeframe?: string
          statement?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vision_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      vision_milestones: {
        Row: {
          id: string
          vision_goal_id: string
          milestone: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vision_goal_id: string
          milestone: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vision_goal_id?: string
          milestone?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vision_milestones_vision_goal_id_fkey"
            columns: ["vision_goal_id"]
            isOneToOne: false
            referencedRelation: "vision_goals"
            referencedColumns: ["id"]
          }
        ]
      }
      weekly_habit_progress: {
        Row: {
          id: string
          review_id: string
          habit_id: string
          completed: number
          target: number
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          habit_id: string
          completed: number
          target: number
          created_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          habit_id?: string
          completed?: number
          target?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_habit_progress_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_habit_progress_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "weekly_reviews"
            referencedColumns: ["id"]
          }
        ]
      }
      weekly_reviews: {
        Row: {
          id: string
          user_id: string
          week_start_date: string
          wins: string | null
          challenges: string | null
          lessons: string | null
          next_week_focus: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          week_start_date: string
          wins?: string | null
          challenges?: string | null
          lessons?: string | null
          next_week_focus?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          week_start_date?: string
          wins?: string | null
          challenges?: string | null
          lessons?: string | null
          next_week_focus?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      financial_data: {
        Row: {
          id: string
          user_id: string
          monthly_freedom_number: number
          annual_freedom_number: number
          current_savings: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          monthly_freedom_number: number
          annual_freedom_number: number
          current_savings: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          monthly_freedom_number?: number
          annual_freedom_number?: number
          current_savings?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      income_sources: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          is_passive: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          is_passive: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          amount?: number
          is_passive?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "income_sources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      monthly_expenses: {
        Row: {
          id: string
          user_id: string
          month: string
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          month: string
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          month?: string
          amount?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_habit_streak: {
        Args: {
          habit_id: string
        }
        Returns: number
      }
    }
    Enums: {
      challenge_status: "upcoming" | "in_progress" | "completed" | "failed"
      habit_domain: "mind" | "body" | "purpose" | "relationships"
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
