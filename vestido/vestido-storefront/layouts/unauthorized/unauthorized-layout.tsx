import React from 'react';
import { ComponentWithChildrenProps } from '../../types';
import Header from '../Header';
import Footer from '../Footer';

type LayoutProps = ComponentWithChildrenProps;

const UnauthorizedLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-background justify-center items-center flex flex-col">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex-1">
        <main>{children}</main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
