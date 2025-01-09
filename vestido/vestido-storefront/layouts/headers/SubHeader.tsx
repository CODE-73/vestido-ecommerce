import * as React from 'react';
import Link from 'next/link';

import Autoplay from 'embla-carousel-autoplay';

import { useVestidoHomeData } from '@vestido-ecommerce/settings/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';

const SubHeader = () => {
  const home_data = useVestidoHomeData();
  const navbar_carousel = home_data?.navbar_carousel;

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div className="text-white bg-[#333] text-[8px] sm:text-xs md:text-sm py-1 pt-2 flex justify-center px-2 ">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="justify-self-center w-fit"
      >
        <CarouselContent>
          {navbar_carousel?.map((message, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <CarouselItem>
                <Link href={`/${message.href}`}>
                  <div className="flex justify-center">
                    <div>{message.text_content}</div>
                  </div>
                </Link>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default SubHeader;
