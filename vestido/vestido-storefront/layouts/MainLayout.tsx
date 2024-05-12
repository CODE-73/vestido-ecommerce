import React from 'react';
import { ComponentWithChildrenProps } from '../types';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

type LayoutProps = ComponentWithChildrenProps;

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const hideFooter = ['/checkout/Checkout'].includes(router.pathname);

  return (
    <div className="bg-background justify-center items-center flex flex-col scroll-smooth">
      <div className="lg:max-w-7xl">
        <div>
          <Header />
        </div>

        <main className={`w-[100vw] lg:w-full`}>{children}</main>
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
