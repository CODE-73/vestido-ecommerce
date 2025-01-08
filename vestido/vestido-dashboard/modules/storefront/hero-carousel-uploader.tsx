import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';

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
