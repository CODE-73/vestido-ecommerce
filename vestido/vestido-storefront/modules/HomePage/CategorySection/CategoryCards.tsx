import category1 from '../../../assets/category/bodycon.jpeg';
import category2 from '../../../assets/category/wrap.jpeg';
import category3 from '../../../assets/category/floral.jpeg';
import category4 from '../../../assets/category/shirts.jpeg';
import category5 from '../../../assets/category/tshirts.jpg';
import category6 from '../../../assets/category/jeans.jpg';
import { FC } from 'react';
import CategoryCard, { CategoryCardData } from './CategoryCard';

const cards: CategoryCardData[] = [
  {
    cardImage: category1,
    title: 'Bodycon Dress',
  },
  {
    cardImage: category2,
    title: 'Wrap Dress',
  },
  {
    cardImage: category3,
    title: 'Floral Dress',
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

type CategoryCardProps = {
  className?: string;
};

export const CategoryCards: FC<CategoryCardProps> = (props) => {
  return (
    <div className="w-full lg:w-auto overflow-x-auto no-scrollbar">
      <div className="flex space-x-4 lg:space-x-2 px-4">
        {cards.map((card, index) => (
          <CategoryCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};
