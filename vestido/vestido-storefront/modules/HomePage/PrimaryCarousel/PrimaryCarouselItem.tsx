import Image from 'next/image';
import Link from 'next/link';

import { z } from 'zod';

import { HeroCarouselSchema } from '@vestido-ecommerce/settings/client';
import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';

import { DiscoverButton } from '../Buttons/DiscoverButton';

type CarouselItemData = z.infer<typeof HeroCarouselSchema>;
interface PrimaryCarouselItemProps {
  data: CarouselItemData;
}
const PrimaryCarouselItem: React.FC<PrimaryCarouselItemProps> = ({ data }) => {
  const image = data.image;
  return (
    <CarouselItem className="w-full relative">
      <Link
        href={`/${data.href}`}
        className={`${data.href ? 'cursor-pointer' : 'pointer-events-none'}`}
      >
        {' '}
        {/* <div className="min-h-[300px] md:min-h-[500px] xl:min-h-[700px] 2xl:min-h-[768px] overflow-hidden w-full"> */}
        <div className="aspect-[4/3] md:aspect-[2/1] lg:aspect-[2.5/1] overflow-hidden w-full">
          <div
            className={`flex flex-col gap-1 absolute   ${
              data.horizontal_position === 'right'
                ? 'right-20 text-right'
                : data.horizontal_position === 'left'
                  ? 'left-20 text-left'
                  : data.horizontal_position === 'center'
                    ? 'left-1/2 transform -translate-x-1/2 text-center'
                    : ''
            }  ${
              data.vertical_position === 'top'
                ? 'top-8'
                : data.vertical_position === 'middle'
                  ? 'top-1/2 transform -translate-y-1/2'
                  : data.vertical_position === 'bottom'
                    ? 'bottom-8'
                    : ''
            } z-20`}
          >
            <div
              className={`uppercase text-xs md:text-base font-bold md:font-extrabold text-${data.text_color}`}
            >
              {data?.text_content?.line1 ?? ''}
            </div>
            <h1
              className={`capitalize text-lg md:text-5xl max-w-[500px] leading-normal text-${data.text_color}`}
            >
              {data?.text_content?.line2 ?? ''}
            </h1>
            <div
              className={`text-xs font-light md:text-base md:font-extralight text-${data.text_color}`}
            >
              {data?.text_content?.line3 ?? ''}
            </div>
            {data.button_text && (
              <DiscoverButton className="mt-6" buttonText={data.button_text} />
            )}
          </div>

          <Image
            className="object-cover lg:rounded-[25px] md:hidden"
            placeholder={image.sm?.blurHashDataURL ? 'blur' : undefined}
            blurDataURL={image.sm?.blurHashDataURL ?? undefined}
            src={image.sm?.url ?? ''}
            alt="Your alt text"
            fill
          />
          <Image
            className="object-cover lg:rounded-[25px] hidden md:block lg:hidden"
            placeholder={image.md?.blurHashDataURL ? 'blur' : undefined}
            blurDataURL={image.md?.blurHashDataURL ?? undefined}
            src={image.md?.url ?? ''}
            alt="Your alt text"
            fill
          />
          <Image
            className="object-cover lg:rounded-[25px] hidden lg:block"
            placeholder={image.lg?.blurHashDataURL ? 'blur' : undefined}
            blurDataURL={image.lg?.blurHashDataURL ?? undefined}
            src={image.lg?.url ?? ''}
            alt="Your alt text"
            fill
          />
        </div>
      </Link>
    </CarouselItem>
  );
};

export default PrimaryCarouselItem;
