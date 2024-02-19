import React from 'react';
import { ComponentWithChildrenProps } from '../../types';
import Header from '../Header';
import Footer from '../Footer';

type LayoutProps = ComponentWithChildrenProps;

const UnauthorizedLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" bg-background justify-center items-center flex flex-col">
      <div className="w-full sticky top-0 left-0 right-0 bg-white z-10">
        <Header />
      </div>
      <div className=" w-full">
        <main>{children}</main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
