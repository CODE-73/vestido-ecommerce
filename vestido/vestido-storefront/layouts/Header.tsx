import * as React from 'react';
import CategoryHeader from './MainHeader';
import FixedHeader from './FixedHeader';
import { useInView } from 'react-intersection-observer';
import MobileHeader from './MobileHeader';
import AddOnHeader from './AddOnHeader';

const Header = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <div className="hidden sm:block" ref={ref}>
        {inView ? (
          <>
            <AddOnHeader />
            <hr />

            <CategoryHeader />
          </>
        ) : (
          <div className="fixed left-0 z-10 w-full">
            <FixedHeader />
          </div>
        )}
      </div>
      <div className="fixed w-screen left-0 top-0 z-50 sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
};

export default Header;
