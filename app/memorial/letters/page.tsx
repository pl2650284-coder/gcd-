'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Mail,
  Edit2,
  Trash2,
  X,
  Calendar,
  User,
  Image as ImageIcon,
  Music,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import ImageUploader from '@/components/ImageUploader';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';
import { MemorialLetter } from '@/types';

const INITIAL_LETTERS: MemorialLetter[] = [
  {
    id: generateId(),
    title: '第一封情书',
    author: '小明',
    content: '亲爱的小红：\n\n还记得第一次见到你的那天吗？阳光洒在你的头发上，我感觉整个世界都安静了。从那一刻起，我就知道，你是我想要一起走过余生的人。\n\n这封信写得有点紧张，希望你能感受到我的心意。\n\n想你的小明\n2023年2月10日',
    createdAt: '2023-02-10',
    writtenAt: '2023-02-10',
  },
  {
    id: generateId(),
    title: '一周年纪念',
    author: '小红',
    content: '亲爱的小明：\n\n一年过去了，感觉就像昨天才认识你一样。这一年里，我们一起经历了那么多美好的时光。\n\n谢谢你一直陪伴着我，包容我的小脾气。希望未来的每一年，都能和你一起度过。\n\n爱你的小红\n2024年2月14日',
    createdAt: '2024-02-14',
    writtenAt: '2024-02-14',
    coverImageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae12b?w=400',
  },
];

export default function LettersPage() {
  const [letters, setLetters] = useLocalStorage<MemorialLetter[]>('memorial_letters', INITIAL_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<MemorialLetter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<MemorialLetter | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    writtenAt: new Date().toISOString().split('T')[0],
    coverImageUrl: '',
  });

  const handleAddLetter = () => {
    setEditingLetter(null);
    setFormData({
      title: '',
      author: '',
      content: '',
      writtenAt: new Date().toISOString().split('T')[0],
      coverImageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEditLetter = (letter: MemorialLetter) => {
    setEditingLetter(letter);
    setFormData({
      title: letter.title,
      author: letter.author,
      content: letter.content,
      writtenAt: letter.writtenAt,
      coverImageUrl: letter.coverImageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteLetter = (id: string) => {
    if (confirm('确定要删除这封信吗？')) {
      setLetters(letters.filter(l => l.id !== id));
    }
  };

  const handleSaveLetter = () => {
    if (!formData.title || !formData.author || !formData.content) {
      alert('请填写完整信息');
      return;
    }

    if (editingLetter) {
      setLetters(letters.map(l => l.id === editingLetter.id ? { ...editingLetter, ...formData } : l));
    } else {
      const newLetter: MemorialLetter = {
        id: generateId(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setLetters([newLetter, ...letters]);
    }

    setIsModalOpen(false);
  };

  const handleOpenLetter = (letter: MemorialLetter) => {
    setSelectedLetter(letter);
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
                <h1 className="text-4xl font-bold">信件馆</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  收藏每一封情书和手写信
                </p>
              </div>
              <button
                onClick={handleAddLetter}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                添加信件
              </button>
            </div>

            {/* Letters Grid */}
            {letters.length === 0 ? (
              <div className="text-center py-20">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">还没有收藏信件</p>
                <button
                  onClick={handleAddLetter}
                  className="mt-4 text-accent hover:underline"
                >
                  添加第一封信
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {letters.map((letter, index) => (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => handleOpenLetter(letter)}
                    >
                      {letter.coverImageUrl ? (
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={letter.coverImageUrl}
                            alt={letter.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                          <Mail className="w-16 h-16 text-accent/30" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                          {letter.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {letter.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(letter.writtenAt).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-3 px-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditLetter(letter); }}
                        className="flex-1 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        编辑
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteLetter(letter.id); }}
                        className="flex-1 py-2 text-sm text-red-500 hover:text-red-600 flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        删除
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </div>

      {/* Letter View Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 90 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Envelope opening animation */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 relative overflow-hidden">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: -100 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-800/40 dark:to-amber-700/40 origin-top"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  />
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">{selectedLetter.title}</h2>
                  <div className="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedLetter.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedLetter.writtenAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>

                {selectedLetter.coverImageUrl && (
                  <div className="mb-8 rounded-2xl overflow-hidden">
                    <img
                      src={selectedLetter.coverImageUrl}
                      alt={selectedLetter.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {selectedLetter.content}
                  </p>
                </div>

                {selectedLetter.backgroundMusicUrl && (
                  <div className="mt-6 flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Music className="w-5 h-5" />
                    <span>背景音乐</span>
                  </div>
                )}

                {selectedLetter.attachedImages && selectedLetter.attachedImages.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      附件
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {selectedLetter.attachedImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`附件 ${idx + 1}`}
                          className="aspect-square object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                )}
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
                    {editingLetter ? '编辑信件' : '添加新信件'}
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
                    placeholder="给这封信起个名字"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">作者</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="谁写的这封信"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">日期</label>
                  <input
                    type="date"
                    value={formData.writtenAt}
                    onChange={(e) => setFormData({ ...formData, writtenAt: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">封面图片</label>
                  <ImageUploader
                    value={formData.coverImageUrl}
                    onChange={(url) => setFormData({ ...formData, coverImageUrl: url })}
                    placeholder="点击或拖拽上传封面图片"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">内容</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="写下信的内容..."
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
                  onClick={handleSaveLetter}
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
