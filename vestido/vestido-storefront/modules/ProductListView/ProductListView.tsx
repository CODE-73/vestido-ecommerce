import * as React from 'react';
import Image from 'next/image';

import { Item } from '@prisma/client';

import { useCategory, useItems } from '@vestido-ecommerce/items/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@vestido-ecommerce/shadcn-ui/breadcrumb';

// import ProductFilter from './ProductFilter';
import MountAnimator from '../../components/mount-animator';
import ProductTile from './ProductTile';

type ProductListViewProps = {
  categoryId?: string;
  suggestedList?: boolean;
};

const ProductlistView: React.FC<ProductListViewProps> = ({
  categoryId,
  suggestedList,
}) => {
  const { data: { data: category } = { data: null } } = useCategory(categoryId);
  const { data: items } = useItems({ categoryId });

  const handleShowMoreClick = () => {};

  return (
    <div className="md:px-16 text-gray-300">
      <Breadcrumb className={`${suggestedList ? 'hidden' : ''}   p-3`}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          {category?.name && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {category?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={`text-2xl lg:text-4xl  tracking-wide text-white text-center font-extrabold my-5 ${
          !suggestedList && category?.name ? 'py-3 md:py-6 py-14' : 'py-5'
        }`}
      >
        {!suggestedList && (category?.name ?? 'All')}
      </div>
      <div className="flex relative justify-center">
        {/* {!suggestedList && (
          <div className="basis-1/5 hidden invisible lg:block">
            <ProductFilter />
          </div>
        )} */}

        {items && items.length > 0 ? (
          <>
            <div
              className={`grid grid-cols-2 gap-2 px-5 md:grid-cols-3 lg:grid-cols-4  md:gap-5 xl:gap-10 md:px-0 ${suggestedList ? 'xl:px-32 xl:grid-cols-6' : ' w-full xl:grid-cols-5'} `}
            >
              {items?.map((item: Item, index) => (
                <MountAnimator key={item.id} deferIdx={index}>
                  <ProductTile data={item} />
                </MountAnimator>
              ))}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center mt-8">
              <button
                className="border border-gray-200 text-xs font-medium py-2 px-5  my-5 hover:border-black duration-100"
                onClick={handleShowMoreClick}
              >
                Show More
              </button>
            </div>
          </>
        ) : (
          <div className="absolute left-[50%] transform -translate-x-1/2 flex flex-col items-center">
            <div>
              We are updating this category with brand new products to suit your
              style!
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mt-32">
              <Image src="/assets/noitems.png" alt="" fill />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductlistView;
