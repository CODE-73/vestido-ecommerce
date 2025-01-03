import Image, { StaticImageData } from 'next/image';

import { useMediaQuery } from '@react-hook/media-query';

import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';

import { DiscoverButton } from '../Buttons/DiscoverButton';

export type ScrollCardData = {
  cardImage: StaticImageData;
  mainTitle: string;
  subtitle1: string;
  subtitle2: string;
};

interface ScrollCardProps {
  data: ScrollCardData;
}
const HorizontalScrollCard: React.FC<ScrollCardProps> = ({ data }) => {
  const SmallMobile = useMediaQuery('(max-width:400px)');
  return (
    <CarouselItem className="group basis-1/2 lg:basis-1/3 text-center transition duration-700 ease-in-out md:hover:-translate-y-16 text-white">
      <div className="flex flex-col">
        <Image
          src={data.cardImage}
          alt="alt text"
          sizes="(max-width: 640px) 50vw"
        />
      </div>
      <div className="w-full flex flex-col max-w-full items-center">
        <div
          className="w-full uppercase truncate text-clip
         font-bold pt-6"
        >
          {data.subtitle1}
        </div>

        <h4 className="hidden md:block capitalize text-4xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ">
          {data.mainTitle}
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
          {data.subtitle2}
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
