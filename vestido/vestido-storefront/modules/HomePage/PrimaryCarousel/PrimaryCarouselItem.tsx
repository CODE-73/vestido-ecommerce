import Image from 'next/image';

import { z } from 'zod';

import { HeroCarouselSchema } from '@vestido-ecommerce/settings/client';
import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { DiscoverButton } from '../Buttons/DiscoverButton';
type CarouselItemData = z.infer<typeof HeroCarouselSchema>;
interface PrimaryCarouselItemProps {
  data: CarouselItemData;
}
const PrimaryCarouselItem: React.FC<PrimaryCarouselItemProps> = ({ data }) => {
  const image = data.image as ImageSchemaType;
  return (
    <CarouselItem className="w-full relative">
      <div className="min-h-[300px] md:min-h-[500px] xl:min-h-[600px] overflow-hidden w-full">
        <div
          className={`flex flex-col gap-1 absolute mt-10 md:mt-auto md:top-1/3 ${data.text_position} text-${data.text_position} z-20`}
        >
          <div
            className={`uppercase text-xs md:text-base font-bold md:font-extrabold text-${data.text_color}`}
          >
            {data.text_content.line1}
          </div>
          <h1
            className={`capitalize text-lg md:text-5xl max-w-[500px] leading-normal text-${data.text_color}`}
          >
            {data.text_content.line2}
          </h1>
          <div
            className={`text-xs font-light md:text-base md:font-extralight text-${data.text_color}`}
          >
            {data.text_content.line3}
          </div>
          <div>
            <DiscoverButton />
          </div>
        </div>

        <Image
          className="object-cover lg:rounded-[25px]"
          src={image.url ?? ''}
          alt="Your alt text"
          fill
        />
      </div>
    </CarouselItem>
  );
};

export default PrimaryCarouselItem;
