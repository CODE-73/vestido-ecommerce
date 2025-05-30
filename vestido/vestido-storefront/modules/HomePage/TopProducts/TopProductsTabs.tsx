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
      className="w-full flex justify-center"
    >
      <TabsList className="inline-flex justify-center bg-transparent uppercase tracking-wide gap-8">
        <TabsTrigger
          value="men"
          className="w-24 text-center rounded-none text-white uppercase tracking-wide data-[state=active]:underline underline-offset-4 data-[state=active]:text-white data-[state=active]:bg-transparent"
        >
          Men
        </TabsTrigger>
        <TabsTrigger
          value="women"
          className="w-24 text-center rounded-none text-white uppercase tracking-wide data-[state=active]:underline underline-offset-4 data-[state=active]:text-white data-[state=active]:bg-transparent"
        >
          Women
        </TabsTrigger>
        <TabsTrigger
          value="unisex"
          className="w-24 text-center rounded-none text-white uppercase tracking-wide data-[state=active]:underline underline-offset-4 data-[state=active]:text-white data-[state=active]:bg-transparent"
        >
          Unisex
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
