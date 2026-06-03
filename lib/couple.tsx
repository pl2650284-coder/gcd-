'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { useAuth } from './auth';
import { Database } from '@/types/supabase';

type Couple = Database['public']['Tables']['couples']['Row'];

type CoupleContextType = {
  couple: Couple | null;
  loading: boolean;
  createCouple: (data: { partner1Name: string; partner2Name: string; startDate: string; heroImageUrl?: string }) => Promise<{ error: any | null; success: boolean }>;
  refreshCouple: () => Promise<void>;
};

const CoupleContext = createContext<CoupleContextType | undefined>(undefined);

export function CoupleProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading, isConfigured } = useAuth();
  const [couple, setCouple] = useState<Couple | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCouple = async (userId: string) => {
    if (!isConfigured) return;
    try {
      const { data, error } = await supabase!
        .from('couples')
        .select('*')
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching couple:', error);
        return;
      }
      setCouple(data && data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error('Error fetching couple:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCouple = async () => {
    if (!user || !isConfigured) return;
    setLoading(true);
    await fetchCouple(user.id);
  };

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    if (authLoading) return;

    if (!user) {
      setCouple(null);
      setLoading(false);
      return;
    }

    fetchCouple(user.id);
  }, [user, authLoading, isConfigured]);

  const createCouple = async (data: {
    partner1Name: string;
    partner2Name: string;
    startDate: string;
    heroImageUrl?: string;
  }) => {
    console.log('createCouple 被调用, user:', user);
    if (!user || !isConfigured) return { error: new Error('No user or not configured'), success: false };

    try {
      console.log('插入数据:', {
        user1_id: user.id,
        user2_id: null,
        partner1_name: data.partner1Name,
        partner2_name: data.partner2Name,
        start_date: data.startDate,
        hero_image_url: data.heroImageUrl || null,
      });
      const { error } = await supabase!.from('couples').insert({
        user1_id: user.id,
        user2_id: null,
        partner1_name: data.partner1Name,
        partner2_name: data.partner2Name,
        start_date: data.startDate,
        hero_image_url: data.heroImageUrl || null,
      });

      if (error) {
        console.error('插入错误:', error);
        throw error;
      }
      console.log('插入成功，刷新 couple');
      await refreshCouple();
      return { error: null, success: true };
    } catch (error) {
      console.error('createCouple 错误:', error);
      return { error, success: false };
    }
  };

  return (
    <CoupleContext.Provider value={{ couple, loading, createCouple, refreshCouple }}>
      {children}
    </CoupleContext.Provider>
  );
}

export function useCouple() {
  const context = useContext(CoupleContext);
  if (!context) {
    throw new Error('useCouple must be used within a CoupleProvider');
  }
  return context;
}
