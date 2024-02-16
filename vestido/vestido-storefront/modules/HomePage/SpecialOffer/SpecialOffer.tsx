import SpecialOfferCard, { SpecialOfferCardData } from './SpecialOfferCard';

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
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@vestido-ecommerce/shadcn-ui/carousel';
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
];

type SpecialOfferProps = {
  className?: string;
};

export const SpecialOffer: FC<SpecialOfferProps> = (props) => {
  return (
    <div className={`flex flex-col items-center ${clsx(props.className)}`}>
      <div className="text-4xl tracking-wide text-[#333333] font-extrabold">
        Special Offer
      </div>
      <div className="text-[#777777] pt-2 pb-10 text-lg">
        Don&apos;t miss today&apos;s featured deals
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="relative"
      >
        <div className="md:px-64 lg:px-96">
          <CarouselContent>
            {cards.map((card, index) => (
              <SpecialOfferCard key={index} data={card} />
            ))}
          </CarouselContent>
        </div>
        <CarouselPrevious className="absolute left-2 md:left-64" />
        <CarouselNext className="absolute right-2 md:right-64" />
      </Carousel>
    </div>
  );
};
