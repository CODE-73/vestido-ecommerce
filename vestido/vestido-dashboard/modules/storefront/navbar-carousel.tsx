import { useState } from 'react';

import clsx from 'clsx';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import { InputElement } from '../../forms/input-element';

const NavbarCarouselUploader: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="text-white bg-[#333] text-[8px] sm:text-xs md:text-sm py-1 pt-2 flex justify-center px-2 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        opts={{
          align: 'start',
        }}
        className="justify-self-center w-fit"
      >
        <CarouselContent>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <CarouselItem
                key={index}
                className="w-full flex-shrink-0  relative"
              >
                <div className="flex flex-col gap-1 items-center">
                  <InputElement
                    name={`navbar_carousel.${index}.text_content`}
                    placeholder="offers and more"
                    className="text-white bg-transparent border-none focus:border-white placeholder:text-white"
                  />
                  <InputElement
                    name={`navbar_carousel.${index}.href`}
                    placeholder="href"
                    className={`${isHovered ? '' : 'hidden'} w-3/5 text-black`}
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="absolute bottom-2 right-2">
          <CarouselDots>
            {({ scrollSnap, onClick, selectedIndex, index }) => (
              <button
                className={clsx('rounded-full  h-2 w-2', {
                  'bg-red-300 ': selectedIndex === index,
                  ' bg-white': selectedIndex !== index,
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

export default NavbarCarouselUploader;
