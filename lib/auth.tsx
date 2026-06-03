'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any | null; success: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null; success: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    // 获取当前会话
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase!.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // 监听认证状态变化
    const { data: { subscription } } = supabase!.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [isConfigured]);

  const signUp = async (email: string, password: string) => {
    if (!isConfigured) return { error: new Error('Supabase not configured'), success: false };
    try {
      const { error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined,
          data: {
            email_confirmed: true
          }
        }
      });
      if (error) throw error;
      return { error: null, success: true };
    } catch (error: any) {
      // 如果是频率限制，尝试直接登录（假设账号已存在）
      if (error.message?.includes('rate limit')) {
        const { error: signInError } = await supabase!.auth.signInWithPassword({ email, password });
        if (!signInError) {
          return { error: null, success: true };
        }
      }
      return { error, success: false };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) return { error: new Error('Supabase not configured'), success: false };
    try {
      const { error } = await supabase!.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null, success: true };
    } catch (error) {
      return { error, success: false };
    }
  };

  const signOut = async () => {
    if (!isConfigured) return;
    await supabase!.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isConfigured, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
