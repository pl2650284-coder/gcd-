'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Grid3X3, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例数据
const PHOTOS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800', date: '2024-02-14', location: '上海' },
  { id: '2', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae12b?w=800', date: '2023-12-31', location: '外滩' },
  { id: '3', url: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800', date: '2023-10-15', location: '杭州' },
  { id: '4', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', date: '2023-08-20', location: '咖啡店' },
  { id: '5', url: 'https://images.unsplash.com/photo-1467139701929-442e88b00fc0?w=800', date: '2023-07-04', location: '北京' },
  { id: '6', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', date: '2023-05-20', location: '厦门' },
  { id: '7', url: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6a6?w=800', date: '2023-04-10', location: '公园' },
  { id: '8', url: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800', date: '2023-03-08', location: '成都' },
  { id: '9', url: 'https://images.unsplash.com/photo-1508804185872-d0effc92c6a0?w=800', date: '2023-02-14', location: '餐厅' },
  { id: '10', url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800', date: '2023-01-25', location: '家里' },
  { id: '11', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800', date: '2022-12-20', location: '游乐园' },
  { id: '12', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', date: '2022-11-11', location: '郊外' },
];

const FILTER_YEARS = ['全部', '2024', '2023', '2022'];

export default function PhotosPage() {
  const [selectedYear, setSelectedYear] = useState('全部');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhotos = PHOTOS.filter((photo) => {
    const matchesYear = selectedYear === '全部' || photo.date.includes(selectedYear);
    const matchesSearch = searchQuery === '' ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold mb-4"
              >
                照片博物馆
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                收藏我们的每一个美好瞬间
              </motion.p>
            </div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 space-y-4"
            >
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索照片..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              {/* Year Filter */}
              <div className="flex justify-center gap-2 flex-wrap">
                {FILTER_YEARS.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedYear === year
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Photos Grid */}
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPhoto(photo.id)}
                  className="break-inside-avoid group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={photo.url}
                      alt={`Photo ${photo.id}`}
                      className="w-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm opacity-90">{photo.location}</p>
                        <p className="text-xs opacity-70">{photo.date}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">没有找到照片</p>
              </div>
            )}
          </div>
        </Section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>
            {(() => {
              const photo = PHOTOS.find((p) => p.id === selectedPhoto);
              if (!photo) return null;
              return (
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  src={photo.url}
                  alt="Full size"
                  className="max-h-[90vh] max-w-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
