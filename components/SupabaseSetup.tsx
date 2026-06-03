'use client';

import { motion } from 'framer-motion';
import { Database, Key, Link2, ArrowRight } from 'lucide-react';

export function SupabaseSetup() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full mb-6">
            <Database className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-4">需要配置 Supabase</h1>
          <p className="text-gray-600 dark:text-gray-400">
            按照以下步骤配置环境变量以继续
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="创建 Supabase 项目" icon={<Link2 className="w-5 h-5" />}>
              访问 <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">supabase.com</a> 创建新项目
            </Step>

            <Step number={2} title="获取 API 凭证" icon={<Key className="w-5 h-5" />}>
              在项目设置 → API 中找到 <code>Project URL</code> 和 <code>anon public</code> key
            </Step>

            <Step number={3} title="配置环境变量" icon={<Database className="w-5 h-5" />}>
              <div className="mt-3 bg-gray-100 dark:bg-gray-700 rounded-xl p-4 font-mono text-sm">
                <p className="mb-2"><span className="text-gray-500"># .env.local</span></p>
                <p className="mb-1">NEXT_PUBLIC_SUPABASE_URL=<span className="text-accent">your-url</span></p>
                <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=<span className="text-accent">your-key</span></p>
              </div>
            </Step>

            <Step number={4} title="创建数据库表" icon={<Database className="w-5 h-5" />}>
              按照 <code>MIGRATION.md</code> 中的说明创建所需的数据库表
            </Step>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              配置完成后，刷新页面即可继续
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Step({ number, title, icon, children }: { number: number; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-accent">{icon}</div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">{children}</div>
      </div>
    </div>
  );
}
