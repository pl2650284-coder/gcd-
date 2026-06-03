import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/lib/auth';
import { CoupleProvider } from '@/lib/couple';

export const metadata: Metadata = {
  title: 'Love Museum - 恋爱数字博物馆',
  description: '记录我们的恋爱故事，收藏每一个珍贵瞬间',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CoupleProvider>
              {children}
            </CoupleProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
