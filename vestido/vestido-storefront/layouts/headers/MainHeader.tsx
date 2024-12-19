import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHeart, LuShoppingBag, LuUser2 } from 'react-icons/lu';

import { AuthenticatedLink, useAuth } from '@vestido-ecommerce/auth/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

import Menubar from '../../components/Menubar';
import LogoutButton from '../LogoutButton';
import HeaderDropdown from './HeaderDropdown';

interface HeaderProps {
  cart_count: number;
  wishlist_count: number;
}
const MainHeader: React.FC<HeaderProps> = ({ cart_count, wishlist_count }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-black shadow-lg flex items-center px-3 xl:px-32 sticky top-0 shadow-lg shadow-gray-700/50 ">
      {/*bg-[#1B2149] */}
      <div className="flex flex-grow">
        <Link href="/" className="self-center">
          <span className="sm:hidden">
            <Image
              src="/assets/black-logo.png"
              alt="Logo"
              width="300"
              height="35"
            />
          </span>
          <span className="self-end hidden sm:block">
            <Image
              src="/assets/white-logo.png"
              alt="Logo"
              width="180"
              height="35"
            />
          </span>
        </Link>
      </div>
      <div className="flex divide-x items-center divide-gray-700">
        <div className=" sm:py-4">
          <Menubar isFixed={false} />
        </div>

        <div className="flex items-center gap-3 pl-2">
          {/* <HeaderSearchInput className="text-white ml-2" /> */}
          <AuthenticatedLink
            href="/profile"
            className="text-white hover:text-gray-400"
          >
            <LuUser2 size={20} />
          </AuthenticatedLink>

          <Link
            href="/wishlist"
            className={`relative text-white hover:text-gray-400 `}
          >
            <LuHeart size={20} />
            {wishlist_count > 0 && (
              <sup className="absolute -right-[8px] h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
                {wishlist_count}
              </sup>
            )}
          </Link>
          <Link
            href="/cart"
            className={`relative text-white hover:text-gray-400`}
          >
            <LuShoppingBag size={20} />
            {cart_count > 0 && (
              <sup className="absolute -right-[8px]  h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
                {cart_count}
              </sup>
            )}
          </Link>

          <HeaderDropdown />
          {isAuthenticated ? (
            <LogoutButton className="text-white hover:text-gray-400 hover:bg-transparent" />
          ) : (
            <Link href="/login">
              <Button className="rounded-none h-10 bg-white text-black ml-4 hover:bg-white">
                Login/Signup
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
