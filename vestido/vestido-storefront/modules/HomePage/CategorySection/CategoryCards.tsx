import category1 from '../../../assets/category/coats.jpg';
import category2 from '../../../assets/category/jackets.jpg';
import category3 from '../../../assets/category/shirts.jpg';
import category4 from '../../../assets/category/jeans.jpg';
import category5 from '../../../assets/category/tshirts.jpg';
import category6 from '../../../assets/category/shoes.jpg';
import { FC } from 'react';
import clsx from 'clsx';
import CategoryCard, { CategoryCardData } from './CategoryCard';

const cards: CategoryCardData[] = [
  {
    cardImage: category1,
    title: 'Coats',
  },
  {
    cardImage: category2,
    title: 'Jackets',
  },
  {
    cardImage: category3,
    title: 'Shirts',
  },
  {
    cardImage: category4,
    title: 'Jeans',
  },
  {
    cardImage: category5,
    title: 'T-Shirts',
  },
  {
    cardImage: category6,
    title: 'Shoes',
  },
];
type CategoryCardProps = {
  className?: string;
};

export const CategoryCards: FC<CategoryCardProps> = (props) => {
  return (
    <div className={`flex flex-col items-center ${clsx(props.className)}`}>
      <div className="grid grid-cols-2 gap-2 px-2 md:px-auto md:flex md:gap-8">
        {' '}
        {cards.map((card, index) => (
          <CategoryCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};
