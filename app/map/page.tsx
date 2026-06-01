'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';

// 示例数据
const LOCATIONS = [
  {
    id: '1',
    name: '上海',
    lat: 31.2304,
    lng: 121.4737,
    visits: 10,
    description: '我们相识的城市',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6a6?w=800',
  },
  {
    id: '2',
    name: '杭州',
    lat: 30.2741,
    lng: 120.1551,
    visits: 3,
    description: '第一次一起旅行',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
  },
  {
    id: '3',
    name: '北京',
    lat: 39.9042,
    lng: 116.4074,
    visits: 2,
    description: '一起去看升旗',
    image: 'https://images.unsplash.com/photo-1508804185872-d0effc92c6a0?w=800',
  },
  {
    id: '4',
    name: '成都',
    lat: 30.5728,
    lng: 104.0668,
    visits: 1,
    description: '一起去看大熊猫',
    image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800',
  },
  {
    id: '5',
    name: '厦门',
    lat: 24.4798,
    lng: 118.0894,
    visits: 1,
    description: '海边度假',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  },
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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
                恋爱地图
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                标记我们一起去过的每一个地方
              </motion.p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-12 max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <Globe className="w-10 h-10 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold">{LOCATIONS.length}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">城市</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <MapPin className="w-10 h-10 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold">
                  {LOCATIONS.reduce((sum, loc) => sum + loc.visits, 0)}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">旅行</div>
              </motion.div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-12 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    地图组件占位
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    可集成 Google Maps / 高德地图
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Locations List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LOCATIONS.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedLocation(location.id)}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{location.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {location.visits} 次
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {location.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
