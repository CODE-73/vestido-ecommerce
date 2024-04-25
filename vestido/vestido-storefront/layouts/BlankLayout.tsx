import React from 'react';
import { ComponentWithChildrenProps } from '../types';

type LayoutProps = ComponentWithChildrenProps;

const BlankLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-background justify-center items-center flex flex-col">
      <div className="flex-1">
        <main className="w-[100vw] ">{children}</main>
      </div>
    </div>
  );
};

export default BlankLayout;
