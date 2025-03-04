import { useCart, useWishlist } from '@vestido-ecommerce/items/client';

import MainHeader from './MainHeader';
import MobileHeader from './MobileHeader';
import SubHeader from './SubHeader';

const Header = () => {
  const { data: cart } = useCart();
  const cart_count = cart?.data.length ?? 0;

  const { data: wishlist } = useWishlist();
  const wishlist_count = wishlist?.data.length ?? 0;

  return (
    <>
      <div className="hidden sm:block">
        <MainHeader cart_count={cart_count} wishlist_count={wishlist_count} />
      </div>
      <div className="fixed w-screen left-0 top-0 z-50 sm:hidden">
        <MobileHeader cart_count={cart_count} wishlist_count={wishlist_count} />
              </div>
    </>
  );
};

export default Header;
