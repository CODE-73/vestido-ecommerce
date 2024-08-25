import { FC, useEffect, useState } from 'react';

import { useCarousel } from '@vestido-ecommerce/shadcn-ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '@vestido-ecommerce/shadcn-ui/tabs';

const tabs = ['men', 'women', 'unisex'];

export const TopProductsTabs: FC = () => {
  const { api } = useCarousel();
  const [currentTab, setCurrentTab] = useState('men');

  useEffect(() => {
    const onScroll = () => {
      setCurrentTab(tabs[api?.selectedScrollSnap() ?? 0]);
    };

    api?.on('scroll', onScroll);

    return () => {
      api?.off('scroll', onScroll);
    };
  }, [api]);

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => api?.scrollTo(tabs.indexOf(value))}
      className="w-full"
    >
      <TabsList className="flex justify-center bg-transparent uppercase tracking-wide">
        <TabsTrigger
          value="men"
          className="mr-8 rounded-none uppercase tracking-wide data-[state=active]:text-[#48cab2] "
        >
          Men
        </TabsTrigger>
        <TabsTrigger
          value="women"
          className=" rounded-none  uppercase tracking-wide data-[state=active]:text-[#48cab2]"
        >
          Women
        </TabsTrigger>
        <TabsTrigger
          value="unisex"
          className="ml-8 rounded-none  uppercase tracking-wide data-[state=active]:text-[#48cab2]"
        >
          Unisex
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
