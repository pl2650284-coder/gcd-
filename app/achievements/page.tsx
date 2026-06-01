'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例数据
const ACHIEVEMENTS = [
  {
    id: '1',
    title: '第一次约会',
    description: '我们的第一次约会',
    icon: <Heart className="w-8 h-8" />,
    unlocked: true,
    date: '2023-02-14',
  },
  {
    id: '2',
    title: '第一次旅行',
    description: '一起去了杭州',
    icon: <MapPin className="w-8 h-8" />,
    unlocked: true,
    date: '2023-05-20',
  },
  {
    id: '3',
    title: '连续聊天30天',
    description: '我们连续聊了30天',
    icon: <Sparkles className="w-8 h-8" />,
    unlocked: true,
    date: '2023-03-15',
  },
  {
    id: '4',
    title: '连续聊天100天',
    description: '坚持就是胜利',
    icon: <Star className="w-8 h-8" />,
    unlocked: true,
    date: '2023-05-24',
  },
  {
    id: '5',
    title: '恋爱一周年',
    description: '一年的美好时光',
    icon: <Trophy className="w-8 h-8" />,
    unlocked: true,
    date: '2024-02-14',
  },
  {
    id: '6',
    title: '一起看海',
    description: '在海边看日落',
    icon: <MapPin className="w-8 h-8" />,
    unlocked: true,
    date: '2023-07-10',
  },
  {
    id: '7',
    title: '第一次跨年',
    description: '一起迎接新年',
    icon: <Calendar className="w-8 h-8" />,
    unlocked: true,
    date: '2023-12-31',
  },
  {
    id: '8',
    title: '恋爱两周年',
    description: '期待中...',
    icon: <Trophy className="w-8 h-8" />,
    unlocked: false,
    date: null,
  },
];

export default function AchievementsPage() {
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold mb-4"
              >
                成就系统
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                {unlockedCount}/{ACHIEVEMENTS.length} 成就已解锁
              </motion.p>
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full"
                />
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl shadow-lg transition-all ${
                    achievement.unlocked
                      ? 'bg-white dark:bg-gray-800 hover:shadow-xl'
                      : 'bg-gray-100 dark:bg-gray-800/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-accent to-orange-400 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {achievement.date}
                        </p>
                      )}
                    </div>
                    {achievement.unlocked ? (
                      <Sparkles className="w-6 h-6 text-accent" fill="currentColor" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
