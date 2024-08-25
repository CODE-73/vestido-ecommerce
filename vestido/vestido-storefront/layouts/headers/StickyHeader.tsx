import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHeart, LuShoppingBag, LuUser2 } from 'react-icons/lu';

import { AuthenticatedLink } from '@vestido-ecommerce/auth/client';

import NavigationMenu from '../../components/Menubar';
import HeaderDropdown from './HeaderDropdown';
import { HeaderSearchInput } from './HeaderSearchInput';

const fixedHeight = '60px';

interface HeaderProps {
  cart_count: number | undefined;
  wishlist_count: number | undefined;
}
const StickyHeader: React.FC<HeaderProps> = ({
  cart_count,
  wishlist_count,
}) => {
  return (
    <div
      className="w-full bg-white shadow flex justify-center z-10"
      style={{ height: fixedHeight, minHeight: fixedHeight }}
    >
      <div className="flex flex-1 items-center px-10 " /* max-w-7xl*/>
        <Link href="/" className="self-center">
          <span className="md:hidden">
            <Image
              src="/assets/black-logo.png"
              alt="Logo"
              width="250"
              height="35"
            />
          </span>
          <span className="self-end hidden md:block mb-3">
            <Image
              src="/assets/new-logo.png"
              alt="Logo"
              width="250"
              height="50"
            />
          </span>
        </Link>
        <div className=" sm:py-4 flex-1">
          <NavigationMenu isFixed={true} />
        </div>

        <div className="flex items-center">
          <HeaderSearchInput />
          <div className="flex">
            <AuthenticatedLink
              href="/profile"
              className="text-black hover:text-[#48cab2] px-3"
            >
              <LuUser2 size={24} />
            </AuthenticatedLink>
            <Link
              href="/wishlist"
              className=" relative text-text-black hover:text-[#48cab2] "
            >
              <LuHeart size={24} />
            </Link>
            <sup className="relative right-2 text-white h-4 w-4 text-center rounded-full bg-[#48cab2] font-semibold text-xs">
              {wishlist_count}
            </sup>
            <Link href="/cart" className="text-black hover:text-[#48cab2]">
              <LuShoppingBag size={24} />
            </Link>
            <sup className="relative right-2 text-white h-4 w-4 text-center rounded-full bg-[#48cab2] font-semibold text-xs">
              {cart_count}
            </sup>
            <HeaderDropdown fixedHeader={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
