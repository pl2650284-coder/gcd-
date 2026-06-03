'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Gift,
  Edit2,
  Trash2,
  X,
  Calendar,
  User,
  Star,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import ImageUploader from '@/components/ImageUploader';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';
import { MemorialGift } from '@/types';

const INITIAL_GIFTS: MemorialGift[] = [
  {
    id: generateId(),
    name: '第一束花',
    giver: '小明',
    receiver: '小红',
    receivedAt: '2023-02-14',
    story: '第一次约会时送的玫瑰花，虽然有点紧张但你很开心。11朵红玫瑰，代表着一生一世只爱你一个人。',
    sentimentScore: 5,
    imageUrl: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
  },
  {
    id: generateId(),
    name: '情侣手链',
    giver: '小红',
    receiver: '小明',
    receivedAt: '2023-05-20',
    story: '520那天送的礼物，一对简单的银手链，刻着我们名字的缩写。',
    sentimentScore: 5,
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
  },
  {
    id: generateId(),
    name: '生日蛋糕',
    giver: '小明',
    receiver: '小红',
    receivedAt: '2023-08-15',
    story: '你生日那天，我亲手做的蛋糕，虽然卖相不太好，但你说这是你吃过最甜的蛋糕。',
    sentimentScore: 4,
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
  },
];

export default function GiftsPage() {
  const [gifts, setGifts] = useLocalStorage<MemorialGift[]>('memorial_gifts', INITIAL_GIFTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<MemorialGift | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    giver: '',
    receiver: '',
    receivedAt: new Date().toISOString().split('T')[0],
    story: '',
    imageUrl: '',
    price: '',
    sentimentScore: 5,
  });

  const handleAddGift = () => {
    setEditingGift(null);
    setFormData({
      name: '',
      giver: '',
      receiver: '',
      receivedAt: new Date().toISOString().split('T')[0],
      story: '',
      imageUrl: '',
      price: '',
      sentimentScore: 5,
    });
    setIsModalOpen(true);
  };

  const handleEditGift = (gift: MemorialGift) => {
    setEditingGift(gift);
    setFormData({
      name: gift.name,
      giver: gift.giver,
      receiver: gift.receiver,
      receivedAt: gift.receivedAt,
      story: gift.story,
      imageUrl: gift.imageUrl || '',
      price: gift.price?.toString() || '',
      sentimentScore: gift.sentimentScore,
    });
    setIsModalOpen(true);
  };

  const handleDeleteGift = (id: string) => {
    if (confirm('确定要删除这个礼物吗？')) {
      setGifts(gifts.filter(g => g.id !== id));
    }
  };

  const handleSaveGift = () => {
    if (!formData.name || !formData.giver || !formData.receiver || !formData.story) {
      alert('请填写完整信息');
      return;
    }

    const giftData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
    };

    if (editingGift) {
      setGifts(gifts.map(g => g.id === editingGift.id ? { ...editingGift, ...giftData } : g));
    } else {
      const newGift: MemorialGift = {
        id: generateId(),
        ...giftData,
      };
      setGifts([newGift, ...gifts]);
    }

    setIsModalOpen(false);
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
                <h1 className="text-4xl font-bold">礼物馆</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  记录每份礼物背后的故事
                </p>
              </div>
              <button
                onClick={handleAddGift}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                添加礼物
              </button>
            </div>

            {/* Gifts Timeline */}
            {gifts.length === 0 ? (
              <div className="text-center py-20">
                <Gift className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">还没有收藏礼物</p>
                <button
                  onClick={handleAddGift}
                  className="mt-4 text-accent hover:underline"
                >
                  添加第一件礼物
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2" />
                <div className="space-y-12">
                  {[...gifts].sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()).map((gift, index) => (
                    <motion.div
                      key={gift.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <div className="flex-1 md:pr-12 md:pl-0 pl-16">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                          {gift.imageUrl && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={gift.imageUrl}
                                alt={gift.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-xl font-bold">{gift.name}</h3>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < gift.sentimentScore ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {gift.giver} → {gift.receiver}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(gift.receivedAt).toLocaleDateString('zh-CN')}
                              </span>
                              {gift.price && (
                                <span className="text-accent font-medium">
                                  ¥{gift.price}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {gift.story}
                            </p>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <button
                                onClick={() => handleEditGift(gift)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit2 className="w-4 h-4" />
                                编辑
                              </button>
                              <button
                                onClick={() => handleDeleteGift(gift.id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                                删除
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 z-10 flex items-center justify-center">
                        <Gift className="w-3 h-3 text-white" />
                      </div>
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
                    {editingGift ? '编辑礼物' : '添加新礼物'}
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
                  <label className="block text-sm font-medium mb-2">礼物名称</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="这是一份什么礼物"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">赠送者</label>
                    <input
                      type="text"
                      value={formData.giver}
                      onChange={(e) => setFormData({ ...formData, giver: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="谁送的"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">接收者</label>
                    <input
                      type="text"
                      value={formData.receiver}
                      onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="送给谁"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">收到日期</label>
                    <input
                      type="date"
                      value={formData.receivedAt}
                      onChange={(e) => setFormData({ ...formData, receivedAt: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">价格（可选）</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="¥"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">纪念价值评分</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setFormData({ ...formData, sentimentScore: score })}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${score <= formData.sentimentScore ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">图片 URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="添加一张礼物的照片"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">故事</label>
                  <textarea
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="讲讲这份礼物背后的故事..."
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
                  onClick={handleSaveGift}
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
