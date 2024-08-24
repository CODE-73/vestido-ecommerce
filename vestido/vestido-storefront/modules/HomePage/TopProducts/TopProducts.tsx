import { FC, useEffect, useState } from 'react';

import clsx from 'clsx';

import { Gender, ListItemResponse } from '@vestido-ecommerce/items';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@vestido-ecommerce/shadcn-ui/tabs';

import TopProductCard from './TopProductCard';

type TopProductsProps = {
  className?: string;
  items: NonNullable<ListItemResponse>;
};

export const TopProducts: FC<TopProductsProps> = ({ className, items }) => {
  // const { data } = useItems();

  const [currentTab, setCurrentTab] = useState<'men' | 'women' | 'unisex'>(
    'men',
  );

  // Automatically change tabs every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTab((prevTab) => {
        if (prevTab === 'men') return 'women';
        if (prevTab === 'women') return 'unisex';
        return 'men';
      });
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentTab]);

  const getItemsByGender = (genders: Gender[]) => {
    return items?.filter((item) =>
      genders.every((gender) => item.gender.includes(gender)),
    );
  };

  console.log(getItemsByGender(['WOMEN', 'MEN']));

  return (
    <div
      className={`flex flex-col items-center justify-center ${clsx(className)}`}
    >
      <div className="text-2xl md:text-4xl tracking-wide text-[#333333] font-bold hover:text-[#48cab2] pb-6">
        Top Products of the Week
      </div>

      <Tabs
        value={currentTab}
        onValueChange={(value) =>
          setCurrentTab(value as 'men' | 'women' | 'unisex')
        }
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
        <div
          className={clsx(
            'tab-content inset-0 transition-transform duration-500',
            currentTab === 'men'
              ? 'translate-x-0'
              : currentTab === 'women'
                ? '-translate-x-full'
                : '-translate-x-[200%]',
          )}
        >
          <TabsContent value="men">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
              {getItemsByGender(['MEN'])
                ?.slice(0, 6)
                .map((item, index) => (
                  <TopProductCard key={index} data={item} />
                ))}
            </div>
          </TabsContent>
        </div>{' '}
        <div
          className={clsx(
            'tab-content  inset-0 transition-transform duration-500',
            currentTab === 'women'
              ? 'translate-x-0'
              : currentTab === 'men'
                ? 'translate-x-full'
                : '-translate-x-full',
          )}
        >
          <TabsContent value="women">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
              {getItemsByGender(['WOMEN'])
                ?.slice(0, 6)
                .map((item, index) => (
                  <TopProductCard key={index} data={item} />
                ))}
            </div>
          </TabsContent>
        </div>
        <div
          className={clsx(
            'tab-content inset-0 transition-transform duration-500',
            currentTab === 'unisex'
              ? 'translate-x-0'
              : currentTab === 'men'
                ? '-translate-x-full'
                : 'translate-x-full',
          )}
        >
          <TabsContent value="unisex">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 xl:gap-10 pt-3 md:pt-12">
              {getItemsByGender(['MEN', 'WOMEN'])
                ?.slice(0, 6)
                .map((item, index) => (
                  <TopProductCard key={index} data={item} />
                ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
