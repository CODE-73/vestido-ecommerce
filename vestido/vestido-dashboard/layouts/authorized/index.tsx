import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHome, LuMenu } from 'react-icons/lu';

import { ComponentWithChildrenProps } from '../../types/component';
import LogoutButton from './LogoutButton';
import { navItems } from './nav-items';
import Sidebar from './Sidebar';

type AuthorizedLayoutProps = ComponentWithChildrenProps;

const AuthorizedLayout: React.FC<AuthorizedLayoutProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="bg-background flex flex-row">
        <div
          className="hidden sm:flex sm:flex-col fixed top-0 left-0 h-screen overflow-hidden"
          style={{
            width: '200px',
            zIndex: 20,
            borderRight: '1px solid #E3E7F3',
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
          <LogoutButton className="mt-auto" />
        </div>

        <div className="flex-1 sm:ml-[200px]">
          <main>{children}</main>
        </div>
      </div>
      <div className="sm:hidden flex flex-col w-full fixed top-0 left-0 bg-white">
        <div className="flex justify-between items-center p-4">
          <Link href="/">
            <LuHome size={24} />
          </Link>

          <div className="font-bold text-lg">
            <Link href="/">
              <div className="flex items-center">
                <span>
                  <Image
                    src="/assets/favico.ico"
                    alt="Logo"
                    width="15"
                    height="25"
                  />
                </span>
                <span className="self-end">
                  <Image
                    src="/assets/VN-HEADER-2.png"
                    alt="Logo"
                    width="150"
                    height="150"
                  />
                </span>
              </div>
            </Link>
          </div>
          <button onClick={toggleDropdown}>
            <LuMenu size={24} />
          </button>
        </div>
        {isDropdownOpen && (
          <div className="flex flex-col items-start p-4 ">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={toggleDropdown}
                className="my-2 w-full"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
            <LogoutButton />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthorizedLayout;
