import * as React from 'react';
import { PrimaryCarousel } from './PrimaryCarousel';
import { HorizontalScrollCards } from './HorizontalScrollCards';
import { PopularCollection } from './PopularCollection';
const HomePage: React.FC = () => {
  return (
    <div>
      <PrimaryCarousel />
      <div className='pt-3'><HorizontalScrollCards/></div>
      <div className='pt-16'><PopularCollection/></div> 
    </div>
  );
};

export default HomePage;
