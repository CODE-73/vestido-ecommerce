import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import { InputElement } from '../../forms/input-element';
// import { ImageSchemaType } from '@vestido-ecommerce/utils';
import HeroCarouselItem from './hero-carousel-item';
import { StorefrontHomeDataSchemaForm } from './home-integration';

const PrimaryCarouselUploader: React.FC = () => {
  const form = useFormContext<StorefrontHomeDataSchemaForm>();

  return (
    <div className=" overflow-hidden lg:rounded-[25px]">
      <Carousel className=" pr-0 relative bg-gray-300">
        <CarouselContent className="h-64 sm:h-auto">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <CarouselItem
                key={index}
                className="w-full flex-shrink-0  relative"
              >
                <HeroCarouselItem
                  index={index}
                  form={form}
                  className="w-full"
                />
                <div className="min-h-[300px] md:min-h-[500px] xl:min-h-[600px] overflow-hidden w-full">
                  <div
                    className={`flex flex-col gap-1 absolute mt-10 md:mt-auto md:top-1/3 pl-2 md:pl-10  z-20`}
                  >
                    {/* <div
          className={`uppercase text-xs md:text-base font-bold md:font-extrabold `}
        >
          subtitle1
        </div> */}
                    <InputElement
                      name={`hero_carousel.${index}.text_content.line1`}
                      placeholder="Subtitle 1"
                      className="bg-transparent border-transparent uppercase text-xs md:text-base font-bold md:font-extrabold"
                    />

                    <InputElement
                      name={`hero_carousel.${index}.text_content.line2`}
                      placeholder="Main Title"
                      className="bg-transparent border-transparent capitalize text-lg md:text-5xl max-w-[500px] leading-normal placeholder:text-black"
                    />

                    <InputElement
                      name={`hero_carousel.${index}.text_content.line3`}
                      placeholder="Subtitle 2"
                      className="bg-transparent border-transparent text-xs font-light md:text-base md:font-extralight"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="absolute bottom-2 md:bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

export default PrimaryCarouselUploader;
