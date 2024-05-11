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

const Header = () => {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <>
          <div className="flex justify-between items-center py-4 transition-all px-3 lg:px-0">
            <Link href="/">
              {isMobile ? (
                <span>
                  {' '}
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
            <div className="basis-1/2 relative hidden md:flex space-x-4 items-center justify-items-center content-center">
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
  );
};

export default Header;
