import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useWishlist } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

import WishlistItemCard, { WishlistItemSkeleton } from './WishlistItem';

const WishlistView: React.FC = () => {
  const { data: { data: wishlistItems } = { data: [] }, isLoading } =
    useWishlist();

  // const isLoading = true;

  const removeItem = (itemId: string) => {
    return wishlistItems.find((x) => x.itemId === itemId);
  };

  return (
    <div className="md:px-16">
      <div className="text-4xl py-10 flex items-center justify-center gap-3 tracking-wide text-white text-center font-extrabold my-5 lg:py-10">
        Wishlist
        <span className="font-normal text-lg">
          ({`${wishlistItems.length ?? ''}`} items)
        </span>
      </div>
      {isLoading ? (
        <div className=" grid grid-cols-2 gap-2 px-5 md:grid-cols-3 lg:grid-cols-4  md:gap-5 xl:grid-cols-6  xl:gap-10 md:px-0">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <WishlistItemSkeleton key={index} />
            ))}
        </div>
      ) : wishlistItems.length && wishlistItems.length > 0 ? (
        <div className=" grid grid-cols-2 gap-2 px-5 md:grid-cols-3 lg:grid-cols-4  md:gap-5 xl:grid-cols-6  xl:gap-10 md:px-0">
          {wishlistItems.map((wishlistItem) => {
            return (
              <WishlistItemCard
                key={wishlistItem.id}
                wishlistItem={wishlistItem}
                removeItem={removeItem}
              />
            );
          })}
        </div>
      ) : (
        <div className="min-h-[80%] w-full flex flex-col gap-5 items-center text-white justify-center font-semibold text-lg">
          Your wishlist is empty.
          <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 m-10">
            <Image src="/assets/wishlist.png" alt="" fill />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Link href="/cart">
              <Button className="flex tracking-wide bg-white w-full h-14 hover:bg-gray-400 font-extrabold text-black  justify-center">
                Go to Cart
              </Button>
            </Link>
            <Link href="/products">
              <Button className="flex tracking-wide bg-black w-full h-14 hover:bg-gray-400 font-extrabold text-black justify-center">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistView;
