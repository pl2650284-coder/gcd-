'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Plus, Edit2, Trash2, X, Database, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { useTimelineEvents } from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase';
import { uploadFile } from '@/lib/storage';

export default function TimelinePage() {
  const { events, loading, addEvent, updateEvent, deleteEvent } = useTimelineEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: new Date().toISOString().split('T')[0],
    location: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // 创建预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, image_url: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      event_date: new Date().toISOString().split('T')[0],
      location: '',
      image_url: '',
    });
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      event_date: event.event_date,
      location: event.location || '',
      image_url: event.image_url || '',
    });
    setImageFile(null);
    setImagePreview(event.image_url || '');
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('确定要删除这个回忆吗？')) return;
    try {
      await deleteEvent(id);
    } catch (err) {
      alert('删除失败，请重试');
    }
  };

  const handleSaveEvent = async () => {
    if (!formData.title) {
      alert('请填写标题');
      return;
    }

    try {
      let finalImageUrl = formData.image_url;

      // 如果有选择文件，先上传
      if (imageFile) {
        setUploading(true);
        finalImageUrl = await uploadFile(imageFile, 'timeline');
        setUploading(false);
      }

      if (editingEvent) {
        await updateEvent(editingEvent.id, {
          title: formData.title,
          description: formData.description || null,
          event_date: formData.event_date,
          location: formData.location || null,
          image_url: finalImageUrl || null,
        });
      } else {
        await addEvent({
          title: formData.title,
          description: formData.description || null,
          event_date: formData.event_date,
          location: formData.location || null,
          image_url: finalImageUrl || null,
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('保存失败，请重试');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
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

            {events.length === 0 ? (
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
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Content */}
                      <div className="flex-1 md:pr-12 md:pl-0 pl-16">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                          {event.image_url && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(event.event_date).toLocaleDateString('zh-CN')}
                              </span>
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            {event.description && (
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {event.description}
                              </p>
                            )}
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
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="这个时刻叫什么"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">日期</label>
                    <input
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">地点</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="在哪里"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">照片（可选）</label>
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="预览"
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-accent transition-colors"
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">点击选择照片</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="讲讲这个时刻的故事..."
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="flex-1 py-4 bg-accent text-white rounded-2xl hover:opacity-90 transition-opacity"
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
