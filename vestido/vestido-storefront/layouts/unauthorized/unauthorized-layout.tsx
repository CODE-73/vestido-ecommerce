import React from 'react';
import { ComponentWithChildrenProps } from '../../types';
import Header from '../Header';
import Footer from '../Footer';
import { useRouter } from 'next/router';

type LayoutProps = ComponentWithChildrenProps;

const UnauthorizedLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const hideFooter = ['/checkout/Checkout'].includes(router.pathname);

  return (
    <div className="bg-background justify-center items-center flex flex-col">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex-1">
        <main className="w-[100vw] ">{children}</main>
      </div>
      {!hideFooter && (
        <div className="w-full">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default UnauthorizedLayout;
