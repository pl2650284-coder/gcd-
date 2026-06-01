'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, Camera, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import SoundButton from '@/components/SoundButton';
import Section from '@/components/Section';

// 示例数据
const COUPLE_DATA = {
  startDate: '2023-02-14',
  partner1: '小明',
  partner2: '小红',
  heroImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200',
};

const STATS = [
  { icon: Calendar, label: '一起走过', value: '365' },
  { icon: MapPin, label: '去过城市', value: '12' },
  { icon: Camera, label: '照片回忆', value: '1234' },
  { icon: MessageSquare, label: '聊天消息', value: '9999+' },
];

export default function Home() {
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const start = new Date(COUPLE_DATA.startDate);
    const today = new Date();
    const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    setDaysTogether(diff);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 left-1/2 -translate-x-1/2"
            >
              <Heart className="w-8 h-8 text-accent" fill="currentColor" />
            </motion.div>

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden shadow-2xl">
              <img
                src={COUPLE_DATA.heroImage}
                alt="Couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight"
          >
            {COUPLE_DATA.partner1} & {COUPLE_DATA.partner2}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-2"
          >
            <div className="text-6xl sm:text-8xl font-light tracking-tighter text-accent">
              {daysTogether}
            </div>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400">
              我们相爱的天数
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              从 {COUPLE_DATA.startDate} 开始
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Sections */}
      <Section className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">我们的博物馆</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              记录每一个珍贵的瞬间，让爱永恒
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '恋爱时间轴',
                desc: '按时间顺序记录我们的每一个重要时刻',
                image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae12b?w=800',
              },
              {
                title: '恋爱地图',
                desc: '标记我们一起去过的每一个地方',
                image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
              },
              {
                title: '照片博物馆',
                desc: '收藏属于我们的每一张照片',
                image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
              },
              {
                title: '聊天记录分析',
                desc: '发现我们之间的有趣数据',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 dark:text-gray-400">
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-accent" fill="currentColor" />
        </p>
        <p className="mt-2 text-sm">© 2024 Love Museum. Forever together.</p>
      </footer>

      <SoundButton />
    </div>
  );
}
