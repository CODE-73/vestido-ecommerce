import clsx from 'clsx';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import { InputElement } from '../../forms/input-element';

const NavbarCarouselUploader: React.FC = () => {
  return (
    <div className="text-white bg-[#333] text-[8px] sm:text-xs md:text-sm py-1 pt-2 flex justify-center px-2 ">
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
                <InputElement
                  name={`navbar_carousel.${index}.text_content`}
                  placeholder="offers and more"
                  className="text-white bg-transparent border-none focus:border-white placeholder:text-white"
                />
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
