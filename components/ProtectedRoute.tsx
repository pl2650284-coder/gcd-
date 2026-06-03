'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useCouple } from '@/lib/couple';
import { useRouter, usePathname } from 'next/navigation';
import { SupabaseSetup } from './SupabaseSetup';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const publicPaths = ['/login', '/register'];
const onboardingPath = '/onboarding';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading, isConfigured } = useAuth();
  const { couple, loading: coupleLoading } = useCouple();
  const router = useRouter();
  const pathname = usePathname();

  // 如果 Supabase 未配置，显示设置提示
  if (!isConfigured) {
    return <SupabaseSetup />;
  }

  useEffect(() => {
    if (authLoading || coupleLoading) return;

    // 如果未登录，且不在公开页面，跳转到登录页
    if (!user && !publicPaths.includes(pathname)) {
      router.push('/login');
      return;
    }

    // 如果已登录，但在登录/注册页，跳转到首页或onboarding
    if (user && publicPaths.includes(pathname)) {
      if (!couple) {
        router.push(onboardingPath);
      } else {
        router.push('/');
      }
      return;
    }

    // 如果已登录但没有情侣空间，且不在onboarding页，跳转到onboarding
    if (user && !couple && pathname !== onboardingPath) {
      router.push(onboardingPath);
      return;
    }

    // 如果已登录且有情侣空间，但在onboarding页，跳转到首页
    if (user && couple && pathname === onboardingPath) {
      router.push('/');
      return;
    }
  }, [user, couple, authLoading, coupleLoading, pathname, router]);

  // 加载中显示loading状态
  if (authLoading || coupleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  // 渲染子组件
  return <>{children}</>;
}
