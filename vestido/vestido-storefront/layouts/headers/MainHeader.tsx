import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHeart, LuShoppingBag, LuUser2 } from 'react-icons/lu';

import { AuthenticatedLink } from '@vestido-ecommerce/auth/client';

import Menubar from '../../components/Menubar';
import HeaderDropdown from './HeaderDropdown';
import { HeaderSearchInput } from './HeaderSearchInput';

interface HeaderProps {
  cart_count: number | undefined;
  wishlist_count: number | undefined;
}
const MainHeader: React.FC<HeaderProps> = ({ cart_count, wishlist_count }) => {
  return (
    <div className="bg-black flex items-center px-3 xl:px-32">
      {/*bg-[#1B2149] */}
      <div className="flex flex-grow">
        <Link href="/" className="self-center">
          <span className="md:hidden">
            <Image
              src="/assets/black-logo.png"
              alt="Logo"
              width="300"
              height="35"
            />
          </span>
          <span className="self-end hidden md:block">
            <Image
              src="/assets/white-logo.png"
              alt="Logo"
              width="180"
              height="35"
            />
          </span>
        </Link>
        <div className=" sm:py-4">
          <Menubar isFixed={false} />
        </div>
      </div>
      <HeaderSearchInput className="text-white" />
      <div className="flex">
        <AuthenticatedLink
          href="/profile"
          className="text-white hover:text-[#48cab2] px-3"
        >
          <LuUser2 size={24} />
        </AuthenticatedLink>

        <Link
          href="/wishlist"
          className=" relative text-white hover:text-[#48cab2] "
        >
          <LuHeart size={24} />
        </Link>
        <sup className="relative right-2 text-white h-4 w-4 text-center rounded-full bg-[#48cab2] font-semibold text-xs">
          {wishlist_count}
        </sup>
        <Link href="/cart" className="text-white  hover:text-[#48cab2]">
          <LuShoppingBag size={24} />
        </Link>
        <sup className="relative right-2 text-white h-4 w-4 text-center rounded-full bg-[#48cab2] font-semibold text-xs">
          {cart_count}
        </sup>

        <HeaderDropdown fixedHeader={false} />
      </div>
    </div>
  );
};

export default MainHeader;
