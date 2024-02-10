import * as React from 'react';
import { PrimaryCarousel } from './PrimaryCarousel/PrimaryCarousel';
import { HorizontalScrollCards } from './HorizontalScroll/HorizontalScrollCards';
import { PopularCollection } from './Popular/PopularCollection';
import { SpecialOffer } from './SpecialOffer/SpecialOffer';
import { FinalSection } from './FinalSection/FinalSection';
import { WelcomeToStore } from './WelcomeToStore/WelcomeToStore';
const HomePage: React.FC = () => {
  return (
    <div >
      <PrimaryCarousel />
      <div className='pt-3'><HorizontalScrollCards/></div>
      <div className='pt-16'> <WelcomeToStore/></div>
      <div className='pt-16'><PopularCollection/></div> 
      <div className='pt-24'> <SpecialOffer/></div>
      <div className='pt-16'> <FinalSection/></div>
    </div>
  );
};

export default HomePage;
