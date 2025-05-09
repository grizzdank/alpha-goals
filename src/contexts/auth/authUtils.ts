import { AuthError, User } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/postgrest-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const signUp = async (email: string, password: string, userData?: any) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    
    if (error) throw error;
    
    return { error: null };
  } catch (error: any) {
    toast({
      title: 'Sign up failed',
      description: error.message,
      variant: 'destructive',
    });
    return { error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return { error: null };
  } catch (error: any) {
    toast({
      title: 'Sign in failed',
      description: error.message,
      variant: 'destructive',
    });
    return { error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`,
      },
    });
    
    if (error) throw error;
    
    return { error: null };
  } catch (error: any) {
    toast({
      title: 'Google sign in failed',
      description: error.message,
      variant: 'destructive',
    });
    return { error };
  }
};

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};

export const fetchProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const createProfile = async (user: User, userData?: Partial<Profile>): Promise<{ error: PostgrestError | null }> => {
  const { error } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id,
        email: user.email,
        ...userData
      }
    ]);
  return { error };
};

export const getProfile = async (userId: string): Promise<{ data: Profile | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<{ error: PostgrestError | null }> => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  return { error };
};

export const deleteProfile = async (userId: string): Promise<{ error: PostgrestError | null }> => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  return { error };
};

export const requestPasswordReset = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Optional: specify a URL to redirect to after the user clicks the password reset link
      // redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) throw error;

    toast({
      title: 'Check your email',
      description: 'If an account exists for this email, a password reset link has been sent.',
    });
    return { error: null };
  } catch (error: any) {
    console.error('Error requesting password reset:', error);
    toast({
      title: 'Password Reset Failed',
      description: error.message || 'Could not send password reset email. Please try again.',
      variant: 'destructive',
    });
    return { error };
  }
};
