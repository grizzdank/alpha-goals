import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type BaseHabit = Database['public']['Tables']['habits']['Row'];
type BaseHabitCompletion = Database['public']['Tables']['habit_completions']['Row'];
type WeeklyHabitProgress = Database['public']['Tables']['weekly_habit_progress']['Row'];

export interface HabitWithCompletions extends BaseHabit {
  habit_completions: (BaseHabitCompletion & { is_completed: boolean })[];
}

export type CreateHabitData = {
  title: string;
  description?: string;
  domain: 'mind' | 'body' | 'purpose' | 'relationships';
  frequency?: number;
  target_value?: number;
  reminder_time?: string;
  is_pinned?: boolean;
};

export const habitService = {
  async getActiveHabits(userId: string): Promise<HabitWithCompletions[]> {
    const { data, error } = await supabase
      .from('habits')
      .select(`
        *,
        habit_completions (*)
      `)
      .eq('user_id', userId)
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching active habits:', error);
      return [];
    }

    return data || [];
  },

  async getHabitById(habitId: string): Promise<HabitWithCompletions | null> {
    const { data, error } = await supabase
      .from('habits')
      .select(`
        *,
        habit_completions (*),
        weekly_habit_progress (*)
      `)
      .eq('id', habitId)
      .single();

    if (error) {
      console.error('Error fetching habit:', error);
      return null;
    }

    return data;
  },

  async createHabit(userId: string, habitData: CreateHabitData): Promise<BaseHabit | null> {
    const { data, error } = await supabase
      .from('habits')
      .insert({
        user_id: userId,
        title: habitData.title,
        description: habitData.description,
        domain: habitData.domain,
        frequency: habitData.frequency,
        target_value: habitData.target_value,
        reminder_time: habitData.reminder_time,
        is_pinned: habitData.is_pinned || false,
        active: true,
        streak: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating habit:', error);
      return null;
    }

    return data;
  },

  async toggleHabitCompletion(habitId: string, date: string): Promise<void> {
    const { data: existing, error: fetchError } = await supabase
      .from('habit_completions')
      .select('*')
      .eq('habit_id', habitId)
      .eq('date', date)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      // Delete completion if it exists
      const { error } = await supabase
        .from('habit_completions')
        .delete()
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Create new completion
      const { error } = await supabase
        .from('habit_completions')
        .insert({
          habit_id: habitId,
          date: date,
          completed: true
        });

      if (error) throw error;
    }

    // Update streak
    await this.updateHabitStreak(habitId);
  },

  async updateHabitStreak(habitId: string): Promise<void> {
    const { data: habit, error: habitError } = await supabase
      .from('habits')
      .select('*')
      .eq('id', habitId)
      .single();

    if (habitError) throw habitError;

    const { data: completions, error: completionsError } = await supabase
      .from('habit_completions')
      .select('*')
      .eq('habit_id', habitId)
      .order('date', { ascending: false });

    if (completionsError) throw completionsError;

    // Calculate current streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < (completions?.length || 0); i++) {
      const completion = completions[i];
      const completionDate = new Date(completion.date);
      completionDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (completionDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    // Update habit streak
    const { error: updateError } = await supabase
      .from('habits')
      .update({ streak })
      .eq('id', habitId);

    if (updateError) throw updateError;
  },

  async getHabitStats(habitId: string): Promise<{
    totalCompletions: number;
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
  }> {
    const { data: habit, error: habitError } = await supabase
      .from('habits')
      .select('created_at, streak')
      .eq('id', habitId)
      .single();

    if (habitError) throw habitError;

    const { data: completions, error: completionsError } = await supabase
      .from('habit_completions')
      .select('*')
      .eq('habit_id', habitId);

    if (completionsError) throw completionsError;

    const createdAt = new Date(habit.created_at);
    const today = new Date();
    const totalDays = Math.floor((today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return {
      totalCompletions: completions?.length || 0,
      currentStreak: habit.streak,
      longestStreak: Math.max(habit.streak, ...(completions?.map(c => c.streak) || [0])),
      completionRate: totalDays > 0 ? ((completions?.length || 0) / totalDays) * 100 : 0
    };
  },

  async updateWeeklyProgress(habitId: string, weekStartDate: string, progress: number): Promise<void> {
    const { error } = await supabase
      .from('weekly_habit_progress')
      .upsert({
        habit_id: habitId,
        week_start_date: weekStartDate,
        progress
      });

    if (error) throw error;
  },

  async getAllHabits(userId: string): Promise<HabitWithCompletions[]> {
    const { data: habits, error } = await supabase
      .from('habits')
      .select(`
        *,
        habit_completions (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching habits:', error);
      throw new Error('Failed to fetch habits');
    }

    return habits || [];
  }
};