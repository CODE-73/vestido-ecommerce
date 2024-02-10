import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import image1 from '../../../assets/carousel/slide-1.jpg';
import image2 from '../../../assets/carousel/slide-2.jpg';
import image3 from '../../../assets/carousel/slide-3.jpg';
import { Carousel, CarouselContent } from 'libs/shadcn-ui/src/ui/carousel';
import PrimaryCarouselItem, {
  PrimaryCarouselItemData,
} from './PrimaryCarouselItem';

const slides: PrimaryCarouselItemData[] = [
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
    textPosition: 'left-1/3',
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
    textPosition: 'left-1/3',
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
    textPosition: 'right-1/4',
  },
];
export function PrimaryCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <PrimaryCarouselItem data={slide} key={index} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
