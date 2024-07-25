import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuHeart, LuSearch, LuShoppingBag, LuUser2 } from 'react-icons/lu';

import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import NavigationMenu from '../components/NavigationMenu';
import HeaderDropdown from './HeaderDropdown';

interface HeaderProps {
  cart_count: number | undefined;
  wishlist_count: number | undefined;
}
const MainHeader: React.FC<HeaderProps> = ({ cart_count, wishlist_count }) => {
  return (
    <div className="bg-[#1B2149] flex items-center  justify-between px-3">
      <div className="flex">
        <Link href="/" className="self-center">
          <span className="md:hidden">
            <Image src="/assets/favico.ico" alt="Logo" width="25" height="35" />
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
          <NavigationMenu isFixed={false} />
        </div>
      </div>
      <div className=" relative hidden md:flex space-x-4 items-center justify-items-center content-center">
        <Input
          name="search-products"
          placeholder="Search Products..."
          type="search"
          className="rounded-none max-w-28 bg-transparent text-white border-slate-300"
        />
        <LuSearch
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#48cab2]"
          size={24}
        />
      </div>
      <div className="flex ">
        <Link href="/user" className="text-white hover:text-[#48cab2] px-3">
          <LuUser2 size={24} />
        </Link>

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
