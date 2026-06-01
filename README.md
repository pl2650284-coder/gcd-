# Love Museum - 恋爱数字博物馆

一个高颜值、具有电影感的情侣恋爱纪念网站。

## 功能模块

### 1. 首页 Hero
- 双人照片展示
- 恋爱天数实时计算
- 背景粒子动画
- 背景音乐播放

### 2. 恋爱时间轴
- 按时间顺序展示重要事件
- 支持添加、编辑、删除事件
- 图片、视频、位置标记

### 3. 恋爱地图
- 地图标记去过的城市
- 展示旅行照片和回忆
- 统计数据展示

### 4. 照片博物馆
- 瀑布流照片展示
- 时间轴视图
- 年份和地点筛选
- 全屏查看

### 5. 聊天记录分析
- 支持 QQ、微信、JSON、TXT 导入
- 总消息数、总字数统计
- 年度/月度/星期/小时趋势图
- 高频词云
- 表情统计

### 6. 成就系统
- 预置恋爱成就
- 解锁状态展示
- 成就进度条

### 7. 愿望清单
- 添加愿望
- 标记完成
- 上传完成照片
- 完成率统计

### 8. 时光胶囊
- 给未来写信
- 设置解锁日期
- 到期自动开放

### 9. 年度报告
- 全屏滚动展示
- AI 总结
- 导出长图

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图表**: ECharts
- **数据库**: Supabase
- **部署**: Vercel

## 项目结构

```
love-museum/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 首页
│   ├── layout.tsx           # 根布局
│   ├── globals.css          # 全局样式
│   ├── timeline/            # 时间轴
│   ├── map/                 # 地图
│   ├── photos/              # 照片
│   ├── chat/                # 聊天分析
│   ├── achievements/        # 成就
│   ├── wishlist/            # 愿望清单
│   ├── capsules/            # 时光胶囊
│   └── report/              # 年度报告
├── components/              # React 组件
├── lib/                     # 工具函数
├── types/                   # TypeScript 类型
├── supabase/                # Supabase 迁移文件
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local` 并填入你的 Supabase 配置：

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. 设置 Supabase

1. 创建 Supabase 项目
2. 运行 `supabase/migrations/001_init.sql` 中的 SQL 创建数据表
3. 配置存储桶用于图片和视频上传

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 数据库设计

### users
用户表，存储用户信息

### couples
情侣信息表，包含双方姓名、开始日期等

### timeline_events
时间轴事件

### photos
照片信息

### locations
位置标记

### chat_messages
聊天消息记录

### chat_statistics
聊天统计数据

### annual_reports
年度报告

### achievements
成就系统

### wishlists
愿望清单

### time_capsules
时光胶囊

## 特色功能

### 动画效果
- Framer Motion 页面过渡
- 粒子背景动画
- 滚动视差效果
- 图片悬停放大

### 深色模式
- 完整的深色/浅色主题支持
- 系统主题自动检测
- 主题切换动画

### 响应式设计
- 移动端优先设计
- 适配各种屏幕尺寸
- 流畅的触控体验

## 部署

### Vercel 部署（推荐）

1. Fork 这个仓库
2. 在 Vercel 中导入项目
3. 设置环境变量
4. 部署完成

### 其他部署方式

```bash
npm run build
npm start
```

## 自定义配置

### 修改情侣信息

在 `app/page.tsx` 中修改 `COUPLE_DATA`：

```typescript
const COUPLE_DATA = {
  startDate: '2023-02-14',  // 你们的开始日期
  partner1: '小明',         // 一方名字
  partner2: '小红',         // 另一方名字
  heroImage: '...',         // 首页照片
};
```

### 添加背景音乐

将音乐文件放入 `public/` 目录，在 `components/SoundButton.tsx` 中配置。

## 待开发功能

- [ ] AI 恋爱故事生成
- [ ] AI 纪念视频生成
- [ ] 更多聊天记录导入格式
- [ ] 分享功能
- [ ] 打印功能
- [ ] 多语言支持

## 许可证

MIT License

## 致谢

感谢所有为这个项目提供灵感的情侣们 ❤️
