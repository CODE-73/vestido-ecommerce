import { FC } from 'react';

import clsx from 'clsx';

import cardImage1 from '../../../assets/popular/brown.jpg';
import cardImage2 from '../../../assets/popular/chair.jpg';
import cardImage5 from '../../../assets/popular/floor.jpg';
import cardImage3 from '../../../assets/popular/purple.jpg';
import PopularCollectionCard, {
  PopularCollectionCardData,
} from './PopularCollectionCard';

const cards: PopularCollectionCardData[] = [
  {
    cardImage: cardImage1,
    mainTitle: 'the all-in-one',
  },
  {
    cardImage: cardImage2,
    mainTitle: 'complete your look',
    span: 'col-span-2 row-span-2',
  },

  {
    cardImage: cardImage3,
    mainTitle: 'top trending',
  },

  {
    cardImage: cardImage5,
    mainTitle: 'new in',
  },
];

type PopularCollectionProps = {
  className?: string;
};

export const PopularCollection: FC<PopularCollectionProps> = (props) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${clsx(props.className)}`}
    >
      <div className="text-2xl md:text-4xl tracking-wide text-[#333333] font-bold">
        Popular Collection
      </div>

      <div className="flex flex-col md:grid md:grid-cols-4 gap-3 mt-7 md:mt-12">
        {cards.map((card, index) => (
          <PopularCollectionCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};
