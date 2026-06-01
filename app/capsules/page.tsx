'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Clock, Lock, Unlock, Mail, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例数据
const CAPSULES = [
  {
    id: '1',
    title: '给一年后的我们',
    content: '希望现在的我们已经实现了那些愿望...',
    createdAt: '2023-02-14',
    unlockDate: '2024-02-14',
    isUnlocked: true,
  },
  {
    id: '2',
    title: '给两周年的我们',
    content: '不知道那时候的我们会是什么样子呢？',
    createdAt: '2023-06-01',
    unlockDate: '2025-02-14',
    isUnlocked: false,
  },
  {
    id: '3',
    title: '给五年后的我们',
    content: '这是写给未来的一封信...',
    createdAt: '2023-02-14',
    unlockDate: '2028-02-14',
    isUnlocked: false,
  },
];

export default function CapsulesPage() {
  const [capsules, setCapsules] = useState(CAPSULES);
  const [selectedCapsule, setSelectedCapsule] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block mb-4"
              >
                <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
                  <Sparkles className="w-12 h-12 text-accent" />
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold mb-4"
              >
                时光胶囊
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400"
              >
                给未来的我们写一封信
              </motion.p>
            </div>

            {/* Add Capsule Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <button className="w-full py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-colors flex flex-col items-center justify-center gap-2">
                <Plus className="w-8 h-8" />
                <span>写一封给未来的信</span>
              </button>
            </motion.div>

            {/* Capsules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capsules.map((capsule, index) => (
                <motion.div
                  key={capsule.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => capsule.isUnlocked && setSelectedCapsule(capsule.id)}
                  className={`relative overflow-hidden rounded-2xl shadow-lg transition-all ${
                    capsule.isUnlocked
                      ? 'bg-white dark:bg-gray-800 hover:shadow-xl cursor-pointer'
                      : 'bg-gray-100 dark:bg-gray-800/50'
                  }`}
                >
                  {/* Decorative top */}
                  <div className={`h-2 ${
                    capsule.isUnlocked
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`} />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      {capsule.isUnlocked ? (
                        <Unlock className="w-8 h-8 text-green-500" />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-400" />
                      )}
                      <Mail className="w-8 h-8 text-accent/30" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{capsule.title}</h3>

                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        创建于 {capsule.createdAt}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {capsule.isUnlocked ? '已解锁' : `解锁于 ${capsule.unlockDate}`}
                      </p>
                    </div>

                    {capsule.isUnlocked && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-accent">点击查看内容</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Capsule Modal */}
      <AnimatePresence>
        {selectedCapsule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedCapsule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full overflow-hidden"
            >
              {(() => {
                const capsule = capsules.find((c) => c.id === selectedCapsule);
                if (!capsule) return null;

                return (
                  <>
                    <div className="p-8 text-center border-b border-gray-200 dark:border-gray-700">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
                      <h2 className="text-2xl font-bold mb-2">{capsule.title}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {capsule.createdAt} · 写给 {capsule.unlockDate} 的我们
                      </p>
                    </div>
                    <div className="p-8">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">
                          {capsule.content}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setSelectedCapsule(null)}
                        className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-90 transition-opacity"
                      >
                        关闭
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
