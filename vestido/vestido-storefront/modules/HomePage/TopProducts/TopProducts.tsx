import SpecialOfferCard from './TopProductCard';

import { FC } from 'react';
import clsx from 'clsx';
import { useItems } from '@vestido-ecommerce/items';

type SpecialOfferProps = {
  className?: string;
};

export const TopProducts: FC<SpecialOfferProps> = (props) => {
  const { data } = useItems();

  return (
    <div className={`flex flex-col items-center ${clsx(props.className)}`}>
      <div className="text-4xl tracking-wide text-[#333333] font-extrabold hover:text-[#48cab2] pb-12">
        Top Products of this Week
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {data?.slice(0, 5).map((data, index) => (
          <SpecialOfferCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
