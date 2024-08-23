import { FC } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import clsx from 'clsx';

import { useItems } from '@vestido-ecommerce/items';

import TopProductCard from './TopProductCard';

type SpecialOfferProps = {
  className?: string;
};

export const TopProducts: FC<SpecialOfferProps> = (props) => {
  const { data } = useItems();
  const isMdAndAbove = useMediaQuery('(min-width: 768px)');

  return (
    <div
      className={`flex flex-col items-center justify-center ${clsx(props.className)}`}
    >
      <div className="text-2xl md:text-4xl tracking-wide text-[#333333] font-bold hover:text-[#48cab2] pb-12">
        Top Products of the Week
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {isMdAndAbove
          ? data
              ?.slice(0, 5)
              .map((data, index) => <TopProductCard key={index} data={data} />)
          : data
              ?.slice(0, 6)
              .map((data, index) => <TopProductCard key={index} data={data} />)}
      </div>
    </div>
  );
};
