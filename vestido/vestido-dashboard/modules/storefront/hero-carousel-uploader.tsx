import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@vestido-ecommerce/shadcn-ui/tabs';

import HeroCarouselItem from './hero-carousel-item';
import { StorefrontHomeDataSchemaForm } from './home-integration';

const PrimaryCarouselUploader: React.FC = () => {
  const form = useFormContext<StorefrontHomeDataSchemaForm>();

  return (
    <>
      <Tabs defaultValue="lg" className="w-full">
        <TabsList>
          <TabsTrigger value="sm">SM</TabsTrigger>
          <TabsTrigger value="md">MD</TabsTrigger>
          <TabsTrigger value="lg">LG</TabsTrigger>
        </TabsList>
        <div className=" overflow-hidden lg:rounded-[25px]">
          <Carousel className=" pr-0 relative bg-gray-300">
            <CarouselContent /* className="h-64 sm:h-auto" */>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <CarouselItem key={index} className="flex-shrink-0 relative">
                    <TabsContent value="sm">
                      <HeroCarouselItem
                        index={index}
                        form={form}
                        className="w-full"
                        sizeClass="sm"
                      />
                    </TabsContent>
                    <TabsContent value="md">
                      <HeroCarouselItem
                        index={index}
                        form={form}
                        className="w-full"
                        sizeClass="md"
                      />
                    </TabsContent>
                    <TabsContent value="lg">
                      <HeroCarouselItem
                        index={index}
                        form={form}
                        className="aspect-[2.5/1]"
                        sizeClass="lg"
                      />
                    </TabsContent>
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
      </Tabs>
    </>
  );
};

export default PrimaryCarouselUploader;
