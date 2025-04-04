import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type WeeklyReview = Database['public']['Tables']['weekly_reviews']['Row'];
type WeeklyHabitProgress = Database['public']['Tables']['weekly_habit_progress']['Row'];

export type WeeklyReviewWithProgress = WeeklyReview & {
  weekly_habit_progress: WeeklyHabitProgress[];
};

export type CreateWeeklyReviewData = {
  week_start_date: string;
  week_end_date: string;
  wins: string[];
  challenges: string[];
  insights: string[];
  next_week_focus: string[];
  mood_rating: number;
  energy_rating: number;
  habit_progress: Array<{
    habit_id: string;
    progress: number;
  }>;
};

export const weeklyReviewService = {
  async getCurrentWeekReview(userId: string): Promise<WeeklyReviewWithProgress | null> {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('weekly_reviews')
      .select(`
        *,
        weekly_habit_progress (*)
      `)
      .eq('user_id', userId)
      .gte('week_start_date', startOfWeek.toISOString())
      .order('week_start_date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching current week review:', error);
      return null;
    }

    return data;
  },

  async getWeeklyReviewHistory(userId: string): Promise<WeeklyReviewWithProgress[]> {
    const { data, error } = await supabase
      .from('weekly_reviews')
      .select(`
        *,
        weekly_habit_progress (*)
      `)
      .eq('user_id', userId)
      .order('week_start_date', { ascending: false });

    if (error) {
      console.error('Error fetching weekly review history:', error);
      return [];
    }

    return data || [];
  },

  async createWeeklyReview(userId: string, reviewData: CreateWeeklyReviewData): Promise<WeeklyReviewWithProgress | null> {
    // Start a Supabase transaction
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No active session');

    // Insert the weekly review
    const { data: review, error: reviewError } = await supabase
      .from('weekly_reviews')
      .insert({
        user_id: userId,
        week_start_date: reviewData.week_start_date,
        week_end_date: reviewData.week_end_date,
        wins: reviewData.wins,
        challenges: reviewData.challenges,
        insights: reviewData.insights,
        next_week_focus: reviewData.next_week_focus,
        mood_rating: reviewData.mood_rating,
        energy_rating: reviewData.energy_rating
      })
      .select()
      .single();

    if (reviewError) throw reviewError;

    // Insert habit progress
    const progressData = reviewData.habit_progress.map(progress => ({
      weekly_review_id: review.id,
      habit_id: progress.habit_id,
      week_start_date: reviewData.week_start_date,
      progress: progress.progress
    }));

    const { error: progressError } = await supabase
      .from('weekly_habit_progress')
      .insert(progressData);

    if (progressError) throw progressError;

    // Return the created review with progress
    return this.getWeeklyReviewById(review.id);
  },

  async getWeeklyReviewById(reviewId: string): Promise<WeeklyReviewWithProgress | null> {
    const { data, error } = await supabase
      .from('weekly_reviews')
      .select(`
        *,
        weekly_habit_progress (*)
      `)
      .eq('id', reviewId)
      .single();

    if (error) {
      console.error('Error fetching weekly review:', error);
      return null;
    }

    return data;
  },

  async getWeeklyStats(userId: string, startDate: string, endDate: string) {
    const { data: reviews, error: reviewsError } = await supabase
      .from('weekly_reviews')
      .select('mood_rating, energy_rating')
      .eq('user_id', userId)
      .gte('week_start_date', startDate)
      .lte('week_end_date', endDate);

    if (reviewsError) throw reviewsError;

    const { data: progress, error: progressError } = await supabase
      .from('weekly_habit_progress')
      .select('progress')
      .gte('week_start_date', startDate)
      .lte('week_start_date', endDate);

    if (progressError) throw progressError;

    const avgMood = reviews?.reduce((acc, r) => acc + r.mood_rating, 0) / (reviews?.length || 1);
    const avgEnergy = reviews?.reduce((acc, r) => acc + r.energy_rating, 0) / (reviews?.length || 1);
    const avgProgress = progress?.reduce((acc, p) => acc + p.progress, 0) / (progress?.length || 1);

    return {
      averageMoodRating: Math.round(avgMood * 10) / 10,
      averageEnergyRating: Math.round(avgEnergy * 10) / 10,
      averageHabitProgress: Math.round(avgProgress * 10) / 10,
      totalReviews: reviews?.length || 0
    };
  }
}; 