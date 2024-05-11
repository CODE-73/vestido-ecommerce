import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import image1 from '../../../assets/carousel/slide-1.jpg';
import image2 from '../../../assets/carousel/slide-2.jpg';
import image3 from '../../../assets/carousel/slide-3.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
} from 'libs/shadcn-ui/src/ui/carousel';
import PrimaryCarouselItem, {
  PrimaryCarouselItemData,
} from './PrimaryCarouselItem';
import clsx from 'clsx';

const carouselSlides: PrimaryCarouselItemData[] = [
  {
    backgroundImage: image1,
    mainTitle: 'find your new favourite clothing',
    subtitle1: 'new collection',
    subtitle2:
      'Keep perfect time with the contemporary, expertly-crafted designs.',
    buttonText: 'discover now!',
    buttonLink: '1',
    textAlign: 'left',
    textColor: '[#333333]',
    textPosition: 'left-6',
  },
  {
    backgroundImage: image2,
    mainTitle: 'must-haves for the season',
    subtitle1: 'need-it-now',
    subtitle2: 'Contemporary, minimal and beautifully iconic.',
    buttonText: 'discover now!',
    buttonLink: '2',
    textAlign: 'center',
    textColor: 'white',
    textPosition: 'left-6',
  },
  {
    backgroundImage: image3,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
    buttonText: 'discover now!',
    buttonLink: '3',
    textAlign: 'left',
    textColor: 'white',
    textPosition: 'right-6',
  },
];

export const PrimaryCarousel: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="grid grid-cols-8 gap-12">
      <Carousel
        plugins={[plugin.current]}
        className="col-span-8 sm:col-start-3 sm:col-span-6 sm:p-4 pr-0 relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <PrimaryCarouselItem data={slide} key={index} />
          ))}
        </CarouselContent>
        <div className="absolute bottom-10 left-[45%]">
          <CarouselDots>
            {({ scrollSnap, onClick, selectedIndex, index }) => (
              <button
                className={clsx('rounded-none h-1 w-3 bg-white', {
                  'bg-[#333] w-12': selectedIndex === index,
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
