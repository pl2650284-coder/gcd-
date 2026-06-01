-- 创建 users 表
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 couples 表
CREATE TABLE IF NOT EXISTS couples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES users(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  partner1_name TEXT NOT NULL,
  partner2_name TEXT NOT NULL,
  hero_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 timeline_events 表
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  image_url TEXT,
  video_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 photos 表
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  taken_at TIMESTAMPTZ,
  location TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 locations 表
CREATE TABLE IF NOT EXISTS locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  visit_date DATE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 chat_messages 表
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL,
  is_emoji BOOLEAN DEFAULT FALSE,
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 chat_statistics 表
CREATE TABLE IF NOT EXISTS chat_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  total_messages INTEGER DEFAULT 0,
  total_words INTEGER DEFAULT 0,
  chat_days INTEGER DEFAULT 0,
  consecutive_days INTEGER DEFAULT 0,
  max_messages_day DATE,
  max_messages_count INTEGER DEFAULT 0,
  latest_chat_time TIME,
  earliest_chat_time TIME,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 annual_reports 表
CREATE TABLE IF NOT EXISTS annual_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  messages_count INTEGER DEFAULT 0,
  photos_count INTEGER DEFAULT 0,
  events_count INTEGER DEFAULT 0,
  trips_count INTEGER DEFAULT 0,
  top_keyword TEXT,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 achievements 表
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 wishlists 表
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  completion_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 time_capsules 表
CREATE TABLE IF NOT EXISTS time_capsules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  unlock_date DATE NOT NULL,
  is_unlocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_timeline_events_couple_id ON timeline_events(couple_id);
CREATE INDEX IF NOT EXISTS idx_photos_couple_id ON photos(couple_id);
CREATE INDEX IF NOT EXISTS idx_locations_couple_id ON locations(couple_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_couple_id ON chat_messages(couple_id);
CREATE INDEX IF NOT EXISTS idx_achievements_couple_id ON achievements(couple_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_couple_id ON wishlists(couple_id);
CREATE INDEX IF NOT EXISTS idx_time_capsules_couple_id ON time_capsules(couple_id);
