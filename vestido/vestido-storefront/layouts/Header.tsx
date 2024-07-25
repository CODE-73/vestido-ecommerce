import * as React from 'react';

import { useInView } from 'react-intersection-observer';

import { useCart, useWishlist } from '@vestido-ecommerce/items';

import AddOnHeader from './AddOnHeader';
import FixedHeader from './FixedHeader';
import MainHeader from './MainHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data: cart } = useCart();
  const cart_count = cart?.data.length;

  const { data: wishlist } = useWishlist();
  const wishlist_count = wishlist?.data.length;

  return (
    <>
      <div className="hidden sm:block" ref={ref}>
        {inView ? (
          <>
            <AddOnHeader />
            <hr />

            <MainHeader
              cart_count={cart_count}
              wishlist_count={wishlist_count}
            />
          </>
        ) : (
          <div className="fixed left-0 z-10 w-full">
            <FixedHeader
              cart_count={cart_count}
              wishlist_count={wishlist_count}
            />
          </div>
        )}
      </div>
      <div className="fixed w-screen left-0 top-0 z-50 sm:hidden">
        <MobileHeader cart_count={cart_count} wishlist_count={wishlist_count} />
      </div>
    </>
  );
};

export default Header;
