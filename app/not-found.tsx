'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <Heart className="w-24 h-24 text-accent" fill="currentColor" />
          </motion.div>
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            这一页似乎走丢了...
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-90 transition-opacity"
          >
            回到首页
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
