import * as React from 'react';
import { UserRound, Heart, ShoppingBag } from 'lucide-react';
import CategoryHeader from './CategoryHeader';
import FixedHeader from './FixedHeader';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <>
          <div className="flex justify-between items-center py-4 transition-all">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center">
                <span>
                  {' '}
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
            <div className="hidden md:flex space-x-4 items-center justify-items-center content-center hover:text-[#48cab2]">
              <Search />
              <Input
                type="search"
                placeholder="Search Products.."
                className="font-bold text-slate-600 rounded-none"
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
