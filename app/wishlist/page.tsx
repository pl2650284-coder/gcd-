'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Calendar, Edit2, Trash2, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';

interface Wish {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt: string | null;
  image: string | null;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: generateId(),
    title: '一起去看极光',
    description: '希望能一起去北极看极光',
    completed: false,
    completedAt: null,
    image: null,
  },
  {
    id: generateId(),
    title: '一起养一只猫',
    description: '给它取名叫小橘',
    completed: true,
    completedAt: '2023-06-01',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
  },
  {
    id: generateId(),
    title: '一起去日本',
    description: '看樱花、吃寿司、泡温泉',
    completed: false,
    completedAt: null,
    image: null,
  },
  {
    id: generateId(),
    title: '一起做一顿大餐',
    description: '两个人一起下厨房',
    completed: true,
    completedAt: '2023-04-15',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400',
  },
  {
    id: generateId(),
    title: '一起看日出',
    description: '在山顶看日出',
    completed: true,
    completedAt: '2023-08-20',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400',
  },
  {
    id: generateId(),
    title: '一起坐热气球',
    description: '在空中看风景',
    completed: false,
    completedAt: null,
    image: null,
  },
];

export default function WishlistPage() {
  const [wishes, setWishes] = useLocalStorage<Wish[]>('wishlist', INITIAL_WISHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWish, setEditingWish] = useState<Wish | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

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

  const handleAddWish = () => {
    setEditingWish(null);
    setFormData({
      title: '',
      description: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleEditWish = (wish: Wish) => {
    setEditingWish(wish);
    setFormData({
      title: wish.title,
      description: wish.description,
      image: wish.image || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteWish = (id: string) => {
    if (confirm('确定要删除这个愿望吗？')) {
      setWishes(wishes.filter(w => w.id !== id));
    }
  };

  const handleSaveWish = () => {
    if (!formData.title) {
      alert('请填写愿望标题');
      return;
    }

    const wishData = {
      ...formData,
      image: formData.image || null,
    };

    if (editingWish) {
      setWishes(wishes.map(w => w.id === editingWish.id ? { ...editingWish, ...wishData } : w));
    } else {
      const newWish: Wish = {
        id: generateId(),
        ...wishData,
        completed: false,
        completedAt: null,
      };
      setWishes([newWish, ...wishes]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">愿望清单</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {completedCount}/{totalCount} 已完成
                </p>
              </div>
              <button
                onClick={handleAddWish}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                添加新愿望
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full"
                />
              </div>
            </div>

            {/* Wishes List */}
            {wishes.length === 0 ? (
              <div className="text-center py-20">
                <Circle className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">还没有愿望</p>
                <button
                  onClick={handleAddWish}
                  className="mt-4 text-accent hover:underline"
                >
                  添加第一个愿望
                </button>
              </div>
            ) : (
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

                        {wish.image && (
                          <div className="rounded-xl overflow-hidden w-40">
                            <img
                              src={wish.image}
                              alt={wish.title}
                              className="w-full h-28 object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEditWish(wish)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteWish(wish.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                    {editingWish ? '编辑愿望' : '添加新愿望'}
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
                  <label className="block text-sm font-medium mb-2">愿望</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="想要一起做什么"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="详细描述一下..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">照片 URL (可选)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="完成后添加照片纪念"
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
                  onClick={handleSaveWish}
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
