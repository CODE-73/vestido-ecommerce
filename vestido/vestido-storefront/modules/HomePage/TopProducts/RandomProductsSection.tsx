import { FC } from 'react';

import clsx from 'clsx';

import { type ListItemResponse } from '@vestido-ecommerce/items';

import ProductTile from '../../ProductListView/ProductTile';

type RandomProductsProps = {
  className?: string;
  items: NonNullable<ListItemResponse>;
};

export const RandomProducts: FC<RandomProductsProps> = ({
  className,
  items,
}) => {
  function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  const shuffledItems = shuffleArray(items).slice(0, 6);
  return (
    <div
      className={`flex flex-col md:items-center justify-center ${clsx(className)}`}
    >
      <h3 className="text-2xl self-center md:text-4xl tracking-wide text-white  pb-6 pt-20 md:pt-24 ">
        Our Bestsellers
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-8">
        {shuffledItems.map((item, index) => (
          <ProductTile key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
