import { FC } from 'react';
import { z } from 'zod';

import clsx from 'clsx';
import { StorefrontHomeDataSchema } from 'libs/settings/src/hooks/use-storefront-home-data';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@vestido-ecommerce/shadcn-ui/carousel';

// import cardImage1 from '../../../assets/cards/card-1.jpg';
// import cardImage2 from '../../../assets/cards/card-2.jpg';
// import cardImage3 from '../../../assets/cards/card-3.jpg';
// import cardImage4 from '../../../assets/cards/card-4.jpg';
// import cardImage5 from '../../../assets/cards/card-5.jpg';
// import cardImage6 from '../../../assets/cards/card-6.jpg';
import HorizontalScrollCard from './HorizontalScrollCard';

export type HorizontalScrollCards = z.infer<
  typeof StorefrontHomeDataSchema
>['horizontal_scroll_cards'];

type HorizontalScrollCardsProps = {
  className?: string;
  data?: HorizontalScrollCards;
};

// const cards: ScrollCardData[] = [
//   {
//     cardImage: {
//       blurHash: '',
//       blurHashDataURL: '',
//       alt: 'alt',
//       key: '',
//       url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

//       displayIndex: 1,
//       default: true,
//     },
//     mainTitle: 'what to buy now',
//     subtitle1: 'new collection',
//     subtitle2: 'Mysterious. Hypnotic. Surreal. Multifaceted. Daring',
//   },
//   {
//     cardImage: {
//       blurHash: '',
//       blurHashDataURL: '',
//       alt: 'alt',
//       key: '',
//       url: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

//       displayIndex: 1,
//       default: true,
//     },
//     mainTitle: "Season's must haves",
//     subtitle1: 'need-it-now',
//     subtitle2: 'Contemporary, minimal and beautifully iconic.',
//   },
//   {
//     cardImage: {
//       blurHash: '',
//       blurHashDataURL: '',
//       alt: 'alt',
//       key: '',
//       url: 'https://images.unsplash.com/photo-1594843310428-7eb6729555e9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

//       displayIndex: 1,
//       default: true,
//     },
//     mainTitle: 'get upto 50% off!',
//     subtitle1: "don't miss today's featured deals",
//     subtitle2: 'Here to bring your lifestyles to next level',
//   },
//   // {
//   //   cardImage: cardImage4,
//   //   mainTitle: 'get upto 50% off!',
//   //   subtitle1: "don't miss today's featured deals",
//   //   subtitle2: 'Here to bring your lifestyles to next level',
//   // },
//   // {
//   //   cardImage: cardImage5,
//   //   mainTitle: 'get upto 50% off!',
//   //   subtitle1: "don't miss today's featured deals",
//   //   subtitle2: 'Here to bring your lifestyles to next level',
//   // },
//   // {
//   //   cardImage: cardImage6,
//   //   mainTitle: 'get upto 50% off!',
//   //   subtitle1: "don't miss today's featured deals",
//   //   subtitle2: 'Here to bring your lifestyles to next level',
//   // },
// ];
export const HorizontalScrollCards: FC<HorizontalScrollCardsProps> = (
  props,
) => {
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
        }}
        className={`${clsx(props.className)} lg:h-[50vh] lg:min-h-[50vh]  xl:h-[65vh] xl:min-h-[65vh]`}
      >
        <CarouselContent className="flex max-w-content">
          {/* {cards.map((card, index) => (
            <HorizontalScrollCard key={index} data={card} />
          ))} */}
          {props?.data?.map((card, index) => (
            <HorizontalScrollCard key={index} data={card} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 sm:left-10" />
        <CarouselNext className="absolute right-2 sm:right-10" />
      </Carousel>
    </>
  );
};
