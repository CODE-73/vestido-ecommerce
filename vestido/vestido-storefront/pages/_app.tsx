
import './styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPageWithLayout } from './../types';
import UnauthorizedLayout from '../layouts/unauthorized/unauthorized-layout';
import { Poppins } from 'next/font/google'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const poppins = Poppins({ subsets: ['latin'] , weight:['400','500','600','700','800','900']},)

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <UnauthorizedLayout>{page}</UnauthorizedLayout>);

  return (
    <div className={poppins.className}>
      <Head>
        <title>Vestido Storefront</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
     
    </div>
  );
}

export default App;






