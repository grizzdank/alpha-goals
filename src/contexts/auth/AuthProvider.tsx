import React, { createContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType } from './types';
import { signUp, signIn, signInWithGoogle, signOut, fetchProfile, requestPasswordReset } from './authUtils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider onAuthStateChange event:', event, 'session:', session);
        const currentEventUser = session?.user ?? null;
        
        setSession(session);
        setUser(currentEventUser);

        if (currentEventUser) {
          const refreshedProfile = await _refreshProfileInternal(currentEventUser.id);
          if (event === 'SIGNED_IN') {
            toast({
              title: 'Signed in successfully',
              description: `Welcome${refreshedProfile?.username ? ` ${refreshedProfile.username}` : ''}!`,
            });
            setLoading(false);
            console.log('AuthProvider: SIGNED_IN event processed, setLoading(false) CALLED. User:', currentEventUser?.id);
          } else if (event === 'USER_UPDATED') {
            setLoading(false);
          } else if (event === 'INITIAL_SESSION' && currentEventUser) {
            setLoading(false);
            console.log('AuthProvider: INITIAL_SESSION (with user) event processed, setLoading(false) CALLED. User:', currentEventUser?.id);
          }
        } else {
          setProfile(null);
          if (event === 'SIGNED_OUT') {
            toast({
              title: 'Signed out',
              description: 'You have been signed out.',
            });
            setLoading(false);
            console.log('AuthProvider: SIGNED_OUT event processed, setLoading(false) CALLED.');
          } else if (event === 'INITIAL_SESSION' && !currentEventUser) {
            setLoading(false);
            console.log('AuthProvider: INITIAL_SESSION (no user) event processed, setLoading(false) CALLED.');
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const _refreshProfileInternal = async (userId: string) => {
    console.log('AuthProvider: _refreshProfileInternal START for userId:', userId);
    if (!userId) {
      console.warn("_refreshProfileInternal called without a userId");
      setProfile(null);
      console.log('AuthProvider: _refreshProfileInternal END (no userId) - profile set to null');
      return null;
    }
    const data = await fetchProfile(userId);
    setProfile(data);
    console.log('AuthProvider: _refreshProfileInternal END for userId:', userId, 'Fetched profile:', data);
    return data;
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await _refreshProfileInternal(user.id);
    } else {
      console.warn("refreshProfile called but no user is available in state.");
      setProfile(null);
    }
  };

  console.log('AuthProvider rendering. Context Value - Loading:', loading, 'User:', user?.id);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        refreshProfile,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
