import './styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPageWithLayout } from './../types';
import UnauthorizedLayout from '../layouts/unauthorized/unauthorized-layout';
// import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

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
    Component.getLayout ??
    ((page) => <UnauthorizedLayout>{page}</UnauthorizedLayout>);

  return (
    <div
      // className={poppins.className}
      className={myFont.className}
    >
      <Head>
        <title>Vestido Storefront</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}

export default App;
