import * as React from 'react';

import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';

import { useVestidoHomeData } from '@vestido-ecommerce/settings/client';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import PrimaryCarouselItem from './PrimaryCarouselItem';

export const PrimaryCarousel: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const home_data = useVestidoHomeData();
  const hero_carousel = home_data?.hero_carousel;

  return (
    <div className=" overflow-hidden lg:rounded-[25px]">
      <Carousel
        plugins={[plugin.current]}
        className=" pr-0 relative bg-black"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-64 sm:h-auto">
          {hero_carousel?.map((slide, index) => (
            <PrimaryCarouselItem data={slide} key={index} />
          ))}
        </CarouselContent>
        <div className="absolute bottom-2 md:bottom-10 left-1/2 transform -translate-x-1/2">
          <CarouselDots>
            {({ scrollSnap, onClick, selectedIndex, index }) => (
              <button
                className={clsx('rounded-full md:rounded-none h-1', {
                  'bg-[#333] w-4 md:w-8': selectedIndex === index,
                  'w-2 md:w-3 bg-white': selectedIndex !== index,
                })}
                key={scrollSnap}
                onClick={() => onClick(index)}
              ></button>
            )}
          </CarouselDots>
        </div>
      </Carousel>
    </div>
  );
};
