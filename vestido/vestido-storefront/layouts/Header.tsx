import * as React from 'react';
import { UserRound, Heart, ShoppingBag } from 'lucide-react';
import CategoryHeader from './CategoryHeader';
import FixedHeader from './FixedHeader';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import Image from 'next/image';
import Link from 'next/link';
import useIsMobile from '../hooks/useIsMobile';
import MobileHeader from './MobileHeader';

const Header = () => {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <div className="hidden sm:block" ref={ref}>
        {inView ? (
          <>
            <div className="flex flex-row text-[#333] text-sm pt-5">
              <div className="flex flex-row text-gray-500 justify-start">
                Call Us:
              </div>
              <div className="font-extrabold">1–234–5678901</div>
              <div className="mr-60 flex flex-row  text-gray-500 ml-auto">
                <div className="text-[#333] text-sm font-bold">
                  FREE 2-DAYS &nbsp;
                </div>
                <div> standard shipping on orders $255</div>
              </div>
              <div className="flex flex-row text-gray-500 justify-end pb-2">
                <a
                  href="/wishlist"
                  className="mr-2 hover:underline hover:text-[#333] transition duration-300"
                >
                  Facebook
                </a>
                <a
                  href="/wishlist"
                  className="mr-2 hover:underline hover:text-[#333] transition duration-300"
                >
                  Twitter
                </a>
                <a
                  href="/wishlist"
                  className="hover:underline hover:text-[#333] transition duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="border-t border-gray-300 "></div>

            <div className="w-full flex justify-between items-center py-4 transition-all px-3 lg:px-0">
              <Link href="/">
                {isMobile ? (
                  <span>
                    <Image
                      src="/assets/favico.ico"
                      alt="Logo"
                      width="25"
                      height="35"
                    />
                  </span>
                ) : (
                  <span className="self-end">
                    <Image
                      src="/assets/new-logo.png"
                      alt="Logo"
                      width="250"
                      height="250"
                    />
                  </span>
                )}
              </Link>
              <div className="basis-2/5 relative hidden md:flex space-x-4 items-center justify-items-center content-center">
                <Input
                  name="search-products"
                  placeholder="Search Products..."
                  type="search"
                  className="rounded-none max-w-56"
                />
                <Search
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#48cab2]"
                  size={24}
                />
              </div>

              <div className="flex space-x-4">
                <Link href="/user" className="hover:text-[#48cab2]">
                  <UserRound />
                </Link>
                <Link href="/wishlist" className="hover:text-[#48cab2]">
                  <Heart />
                </Link>
                <Link href="/cart" className="hover:text-[#48cab2]">
                  <ShoppingBag />
                </Link>
              </div>
            </div>
            <CategoryHeader />
          </>
        ) : (
          <div className="fixed left-0 z-10 w-full">
            <FixedHeader />
          </div>
        )}
      </div>
      <div className="fixed w-screen left-0 top-0 z-50 sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
};

export default Header;
