import * as React from 'react';
import { useEffect, useState } from 'react';

import { LuChevronUp } from 'react-icons/lu';

import { ListItemResponse } from '@vestido-ecommerce/items/client';

import useIsMobile from '../../hooks/useIsMobile';
import { CircleLinks } from './CircleLinks/CircleLinks';
import { HorizontalScrollCards } from './HorizontalScroll/HorizontalScrollCards';
import { PopularCollection } from './Popular/PopularCollection';
import { PrimaryCarousel } from './PrimaryCarousel/PrimaryCarousel';
import { RandomProducts } from './TopProducts/RandomProductsSection';
import { TopProducts } from './TopProducts/TopProducts';

type HomePageProps = {
  items: NonNullable<ListItemResponse>;
};

const BackToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="fixed bottom-24 z-10 right-8 bg-neutral-500  text-white px-4 py-4 shadow transition-colors duration-200"
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
    <div className="flex flex-col justify-center bg-black sm:pt-5 lg:pb-10">
      <div className="flex flex-col lg:flex-col-reverse justify-center lg:mx-4 mt-10 md:mt-2">
        <CircleLinks /> <PrimaryCarousel />
      </div>
      <TopProducts
        items={items}
        className="pt-16 pb-10 sm:pt-24 max-w-[100vw]  px-2 sm:px-0 md:px-4 lg:max-w-[100rem] lg:self-center"
      />
      <HorizontalScrollCards className="w-full relative my-20 px-1 sm:px-0" />
      <RandomProducts
        items={items}
        className="max-w-[100vw] overflow-hidden px-2 sm:px-0 md:px-4 lg:max-w-[100rem] lg:self-center "
      />
      <PopularCollection className="pt-16 md:pt-20 xl:pt-28 px-1 sm:px-0" />
      {!isMobile && showBackToTop && <BackToTopButton onClick={scrollToTop} />}
    </div>
  );
};

export default HomePage;
