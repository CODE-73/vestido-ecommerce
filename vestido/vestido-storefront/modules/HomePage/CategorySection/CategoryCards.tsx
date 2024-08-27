import { FC } from 'react';

import category1 from '../../../assets/category/bodycon.jpeg';
import category3 from '../../../assets/category/floral.jpeg';
import category6 from '../../../assets/category/jeans.jpg';
import category4 from '../../../assets/category/shirts.jpeg';
import category5 from '../../../assets/category/tshirts.jpg';
import category2 from '../../../assets/category/wrap.jpeg';
import CategoryCard, { CategoryCardData } from './CategoryCard';

const cards: CategoryCardData[] = [
  {
    cardImage: category1,
    title: 'Bodycon Dresses',
  },
  {
    cardImage: category2,
    title: 'Wrap Dresses',
  },
  {
    cardImage: category3,
    title: 'Floral Dresses',
  },
  {
    cardImage: category4,
    title: 'Shirts',
  },
  {
    cardImage: category5,
    title: 'T-Shirts',
  },
  {
    cardImage: category6,
    title: 'Pants',
  },
  {
    cardImage: category6,
    title: 'Pants',
  },
  {
    cardImage: category6,
    title: 'Pants',
  },
];

export const CategoryCards: FC = () => {
  return (
    <div className="w-full lg:w-auto overflow-x-auto no-scrollbar sm:pt-4 lg:pt-10">
      <div className="flex space-x-4 lg:space-x-2 px-4 lg:justify-center">
        {cards.map((card, index) => (
          <CategoryCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};
