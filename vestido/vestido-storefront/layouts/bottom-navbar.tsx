import Link from 'next/link';

import { parseAsBoolean, useQueryState } from 'nuqs';
import { LuPackage, LuShoppingBag, LuUser2 } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';

import { AuthenticatedLink } from '@vestido-ecommerce/auth/client';
import { useCart } from '@vestido-ecommerce/items/client';

import CategoriesDrawer from './mobile-navbar-categories';

const BottomNavbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useQueryState(
    'drawerOpen',
    parseAsBoolean.withDefault(false).withOptions({ history: 'push' }),
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: cart } = useCart();
  const cart_count = cart?.data.length ?? 0;

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_20px_rgba(255,255,255,0.2)] rounded-tl-lg rounded-tr-lg bg-black transition-all ease-out duration-500 flex flex-col justify-between ${
        isDrawerOpen ? `h-screen-minus-nav pb-8` : 'h-16'
      }`}
    >
      {isDrawerOpen && (
        <CategoriesDrawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
      <div className="flex items-center justify-center h-16 text-white mt-auto">
        <div className="grid grid-cols-5 w-full max-w-[500px] mx-auto gap-2 ">
          <Link
            href="/"
            className="flex flex-col items-center justify-center h-16"
          >
            <RiHome2Line size={24} strokeWidth={0.1} />
            <div className="text-[12px]">Home</div>
          </Link>
          <button
            onClick={toggleDrawer}
            className="flex flex-col items-center justify-center h-16"
          >
            <MdOutlineCategory size={24} />
            <div className="text-[12px]">Collection</div>
          </button>
          <Link
            href="/cart"
            className="flex flex-col items-center justify-center h-16"
          >
            <LuShoppingBag size={24} />
            <div className="relative text-[12px]">
              Vca<span className="text-red-600">R</span>t
              {cart_count > 0 && (
                <sup className="absolute -right-[2px] -top-8 h-4 w-4 text-center rounded-full bg-white text-black font-semibold text-xs">
                  {cart_count}
                </sup>
              )}
            </div>
          </Link>
          <Link
            href="/profile/orders"
            className="flex flex-col items-center justify-center h-16"
          >
            <LuPackage size={24} />
            <div className="text-[12px]">Orders</div>
          </Link>
          <AuthenticatedLink
            href="/profile"
            className="flex flex-col items-center justify-center h-16"
          >
            <LuUser2 size={24} />
            <div className="text-[12px]">Me</div>
          </AuthenticatedLink>
        </div>
      </div>
    </footer>
  );
};

export default BottomNavbar;
