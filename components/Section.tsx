'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = '' }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}
