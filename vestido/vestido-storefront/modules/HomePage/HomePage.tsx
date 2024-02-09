import * as React from 'react';
import { PrimaryCarousel } from './PrimaryCarousel';
import { HorizontalScrollCards } from './HorizontalScrollCards';
const HomePage: React.FC = () => {
  return (
    <div>
      <PrimaryCarousel />
      <div className='pt-3'><HorizontalScrollCards/></div>
    </div>
  );
};

export default HomePage;
