import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type FinancialData = Database['public']['Tables']['financial_data']['Row'];
type IncomeSource = Database['public']['Tables']['income_sources']['Row'];
type MonthlyExpense = Database['public']['Tables']['monthly_expenses']['Row'];

export type FinancialDataWithSources = FinancialData & {
  income_sources: IncomeSource[];
};

export const financialService = {
  async getFinancialData(userId: string): Promise<FinancialDataWithSources | null> {
    const { data, error } = await supabase
      .from('financial_data')
      .select(`
        *,
        income_sources (*)
      `)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching financial data:', error);
      return null;
    }

    // If no data exists, create initial financial data
    if (!data) {
      const initialData = {
        user_id: userId,
        monthly_freedom_number: 0,
        annual_freedom_number: 0,
        current_savings: 0
      };

      const { data: newData, error: createError } = await supabase
        .from('financial_data')
        .insert(initialData)
        .select(`
          *,
          income_sources (*)
        `)
        .single();

      if (createError) {
        console.error('Error creating initial financial data:', createError);
        return null;
      }

      return newData;
    }

    return data;
  },

  async updateFinancialData(userId: string, data: {
    monthly_freedom_number: number;
    annual_freedom_number: number;
    current_savings: number;
  }): Promise<FinancialData | null> {
    const { data: updatedData, error } = await supabase
      .from('financial_data')
      .upsert({
        user_id: userId,
        ...data,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating financial data:', error);
      return null;
    }

    return updatedData;
  },

  async addIncomeSource(userId: string, data: {
    name: string;
    amount: number;
    is_passive: boolean;
  }): Promise<IncomeSource | null> {
    const { data: incomeSource, error } = await supabase
      .from('income_sources')
      .insert({
        user_id: userId,
        ...data
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding income source:', error);
      return null;
    }

    return incomeSource;
  },

  async updateIncomeSource(id: string, data: {
    name?: string;
    amount?: number;
    is_passive?: boolean;
  }): Promise<IncomeSource | null> {
    const { data: updatedSource, error } = await supabase
      .from('income_sources')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating income source:', error);
      return null;
    }

    return updatedSource;
  },

  async deleteIncomeSource(id: string): Promise<void> {
    const { error } = await supabase
      .from('income_sources')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting income source:', error);
      throw error;
    }
  },

  async getMonthlyExpenses(userId: string): Promise<MonthlyExpense[]> {
    const { data, error } = await supabase
      .from('monthly_expenses')
      .select('*')
      .eq('user_id', userId)
      .order('month', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching monthly expenses:', error);
      return [];
    }

    return data;
  },

  async updateMonthlyExpense(userId: string, month: string, amount: number): Promise<MonthlyExpense | null> {
    const { data: updatedExpense, error } = await supabase
      .from('monthly_expenses')
      .upsert({
        user_id: userId,
        month,
        amount,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating monthly expense:', error);
      return null;
    }

    return updatedExpense;
  },

  async getIncomeSourcesByType(userId: string, isPassive: boolean): Promise<IncomeSource[]> {
    const { data, error } = await supabase
      .from('income_sources')
      .select('*')
      .eq('user_id', userId)
      .eq('is_passive', isPassive)
      .order('amount', { ascending: false });

    if (error) {
      console.error('Error fetching income sources:', error);
      return [];
    }

    return data;
  },

  async calculateTotalIncome(userId: string): Promise<{ activeTotal: number; passiveTotal: number }> {
    const { data: sources, error } = await supabase
      .from('income_sources')
      .select('amount, is_passive')
      .eq('user_id', userId);

    if (error) {
      console.error('Error calculating total income:', error);
      return { activeTotal: 0, passiveTotal: 0 };
    }

    return sources.reduce((totals, source) => ({
      activeTotal: totals.activeTotal + (source.is_passive ? 0 : source.amount),
      passiveTotal: totals.passiveTotal + (source.is_passive ? source.amount : 0)
    }), { activeTotal: 0, passiveTotal: 0 });
  }
};