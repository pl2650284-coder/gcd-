'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { useCouple } from './couple';
import { Database } from '@/types/supabase';

// ========== 时间轴 ==========
type TimelineEvent = Database['public']['Tables']['timeline_events']['Row'];
type TimelineEventInsert = Database['public']['Tables']['timeline_events']['Insert'];
type TimelineEventUpdate = Database['public']['Tables']['timeline_events']['Update'];

export function useTimelineEvents() {
  const { couple } = useCouple();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  const fetchEvents = async () => {
    if (!couple || !configured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase!
        .from('timeline_events')
        .select('*')
        .eq('couple_id', couple.id)
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event: Omit<TimelineEventInsert, 'couple_id'>) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { data, error } = await supabase!.from('timeline_events').insert([{ ...event, couple_id: couple.id }]).select().single();
    if (error) throw error;
    setEvents(prev => [data, ...prev]);
    return data;
  };

  const updateEvent = async (id: string, updates: TimelineEventUpdate) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { data, error } = await supabase!.from('timeline_events').update(updates).eq('id', id).eq('couple_id', couple.id).select().single();
    if (error) throw error;
    setEvents(prev => prev.map(e => e.id === id ? data : e));
    return data;
  };

  const deleteEvent = async (id: string) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { error } = await supabase!.from('timeline_events').delete().eq('id', id).eq('couple_id', couple.id);
    if (error) throw error;
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  useEffect(() => { fetchEvents(); }, [couple, configured]);

  return { events, loading, error, addEvent, updateEvent, deleteEvent, refresh: fetchEvents };
}

// ========== 愿望清单 ==========
type WishlistItem = Database['public']['Tables']['wishlists']['Row'];
type WishlistItemInsert = Database['public']['Tables']['wishlists']['Insert'];
type WishlistItemUpdate = Database['public']['Tables']['wishlists']['Update'];

export function useWishlist() {
  const { couple } = useCouple();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const configured = isSupabaseConfigured();

  const fetchItems = async () => {
    if (!couple || !configured) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase!.from('wishlists').select('*').eq('couple_id', couple.id).order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const addItem = async (item: Omit<WishlistItemInsert, 'couple_id'>) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { data, error } = await supabase!.from('wishlists').insert([{ ...item, couple_id: couple.id }]).select().single();
    if (error) throw error;
    setItems(prev => [data, ...prev]);
    return data;
  };

  const updateItem = async (id: string, updates: WishlistItemUpdate) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { data, error } = await supabase!.from('wishlists').update(updates).eq('id', id).eq('couple_id', couple.id).select().single();
    if (error) throw error;
    setItems(prev => prev.map(i => i.id === id ? data : i));
    return data;
  };

  const deleteItem = async (id: string) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { error } = await supabase!.from('wishlists').delete().eq('id', id).eq('couple_id', couple.id);
    if (error) throw error;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => { fetchItems(); }, [couple, configured]);

  return { items, loading, addItem, updateItem, deleteItem, refresh: fetchItems };
}

// ========== 照片 ==========
type Photo = Database['public']['Tables']['photos']['Row'];
type PhotoInsert = Database['public']['Tables']['photos']['Insert'];

export function usePhotos() {
  const { couple } = useCouple();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const configured = isSupabaseConfigured();

  const fetchPhotos = async () => {
    if (!couple || !configured) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase!.from('photos').select('*').eq('couple_id', couple.id).order('created_at', { ascending: false });
      if (error) throw error;
      setPhotos(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const addPhoto = async (photo: Omit<PhotoInsert, 'couple_id'>) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { data, error } = await supabase!.from('photos').insert([{ ...photo, couple_id: couple.id }]).select().single();
    if (error) throw error;
    setPhotos(prev => [data, ...prev]);
    return data;
  };

  useEffect(() => { fetchPhotos(); }, [couple, configured]);

  return { photos, loading, addPhoto, refresh: fetchPhotos };
}

// ========== 时光胶囊 ==========
type TimeCapsule = Database['public']['Tables']['time_capsules']['Row'];
type TimeCapsuleInsert = Database['public']['Tables']['time_capsules']['Insert'];

export function useTimeCapsules() {
  const { couple } = useCouple();
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [loading, setLoading] = useState(true);

  const configured = isSupabaseConfigured();

  const fetchCapsules = async () => {
    if (!couple || !configured) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase!.from('time_capsules').select('*').eq('couple_id', couple.id).order('created_at', { ascending: false });
      if (error) throw error;
      setCapsules(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const addCapsule = async (capsule: Omit<TimeCapsuleInsert, 'couple_id'>) => {
    if (!couple || !configured) throw new Error('No couple or not configured');
    const { data, error } = await supabase!.from('time_capsules').insert([{ ...capsule, couple_id: couple.id }]).select().single();
    if (error) throw error;
    setCapsules(prev => [data, ...prev]);
    return data;
  };

  useEffect(() => { fetchCapsules(); }, [couple, configured]);

  return { capsules, loading, addCapsule, refresh: fetchCapsules };
}
