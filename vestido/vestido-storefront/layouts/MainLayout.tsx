import React from 'react';
import { useRouter } from 'next/router';

import { ComponentWithChildrenProps } from '../types';
import Header from './headers/Header';
import SubHeader from './headers/SubHeader';
import Footer from './Footer';

type LayoutProps = ComponentWithChildrenProps;

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const hideFooter = ['/checkout/Checkout'].includes(router.pathname);

  return (
    <div className="bg-background justify-center items-center flex flex-col scroll-smooth">
      <div className="w-full">
        <SubHeader />
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        <main className={`w-[100vw] md:w-full mt-24 sm:mt-auto`}>
          {children}
        </main>
      </div>
      {!hideFooter && (
        <div className="w-full lg:mt-10">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
