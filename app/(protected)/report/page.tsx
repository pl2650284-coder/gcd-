'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <Section>
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold mb-4">年度报告</motion.h1>
            <div className="py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl mt-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">开发中...</p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
