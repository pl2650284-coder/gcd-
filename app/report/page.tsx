'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MessageSquare, Camera, MapPin, Sparkles, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';

// 示例数据
const REPORT_DATA = {
  year: 2023,
  messagesCount: 12345,
  photosCount: 567,
  eventsCount: 24,
  tripsCount: 8,
  topKeyword: '想你',
  avgMessagesPerDay: 41,
  busiestDay: '2023-02-14',
  busiestDayMessages: 520,
  aiSummary: '这一年，我们一起度过了很多美好的时光。从第一次见面到一周年纪念，每一个瞬间都值得被记住。希望未来的我们，能继续这样幸福下去。',
};

export default function ReportPage() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const sections = [
    {
      icon: Calendar,
      title: `${REPORT_DATA.year} 年度总结`,
      subtitle: '我们一起走过的这一年',
    },
    {
      icon: MessageSquare,
      title: `${REPORT_DATA.messagesCount.toLocaleString()} 条消息`,
      subtitle: `平均每天 ${REPORT_DATA.avgMessagesPerDay} 条`,
      detail: `聊天最多的一天是 ${REPORT_DATA.busiestDay}，发了 ${REPORT_DATA.busiestDayMessages} 条消息`,
    },
    {
      icon: Camera,
      title: `${REPORT_DATA.photosCount} 张照片`,
      subtitle: '每个瞬间都值得被记录',
    },
    {
      icon: MapPin,
      title: `${REPORT_DATA.tripsCount} 次旅行`,
      subtitle: `一起创造了 ${REPORT_DATA.eventsCount} 个回忆`,
    },
    {
      icon: Sparkles,
      title: `年度关键词：${REPORT_DATA.topKeyword}`,
      subtitle: '最常说的话',
    },
    {
      icon: Sparkles,
      title: 'AI 总结',
      content: REPORT_DATA.aiSummary,
      isLast: true,
    },
  ];

  return (
    <div className="bg-background">
      <Navbar />

      {/* Full-screen scroll sections */}
      {sections.map((section, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          className="min-h-screen flex items-center justify-center px-6 relative"
        >
          <motion.div
            style={{
              scale: scale,
            }}
            className="text-center max-w-2xl"
          >
            <section.icon className={`w-16 h-16 mx-auto mb-8 ${
              section.isLast ? 'text-accent' : 'text-gray-400'
            }`} />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl font-bold mb-4"
            >
              {section.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-6"
            >
              {section.subtitle}
            </motion.p>

            {section.detail && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 dark:text-gray-400"
              >
                {section.detail}
              </motion.p>
            )}

            {section.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {section.content}
                </p>
              </motion.div>
            )}

            {section.isLast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12"
              >
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full hover:opacity-90 transition-opacity text-lg">
                  <Download className="w-5 h-5" />
                  导出年度报告
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Scroll indicator */}
          {!section.isLast && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-2">
                <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full" />
              </div>
            </motion.div>
          )}
        </motion.section>
      ))}

      {/* Footer */}
      <section className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {REPORT_DATA.year} · Love Museum
        </p>
      </section>
    </div>
  );
}
