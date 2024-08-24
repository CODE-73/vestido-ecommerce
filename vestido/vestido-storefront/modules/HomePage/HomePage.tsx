import * as React from 'react';
import { useEffect, useState } from 'react';

import { LuChevronUp } from 'react-icons/lu';

import { ListItemResponse } from '@vestido-ecommerce/items';

import useIsMobile from '../../hooks/useIsMobile';
import AddOnHeader from '../../layouts/headers/SubHeader';
import { CategoryCards } from './CategorySection/CategoryCards';
import { HorizontalScrollCards } from './HorizontalScroll/HorizontalScrollCards';
import { PopularCollection } from './Popular/PopularCollection';
import { PrimaryCarousel } from './PrimaryCarousel/PrimaryCarousel';
import { TopProducts } from './TopProducts/TopProducts';

type HomePageProps = {
  items: NonNullable<ListItemResponse>;
};

const BackToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="fixed bottom-8 right-8 bg-neutral-800 hover:bg-[#48CAB2] text-white px-4 py-4 shadow transition-colors duration-200"
    onClick={onClick}
  >
    <LuChevronUp />
  </button>
);

const HomePage: React.FC<HomePageProps> = ({ items }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col justify-center ">
      <div className="sm:hidden -mt-8  mb-4 shadow">
        <AddOnHeader />
      </div>
      <div className="flex flex-col lg:flex-col-reverse justify-center lg:mx-4">
        <CategoryCards /> <PrimaryCarousel />
      </div>
      <TopProducts
        items={items}
        className="pt-16 sm:pt-24 max-w-[100vw] overflow-hidden px-2 sm:px-0 md:px-4 lg:max-w-7xl lg:self-center"
      />
      <HorizontalScrollCards className="w-full relative my-20 px-1 sm:px-0" />{' '}
      <PopularCollection className="pt-16 px-1 sm:px-0" />
      {!isMobile && showBackToTop && <BackToTopButton onClick={scrollToTop} />}
    </div>
  );
};

export default HomePage;
