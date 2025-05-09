import React from 'react';
import { useRouter } from 'next/router';

import { ComponentWithChildrenProps } from '../types';
import Header from './headers/Header';
import SubHeader from './headers/SubHeader';
import BottomNavbar from './bottom-navbar';
// import Footer from './Footer';
import Footer from './Footer';

type LayoutProps = ComponentWithChildrenProps;

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const hideFooter = ['/checkout/Checkout'].includes(router.pathname);

  return (
    <div className="relative bg-black items-center flex flex-col scroll-smooth min-h-screen max-h-screen w-full">
      {/*bg-background */}
      <div className="w-full">
        <SubHeader />
      </div>
      <div className="w-full sticky top-0 z-10">
        <Header />
      </div>

      <main
        className={`w-[100vw] md:w-full overflow-y-scroll no-scrollbar mb-16`}
      >
        {children}
      </main>
      {!hideFooter && (
        <div className="w-full mt-auto hidden sm:block">
          <Footer />
        </div>
      )}
      <div className="mt-auto fixed bottom-0 sm:hidden">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
