import { AppProps } from 'next/app';
import Head from 'next/head';

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
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
        <Toaster />
        <StorefrontFonts />
      </PostHogProvider>
    </SentryErrorBoundary>
  );
}

export default App;
