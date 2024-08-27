import { AppProps } from 'next/app';
// import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';

import { AuthProvider } from '@vestido-ecommerce/auth/client';
import { PostHogProvider } from '@vestido-ecommerce/posthog/client';

import BlockingSpinner from '../components/BlockingSpinner';
import MainLayout from '../layouts/MainLayout';
import { NextPageWithLayout } from './../types';

import './styles.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800', '900'],
// });

//src: '../assets/fonts/poppins.ttf'

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
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <PostHogProvider>
      <div
        // className={poppins.className}
        className={myFont.className}
      >
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
      </div>
    </PostHogProvider>
  );
}

export default App;
