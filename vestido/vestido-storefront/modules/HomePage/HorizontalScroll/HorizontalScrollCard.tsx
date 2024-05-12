import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';
import Image, { StaticImageData } from 'next/image';
import { DiscoverButton } from '../DiscoverButton';

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
  return (
    <CarouselItem className="group basis-1/2 lg:basis-1/3 text-center transition duration-700 ease-in-out md:hover:-translate-y-16 text-[#333333]">
      <div className="flex flex-col">
        <Image
          src={data.cardImage}
          alt="alt text"
          sizes="(max-width: 640px) 50vw"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="uppercase text-md font-extrabold pt-6">
          {data.subtitle1}
        </div>

        <div className="capitalize font-bold text-4xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ">
          {data.mainTitle}
        </div>

        <div className="font-extralight w-full">{data.subtitle2}</div>
        <div className="sm:hidden group-hover:block -m-4">
          <DiscoverButton />
        </div>
      </div>
    </CarouselItem>
  );
};

export default HorizontalScrollCard;
