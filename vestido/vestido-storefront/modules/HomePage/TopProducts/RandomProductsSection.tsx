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
      className={`flex flex-col items-center justify-center ${clsx(className)}`}
    >
      <div className="text-2xl md:text-4xl tracking-wide text-white font-semibold hover:text-[#48cab2] pb-6">
        Our Bestsellers
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
        {shuffledItems.map((item, index) => (
          <ProductTile key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
