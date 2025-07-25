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
    <div className="text-black bg-white text-sm py-1 flex justify-center px-2">
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
                <Link
                  href={`/${message.href}`}
                  className={`${message.href ? 'cursor-pointer' : 'pointer-events-none'}`}
                >
                  <div className="flex justify-center">
                    <div
                      className={`
    ${message.text_content?.length && message.text_content?.length > 50 ? 'text-[10px]' : message.text_content?.length && message.text_content?.length > 40 ? 'text-xs' : 'text-sm'} 
    md:text-sm
  `}
                    >
                      {message.text_content}
                    </div>
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
