import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { clsx } from 'clsx';
import { LuHeart, LuSearch, LuShoppingBag, LuUser2 } from 'react-icons/lu';

import { InputProps } from '@vestido-ecommerce/shadcn-ui/input';

import NavigationMenu from '../../components/Menubar';
import HeaderDropdown from './HeaderDropdown';

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
          <div className=" relative hidden md:flex space-x-4 items-center justify-items-center content-center">
            <Input
              name="search-products"
              placeholder="Search Products..."
              type="search"
              className="rounded-none max-w-28 bg-transparent border-slate-300 placeholder:text-sm placeholder:text-stone-300"
            />
            <LuSearch
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#48cab2]"
              size={24}
            />
          </div>
          <div className="flex">
            <Link href="/user" className="text-black hover:text-[#48cab2] px-3">
              <LuUser2 size={24} />
            </Link>
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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:font-medium placeholder:text-black placeholder:text-2xl placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
