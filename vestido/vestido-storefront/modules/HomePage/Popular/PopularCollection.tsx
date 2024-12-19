import { FC } from 'react';

import clsx from 'clsx';

// import cardImage1 from '../../../assets/popular/brown.jpg';
// import cardImage2 from '../../../assets/popular/chair.jpg';
// import cardImage5 from '../../../assets/popular/floor.jpg';
// import cardImage3 from '../../../assets/popular/purple.jpg';
// import cardImage4 from '../../../assets/popular/shoe.jpg';
import PopularCollectionCard, {
  PopularCollectionCardData,
} from './PopularCollectionCard';

const cards: PopularCollectionCardData[] = [
  {
    cardImage: {
      blurHash: '',
      blurHashDataURL: '',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1594843310428-7eb6729555e9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'the all-in-one',
  },
  {
    cardImage: {
      blurHash: '',
      blurHashDataURL: '',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1594843310428-7eb6729555e9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'complete your look',
  },

  {
    cardImage: {
      blurHash: '',
      blurHashDataURL: '',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1594843310428-7eb6729555e9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'top trending',
  },
  {
    cardImage: {
      blurHash: '',
      blurHashDataURL: '',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1594843310428-7eb6729555e9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'the all-in-one',
    textColor: '[#333333]',
  },

  {
    cardImage: {
      blurHash: '',
      blurHashDataURL: '',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1594843310428-7eb6729555e9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
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
      <h3 className="text-2xl md:text-4xl tracking-wide text-white">
        Popular Collection
      </h3>

      <div className="flex flex-col w-full md:grid md:grid-cols-4 gap-3 mt-7 md:mt-12">
        {cards.map((card, index) => (
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
