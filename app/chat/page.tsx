'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Clock, BarChart3, TrendingUp } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例统计数据
const CHAT_STATS = {
  totalMessages: 12345,
  totalWords: 56789,
  chatDays: 300,
  consecutiveDays: 45,
  maxMessagesDay: '2024-02-14',
  maxMessagesCount: 520,
  latestChatTime: '02:30',
  earliestChatTime: '06:00',
};

// 示例高频词
const TOP_WORDS = [
  { word: '想你', count: 520 },
  { word: '爱你', count: 486 },
  { word: '晚安', count: 365 },
  { word: '早点睡', count: 280 },
  { word: '吃饭了吗', count: 245 },
  { word: '在干嘛', count: 220 },
  { word: '开心', count: 180 },
  { word: '抱抱', count: 156 },
];

// 示例表情统计
const TOP_EMOJIS = [
  { emoji: '😂', count: 888 },
  { emoji: '😍', count: 666 },
  { emoji: '🥰', count: 555 },
  { emoji: '❤️', count: 444 },
  { emoji: '😭', count: 333 },
];

// 月度趋势数据
const monthlyData = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  messages: [800, 1200, 950, 880, 760, 920, 850, 980, 1100, 950, 890, 1050],
};

// 小时分布数据
const hourlyData = {
  hours: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
  messages: [120, 30, 10, 80, 450, 380, 520, 420, 480, 680, 820, 550],
};

export default function ChatPage() {
  const monthlyChartOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: monthlyData.months },
    yAxis: { type: 'value' },
    series: [{
      data: monthlyData.messages,
      type: 'line',
      smooth: true,
      areaStyle: { opacity: 0.3 },
      lineStyle: { color: '#f97316' },
      itemStyle: { color: '#f97316' },
    }],
  };

  const hourlyChartOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: hourlyData.hours },
    yAxis: { type: 'value' },
    series: [{
      data: hourlyData.messages,
      type: 'bar',
      itemStyle: {
        color: '#f97316',
        borderRadius: [4, 4, 0, 0],
      },
    }],
  };

  const stats = [
    { icon: MessageSquare, label: '总消息数', value: CHAT_STATS.totalMessages.toLocaleString() },
    { icon: BarChart3, label: '总字数', value: CHAT_STATS.totalWords.toLocaleString() },
    { icon: Calendar, label: '聊天天数', value: CHAT_STATS.chatDays },
    { icon: TrendingUp, label: '连续聊天', value: `${CHAT_STATS.consecutiveDays}天` },
  ];

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
                聊天记录分析
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                发现我们之间的有趣数据
              </motion.p>
            </div>

            {/* Import Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-12 text-center"
            >
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:opacity-90 transition-opacity">
                导入聊天记录
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                支持 QQ、微信、JSON 格式
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                  <stat.icon className="w-8 h-8 mb-3 text-accent" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Special Records */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-4 mb-12"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">聊天最多的一天</span>
                </div>
                <div className="text-xl font-semibold">{CHAT_STATS.maxMessagesDay}</div>
                <div className="text-lg text-accent">{CHAT_STATS.maxMessagesCount} 条消息</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">聊天时间记录</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">最晚</div>
                    <div className="text-lg font-semibold">{CHAT_STATS.latestChatTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">最早</div>
                    <div className="text-lg font-semibold">{CHAT_STATS.earliestChatTime}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">月度消息趋势</h3>
                <ReactECharts option={monthlyChartOption} style={{ height: '300px' }} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">24小时分布</h3>
                <ReactECharts option={hourlyChartOption} style={{ height: '300px' }} />
              </motion.div>
            </div>

            {/* Top Words */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-6">高频词云</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {TOP_WORDS.map((word, index) => (
                    <motion.span
                      key={word.word}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        fontSize: `${1 + (word.count / TOP_WORDS[0].count) * 1.5}rem`,
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-accent hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      {word.word}
                      <span className="text-sm ml-1 opacity-60">{word.count}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Top Emojis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-6">最常用表情</h3>
                <div className="flex justify-center gap-6">
                  {TOP_EMOJIS.map((item, index) => (
                    <motion.div
                      key={item.emoji}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-5xl mb-2">{item.emoji}</div>
                      <div className="text-2xl font-bold">{item.count}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">次</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}
