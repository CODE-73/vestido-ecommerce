import { useState } from 'react';
import Link from 'next/link';

import { LuPackage, LuShoppingBag, LuUser2 } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';

import { AuthenticatedLink } from '@vestido-ecommerce/auth/client';

import CategoriesDrawer from './mobile-navbar-categories';

const BottomNavbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log(isDrawerOpen);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log('toggle');
    console.log(isDrawerOpen);
  };

  return (
    <footer
      className={`z-10 fixed left-0 bottom-0 rounded-tl-lg z-100 flex flex-col rounded-tr-lg bg-white  w-screen transition transition-all ease-out duration-500 ${isDrawerOpen ? `justify-between pb-8 h-screen-minus-nav` : 'h-16 justify-center'}`}
    >
      {isDrawerOpen && (
        <CategoriesDrawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
      <div className="flex items-center justify-around min-h-16">
        <Link href="/">
          <RiHome2Line size={24} strokeWidth={0.1} />
        </Link>
        <MdOutlineCategory size={24} onClick={toggleDrawer} />
        <Link href="/cart" className={`relative hover:text-gray-400`}>
          <LuShoppingBag size={20} />
          {/* {cart_count > 0 && ( */}
          <sup className="absolute -right-[8px]  h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
            {/* {cart_count} */} 2
          </sup>
          {/* )} */}
        </Link>
        <Link href="/orders">
          <LuPackage size={24} />
        </Link>
        <AuthenticatedLink href="/profile" className=" hover:text-gray-400">
          <LuUser2 size={20} />
        </AuthenticatedLink>
        {/* {isDrawerOpen && <CategoriesDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />}    */}
      </div>
    </footer>
  );
};

export default BottomNavbar;
