import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { NextPageWithLayout } from '../types/layout';
import AuthorizedLayout from '../layouts/authorized';
import { Toaster } from '@vestido-ecommerce/shadcn-ui/toaster';
import localFont from 'next/font/local';
import { AuthProvider } from '@vestido-ecommerce/auth';
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
    <div className={myFont.className}>
      <Head>
        <title>Dashboard - VN</title>
      </Head>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
