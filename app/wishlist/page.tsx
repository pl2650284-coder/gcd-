'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Calendar, MapPin, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例数据
const WISHES = [
  {
    id: '1',
    title: '一起去看极光',
    description: '希望能一起去北极看极光',
    completed: false,
    completedAt: null,
    image: null,
  },
  {
    id: '2',
    title: '一起养一只猫',
    description: '给它取名叫小橘',
    completed: true,
    completedAt: '2023-06-01',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
  },
  {
    id: '3',
    title: '一起去日本',
    description: '看樱花、吃寿司、泡温泉',
    completed: false,
    completedAt: null,
    image: null,
  },
  {
    id: '4',
    title: '一起做一顿大餐',
    description: '两个人一起下厨房',
    completed: true,
    completedAt: '2023-04-15',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400',
  },
  {
    id: '5',
    title: '一起看日出',
    description: '在山顶看日出',
    completed: true,
    completedAt: '2023-08-20',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400',
  },
  {
    id: '6',
    title: '一起坐热气球',
    description: '在空中看风景',
    completed: false,
    completedAt: null,
    image: null,
  },
];

export default function WishlistPage() {
  const [wishes, setWishes] = useState(WISHES);

  const completedCount = wishes.filter((w) => w.completed).length;
  const totalCount = wishes.length;

  const toggleWish = (id: string) => {
    setWishes(wishes.map((wish) =>
      wish.id === id
        ? {
            ...wish,
            completed: !wish.completed,
            completedAt: !wish.completed ? new Date().toISOString().split('T')[0] : null,
          }
        : wish
    ));
  };

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
                愿望清单
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                {completedCount}/{totalCount} 已完成
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
                  animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full"
                />
              </div>
            </motion.div>

            {/* Add Wish Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <button className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                添加新愿望
              </button>
            </motion.div>

            {/* Wishes List */}
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl shadow-lg transition-all ${
                    wish.completed
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleWish(wish.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {wish.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-accent transition-colors" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold mb-1 ${
                        wish.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                      }`}>
                        {wish.title}
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-400 mb-3 ${
                        wish.completed ? 'line-through' : ''
                      }`}>
                        {wish.description}
                      </p>

                      {wish.completed && wish.completedAt && (
                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mb-3">
                          <Calendar className="w-4 h-4" />
                          完成于 {wish.completedAt}
                        </p>
                      )}

                      {wish.completed && wish.image && (
                        <div className="rounded-xl overflow-hidden w-40">
                          <img
                            src={wish.image}
                            alt={wish.title}
                            className="w-full h-28 object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {wish.completed ? (
                      <div className="flex-shrink-0">
                        <Camera className="w-6 h-6 text-green-500" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        <MapPin className="w-6 h-6 text-gray-400" />
                      </div>
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
