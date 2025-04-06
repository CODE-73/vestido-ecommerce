import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import { AuthProvider } from '@vestido-ecommerce/auth/client';
import { PostHogProvider } from '@vestido-ecommerce/posthog/client';
import { Toaster } from '@vestido-ecommerce/shadcn-ui/toaster';

import BlockingSpinner from '../components/BlockingSpinner';
import MainLayout from '../layouts/MainLayout';
import { NextPageWithLayout } from './../types';
import StorefrontFonts from './fonts';
import SentryErrorBoundary from './sentry';

import './styles.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <SentryErrorBoundary>
      <PostHogProvider>
        <Head>
          <title>Vestido Storefront</title>
        </Head>
        <AuthProvider
          loginRoute="/login"
          autoLoginRedirect={false}
          fallback={<BlockingSpinner />}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0.2, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.2, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {getLayout(<Component {...pageProps} />)}
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
        <Toaster />
        <StorefrontFonts />
      </PostHogProvider>
    </SentryErrorBoundary>
  );
}

export default App;
