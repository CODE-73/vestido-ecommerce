import * as React from 'react';

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
                <div className="flex justify-center">
                  {/* <div className="text-[#333] text-sm font-bold">
                    {message.title}&nbsp;
                  </div> */}
                  <div>{message.text_content}</div>
                </div>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="flex gap-3 text-gray-500 justify-end pb-2 hidden sm:flex">
        <Link
          href="https://www.instagram.com/vestido_nation/"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          Instagram
        </Link>
        <Link
          href="https://www.linkedin.com/company/vestidonation/"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          LinkedIn
        </Link>
        <Link
          href="https://www.facebook.com/people/Vestido-Nation/61554017931370/?mibextid=ZbWKwL"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          Facebook
        </Link>
      </div> */}
    </div>
  );
};
export default SubHeader;
