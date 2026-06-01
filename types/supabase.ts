export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      couples: {
        Row: {
          id: string;
          user1_id: string;
          user2_id: string | null;
          start_date: string;
          partner1_name: string;
          partner2_name: string;
          hero_image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user1_id: string;
          user2_id?: string | null;
          start_date: string;
          partner1_name: string;
          partner2_name: string;
          hero_image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user1_id?: string;
          user2_id?: string | null;
          start_date?: string;
          partner1_name?: string;
          partner2_name?: string;
          hero_image_url?: string | null;
          created_at?: string;
        };
      };
      timeline_events: {
        Row: {
          id: string;
          couple_id: string;
          title: string;
          description: string | null;
          event_date: string;
          image_url: string | null;
          video_url: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          title: string;
          description?: string | null;
          event_date: string;
          image_url?: string | null;
          video_url?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          title?: string;
          description?: string | null;
          event_date?: string;
          image_url?: string | null;
          video_url?: string | null;
          location?: string | null;
          created_at?: string;
        };
      };
      photos: {
        Row: {
          id: string;
          couple_id: string;
          image_url: string;
          thumbnail_url: string | null;
          title: string | null;
          description: string | null;
          taken_at: string | null;
          location: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          image_url: string;
          thumbnail_url?: string | null;
          title?: string | null;
          description?: string | null;
          taken_at?: string | null;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          image_url?: string;
          thumbnail_url?: string | null;
          title?: string | null;
          description?: string | null;
          taken_at?: string | null;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          couple_id: string;
          name: string;
          address: string | null;
          latitude: number;
          longitude: number;
          visit_date: string | null;
          description: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          name: string;
          address?: string | null;
          latitude: number;
          longitude: number;
          visit_date?: string | null;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          name?: string;
          address?: string | null;
          latitude?: number;
          longitude?: number;
          visit_date?: string | null;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          couple_id: string;
          sender: string;
          content: string;
          sent_at: string;
          is_emoji: boolean;
          platform: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          sender: string;
          content: string;
          sent_at: string;
          is_emoji?: boolean;
          platform?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          sender?: string;
          content?: string;
          sent_at?: string;
          is_emoji?: boolean;
          platform?: string | null;
          created_at?: string;
        };
      };
      chat_statistics: {
        Row: {
          id: string;
          couple_id: string;
          total_messages: number;
          total_words: number;
          chat_days: number;
          consecutive_days: number;
          max_messages_day: string | null;
          max_messages_count: number;
          latest_chat_time: string | null;
          earliest_chat_time: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          total_messages?: number;
          total_words?: number;
          chat_days?: number;
          consecutive_days?: number;
          max_messages_day?: string | null;
          max_messages_count?: number;
          latest_chat_time?: string | null;
          earliest_chat_time?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          total_messages?: number;
          total_words?: number;
          chat_days?: number;
          consecutive_days?: number;
          max_messages_day?: string | null;
          max_messages_count?: number;
          latest_chat_time?: string | null;
          earliest_chat_time?: string | null;
          created_at?: string;
        };
      };
      annual_reports: {
        Row: {
          id: string;
          couple_id: string;
          year: number;
          messages_count: number;
          photos_count: number;
          events_count: number;
          trips_count: number;
          top_keyword: string | null;
          ai_summary: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          year: number;
          messages_count?: number;
          photos_count?: number;
          events_count?: number;
          trips_count?: number;
          top_keyword?: string | null;
          ai_summary?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          year?: number;
          messages_count?: number;
          photos_count?: number;
          events_count?: number;
          trips_count?: number;
          top_keyword?: string | null;
          ai_summary?: string | null;
          created_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          couple_id: string;
          title: string;
          description: string | null;
          icon: string | null;
          unlocked_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          title: string;
          description?: string | null;
          icon?: string | null;
          unlocked_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          title?: string;
          description?: string | null;
          icon?: string | null;
          unlocked_at?: string | null;
          created_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          couple_id: string;
          title: string;
          description: string | null;
          completed: boolean;
          completed_at: string | null;
          completion_image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          title: string;
          description?: string | null;
          completed?: boolean;
          completed_at?: string | null;
          completion_image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          title?: string;
          description?: string | null;
          completed?: boolean;
          completed_at?: string | null;
          completion_image_url?: string | null;
          created_at?: string;
        };
      };
      time_capsules: {
        Row: {
          id: string;
          couple_id: string;
          title: string;
          content: string;
          unlock_date: string;
          is_unlocked: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          couple_id: string;
          title: string;
          content: string;
          unlock_date: string;
          is_unlocked?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          couple_id?: string;
          title?: string;
          content?: string;
          unlock_date?: string;
          is_unlocked?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
