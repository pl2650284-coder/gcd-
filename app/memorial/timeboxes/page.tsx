'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Clock,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  X,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';
import { MemorialTimeBox } from '@/types';

const INITIAL_TIMEBOXES: MemorialTimeBox[] = [
  {
    id: generateId(),
    title: '给一周年的我们',
    description: '等我们在一起一周年的时候再打开！',
    unlockDate: '2024-02-14',
    isUnlocked: true,
    createdAt: '2023-02-14',
    images: [
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae12b?w=400',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    ],
    textContent: '亲爱的我们：\n\n当你看到这封信的时候，我们已经在一起一周年了！\n\n不知道这一年里我们经历了什么，但我希望，我们依然像现在这样相爱。\n\n想你的 2023年2月14日',
  },
  {
    id: generateId(),
    title: '给毕业的我们',
    description: '等我们都毕业工作稳定了再打开',
    unlockDate: '2026-06-01',
    isUnlocked: false,
    createdAt: '2023-06-01',
  },
  {
    id: generateId(),
    title: '给十年后的我们',
    description: '这是给未来的礼物',
    unlockDate: '2033-02-14',
    isUnlocked: false,
    createdAt: '2023-02-14',
  },
];

export default function TimeBoxesPage() {
  const [timeboxes, setTimeboxes] = useLocalStorage<MemorialTimeBox[]>('memorial_timeboxes', INITIAL_TIMEBOXES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingBox, setViewingBox] = useState<MemorialTimeBox | null>(null);
  const [editingBox, setEditingBox] = useState<MemorialTimeBox | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    unlockDate: '',
    textContent: '',
    images: [] as string[],
    videos: [] as string[],
    audio: [] as string[],
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  const checkAndUnlockBoxes = () => {
    const today = new Date().toISOString().split('T')[0];
    setTimeboxes(timeboxes.map(box => {
      if (!box.isUnlocked && box.unlockDate <= today) {
        return { ...box, isUnlocked: true };
      }
      return box;
    }));
  };

  useEffect(() => {
    checkAndUnlockBoxes();
  }, []);

  const handleAddBox = () => {
    setEditingBox(null);
    setFormData({
      title: '',
      description: '',
      unlockDate: '',
      textContent: '',
      images: [],
      videos: [],
      audio: [],
    });
    setNewImageUrl('');
    setIsModalOpen(true);
  };

  const handleEditBox = (box: MemorialTimeBox) => {
    setEditingBox(box);
    setFormData({
      title: box.title,
      description: box.description || '',
      unlockDate: box.unlockDate,
      textContent: box.textContent || '',
      images: box.images || [],
      videos: box.videos || [],
      audio: box.audio || [],
    });
    setNewImageUrl('');
    setIsModalOpen(true);
  };

  const handleDeleteBox = (id: string) => {
    if (confirm('确定要删除这个时光宝盒吗？')) {
      setTimeboxes(timeboxes.filter(b => b.id !== id));
    }
  };

  const handleSaveBox = () => {
    if (!formData.title || !formData.unlockDate) {
      alert('请填写标题和解锁日期');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const boxData = {
      ...formData,
      description: formData.description || undefined,
      textContent: formData.textContent || undefined,
      images: formData.images.length > 0 ? formData.images : undefined,
      videos: formData.videos.length > 0 ? formData.videos : undefined,
      audio: formData.audio.length > 0 ? formData.audio : undefined,
    };

    if (editingBox) {
      setTimeboxes(timeboxes.map(b => b.id === editingBox.id ? { ...editingBox, ...boxData } : b));
    } else {
      const newBox: MemorialTimeBox = {
        id: generateId(),
        ...boxData,
        isUnlocked: formData.unlockDate <= today,
        createdAt: new Date().toISOString(),
      };
      setTimeboxes([newBox, ...timeboxes]);
    }

    setIsModalOpen(false);
  };

  const handleViewBox = (box: MemorialTimeBox) => {
    if (!box.isUnlocked) {
      const unlockDate = new Date(box.unlockDate);
      const today = new Date();
      const diffDays = Math.ceil((unlockDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      alert(`这个时光宝盒还没解锁哦！还需要等待 ${diffDays} 天才能打开。`);
      return;
    }
    setViewingBox(box);
  };

  const addImageUrl = () => {
    if (newImageUrl && !formData.images.includes(newImageUrl)) {
      setFormData({ ...formData, images: [...formData.images, newImageUrl] });
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <Link href="/memorial" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-2 inline-block">
                  ← 返回纪念馆
                </Link>
                <h1 className="text-4xl font-bold">时光宝盒</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  给未来的礼物
                </p>
              </div>
              <button
                onClick={handleAddBox}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                创建宝盒
              </button>
            </div>

            {/* Timeboxes Grid */}
            {timeboxes.length === 0 ? (
              <div className="text-center py-20">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">还没有创建时光宝盒</p>
                <button
                  onClick={handleAddBox}
                  className="mt-4 text-accent hover:underline"
                >
                  创建第一个
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timeboxes.map((box, index) => {
                  const isUnlocked = box.isUnlocked;
                  const Icon = isUnlocked ? Unlock : Lock;
                  const color = isUnlocked ? 'from-emerald-500 to-teal-500' : 'from-gray-400 to-gray-500';

                  return (
                    <motion.div
                      key={box.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div
                        className={`relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                          isUnlocked ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-800/50'
                        }`}
                        onClick={() => handleViewBox(box)}
                      >
                        <div className={`h-3 bg-gradient-to-r ${color}`} />
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-lg font-semibold ${!isUnlocked ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                                {box.title}
                              </h3>
                            </div>
                          </div>

                          {box.description && (
                            <p className={`text-gray-600 dark:text-gray-400 mb-4 ${!isUnlocked ? 'opacity-50' : ''}`}>
                              {box.description}
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {isUnlocked ? `已于 ${new Date(box.unlockDate).toLocaleDateString('zh-CN')} 解锁` : `解锁于 ${new Date(box.unlockDate).toLocaleDateString('zh-CN')}`}
                            </span>
                          </div>

                          {!isUnlocked && (
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>倒计时中...</span>
                            </div>
                          )}

                          {isUnlocked && (
                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                              {box.images && box.images.length > 0 && (
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <ImageIcon className="w-4 h-4" />
                                  {box.images.length}
                                </div>
                              )}
                              {box.videos && box.videos.length > 0 && (
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Video className="w-4 h-4" />
                                  {box.videos.length}
                                </div>
                              )}
                              {box.audio && box.audio.length > 0 && (
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Mic className="w-4 h-4" />
                                  {box.audio.length}
                                </div>
                              )}
                              {box.textContent && (
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <FileText className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 px-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditBox(box); }}
                          className="flex-1 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          编辑
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteBox(box.id); }}
                          className="flex-1 py-2 text-sm text-red-500 hover:text-red-600 flex items-center justify-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          删除
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </Section>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {viewingBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setViewingBox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 90 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{viewingBox.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    创建于 {new Date(viewingBox.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <button
                  onClick={() => setViewingBox(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[60vh]">
                {viewingBox.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                    {viewingBox.description}
                  </p>
                )}

                {viewingBox.images && viewingBox.images.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      照片
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {viewingBox.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`照片 ${idx + 1}`}
                          className="aspect-square object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {viewingBox.textContent && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                      {viewingBox.textContent}
                    </p>
                  </div>
                )}

                {viewingBox.videos && viewingBox.videos.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      视频
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {viewingBox.videos.length} 个视频
                    </p>
                  </div>
                )}

                {viewingBox.audio && viewingBox.audio.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Mic className="w-5 h-5" />
                      录音
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {viewingBox.audio.length} 条录音
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewingBox(null)}
                  className="w-full py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    {editingBox ? '编辑时光宝盒' : '创建时光宝盒'}
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
                    placeholder="给这个时光宝盒起个名字"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="简单描述一下"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">解锁日期</label>
                  <input
                    type="date"
                    value={formData.unlockDate}
                    onChange={(e) => setFormData({ ...formData, unlockDate: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">添加照片</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="图片 URL"
                    />
                    <button
                      type="button"
                      onClick={addImageUrl}
                      className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      添加
                    </button>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">给未来的信</label>
                  <textarea
                    value={formData.textContent}
                    onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="写一封信给未来的我们..."
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
                  onClick={handleSaveBox}
                  className="flex-1 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  封存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
