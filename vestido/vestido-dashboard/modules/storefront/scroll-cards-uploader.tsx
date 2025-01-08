import { useFormContext } from 'react-hook-form';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import { InputElement } from '../../forms/input-element';
import { StorefrontHomeDataSchemaForm } from './home-integration';
import ScrollCardImageUploader from './scroll-card';

export const HorizontalScrollCardsUploader: React.FC = () => {
  const form = useFormContext<StorefrontHomeDataSchemaForm>();
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
        }}
        className={`w-full relative my-20 px-1 sm:px-0 lg:h-[50vh] lg:min-h-[50vh]  xl:h-[65vh] xl:min-h-[65vh]`}
      >
        <CarouselContent className="flex max-w-content">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <CarouselItem
                key={index}
                className="group basis-1/2 lg:basis-1/3 flex-shrink-0 text-center text-white"
              >
                <ScrollCardImageUploader index={index} form={form} />
                <div className="w-full flex flex-col max-w-full items-center text-gray-600">
                  <InputElement
                    name={`horizontal_scroll_cards.${index}.text_content.line1`}
                    placeholder="Subtitle 1"
                    className="bg-transparent border-transparent w-full uppercase truncate text-clip
            font-bold pt-6"
                  />
                  <InputElement
                    name={`horizontal_scroll_cards.${index}.text_content.line2`}
                    placeholder="Main Title"
                    className="bg-transparent border-transparent  capitalize text-4xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title"
                  />

                  <InputElement
                    name={`horizontal_scroll_cards.${index}.text_content.line3`}
                    placeholder="Subtitle 2"
                    className="border-transparent font-extralight w-full text-sm md:text-base text-ellipsis"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      whiteSpace: 'normal',
                    }}
                  />

                  <div className="sm:hidden group-hover:block mx-1">
                    {/* {SmallMobile ? (
                      <DiscoverButton bgLight={true} className="w-4/5" />
                    ) : (
                      <DiscoverButton bgLight={true} />
                    )} */}
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 sm:left-10" />
        <CarouselNext className="absolute right-2 sm:right-10" />
      </Carousel>
    </>
  );
};

export default HorizontalScrollCardsUploader;
