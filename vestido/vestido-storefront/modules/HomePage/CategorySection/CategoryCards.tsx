import { FC } from 'react';

import { useVestidoHomeData } from '@vestido-ecommerce/settings/client';

import CategoryCard from './CategoryCard';

export const CategoryCards: FC = () => {
  const home_data = useVestidoHomeData();
  const category_cards = home_data?.hero_categories;

  return (
    <div className="w-full lg:w-auto overflow-x-auto no-scrollbar sm:pt-4 sm:pb-5 lg:pb-auto lg:pt-10">
      <div className="flex space-x-4 lg:space-x-2 px-4 lg:justify-center">
        {category_cards?.map((card, index) => (
          <CategoryCard key={index} category_card={card} />
        ))}
      </div>
    </div>
  );
};
