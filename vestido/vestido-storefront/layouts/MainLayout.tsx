import React from 'react';
import { useRouter } from 'next/router';

import { ComponentWithChildrenProps } from '../types';
import Header from './headers/Header';
import SubHeader from './headers/SubHeader';
// import Footer from './Footer';
import Footer from './Footer';
import BottomNavbar from './bottom-navbar';

type LayoutProps = ComponentWithChildrenProps;

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const hideFooter = ['/checkout/Checkout'].includes(router.pathname);

  return (
    <div className="relative bg-black justify-center items-center flex flex-col scroll-smooth min-h-screen">
      {' '}
      {/*bg-background */}
      <div className="w-full">
        <SubHeader />
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        <main className={`w-[100vw] md:w-full mt-12 sm:mt-auto`}>
          {children}
        </main>
      </div>
      {!hideFooter && (
        <div className="w-full mt-auto">
          <Footer />
        </div>
      )}
      <div className='absolute bottom-0 sm:invisible'><BottomNavbar/></div>
    </div>
  );
};

export default MainLayout;
