import * as React from 'react';
import { UserRound, Heart, ShoppingBag } from 'lucide-react';
import CategoryHeader from './CategoryHeader';
import FixedHeader from './FixedHeader';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import Image from 'next/image';

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
            <div className="flex items-center">
              <a href="#">
                {' '}
                <Image
                  src="/assets/favico.ico"
                  alt="Logo"
                  width="25"
                  height="35"
                />
              </a>
              <a href="#" className="self-end">
                <Image
                  src="/assets/VN-HEADER-2.png"
                  alt="Logo"
                  width="250"
                  height="250"
                />
              </a>
            </div>
            <div className="hidden md:flex space-x-4 items-center justify-items-center content-center">
              <Search />
              <Input
                type="search"
                placeholder="Search Products.."
                className="font-bold text-slate-600 rounded-none"
              />
            </div>

            <div className="flex space-x-4">
              {/* User Icon */}
              <a href="/user">
                <UserRound />
              </a>
              {/* Heart Icon */}
              <a href="/wishlist/Wishlist">
                <Heart />
              </a>
              {/* Shopping Cart Icon */}
              <a href="/cart/Cart">
                <ShoppingBag />
              </a>
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
