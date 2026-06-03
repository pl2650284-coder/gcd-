'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

export default function PhotosPage() {
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

            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">照片功能开发中...</p>
              <p className="text-sm text-gray-400">此页面将很快迁移到 Supabase</p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
