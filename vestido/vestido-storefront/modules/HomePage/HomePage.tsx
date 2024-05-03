import * as React from 'react';
import { PrimaryCarousel } from './PrimaryCarousel/PrimaryCarousel';
// import { SpecialOffer } from './SpecialOffer/SpecialOffer';
import { CategoryCards } from './CategorySection/CategoryCards';
import { TopProducts } from './TopProducts/TopProducts';
import { PopularCollection } from './Popular/PopularCollection';
import { HorizontalScrollCards } from './HorizontalScroll/HorizontalScrollCards';
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <PrimaryCarousel />
      <CategoryCards className="pt-4" />
      <TopProducts className="pt-16 sm:pt-24 max-w-[100vw] overflow-hidden px-4 sm:px-0" />
      <PopularCollection className="pt-16 px-1 sm:px-0" />
      <HorizontalScrollCards className="w-full relative pt-24 px-1 sm:px-0" />
    </div>
  );
};

export default HomePage;
