import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export const withLoading = <P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> => {
  return function WithLoadingComponent(props: P) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // 로딩 시 페이지 스크롤 비활성화 처리
    useEffect(() => {
      if (isLoading) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      // 컴포넌트 언마운트시에 스크롤 활성화해주기
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isLoading]);

    useEffect(() => {
      const handleStart = () => {
        setIsLoading(true);
      };
      const handleComplete = () => {
        setIsLoading(false);
      };

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);

      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    }, [router]);

    return (
      <>
        {isLoading && <LoadingScreen />}
        <Component {...props} />
      </>
    );
  };
};
