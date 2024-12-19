import Image from 'next/image';

import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { DiscoverButton } from '../Buttons/DiscoverButton';

export type PrimaryCarouselItemData = {
  backgroundImage: ImageSchemaType;
  mainTitle: string;
  subtitle1: string;
  subtitle2: string;
  buttonText: string;
  textAlign: string;
  textColor: string;
  textPosition: string;
};

interface PrimaryCarouselItemProps {
  data: PrimaryCarouselItemData;
}
const PrimaryCarouselItem: React.FC<PrimaryCarouselItemProps> = ({ data }) => {
  return (
    // <CarouselItem className="w-full relative">
    //   <div className="min-h-[300px] md:min-h-[500px] xl:min-h-[600px] overflow-hidden w-full">
    <CarouselItem className="w-full relative">
      <div className="min-h-[300px] md:min-h-[500px] xl:min-h-[600px] overflow-hidden w-full">
        <div
          className={`flex flex-col gap-1 absolute mt-10 md:mt-auto md:top-1/3 ${data.textPosition} text-${data.textAlign} z-20`}
        >
          <div
            className={`uppercase text-xs md:text-base font-bold md:font-extrabold text-${data.textColor}`}
          >
            {data.subtitle1}
          </div>
          <h1
            className={`capitalize text-lg md:text-5xl max-w-[500px] leading-normal text-${data.textColor}`}
          >
            {data.mainTitle}
          </h1>
          <div
            className={`text-xs font-light md:text-base md:font-extralight text-${data.textColor}`}
          >
            {data.subtitle2}
          </div>
          <div>
            <DiscoverButton />
          </div>
        </div>

        <Image
          className="object-cover lg:rounded-[25px]"
          src={data.backgroundImage.url ?? ''}
          alt="Your alt text"
          fill
        />
      </div>
      {/* <div
        className={`flex flex-col gap-1 absolute mt-10 md:mt-auto top-1 md:top-1/3 ${data.textPosition} text-${data.textAlign} z-20`}
      >
        <div
          className={`uppercase text-xs md:text-base font-bold md:font-extrabold text-${data.textColor}`}
        >
          {data.subtitle1}
        </div>
        <h1
          className={`capitalize text-lg md:text-5xl max-w-[500px] leading-normal text-${data.textColor}`}
        >
          {data.mainTitle}
        </h1>
        <div
          className={`text-xs font-light md:text-base md:font-extralight text-${data.textColor}`}
        >
          {data.subtitle2}
        </div>
        <div>
          <DiscoverButton />
        </div>
      </div> */}
    </CarouselItem>
  );
};

export default PrimaryCarouselItem;
