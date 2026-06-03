'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Ticket,
  Edit2,
  Trash2,
  X,
  Calendar,
  MapPin,
  Camera,
  Film,
  Music,
  Plane,
  Train,
  Trees,
  Building2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import { useLocalStorage, generateId } from '@/lib/useLocalStorage';
import { MemorialTicket } from '@/types';

const INITIAL_TICKETS: MemorialTicket[] = [
  {
    id: generateId(),
    title: '第一次一起看电影',
    type: 'movie',
    date: '2023-02-18',
    location: '万达影城',
    notes: '看的是一部爱情片，你哭得稀里哗啦，我在旁边偷偷递纸巾。电影名字叫《不能说的秘密》，那天是我们第三次见面。',
    createdAt: '2023-02-18',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
  },
  {
    id: generateId(),
    title: '一起去杭州',
    type: 'train',
    date: '2023-05-20',
    location: '杭州东站',
    notes: '520那天，我们坐高铁去杭州玩。',
    createdAt: '2023-05-20',
  },
  {
    id: generateId(),
    title: '周杰伦演唱会',
    type: 'concert',
    date: '2023-09-15',
    location: '上海梅赛德斯奔驰文化中心',
    notes: '终于带你去看了周杰伦的演唱会！全程大合唱，你说这是你最开心的一天。',
    createdAt: '2023-09-15',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
  },
];

const TICKET_TYPES = [
  { type: 'movie' as const, label: '电影', icon: Film },
  { type: 'concert' as const, label: '演唱会', icon: Music },
  { type: 'flight' as const, label: '飞机', icon: Plane },
  { type: 'train' as const, label: '火车', icon: Train },
  { type: 'park' as const, label: '景点', icon: Trees },
  { type: 'exhibition' as const, label: '展览', icon: Building2 },
  { type: 'other' as const, label: '其他', icon: Ticket },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useLocalStorage<MemorialTicket[]>('memorial_tickets', INITIAL_TICKETS);
  const [filterType, setFilterType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<MemorialTicket | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'other' as const,
    date: new Date().toISOString().split('T')[0],
    location: '',
    notes: '',
    imageUrl: '',
    extractedText: '',
  });

  const filteredTickets = filterType === 'all'
    ? tickets
    : tickets.filter(t => t.type === filterType);

  const handleAddTicket = () => {
    setEditingTicket(null);
    setFormData({
      title: '',
      type: 'other',
      date: new Date().toISOString().split('T')[0],
      location: '',
      notes: '',
      imageUrl: '',
      extractedText: '',
    });
    setIsModalOpen(true);
  };

  const handleEditTicket = (ticket: MemorialTicket) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      type: ticket.type,
      date: ticket.date || new Date().toISOString().split('T')[0],
      location: ticket.location || '',
      notes: ticket.notes || '',
      imageUrl: ticket.imageUrl || '',
      extractedText: ticket.extractedText || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteTicket = (id: string) => {
    if (confirm('确定要删除这张票据吗？')) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  const handleSaveTicket = () => {
    if (!formData.title) {
      alert('请填写标题');
      return;
    }

    const ticketData = {
      ...formData,
      date: formData.date || undefined,
      location: formData.location || undefined,
      notes: formData.notes || undefined,
      imageUrl: formData.imageUrl || undefined,
      extractedText: formData.extractedText || undefined,
    };

    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...editingTicket, ...ticketData } : t));
    } else {
      const newTicket: MemorialTicket = {
        id: generateId(),
        ...ticketData,
        createdAt: new Date().toISOString(),
      };
      setTickets([newTicket, ...tickets]);
    }

    setIsModalOpen(false);
  };

  const getTicketIcon = (type: string) => {
    const typeConfig = TICKET_TYPES.find(t => t.type === type);
    return typeConfig?.icon || Ticket;
  };

  const getTicketColor = (type: string) => {
    switch (type) {
      case 'movie': return 'from-red-500 to-rose-500';
      case 'concert': return 'from-purple-500 to-violet-500';
      case 'flight': return 'from-blue-500 to-indigo-500';
      case 'train': return 'from-green-500 to-emerald-500';
      case 'park': return 'from-emerald-500 to-teal-500';
      case 'exhibition': return 'from-amber-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
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
                <h1 className="text-4xl font-bold">门票馆</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  保存每一张票据
                </p>
              </div>
              <button
                onClick={handleAddTicket}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                添加票据
              </button>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filterType === 'all'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                全部
              </button>
              {TICKET_TYPES.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors ${
                    filterType === type
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Tickets Grid */}
            {filteredTickets.length === 0 ? (
              <div className="text-center py-20">
                <Ticket className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">还没有收藏票据</p>
                <button
                  onClick={handleAddTicket}
                  className="mt-4 text-accent hover:underline"
                >
                  添加第一张票据
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket, index) => {
                  const Icon = getTicketIcon(ticket.type);
                  const color = getTicketColor(ticket.type);

                  return (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all">
                        <div className={`h-2 bg-gradient-to-r ${color}`} />
                        {ticket.imageUrl ? (
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={ticket.imageUrl}
                              alt={ticket.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className={`aspect-[4/3] bg-gradient-to-br ${color} opacity-10 flex items-center justify-center`}>
                            <Icon className="w-16 h-16" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold flex-1">{ticket.title}</h3>
                          </div>
                          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            {ticket.date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(ticket.date).toLocaleDateString('zh-CN')}
                              </div>
                            )}
                            {ticket.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {ticket.location}
                              </div>
                            )}
                            {ticket.notes && (
                              <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
                                {ticket.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                              onClick={() => handleEditTicket(ticket)}
                              className="flex-1 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center gap-1"
                            >
                              <Edit2 className="w-4 h-4" />
                              编辑
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="flex-1 py-2 text-sm text-red-500 hover:text-red-600 flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              删除
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                    {editingTicket ? '编辑票据' : '添加新票据'}
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
                    placeholder="这是什么票据"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">类型</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TICKET_TYPES.map(({ type, label, icon: Icon }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-colors ${
                          formData.type === type
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
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
                      placeholder="哪里"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">图片 URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="添加一张票据的照片"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">备注</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="讲讲这张票据的故事..."
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
                  onClick={handleSaveTicket}
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
