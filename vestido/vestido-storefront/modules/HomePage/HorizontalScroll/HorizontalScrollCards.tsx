import { FC } from 'react';
import { z } from 'zod';

import clsx from 'clsx';
import {
  StorefrontHomeDataSchema,
  useVestidoHomeData,
} from 'libs/settings/src/hooks/use-storefront-home-data';
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
};
export const HorizontalScrollCards: FC<HorizontalScrollCardsProps> = (
  className,
) => {
  const home_data = useVestidoHomeData();
  const scroll_cards = home_data?.horizontal_scroll_cards;
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
        }}
        className={`${clsx(className)} lg:h-[50vh] lg:min-h-[50vh]  xl:h-[65vh] xl:min-h-[65vh]`}
      >
        <CarouselContent className="flex max-w-content">
          {scroll_cards?.map((card, index) => (
            <HorizontalScrollCard key={index} data={card} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 sm:left-10" />
        <CarouselNext className="absolute right-2 sm:right-10" />
      </Carousel>
    </>
  );
};
