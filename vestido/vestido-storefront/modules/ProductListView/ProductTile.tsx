import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Item } from '@prisma/client';

import {
  useAddToWishlist,
  useItems,
  useRemoveFromWishlist,
  useWishlist,
} from '@vestido-ecommerce/items/client';
import { Badge } from '@vestido-ecommerce/shadcn-ui/badge';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import AddToCartButton from '../HomePage/Buttons/AddToCartButton';
import { AddToWishListButton } from '../HomePage/Buttons/AddToWishlistButton';

interface ProductCardProps {
  data: Item;
}

type WishlistStatus = {
  [key: string]: boolean; // Key is item ID, value is wishlisted status
};

const ProductCard: React.FC<ProductCardProps> = ({ data: item }) => {
  const { data } = useItems();
  const router = useRouter();

  const { trigger: wishlistTrigger } = useAddToWishlist();
  const { trigger: removeWishlistTrigger } = useRemoveFromWishlist();

  // const handleShowMoreClick = () => {

  // };
  const handleProductClick = (itemId: string) => {
    router.push(`/products/${encodeURIComponent(itemId)}`);
  };

  const { data: wishlistData } = useWishlist();
  const wishlist = wishlistData?.data;

  const [wishlistedItems, setWishlistedItems] = useState<WishlistStatus>({});

  useEffect(() => {
    if (wishlist && data) {
      const wishlistedState = data.reduce<Record<string, boolean>>(
        (acc, item) => {
          acc[item.id] = wishlist.some((x) => x.itemId === item.id);
          return acc;
        },
        {},
      );
      setWishlistedItems(wishlistedState);
    }
  }, [wishlist, data]);

  const handleAddToWishlist = (item: Item) => {
    if (item) {
      if (wishlistedItems[item.id]) {
        removeWishlistTrigger({ itemId: item.id });
      } else {
        wishlistTrigger({ itemId: item.id });
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center group  mb-10 cursor-pointer ">
      {item.discountPercent && item.discountPercent > 0 ? (
        <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto">
          sale&nbsp;{item.discountPercent}&nbsp;%
        </Badge>
      ) : (
        ''
      )}

      {((item.images ?? []) as ImageSchemaType[]).length > 0 && (
        <div
          onClick={() => handleProductClick(item.id)}
          className="group w-full relative"
        >
          {' '}
          <div className="relative w-full pb-[130%]">
            <Image
              className="absolute inset-0 block group-hover:hidden object-cover"
              src={((item.images ?? []) as ImageSchemaType[])[0]?.url ?? ''}
              fill
              alt="alt text"
              style={{ objectFit: 'cover' }}
            />
            <Image
              className="absolute inset-0 group-hover:block hidden object-cover"
              fill
              style={{ objectFit: 'cover' }}
              src={
                ((item.images ?? []) as ImageSchemaType[])[1]?.url ??
                ((item.images ?? []) as ImageSchemaType[])[0]?.url ??
                ''
              }
              alt="alt text"
            />
          </div>
        </div>
      )}

      <div className="self-start pt-[#2px] capitalize text-[#333333] text-md font-light md:mb-4 w-full truncate">
        {item.title}
      </div>
      <div className="self-start md:hidden mb-4">
        {item.discountedPrice ? (
          <div className="flex items-center gap-2">
            <div className="text-black text-sm font-semibold">
              ₹&nbsp;{item.discountedPrice.toFixed(2)}
            </div>
            {item.discountedPrice < item.price ? (
              <div className="text-gray-500 line-through text-xs">
                ₹&nbsp;{item.price.toFixed(2)}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="text-black text-sm font-semibold">
            ₹&nbsp;{item.price.toFixed(2)}
          </div>
        )}
      </div>
      <div className="hidden md:block w-full self-start">
        <AddToCartButton
          price={item.price}
          offerPrice={item.discountedPrice}
          item={item}
        />
      </div>

      <div
        className={` flex flex-row justify-start ${
          wishlistedItems[item.id] ? 'flex' : 'sm:hidden'
        } sm:group-hover:flex sm:flex-col gap-3 absolute top-3 right-3 pt-2 `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(item);
          }}
        >
          <AddToWishListButton wishlisted={wishlistedItems[item.id]} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
