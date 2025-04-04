import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type BaseSprint = Database['public']['Tables']['sprints']['Row'];
type BaseSprintObjective = Database['public']['Tables']['sprint_objectives']['Row'];

export interface SprintWithObjectives extends BaseSprint {
  objectives: (BaseSprintObjective & { is_completed: boolean })[];
}

export type CreateSprintData = {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  objectives: {
    title: string;
    description?: string;
    progress?: number;
  }[];
};

export const sprintService = {
  async getCurrentSprint(userId: string): Promise<SprintWithObjectives | null> {
    const { data, error } = await supabase
      .from('sprints')
      .select(`
        *,
        sprint_objectives (*)
      `)
      .eq('user_id', userId)
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching current sprint:', error);
      return null;
    }

    return data;
  },

  async getSprintHistory(userId: string): Promise<SprintWithObjectives[]> {
    const { data, error } = await supabase
      .from('sprints')
      .select(`
        *,
        sprint_objectives (*)
      `)
      .eq('user_id', userId)
      .lt('end_date', new Date().toISOString())
      .order('end_date', { ascending: false });

    if (error) {
      console.error('Error fetching sprint history:', error);
      return [];
    }

    return data || [];
  },

  async createSprint(userId: string, sprintData: CreateSprintData): Promise<SprintWithObjectives | null> {
    // Start a Supabase transaction
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No active session');

    // Insert the sprint
    const { data: sprint, error: sprintError } = await supabase
      .from('sprints')
      .insert({
        user_id: userId,
        name: sprintData.name,
        description: sprintData.description,
        start_date: sprintData.start_date,
        end_date: sprintData.end_date,
        progress: 0
      })
      .select()
      .single();

    if (sprintError) throw sprintError;

    // Insert objectives
    const objectivesData = sprintData.objectives.map(obj => ({
      sprint_id: sprint.id,
      title: obj.title,
      description: obj.description,
      progress: obj.progress || 0
    }));

    const { error: objectivesError } = await supabase
      .from('sprint_objectives')
      .insert(objectivesData);

    if (objectivesError) throw objectivesError;

    // Return the created sprint with objectives
    return this.getSprintById(sprint.id);
  },

  async getSprintById(sprintId: string): Promise<SprintWithObjectives | null> {
    const { data, error } = await supabase
      .from('sprints')
      .select(`
        *,
        sprint_objectives (*)
      `)
      .eq('id', sprintId)
      .single();

    if (error) {
      console.error('Error fetching sprint:', error);
      return null;
    }

    return data;
  },

  async updateSprintObjective(objectiveId: string, updates: Partial<BaseSprintObjective>): Promise<void> {
    const { error } = await supabase
      .from('sprint_objectives')
      .update(updates)
      .eq('id', objectiveId);

    if (error) throw error;
  },

  async completeSprint(sprintId: string): Promise<void> {
    const { error } = await supabase
      .from('sprints')
      .update({ progress: 100 })
      .eq('id', sprintId);

    if (error) throw error;
  },

  async getSprintProgress(sprintId: string): Promise<number> {
    const { data: sprint, error } = await supabase
      .from('sprints')
      .select('progress')
      .eq('id', sprintId)
      .single();

    if (error) {
      console.error('Error fetching sprint progress:', error);
      return 0;
    }

    return sprint.progress;
  },

  async calculateSprintProgress(sprintId: string): Promise<number> {
    const { data: sprint, error } = await supabase
      .from('sprints')
      .select(`
        *,
        objectives:sprint_objectives (*)
      `)
      .eq('id', sprintId)
      .single();

    if (error) {
      console.error('Error fetching sprint:', error);
      throw new Error('Failed to fetch sprint progress');
    }

    if (!sprint || !sprint.objectives || sprint.objectives.length === 0) {
      return 0;
    }

    const completedCount = sprint.objectives.filter(obj => obj.progress === 100).length;
    return Math.round((completedCount / sprint.objectives.length) * 100);
  }
}; 