import { useInView } from 'react-intersection-observer';

import { useCart, useWishlist } from '@vestido-ecommerce/items';
import { em2px } from '@vestido-ecommerce/utils';

import AddOnHeader from './AddOnHeader';
import FixedHeader from './FixedHeader';
import MainHeader from './MainHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  const { ref, inView } = useInView({
    initialInView: window.scrollY < em2px(5),
    threshold: 0,
  });

  const { data: cart } = useCart();
  const cart_count = cart?.data.length;

  const { data: wishlist } = useWishlist();
  const wishlist_count = wishlist?.data.length;

  return (
    <>
      <div className="hidden sm:block" ref={ref}>
        <AddOnHeader />
        <hr />
        <MainHeader cart_count={cart_count} wishlist_count={wishlist_count} />

        {!inView && (
          <div className="fixed left-0 top-0 z-10 w-full">
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
