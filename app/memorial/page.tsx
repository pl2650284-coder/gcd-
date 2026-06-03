'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Archive,
  Mail,
  Gift,
  Ticket,
  Clock,
  Sparkles,
  Grid3X3,
  Calendar,
  Building2,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';
import { MemorialLetter, MemorialGift, MemorialTicket, MemorialTimeBox } from '@/types';

// Initial sample data
const INITIAL_LETTERS: MemorialLetter[] = [
  {
    id: generateId(),
    title: '第一封情书',
    author: '小明',
    content: '亲爱的小红，第一次见到你的时候...',
    createdAt: '2023-02-10',
    writtenAt: '2023-02-10',
  },
];

const INITIAL_GIFTS: MemorialGift[] = [
  {
    id: generateId(),
    name: '第一束花',
    giver: '小明',
    receiver: '小红',
    receivedAt: '2023-02-14',
    story: '第一次约会时送的玫瑰花，虽然有点紧张但你很开心',
    sentimentScore: 5,
    imageUrl: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
  },
];

const INITIAL_TICKETS: MemorialTicket[] = [
  {
    id: generateId(),
    title: '第一次一起看电影',
    type: 'movie',
    date: '2023-02-18',
    location: '万达影城',
    notes: '看的是一部爱情片',
    createdAt: '2023-02-18',
  },
];

const INITIAL_TIMEBOXES: MemorialTimeBox[] = [
  {
    id: generateId(),
    title: '给一周年的我们',
    description: '希望那时我们依然相爱',
    unlockDate: '2024-02-14',
    isUnlocked: true,
    createdAt: '2023-02-14',
    images: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    ],
  },
];

type ViewMode = 'grid' | 'timeline' | 'gallery';

export default function MemorialPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [letters] = useLocalStorage<MemorialLetter[]>('memorial_letters', INITIAL_LETTERS);
  const [gifts] = useLocalStorage<MemorialGift[]>('memorial_gifts', INITIAL_GIFTS);
  const [tickets] = useLocalStorage<MemorialTicket[]>('memorial_tickets', INITIAL_TICKETS);
  const [timeboxes] = useLocalStorage<MemorialTimeBox[]>('memorial_timeboxes', INITIAL_TIMEBOXES);

  const totalItems = letters.length + gifts.length + tickets.length + timeboxes.length;
  const allItems = [...letters, ...gifts, ...tickets, ...timeboxes];

  const sortedItems = [...allItems].sort((a, b) => {
    const dateA = 'writtenAt' in a ? a.writtenAt : 'receivedAt' in a ? a.receivedAt : 'date' in a ? a.date : a.createdAt;
    const dateB = 'writtenAt' in b ? b.writtenAt : 'receivedAt' in b ? b.receivedAt : 'date' in b ? b.date : b.createdAt;
    return new Date(dateB || b.createdAt).getTime() - new Date(dateA || a.createdAt).getTime();
  });

  const oldestItem = sortedItems[sortedItems.length - 1];
  const newestItem = sortedItems[0];

  const modules = [
    {
      href: '/memorial/letters',
      title: '信件馆',
      description: '收藏每一封情书和手写信',
      icon: Mail,
      count: letters.length,
      color: 'from-pink-500 to-rose-500',
    },
    {
      href: '/memorial/gifts',
      title: '礼物馆',
      description: '记录每份礼物背后的故事',
      icon: Gift,
      count: gifts.length,
      color: 'from-violet-500 to-purple-500',
    },
    {
      href: '/memorial/tickets',
      title: '门票馆',
      description: '保存每一张票据',
      icon: Ticket,
      count: tickets.length,
      color: 'from-amber-500 to-orange-500',
    },
    {
      href: '/memorial/timeboxes',
      title: '时光宝盒',
      description: '给未来的礼物',
      icon: Clock,
      count: timeboxes.length,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block mb-6"
              >
                <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
                  <Archive className="w-12 h-12 text-accent" />
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold mb-4"
              >
                纪念馆
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                收藏我们共同的回忆，每一件物品都有它的故事
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold">{totalItems}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">纪念藏品</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-xl font-bold">
                  {oldestItem ? new Date('createdAt' in oldestItem ? oldestItem.createdAt : '').toLocaleDateString('zh-CN') : '-'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">最早收藏</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-xl font-bold">
                  {newestItem ? new Date('createdAt' in newestItem ? newestItem.createdAt : '').toLocaleDateString('zh-CN') : '-'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">最近添加</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <Building2 className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">展馆</div>
              </div>
            </motion.div>

            {/* View Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-2 mb-12"
            >
              {[
                { mode: 'grid' as ViewMode, icon: Grid3X3, label: '网格' },
                { mode: 'timeline' as ViewMode, icon: Calendar, label: '时间轴' },
                { mode: 'gallery' as ViewMode, icon: Building2, label: '展厅' },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    viewMode === mode
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </motion.div>

            {/* Modules Grid - Gallery View */}
            {viewMode === 'grid' && (
              <div className="grid md:grid-cols-2 gap-8">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={module.href}>
                      <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                        <div className="p-8">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                            <module.icon className="w-8 h-8" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {module.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {module.count} 件藏品
                            </span>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2" />
                <div className="space-y-8">
                  {sortedItems.map((item, index) => {
                    const isLetter = 'author' in item;
                    const isGift = 'giver' in item;
                    const isTicket = 'type' in item;
                    const isTimebox = 'unlockDate' in item;

                    const title = isLetter ? item.title : isGift ? item.name : isTicket ? item.title : item.title;
                    const date = isLetter ? item.writtenAt : isGift ? item.receivedAt : isTicket ? item.date : item.createdAt;
                    const icon = isLetter ? Mail : isGift ? Gift : isTicket ? Ticket : Clock;
                    const color = isLetter ? 'from-pink-500 to-rose-500' : isGift ? 'from-violet-500 to-purple-500' : isTicket ? 'from-amber-500 to-orange-500' : 'from-emerald-500 to-teal-500';
                    const Icon = icon;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        <div className="flex-1 md:pr-12 md:pl-0 pl-16">
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg group hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {date ? new Date(date).toLocaleDateString('zh-CN') : '-'}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                            {isGift && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.story}</p>}
                            {isTimebox && item.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>}
                          </div>
                        </div>
                        <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${color} border-4 border-white dark:border-gray-900 z-10`} />
                        <div className="flex-1 hidden md:block" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Gallery View */}
            {viewMode === 'gallery' && (
              <div className="grid md:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={module.href}>
                      <div className="group relative aspect-square overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800">
                        <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                            <module.icon className="w-10 h-10" />
                          </div>
                          <h3 className="text-xl font-bold text-center">{module.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{module.count} 件藏品</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
