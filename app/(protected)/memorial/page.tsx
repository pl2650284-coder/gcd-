'use client';

import { motion } from 'framer-motion';
import { Archive, Mail, Gift, Ticket, Clock, Sparkles, Calendar, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

export default function MemorialPage() {
  const modules = [
    { href: '/memorial/letters', label: '信件馆', description: '收藏每一封情书和手写信', icon: Mail, color: 'from-pink-500 to-rose-500' },
    { href: '/memorial/gifts', label: '礼物馆', description: '记录每份礼物背后的故事', icon: Gift, color: 'from-violet-500 to-purple-500' },
    { href: '/memorial/tickets', label: '门票馆', description: '保存每一张票据', icon: Ticket, color: 'from-amber-500 to-orange-500' },
    { href: '/capsules', label: '时光胶囊', description: '给未来的礼物', icon: Clock, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-6xl mx-auto">
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

            {/* Modules Grid */}
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
                        <h3 className="text-2xl font-bold mb-2">{module.label}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {module.description}
                        </p>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          进入
                          <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
