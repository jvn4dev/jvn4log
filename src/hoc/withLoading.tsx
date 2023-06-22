import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';
import { LoadingScreen } from '@/components/common/LoadingScreen';

const withLoading = <P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> => {
  return function WithLoadingComponent(props: P) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

    return <>{isLoading ? <LoadingScreen /> : <Component {...props} />}</>;
  };
};

export default withLoading;
