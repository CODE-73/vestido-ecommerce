import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Item } from '@prisma/client';

import {
  useAddToWishlist,
  useCategory,
  useItems,
  useRemoveFromWishlist,
} from '@vestido-ecommerce/items';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import useIsMobile from '../../hooks/useIsMobile';
import { AddToWishListButton } from '../HomePage/SpecialOffer/AddToWishlistButton';
import { QuickViewButton } from '../HomePage/SpecialOffer/QuickViewButton';
import AddToCartButton from '../HomePage/TopProducts/AddToCartButton';
import ProductFilter from './ProductFilter';
import { Badge } from '@vestido-ecommerce/shadcn-ui/badge';

type ProductListViewProps = {
  categoryId?: string;
};

const ProductlistView: React.FC<ProductListViewProps> = ({ categoryId }) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const { data } = useItems();
  const { data: category } = useCategory(categoryId as string);
  const { trigger: wishlistTrigger } = useAddToWishlist();
  const { trigger: removeWishlistTrigger } = useRemoveFromWishlist();

  const handleShowMoreClick = () => {
    // function
  };
  const handleProductClick = (itemId: string) => {
    router.push(`/products/${encodeURIComponent(itemId)}`);
  };

  const [wishlistedItems, setWishlistedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAddToWishlist = (item: Item) => {
    if (wishlistedItems[item.id]) {
      // If the item is already in the wishlist, remove it
      removeWishlistTrigger({
        itemId: item.id,
      });
    } else {
      // If the item is not in the wishlist, add it
      wishlistTrigger({
        itemId: item.id,
      });
    }

    setWishlistedItems((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id],
    }));
  };

  return (
    <div className="md:px-16">
      <div className="text-4xl  tracking-wide text-[#333333] text-center font-extrabold my-5 py-14">
        {category?.data.name}
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 md:grid-cols-4 md:gap-10 md:px-0">
        {!isMobile && <ProductFilter />}
        {data
          ?.filter((item) => !categoryId || item.categoryId === categoryId)
          .map((item: Item, index: number) => (
            <div
              key={index}
              className="relative flex flex-col items-center group  mb-10 "
            >
              {item.discountPercent && item.discountPercent > 0 ? (
                <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto">
                  sale&nbsp;{item.discountPercent}&nbsp;%
                </Badge>
              ) : (
                ''
              )}

              {((item.images ?? []) as ImageSchemaType[]).length > 0 && (
                <div onClick={() => handleProductClick(item.id)}>
                  <Image
                    className="block"
                    src={((item.images ?? []) as ImageSchemaType[])[0].url!}
                    alt="alt text"
                    width={430}
                    height={551}
                  />
                </div>
              )}

              <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-light mb-4">
                {item.title}
              </div>

              <AddToCartButton
                price={item.price}
                offerPrice={item.discountedPrice}
                item={item}
              />

              <div
                className={` flex flex-row justify-start ${
                  wishlistedItems[item.id] ? 'flex' : 'sm:hidden'
                } sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0`}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(item);
                  }}
                >
                  <AddToWishListButton wishlisted={wishlistedItems[item.id]} />
                </div>
                <QuickViewButton />
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border border-gray-200 text-xs font-medium py-2 px-5  my-5 hover:border-black  transition-colors duration-100"
          onClick={handleShowMoreClick}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default ProductlistView;
