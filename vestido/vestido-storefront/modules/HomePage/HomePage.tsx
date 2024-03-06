import * as React from 'react';
import { PrimaryCarousel } from './PrimaryCarousel/PrimaryCarousel';
import { HorizontalScrollCards } from './HorizontalScroll/HorizontalScrollCards';
import { PopularCollection } from './Popular/PopularCollection';
import { SpecialOffer } from './SpecialOffer/SpecialOffer';
import { FinalSection } from './FinalSection/FinalSection';
import { WelcomeToStore } from './WelcomeToStore/WelcomeToStore';
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <PrimaryCarousel />
      <HorizontalScrollCards className="w-full relative pt-3 px-1 sm:px-0" />
      <WelcomeToStore className="pt-10 sm:pt-16 px-1 sm:px-0" />
      <PopularCollection className="pt-16 px-1 sm:px-0" />
      <SpecialOffer className="pt-16 sm:pt-24 max-w-[100vw] overflow-hidden px-4 sm:px-0" />
      <FinalSection className="pt-16 px-1 sm:px-0" />
    </div>
  );
};

export default HomePage;
