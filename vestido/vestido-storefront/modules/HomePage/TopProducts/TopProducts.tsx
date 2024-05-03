import SpecialOfferCard, { SpecialOfferCardData } from './TopProductCard';
import product11 from '../../../assets/offer-products/product1-1.jpg';
import product12 from '../../../assets/offer-products/product1-2.jpg';
import product21 from '../../../assets/offer-products/product2-1.jpg';
import product22 from '../../../assets/offer-products/product2-2.jpg';
import product31 from '../../../assets/offer-products/product3-1.jpg';
import product32 from '../../../assets/offer-products/product3-2.jpg';
import product41 from '../../../assets/offer-products/product4-1.jpg';
import product42 from '../../../assets/offer-products/product4-2.jpg';
import product51 from '../../../assets/offer-products/product5-1.jpg';
import product52 from '../../../assets/offer-products/product5-2.jpg';
import product61 from '../../../assets/offer-products/product6-1.jpg';
import product62 from '../../../assets/offer-products/product6-2.jpg';
import product71 from '../../../assets/offer-products/product7-1.jpg';
import product72 from '../../../assets/offer-products/product7-2.jpg';
import product81 from '../../../assets/offer-products/product8-1.jpg';
import product82 from '../../../assets/offer-products/product8-2.jpg';
import product91 from '../../../assets/offer-products/product9-1.jpg';
import product92 from '../../../assets/offer-products/product9-2.jpg';
import product101 from '../../../assets/offer-products/product10-1.jpg';
import product102 from '../../../assets/offer-products/product10-2.jpg';

import { FC } from 'react';
import clsx from 'clsx';

const cards: SpecialOfferCardData[] = [
  {
    cardImage1: product11,
    cardImage2: product12,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product21,
    cardImage2: product22,
    name: 'Metallic Effect Bag',
    brand: 'guess',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product31,
    cardImage2: product32,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product41,
    cardImage2: product42,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product51,
    cardImage2: product52,
    name: 'Metallic Effect Bag',
    brand: 'guess',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product61,
    cardImage2: product62,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },

  {
    cardImage1: product71,
    cardImage2: product72,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product81,
    cardImage2: product82,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product91,
    cardImage2: product92,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product101,
    cardImage2: product102,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
];

type SpecialOfferProps = {
  className?: string;
};

export const TopProducts: FC<SpecialOfferProps> = (props) => {
  return (
    <div className={`flex flex-col items-center ${clsx(props.className)}`}>
      <div className="text-4xl tracking-wide text-[#333333] font-extrabold hover:text-[#48cab2] pb-12">
        Top Products of this Week
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {cards.map((card, index) => (
          <SpecialOfferCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};
