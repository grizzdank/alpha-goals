import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type AlphaScoreCategory = Database['public']['Tables']['alpha_score_categories']['Row'];

export type MetricData = {
  id: string;
  label: string;
  value: number;
  max: number;
  step?: number;
  infoText?: string;
};

export type CategoryData = {
  category: AlphaScoreCategory['category'];
  score: number;
  metrics: MetricData[];
};

export type AlphaScoreData = {
  totalScore: number;
  quarter: number;
  year: number;
  categories: CategoryData[];
  sprintId?: string;
};

export type AlphaScore = {
  id: string;
  user_id: string;
  total_score: number;
  recorded_at: string;
  sprint_id: string | null;
  quarter: string;
  year: number;
  created_at: string;
  alpha_score_categories: {
    id: string;
    alpha_score_id: string;
    category: string;
    score: number;
    metrics: MetricData[];
    created_at: string;
  }[];
};

export const alphaScoreService = {
  async getCurrentQuarter(): Promise<{ quarter: number; year: number }> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const quarter = Math.floor(month / 3) + 1;
    return { quarter, year };
  },

  async getLatestScore(userId: string) {
    const { data, error } = await supabase
      .rpc('get_latest_alpha_score', { user_uuid: userId });

    if (error) throw error;
    return data?.[0];
  },

  async getScoreChanges(userId: string) {
    const { data, error } = await supabase
      .rpc('get_alpha_score_changes', { user_uuid: userId });

    if (error) throw error;
    return data;
  },

  async saveAlphaScore(userId: string, scoreData: AlphaScoreData) {
    // Start a Supabase transaction
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No active session');

    // Insert the main alpha score record
    const { data: alphaScore, error: scoreError } = await supabase
      .from('alpha_scores')
      .insert({
        user_id: userId,
        total_score: scoreData.totalScore,
        quarter: `Q${scoreData.quarter}`,
        year: scoreData.year,
        sprint_id: scoreData.sprintId || null,
        recorded_at: new Date().toISOString()
      })
      .select()
      .single();

    if (scoreError) throw scoreError;

    // Insert all category scores
    const categoryInserts = scoreData.categories.map(category => ({
      alpha_score_id: alphaScore.id,
      category: category.category,
      score: category.score,
      metrics: category.metrics,
    }));

    const { error: categoriesError } = await supabase
      .from('alpha_score_categories')
      .insert(categoryInserts);

    if (categoriesError) throw categoriesError;

    return alphaScore;
  },

  async getQuarterlyHistory(userId: string) {
    const { data, error } = await supabase
      .from('alpha_scores')
      .select(`
        *,
        alpha_score_categories (
          category,
          score,
          metrics
        )
      `)
      .eq('user_id', userId)
      .order('year', { ascending: false })
      .order('quarter', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getQuarterlyAverages(userId: string) {
    const { data, error } = await supabase
      .from('alpha_scores')
      .select('quarter, year, total_score')
      .eq('user_id', userId)
      .order('year', { ascending: true })
      .order('quarter', { ascending: true });

    if (error) throw error;
    return data;
  },
}; 