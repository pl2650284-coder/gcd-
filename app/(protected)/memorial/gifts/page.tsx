'use client';

import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

export default function GiftsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <Link href="/memorial" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-2 inline-block">← 返回纪念馆</Link>
              <h1 className="text-4xl font-bold">礼物馆</h1>
            </div>
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl">
              <Gift className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">开发中...</p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
