'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例数据
const TIMELINE_EVENTS = [
  {
    id: '1',
    title: '第一次见面',
    description: '在那个阳光明媚的下午，我们第一次相遇了...',
    date: '2023-02-14',
    location: '上海',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae12b?w=800',
  },
  {
    id: '2',
    title: '第一次约会',
    description: '我们一起去了那家咖啡店，聊了整整一个下午...',
    date: '2023-03-01',
    location: '星巴克',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
  },
  {
    id: '3',
    title: '第一次旅行',
    description: '一起去杭州，在西湖边留下了美好的回忆...',
    date: '2023-05-20',
    location: '杭州西湖',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
  },
  {
    id: '4',
    title: '第一次跨年',
    description: '在江边一起倒计时，迎接新的一年...',
    date: '2023-12-31',
    location: '外滩',
    image: 'https://images.unsplash.com/photo-1467139701929-442e88b00fc0?w=800',
  },
  {
    id: '5',
    title: '一周年纪念',
    description: '时间过得真快，我们已经在一起一年了...',
    date: '2024-02-14',
    location: '家里',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800',
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold mb-4"
              >
                恋爱时间轴
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                记录我们的每一个重要时刻
              </motion.p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2" />

              {/* Timeline Events */}
              <div className="space-y-12">
                {TIMELINE_EVENTS.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:pr-12 md:pl-0 pl-16">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white dark:border-gray-900 z-10" />

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Add Event Button (placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-90 transition-opacity">
                <Plus className="w-5 h-5" />
                添加新回忆
              </button>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}
