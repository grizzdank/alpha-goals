
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const fetchProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
