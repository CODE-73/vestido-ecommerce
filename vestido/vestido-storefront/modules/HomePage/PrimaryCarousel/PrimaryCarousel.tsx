import * as React from 'react';

import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
} from '@vestido-ecommerce/shadcn-ui/carousel';

// import image1 from '../../../assets/carousel/slide-1.jpg';
// import image2 from '../../../assets/carousel/slide-2.jpg';
// import image3 from '../../../assets/carousel/slide-3.jpg';
import PrimaryCarouselItem, {
  PrimaryCarouselItemData,
} from './PrimaryCarouselItem';

const carouselSlides: PrimaryCarouselItemData[] = [
  {
    backgroundImage: {
      blurHash: '',
      blurHashDataURL: ' z.string().nullish()',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'find your new favourite clothing',
    subtitle1: 'new collection',
    subtitle2:
      'Keep perfect time with the contemporary, expertly-crafted designs.',
    buttonText: 'discover now!',
    textAlign: 'left',
    textColor: '[#333333]',
    textPosition: 'left-6',
  },
  {
    backgroundImage: {
      blurHash: '',
      blurHashDataURL: ' z.string().nullish()',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'must-haves for the season',
    subtitle1: 'need-it-now',
    subtitle2: 'Contemporary, minimal and beautifully iconic.',
    buttonText: 'discover now!',
    textAlign: 'center',
    textColor: 'white',
    textPosition: 'left-6',
  },
  {
    backgroundImage: {
      blurHash: '',
      blurHashDataURL: ' z.string().nullish()',
      alt: 'alt',
      key: '',
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      displayIndex: 1,
      default: true,
    },
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
    buttonText: 'discover now!',
    textAlign: 'left',
    textColor: 'white',
    textPosition: 'right-6',
  },
  // {
  //   backgroundImage: image2,
  //   mainTitle: 'must-haves for the season',
  //   subtitle1: 'need-it-now',
  //   subtitle2: 'Contemporary, minimal and beautifully iconic.',
  //   buttonText: 'discover now!',
  //   textAlign: 'center',
  //   textColor: 'white',
  //   textPosition: 'left-6',
  // },
  // {
  //   backgroundImage: image1,
  //   mainTitle: 'find your new favourite clothing',
  //   subtitle1: 'new collection',
  //   subtitle2:
  //     'Keep perfect time with the contemporary, expertly-crafted designs.',
  //   buttonText: 'discover now!',
  //   textAlign: 'left',
  //   textColor: '[#333333]',
  //   textPosition: 'left-6',
  // },
];

export const PrimaryCarousel: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div className=" overflow-hidden lg:rounded-[25px]">
      <Carousel
        plugins={[plugin.current]}
        className=" pr-0 relative bg-black"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-64 sm:h-auto">
          {carouselSlides.map((slide, index) => (
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
