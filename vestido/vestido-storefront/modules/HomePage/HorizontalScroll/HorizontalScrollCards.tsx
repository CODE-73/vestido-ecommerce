import { FC } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import clsx from 'clsx';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import cardImage1 from '../../../assets/cards/card-1.jpg';
import cardImage2 from '../../../assets/cards/card-2.jpg';
import cardImage3 from '../../../assets/cards/card-3.jpg';
import cardImage4 from '../../../assets/cards/card-4.jpg';
import cardImage5 from '../../../assets/cards/card-5.jpg';
import cardImage6 from '../../../assets/cards/card-6.jpg';
import { ScrollCardData } from './HorizontalScrollCard';
import HorizontalScrollCard from './HorizontalScrollCard';

type HorizontalScrollCardsProps = {
  className?: string;
};

const cards: ScrollCardData[] = [
  {
    cardImage: cardImage1,
    mainTitle: 'what to buy now',
    subtitle1: 'new collection',
    subtitle2: 'Mysterious. Hypnotic. Surreal. Multifaceted. Daring',
  },
  {
    cardImage: cardImage2,
    mainTitle: "Season's must haves",
    subtitle1: 'need-it-now',
    subtitle2: 'Contemporary, minimal and beautifully iconic.',
  },
  {
    cardImage: cardImage3,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
  {
    cardImage: cardImage4,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
  {
    cardImage: cardImage5,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
  {
    cardImage: cardImage6,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
];
export const HorizontalScrollCards: FC<HorizontalScrollCardsProps> = (
  props,
) => {
  const isMdOrAbove = useMediaQuery('(min-width:768px)');
  const height = '860px';
  return (
    <>
      {isMdOrAbove ? (
        <Carousel
          opts={{
            align: 'start',
          }}
          style={{ height: height, minHeight: height }}
          className={clsx(props.className)}
        >
          <CarouselContent>
            {cards.map((card, index) => (
              <HorizontalScrollCard key={index} data={card} />
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 sm:left-10" />
          <CarouselNext className="absolute right-2 sm:right-10" />
        </Carousel>
      ) : (
        <Carousel
          opts={{
            align: 'start',
          }}
          className={clsx(props.className)}
        >
          <CarouselContent>
            {cards.map((card, index) => (
              <HorizontalScrollCard key={index} data={card} />
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 sm:left-10" />
          <CarouselNext className="absolute right-2 sm:right-10" />
        </Carousel>
      )}{' '}
    </>
  );
};
