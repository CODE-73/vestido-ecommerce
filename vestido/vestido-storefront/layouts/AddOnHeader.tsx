import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

const AddOnHeader = () => {
  const messages = [
    {
      description: 'standard shipping on orders $255',
    },
    {
      description: 'Your second description',
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 text-[#333] text-sm py-1 pt-2 justify-between">
      <div className="flex text-gray-500">
        <div>Call Us:</div>
        <div className="font-extrabold">1–234–5678901</div>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="justify-self-center"
      >
        <CarouselContent>
          {messages.map((message, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <CarouselItem>
                <div className="flex">
                  {/* <div className="text-[#333] text-sm font-bold">
                    {message.title}&nbsp;
                  </div> */}
                  <div>{message.description}</div>
                </div>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-3 text-gray-500 justify-end pb-2">
        <Link
          href="https://www.instagram.com/vestido_nation/"
          className="hover:underline hover:text-[#333] transition duration-300"
        >
          Instagram
        </Link>{' '}
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
      </div>
    </div>
  );
};
export default AddOnHeader;
