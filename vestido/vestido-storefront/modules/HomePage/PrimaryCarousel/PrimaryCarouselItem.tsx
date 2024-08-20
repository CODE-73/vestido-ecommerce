import Image, { StaticImageData } from 'next/image';

import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';

import { DiscoverButton } from '../DiscoverButton';

export type PrimaryCarouselItemData = {
  backgroundImage: StaticImageData;
  mainTitle: string;
  subtitle1: string;
  subtitle2: string;
  buttonText: string;
  buttonLink: string;
  textAlign: string;
  textColor: string;
  textPosition: string;
};

interface PrimaryCarouselItemProps {
  data: PrimaryCarouselItemData;
}
const PrimaryCarouselItem: React.FC<PrimaryCarouselItemProps> = ({ data }) => {
  return (
    <CarouselItem>
      <div className="relative">
        <div
          className={`flex flex-col gap-1 absolute mt-3 md:mt-auto md:top-1/3 ${data.textPosition} text-${data.textAlign} `}
        >
          <div
            className={`uppercase text-xs md:text-base font-extrabold text-${data.textColor}`}
          >
            {data.subtitle1}
          </div>
          <div
            className={`capitalize font-bold text-lg md:text-5xl max-w-[500px] leading-normal text-${data.textColor}`}
          >
            {data.mainTitle}
          </div>
          <div className={`font-extralight text-${data.textColor}`}>
            {data.subtitle2}
          </div>
          <div>
            <DiscoverButton />
          </div>
        </div>

        <Image
          className="min-h-[300px] md:min-auto overflow-hidden object-cover"
          src={data.backgroundImage}
          alt="Your alt text"
        />
      </div>
    </CarouselItem>
  );
};

export default PrimaryCarouselItem;
