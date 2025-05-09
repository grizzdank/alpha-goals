import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type MissionStatement = Database['public']['Tables']['mission_statements']['Row'];
type VisionGoal = Database['public']['Tables']['vision_goals']['Row'];
type VisionMilestone = Database['public']['Tables']['vision_milestones']['Row'];
type IkigaiComponent = Database['public']['Tables']['ikigai_components']['Row'];

export type VisionGoalWithMilestones = VisionGoal & {
  vision_milestones: VisionMilestone[];
};

export const missionService = {
  // Mission Statement Operations
  async getMissionStatement(userId: string): Promise<MissionStatement | null> {
    const { data, error } = await supabase
      .from('mission_statements')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching mission statement:', error);
      return null;
    }

    return data;
  },

  async updateMissionStatement(userId: string, statement: string): Promise<MissionStatement | null> {
    const { data, error } = await supabase
      .from('mission_statements')
      .insert({
        user_id: userId,
        statement
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating mission statement:', error);
      return null;
    }

    return data;
  },

  // Vision Goals Operations
  async getVisionGoals(userId: string): Promise<VisionGoalWithMilestones[]> {
    const { data: goals, error: goalsError } = await supabase
      .from('vision_goals')
      .select(`
        *,
        vision_milestones (*)
      `)
      .eq('user_id', userId)
      .order('timeframe', { ascending: true });

    if (goalsError) {
      console.error('Error fetching vision goals:', goalsError);
      return [];
    }

    return goals as VisionGoalWithMilestones[];
  },

  async updateVisionGoal(userId: string, timeframe: string, statement: string): Promise<VisionGoal | null> {
    const { data, error } = await supabase
      .from('vision_goals')
      .upsert({
        user_id: userId,
        timeframe,
        statement
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating vision goal:', error);
      return null;
    }

    return data;
  },

  async addVisionMilestone(goalId: string, milestone: string): Promise<VisionMilestone | null> {
    const { data, error } = await supabase
      .from('vision_milestones')
      .insert({
        vision_goal_id: goalId,
        milestone,
        completed: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding vision milestone:', error);
      return null;
    }

    return data;
  },

  async toggleMilestoneCompletion(milestoneId: string, completed: boolean): Promise<VisionMilestone | null> {
    const { data, error } = await supabase
      .from('vision_milestones')
      .update({ completed })
      .eq('id', milestoneId)
      .select()
      .single();

    if (error) {
      console.error('Error toggling milestone completion:', error);
      return null;
    }

    return data;
  },

  async deleteMilestone(milestoneId: string): Promise<void> {
    const { error } = await supabase
      .from('vision_milestones')
      .delete()
      .eq('id', milestoneId);

    if (error) {
      console.error('Error deleting milestone:', error);
    }
  },

  // Ikigai Components Operations
  async getIkigaiComponents(userId: string): Promise<IkigaiComponent | null> {
    const { data, error } = await supabase
      .from('ikigai_components')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching ikigai components:', error);
      return null;
    }

    return data;
  },

  async updateIkigaiComponents(
    userId: string,
    components: {
      love: string;
      good: string;
      paid: string;
      needs: string;
    }
  ): Promise<IkigaiComponent | null> {
    const { data, error } = await supabase
      .from('ikigai_components')
      .insert({
        user_id: userId,
        ...components
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating ikigai components:', error);
      return null;
    }

    return data;
  }
}; 