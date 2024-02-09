import PopularCollectionCard, {
  PopularCollectionCardData,
} from './PopularCollectionCard';

import cardImage1 from '../../assets/popular/chair.jpg';
import cardImage2 from '../../assets/popular/floor.jpg';

import cardImage3 from '../../assets/popular/purple.jpg';

import cardImage4 from '../../assets/popular/shoe.jpg';

const cards: PopularCollectionCardData[] = [
  {
    cardImage: cardImage1,
    mainTitle: 'complete your look',
    subtitle1: "The world's most stylish women are buying right now",
    span: 'col-span-2 row-span-2',
  },
  {
    cardImage: cardImage2,
    mainTitle: 'new in',
    subtitle1: 'Shoes & Accessories',
  },
  {
    cardImage: cardImage3,
    mainTitle: 'top trending',
    subtitle1: 'Collectins 2023/24',
    textColor: 'white',
  },
  {
    cardImage: cardImage4,
    mainTitle: 'the all-in-one',
    subtitle1: 'Get upto 50% off',
    span: 'col-span-2',
  },
];

export function PopularCollection() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {' '}
      {cards.map((card, index) => (
        <PopularCollectionCard key={index} data={card} />
      ))}
    </div>
  );
}
