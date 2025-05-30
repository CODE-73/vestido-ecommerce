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
      className={`mt-5 shadow-[0_-4px_20px_rgba(255,255,255,0.2)]  rounded-tl-lg flex flex-col rounded-tr-lg bg-black shadow w-screen transition transition-all ease-out duration-500 ${isDrawerOpen ? `justify-between pb-8 h-screen-minus-nav` : 'h-16 justify-center'}`}
    >
      {isDrawerOpen && (
        <CategoriesDrawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
      <div className="flex items-end text-white justify-center min-h-16">
        <div className="grid grid-cols-5 w-full max-w-md">
          <Link
            href="/"
            className="flex flex-col items-center justify-end h-16 w-full"
          >
            <RiHome2Line size={24} strokeWidth={0.1} />
            <div className="text-[12px]">Home</div>
          </Link>
          <button
            onClick={toggleDrawer}
            className="flex flex-col items-center justify-end h-16 w-full"
          >
            <MdOutlineCategory size={24} />
            <div className="text-[12px]">Collection</div>
          </button>
          <Link
            href="/cart"
            className=" flex flex-col items-center justify-end h-16 w-full"
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
            className="flex flex-col items-center justify-end h-16 w-full"
          >
            <LuPackage size={24} />
            <div className="text-[12px]">Orders</div>
          </Link>
          <AuthenticatedLink
            href="/profile"
            className="flex flex-col items-center justify-end h-16 w-full"
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
