'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 创建音频元素（实际项目中需要替换为真实音频文件）
    audioRef.current = new Audio('/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // 处理自动播放被阻止的情况
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-8 right-8 z-50 p-4 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6" />
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </button>
  );
}
