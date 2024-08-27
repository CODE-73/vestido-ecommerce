import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';

import { AuthProvider } from '@vestido-ecommerce/auth/client';
import { PostHogProvider } from '@vestido-ecommerce/posthog/client';
import { Toaster } from '@vestido-ecommerce/shadcn-ui/toaster';

import AuthorizedLayout from '../layouts/authorized';
import { NextPageWithLayout } from '../types/layout';

import './styles.css';
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const myFont = localFont({
  src: [
    {
      path: '../assets/fonts/poppins/Poppins-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Black.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <AuthorizedLayout>{page}</AuthorizedLayout>);

  return (
    <PostHogProvider>
      <div className={myFont.className}>
        <Head>
          <title>Dashboard - VN</title>
        </Head>
        <AuthProvider loginRoute="/auth/login">
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
        <Toaster />
      </div>
    </PostHogProvider>
  );
}

export default App;
