import * as React from 'react';
import { Search, UserRound, Heart, ShoppingCart } from 'lucide-react';
import CategoryHeader from './CategoryHeader';
import Image from 'next/image';

const Header = () => (
  <>
    <div className="flex justify-between items-center py-4   px-8">
      <div className="flex justify-between items-center">
        <Image
          src="/assets/VN-HEADER.png"
          alt="Logo"
          width="200"
          height="200"
        />
      </div>
      <div className="flex space-x-4">
        <Search />
        <UserRound />
        <Heart />
        <ShoppingCart />
      </div>
    </div>
    <CategoryHeader />
  </>
);

export default Header;
