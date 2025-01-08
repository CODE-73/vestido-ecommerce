import { FC } from 'react';

import clsx from 'clsx';

import { useVestidoHomeData } from '@vestido-ecommerce/settings/client';

import PopularCollectionCard from './PopularCollectionCard';

type PopularCollectionProps = {
  className?: string;
};

export const PopularCollection: FC<PopularCollectionProps> = (props) => {
  const home_data = useVestidoHomeData();
  const collage = home_data?.collage;
  return (
    <div
      className={`flex flex-col items-center justify-center ${clsx(props.className)}`}
    >
      <h3 className="text-2xl md:text-4xl tracking-wide text-white">
        Popular Collection
      </h3>

      <div className="flex flex-col w-full md:grid md:grid-cols-4 gap-3 mt-7 md:mt-12">
        {collage?.map((card, index) => (
          <PopularCollectionCard
            key={index}
            data={card}
            mainImage={index === 1}
          />
        ))}
      </div>
    </div>
  );
};
