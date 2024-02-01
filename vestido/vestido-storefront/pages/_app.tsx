
import './styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPageWithLayout } from './../types';
import UnauthorizedLayout from '../layouts/unauthorized/unauthorized-layout';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <UnauthorizedLayout>{page}</UnauthorizedLayout>);

  return (
    <div>
      <Head>
        <title>Vestido Storefront</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
     
    </div>
  );
}

export default App;

