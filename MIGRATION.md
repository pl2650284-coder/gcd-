# Love Museum 迁移指南

## 阶段一已完成 ✅
- Auth 认证系统（登录/注册）
- 情侣空间 Onboarding 流程
- 路由保护
- 新的 Navbar 带有用户菜单

## 阶段二进行中 🚧

### 需要的 Supabase 设置

1. 在 Supabase 中创建项目
2. 设置数据库表结构（参考 types/supabase.ts）
3. 配置 Storage 存储
4. 设置 Row Level Security (RLS) 策略

### 数据库表结构

```sql
-- 用户表（由 Supabase Auth 自动管理）

-- 情侣空间表
create table couples (
  id uuid default gen_random_uuid() primary key,
  user1_id uuid references auth.users(id) not null,
  user2_id uuid references auth.users(id),
  start_date date not null,
  partner1_name text not null,
  partner2_name text not null,
  hero_image_url text,
  created_at timestamptz default now()
);

-- 时间轴事件表
create table timeline_events (
  id uuid default gen_random_uuid() primary key,
  couple_id uuid references couples(id) not null,
  title text not null,
  description text,
  event_date date not null,
  image_url text,
  video_url text,
  location text,
  created_at timestamptz default now()
);

-- 开启 RLS
alter table couples enable row level security;
alter table timeline_events enable row level security;

-- RLS 策略示例
create policy "Users can view their couple data"
  on couples
  for select
  using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "Users can create their couple"
  on couples
  for insert
  with check (auth.uid() = user1_id);

create policy "Users can view their timeline events"
  on timeline_events
  for select
  using (exists (
    select 1 from couples
    where couples.id = timeline_events.couple_id
    and (couples.user1_id = auth.uid() or couples.user2_id = auth.uid())
  ));

create policy "Users can create their timeline events"
  on timeline_events
  for insert
  with check (exists (
    select 1 from couples
    where couples.id = timeline_events.couple_id
    and (couples.user1_id = auth.uid() or couples.user2_id = auth.uid())
  ));

create policy "Users can update their timeline events"
  on timeline_events
  for update
  using (exists (
    select 1 from couples
    where couples.id = timeline_events.couple_id
    and (couples.user1_id = auth.uid() or couples.user2_id = auth.uid())
  ));

create policy "Users can delete their timeline events"
  on timeline_events
  for delete
  using (exists (
    select 1 from couples
    where couples.id = timeline_events.couple_id
    and (couples.user1_id = auth.uid() or couples.user2_id = auth.uid())
  ));
```

### 剩余页面迁移

以下页面还需要迁移到 Supabase：
- `/map` - 地图足迹
- `/photos` - 照片博物馆
- `/memorial/*` - 纪念馆（信件、礼物、门票等）
- `/chat` - 聊天分析
- `/achievements` - 成就系统
- `/wishlist` - 愿望清单
- `/capsules` - 时光胶囊
- `/report` - 年度报告

每个页面需要创建对应的 data hook（参考 useTimelineEvents）。
