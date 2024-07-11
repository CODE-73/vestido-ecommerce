import * as React from 'react';
import MainHeader from './MainHeader';
import FixedHeader from './FixedHeader';
import { useInView } from 'react-intersection-observer';
import MobileHeader from './MobileHeader';
import AddOnHeader from './AddOnHeader';
import { useCart } from '@vestido-ecommerce/items';

const Header = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data: cart } = useCart();
  const no_of_cart_items = cart?.data.length;

  return (
    <>
      <div className="hidden sm:block" ref={ref}>
        {inView ? (
          <>
            <AddOnHeader />
            <hr />

            <MainHeader data={no_of_cart_items} />
          </>
        ) : (
          <div className="fixed left-0 z-10 w-full">
            <FixedHeader data={no_of_cart_items} />
          </div>
        )}
      </div>
      <div className="fixed w-screen left-0 top-0 z-50 sm:hidden">
        <MobileHeader data={no_of_cart_items} />
      </div>
    </>
  );
};

export default Header;
