import * as React from 'react';
import Image from 'next/image';

import { Item } from '@prisma/client';

import { useItems } from '@vestido-ecommerce/items/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@vestido-ecommerce/shadcn-ui/breadcrumb';

import MountAnimator from '../../components/mount-animator';
import ProductTile from './ProductTile';

type ProductListViewProps = {
  gender: string;
};

const ProductByGenderView: React.FC<ProductListViewProps> = ({ gender }) => {
  const { data: items } = useItems();

  const getItemGenderArray = (gender: string) => {
    let genderArray;
    if (gender === 'men') {
      genderArray = ['MEN'];
    } else if (gender === 'women') {
      genderArray = ['WOMEN'];
    } else if (gender === 'unisex') {
      genderArray = ['MEN', 'WOMEN'];
    }

    return genderArray;
  };

  const itemsInGender = items?.filter(
    (x) =>
      JSON.stringify(x.gender) === JSON.stringify(getItemGenderArray(gender)),
  );

  return (
    <div className="md:px-16 ">
      <Breadcrumb className="p-3 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-white hover:text-white">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/products"
              className="text-white hover:text-white"
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white underline underline-offset-4 capitalize">
              {gender}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" text-2xl lg:text-4xl  tracking-wide text-white text-center font-extrabold my-5py-3 md:py-6 py-14 capitalize">
        {gender}
      </div>
      <div className="flex relative justify-center">
        {itemsInGender && itemsInGender.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-2 px-5 md:grid-cols-3 lg:grid-cols-4  md:gap-5 xl:gap-10 md:px-0 w-full xl:grid-cols-5">
              {itemsInGender?.map((item: Item, index) => (
                <MountAnimator key={item.id} deferIdx={index}>
                  <ProductTile data={item} />
                </MountAnimator>
              ))}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center mt-8">
              <button className="border border-gray-200 text-xs font-medium py-2 px-5  my-5 hover:border-black duration-100">
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

export default ProductByGenderView;
