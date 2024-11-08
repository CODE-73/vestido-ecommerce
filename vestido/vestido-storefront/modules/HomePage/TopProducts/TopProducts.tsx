import { FC } from 'react';
import * as React from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';

import { Gender, ListItemResponse } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';

import ProductTile from '../../ProductListView/ProductTile';
import { TopProductsTabs } from './TopProductsTabs';

type TopProductsProps = {
  className?: string;
  items: NonNullable<ListItemResponse>;
};

export const TopProducts: FC<TopProductsProps> = ({ className, items }) => {
  const getItemsByGender = (genders: Gender[]) => {
    return items?.filter((item) =>
      genders.every((gender) => item.gender.includes(gender)),
    );
  };

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div
      className={`flex flex-col items-center justify-center ${clsx(className)}`}
    >
      <h3 className="text-2xl md:text-4xl tracking-wide text-[#333333] hover:text-[#48cab2] pb-6 text-white">
        Top Products of the Week
      </h3>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="bg-red-300"
      >
        <TopProductsTabs />
        <CarouselContent>
          <CarouselItem>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
              {getItemsByGender(['MEN'])
                ?.slice(0, 6)
                .map((item, index) => <ProductTile key={index} data={item} />)}
            </div>
          </CarouselItem>
          <CarouselItem>
            {' '}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
              {getItemsByGender(['WOMEN'])
                ?.slice(0, 6)
                .map((item, index) => <ProductTile key={index} data={item} />)}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
              {getItemsByGender(['MEN', 'WOMEN'])
                ?.slice(0, 6)
                .map((item, index) => <ProductTile key={index} data={item} />)}
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <Link href="/products">
        <Button className="mt-6 h-12 rounded-none  bg-transparent text-white hover:bg-white border border-[#48cab2] shadow uppercase hover:text-[#48cab2] font-semibold tracking-widest px-10">
          View More
        </Button>
      </Link>
    </div>
  );
};
