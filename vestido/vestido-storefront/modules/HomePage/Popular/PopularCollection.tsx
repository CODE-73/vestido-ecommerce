import PopularCollectionCard, {
  PopularCollectionCardData,
} from './PopularCollectionCard';

import cardImage2 from '../../../assets/popular/chair.jpg';
import cardImage5 from '../../../assets/popular/floor.jpg';

import cardImage3 from '../../../assets/popular/purple.jpg';

import cardImage4 from '../../../assets/popular/shoe.jpg';
import cardImage1 from '../../../assets/popular/brown.jpg';

import { FC } from 'react';
import clsx from 'clsx';

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
    cardImage: cardImage4,
    mainTitle: 'the all-in-one',
    textColor: '[#333333]',
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
    <div className={`flex flex-col items-center ${clsx(props.className)}`}>
      <div className="text-4xl tracking-wide text-[#333333] font-extrabold">
        Popular Collection
      </div>
      <div className="text-[#777777] pt-2 pb-10 text-lg">
        Visit our shop to see amazing creations from our designers.
      </div>
      <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <PopularCollectionCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};
