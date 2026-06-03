'use client';

import { supabase, isSupabaseConfigured } from './supabase';

// 上传文件到 Supabase Storage
export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase not configured');
  }

  // 生成唯一文件名
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  // 上传文件
  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // 获取公开 URL
  const { data } = supabase.storage
    .from('photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
