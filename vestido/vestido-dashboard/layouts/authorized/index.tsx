import React from 'react';
import { ComponentWithChildrenProps } from '../../types/component';
import Sidebar from './Sidebar';
import { navItems } from './nav-items';
import Link from 'next/link';
import Image from 'next/image';

type AuthorizedLayoutProps = ComponentWithChildrenProps;

const AuthorizedLayout: React.FC<AuthorizedLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-background flex flex-row">
      <div
        className="h-screen"
        style={{
          width: '200px',
          zIndex: 20,
          borderRight: '1px solid #E3E7F3',
          //   backgroundColor: 'green',
        }}
      >
        <div className="flex w-full h-20 items-center px-4 my-5">
          <div className="font-bold text-lg ">
            <Link href="/">
              <div className="flex items-center">
                <span>
                  <Image
                    src="/assets/favico.ico"
                    alt="Logo"
                    width="25"
                    height="35"
                  />
                </span>
                <span className="self-end">
                  <Image
                    src="/assets/VN-HEADER-2.png"
                    alt="Logo"
                    width="250"
                    height="250"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>

        <Sidebar items={navItems} />
      </div>
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AuthorizedLayout;
