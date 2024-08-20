import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Item } from '@prisma/client';

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from '@vestido-ecommerce/items';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { AddToWishListButton } from '../SpecialOffer/AddToWishlistButton';
import AddToCartButton from './AddToCartButton';

interface TopProductCardProps {
  data: Item;
}

const TopProductCard: React.FC<TopProductCardProps> = ({ data: item }) => {
  const { trigger: wishlistTrigger } = useAddToWishlist();
  const { trigger: removeWishlistTrigger } = useRemoveFromWishlist();
  const { data: wishlistData } = useWishlist();
  const wishlist = wishlistData?.data;
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (wishlist && item) {
      const wishlisted = wishlist.some((x) => x.itemId === item.id);
      setIsWishlisted(wishlisted);
    }
  }, [wishlist, item]);

  const handleAddToWishlist = (item: Item) => {
    if (item) {
      if (isWishlisted) {
        removeWishlistTrigger({
          itemId: item.id,
        });
      } else {
        wishlistTrigger({
          itemId: item.id,
        });
      }
    }
  };

  return (
    <div className={`flex flex-col items-center group relative mb-10 `}>
      <Link href={`/products/${item.id}`}>
        <Image
          className="block group-hover:hidden"
          src={((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''}
          alt="alt text"
          width={430}
          height={551}
        />
        <Image
          className="hidden group-hover:block"
          src={((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''}
          alt="alt text"
          width={430}
          height={551}
        />
      </Link>

      <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-light w-full truncate">
        {item.title}
      </div>
      <div className="self-start md:hidden mb-4">
        {item.discountedPrice ? (
          <div>
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

      <div className="hidden md:block w-full self-start mt-4">
        <AddToCartButton
          price={item.price}
          offerPrice={item.discountedPrice}
          item={item}
        />
      </div>

      <div
        onClick={() => {
          handleAddToWishlist(item!);
        }}
        className="sm:hidden group-hover:block absolute right-2 top-2"
      >
        <AddToWishListButton wishlisted={isWishlisted} />
      </div>
      {/* <QuickViewButton /> */}
    </div>
  );
};

export default TopProductCard;
