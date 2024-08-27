import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import posthog from 'posthog-js';
import { PostHogProvider as _PostHogProvider } from 'posthog-js/react';

const POSTHOG_KEY = process.env['NEXT_PUBLIC_POSTHOG_KEY'] as string;
const POSTHOG_HOST =
  (process.env['NEXT_PUBLIC_POSTHOG_HOST'] as string) ||
  'https://eu.i.posthog.com';

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined' && POSTHOG_KEY && POSTHOG_HOST) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture (https://posthog.com/docs/libraries/next-js#pageleave-events-optional)
    loaded: (_posthog) => {
      // if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

type PostHogProviderProps = {
  children: ReactNode;
};

const PostHogProvider: FC<PostHogProviderProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (_url: string) => {
      posthog.capture('$pageview');
      posthog.capture('$screenview');
    };

    const handleBeforeRouteChange = (_url: string) => {
      posthog.capture('$pageleave');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeStart', handleBeforeRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleBeforeRouteChange);
    };
  }, [router.events]);

  return <_PostHogProvider client={posthog}>{children}</_PostHogProvider>;
};

export { PostHogProvider };
