import * as React from 'react';
import { UserRound, Heart, ShoppingCart, AlignJustify } from 'lucide-react';
import CategoryHeader from './CategoryHeader';
import Image from 'next/image';

const Header = () => (
  <>
    <div className=" block sm:hidden">
      <div className="flex justify-between items-center p-4 w-full ">
        <AlignJustify />
        {/* Logo */}
        <a href="#" className="pl-3">
          <Image
            src="/assets/VN-HEADER-2.png"
            alt="Logo"
            width="150"
            height="150"
          />
        </a>
        <div className="flex space-x-4">
          {/* Heart Icon */}
          <a href="/wishlist">
            <Heart />
          </a>
          {/* Shopping Cart Icon */}
          <a href="/cart">
            <ShoppingCart />
          </a>
        </div>
      </div>
    </div>
    <div className="hidden sm:block">
      <div className="flex justify-between items-center p-4 ">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <a href="#">
            <Image
              src="/assets/VN-HEADER-2.png"
              alt="Logo"
              width="250"
              height="250"
            />
          </a>
        </div>
        <div className="flex space-x-4">
          {/* User Icon */}
          <a href="/user">
            <UserRound />
          </a>
          {/* Heart Icon */}
          <a href="/wishlist">
            <Heart />
          </a>
          {/* Shopping Cart Icon */}
          <a href="/cart">
            <ShoppingCart />
          </a>
        </div>
      </div>
      <CategoryHeader />
    </div>
  </>
);

export default Header;
