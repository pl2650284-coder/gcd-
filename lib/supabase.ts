'use client';

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 安全地创建客户端，如果未配置则返回 null
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url-here') {
    console.warn('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();

// 检查 Supabase 是否配置
export function isSupabaseConfigured() {
  return !!supabase;
}
