import Image from 'next/image';

import { useMediaQuery } from '@react-hook/media-query';
import { z } from 'zod';

import { ScrollCardSchema } from '@vestido-ecommerce/settings/client';
import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';

import { DiscoverButton } from '../Buttons/DiscoverButton';
import { ImageSchemaType } from 'libs/settings/src/hooks/use-storefront-home-data';

// export type ScrollCardData = {
//   cardImage: ImageSchemaType;
//   mainTitle: string;
//   subtitle1: string;
//   subtitle2: string;
//   buttonText?: string;
// };
type ScrollCardData = z.infer<typeof ScrollCardSchema>;

interface ScrollCardProps {
  data: ScrollCardData;
}
const HorizontalScrollCard: React.FC<ScrollCardProps> = ({ data }) => {
  const SmallMobile = useMediaQuery('(max-width:400px)');

  const image = data.image as ImageSchemaType;
  return (
    <CarouselItem className="group basis-1/2 lg:basis-1/3 flex-shrink-0 text-center transition duration-700 ease-in-out md:hover:-translate-y-16 text-white">
      <div className="flex flex-col">
        <div className="relative w-full h-0 pb-[50%]">
          <Image
            // src={data.cardImage.url ?? ''}
            src={image?.url ?? '/assets/fallback-image.png'}
            alt="alt text"
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full flex flex-col max-w-full items-center">
        <div
          className="w-full uppercase truncate text-clip
         font-bold pt-6"
        >
          {data.text_content.line1}
        </div>

        <h4 className="hidden md:block capitalize text-4xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ">
          {data.text_content.line2}
        </h4>

        <div
          className="font-extralight w-full text-sm md:text-base text-ellipsis"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'normal',
          }}
        >
          {data.text_content.line3}
        </div>

        <div className="sm:hidden group-hover:block mx-1">
          {SmallMobile ? (
            <DiscoverButton bgLight={true} className="w-4/5" />
          ) : (
            <DiscoverButton bgLight={true} />
          )}
        </div>
      </div>
    </CarouselItem>
  );
};

export default HorizontalScrollCard;
