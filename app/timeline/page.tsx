'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Plus, Edit2, Trash2, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  image?: string;
}

const INITIAL_EVENTS: TimelineEvent[] = [
  {
    id: generateId(),
    title: '第一次见面',
    description: '在那个阳光明媚的下午，我们第一次相遇了...',
    date: '2023-02-14',
    location: '上海',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae12b?w=800',
  },
  {
    id: generateId(),
    title: '第一次约会',
    description: '我们一起去了那家咖啡店，聊了整整一个下午...',
    date: '2023-03-01',
    location: '星巴克',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
  },
  {
    id: generateId(),
    title: '第一次旅行',
    description: '一起去杭州，在西湖边留下了美好的回忆...',
    date: '2023-05-20',
    location: '杭州西湖',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
  },
  {
    id: generateId(),
    title: '第一次跨年',
    description: '在江边一起倒计时，迎接新的一年...',
    date: '2023-12-31',
    location: '外滩',
    image: 'https://images.unsplash.com/photo-1467139701929-442e88b00fc0?w=800',
  },
  {
    id: generateId(),
    title: '一周年纪念',
    description: '时间过得真快，我们已经在一起一年了...',
    date: '2024-02-14',
    location: '家里',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800',
  },
];

export default function TimelinePage() {
  const [events, setEvents] = useLocalStorage<TimelineEvent[]>('timeline_events', INITIAL_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    image: '',
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: TimelineEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location || '',
      image: event.image || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('确定要删除这个回忆吗？')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleSaveEvent = () => {
    if (!formData.title || !formData.description) {
      alert('请填写标题和描述');
      return;
    }

    const eventData = {
      ...formData,
      location: formData.location || undefined,
      image: formData.image || undefined,
    };

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...editingEvent, ...eventData } : e));
    } else {
      const newEvent: TimelineEvent = {
        id: generateId(),
        ...eventData,
      };
      setEvents([newEvent, ...events]);
    }

    setIsModalOpen(false);
  };

  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">恋爱时间轴</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  记录我们的每一个重要时刻
                </p>
              </div>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                添加新回忆
              </button>
            </div>

            {sortedEvents.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">还没有记录任何回忆</p>
                <button
                  onClick={handleAddEvent}
                  className="mt-4 text-accent hover:underline"
                >
                  添加第一个
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2" />

                {/* Timeline Events */}
                <div className="space-y-12">
                  {sortedEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-start ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className="flex-1 md:pr-12 md:pl-0 pl-16">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                          {event.image && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(event.date).toLocaleDateString('zh-CN')}
                              </span>
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {event.description}
                            </p>
                            <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <button
                                onClick={() => handleEditEvent(event)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit2 className="w-4 h-4" />
                                编辑
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                                删除
                              </button>
                            </div>
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
            )}
          </div>
        </Section>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {editingEvent ? '编辑回忆' : '添加新回忆'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">标题</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="这个时刻叫什么"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">日期</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">地点</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="在哪里"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">图片 URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="添加一张照片"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="讲讲这个时刻的故事..."
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="flex-1 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
