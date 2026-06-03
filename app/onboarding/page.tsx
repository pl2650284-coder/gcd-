'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Calendar, Image, ArrowRight, Upload, X } from 'lucide-react';
import { useCouple } from '@/lib/couple';
import { uploadFile } from '@/lib/storage';

export default function OnboardingPage() {
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [startDate, setStartDate] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createCouple } = useCouple();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImageFile(file);
      // 创建预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setHeroImageFile(null);
    setHeroImagePreview('');
    setHeroImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交表单');
    setError(null);

    if (!partner1Name || !partner2Name || !startDate) {
      setError('请填写完整信息');
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = heroImageUrl;

      // 如果有选择文件，先上传
      if (heroImageFile) {
        setUploading(true);
        finalImageUrl = await uploadFile(heroImageFile, 'couples');
        setUploading(false);
      }

      console.log('创建情侣空间:', { partner1Name, partner2Name, startDate, heroImageUrl: finalImageUrl });
      const result = await createCouple({
        partner1Name,
        partner2Name,
        startDate,
        heroImageUrl: finalImageUrl || undefined,
      });

      console.log('创建结果:', result);
      if (!result.success) {
        setError(result.error?.message || '创建失败，请重试');
      } else {
        console.log('创建成功，准备跳转');
        router.push('/');
      }
    } catch (err: any) {
      console.error('提交错误:', err);
      setError(err.message || '创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-6">
            <Heart className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold mb-2">创建情侣空间</h1>
          <p className="text-gray-500 dark:text-gray-400">记录属于你们的故事</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">TA的名字</label>
              <input
                type="text"
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="小明"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">另一位的名字</label>
              <input
                type="text"
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="小红"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">在一起的日子</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">封面照片（可选）</label>
            {heroImagePreview ? (
              <div className="relative">
                <img
                  src={heroImagePreview}
                  alt="预览"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-accent transition-colors"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">点击选择照片</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent text-white rounded-2xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? '创建中...' : (
              <>
                开始我们的故事
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
