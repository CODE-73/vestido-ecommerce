import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import { FileUploadElement } from '../../components/FileUpload';
import { InputElement } from '../../forms/input-element';

export const HorizontalScrollCardsUploader: React.FC = () => {
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
                <div className="flex flex-col">
                  <div className="relative w-full h-0 pb-[50%] bg-gray-300">
                    {/* <Image
                      src={data.cardImage.url ?? ''}
                      alt="alt text"
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    /> */}
                    <FileUploadElement
                      name={`horizontal_scroll_cards.${index}.image.key`}
                      keyPrefix="storefront/"
                      label="Upload Image"
                      className="cursor-pointer text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2"
                    />
                  </div>
                </div>
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
