import { useState } from 'react';
import Link from 'next/link';

import { LuPackage, LuShoppingBag, LuUser2 } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';

import { AuthenticatedLink } from '@vestido-ecommerce/auth/client';
import { useCart } from '@vestido-ecommerce/items/client';

import CategoriesDrawer from './mobile-navbar-categories';

const BottomNavbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: cart } = useCart();
  const cart_count = cart?.data.length ?? 0;

  return (
    <footer
      className={`z-10 fixed left-0 bottom-0 shadow-[0_-4px_20px_rgba(255,255,255,0.2)]  rounded-tl-lg z-100 flex flex-col rounded-tr-lg bg-black shadow  w-screen transition transition-all ease-out duration-500 ${isDrawerOpen ? `justify-between pb-8 h-screen-minus-nav` : 'h-16 justify-center'}`}
    >
      {isDrawerOpen && (
        <CategoriesDrawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
      <div className="flex items-end text-white justify-around min-h-16">
        <Link href="/" className="flex flex-col items-center gap-1 justify-end">
          <RiHome2Line size={24} strokeWidth={0.1} />
          <div className="text-[12px]">Home</div>
        </Link>
        <div className="flex flex-col items-center gap-1 justify-end">
          {' '}
          <MdOutlineCategory size={24} onClick={toggleDrawer} />
          <div className="text-[12px]">Collection</div>
        </div>

        <Link
          href="/cart"
          className={`relative hover:text-gray-400 flex flex-col items-center gap-1 justify-end`}
        >
          <LuShoppingBag size={20} />
          <div className="text-[12px]">Vcart</div>
          {cart_count > 0 && (
            <sup className="absolute -right-[8px]  h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
              {cart_count}
            </sup>
          )}
        </Link>
        <Link
          href="/orders"
          className="flex flex-col items-center gap-1 justify-end"
        >
          <LuPackage size={24} />
          <div className="text-[12px]">Orders</div>
        </Link>
        <AuthenticatedLink
          href="/profile"
          className=" hover:text-gray-400 flex flex-col items-center gap-1 justify-end"
        >
          <LuUser2 size={20} />
          <div className="text-[12px]">Me</div>
        </AuthenticatedLink>
        {/* {isDrawerOpen && <CategoriesDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />}    */}
      </div>
    </footer>
  );
};

export default BottomNavbar;
