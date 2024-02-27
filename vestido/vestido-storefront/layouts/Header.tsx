import * as React from 'react';
import { UserRound, Heart, ShoppingCart } from 'lucide-react';
import CategoryHeader from './CategoryHeader';
import Image from 'next/image';

const Header = () => (
  <>
    <div className="flex justify-between items-center py-4 sm:px-10">
      <div className="flex justify-between items-center">
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
  </>
);

export default Header;
