import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuShoppingBag, LuX } from 'react-icons/lu';

import { useRemoveFromWishlist, useWishlist } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { AddToCartDialog } from './AddToCartFromWishlistDialog';

const WishlistView: React.FC = () => {
  const { data: wishlistItems } = useWishlist();
  const { trigger } = useRemoveFromWishlist();

  const handleRemoveFromWishlist = (itemId: string) => {
    trigger({
      itemId: itemId,
    });
  };

  return (
    <div className="md:px-16">
      <div className="text-4xl flex items-center justify-center gap-3 tracking-wide text-[#333333] text-center font-extrabold my-5 lg:py-10">
        Wishlist{' '}
        <span className="font-normal text-lg">
          ({`${wishlistItems?.data.length}`} items)
        </span>
      </div>
      {wishlistItems?.data.length && wishlistItems.data.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {wishlistItems?.data.map((wishlistItem, index) => (
            <div
              key={index}
              className=" flex flex-col items-center group  mb-10 "
            >
              {/* <div
              onClick={() => handleRemoveFromCart(cartItem.itemId)}
              className="col-span-1 flex justify-center cursor-pointer"
            >
              <LuTrash2 />
            </div> */}
              <div className="relative">
                <Link href={`/products/${wishlistItem.itemId}`}>
                  {' '}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(wishlistItem.itemId);
                    }}
                    className="absolute right-3 top-3 text-stone-400 border border-1 border-stone-400 rounded-full p-1 cursor-pointer"
                  >
                    <LuX />
                  </div>
                  <Image
                    className="block col-span-2"
                    src={
                      ((wishlistItem.item.images ?? []) as ImageSchemaType[])[0]
                        ?.url ?? ''
                    }
                    alt={
                      ((wishlistItem.item.images ?? []) as ImageSchemaType[])[0]
                        ?.alt ?? ''
                    }
                    width={200}
                    height={260}
                  />
                </Link>
              </div>

              <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
                {wishlistItem.item.title}
              </div>
              {/* {isMobile ? (
              <div className=" col-span-5 flex flex-col space-y-5 pl-8">
                <div className="truncate text-md md:text-xl font-semibold whitespace-nowrap">
                  {wishlistItem.item.title}
                </div>
                <div className="text-xl font-semibold text-[#48CAB2] flex ">
                  {wishlistItem.item.price}
                </div>
                <div className="flex flex-row bg-zinc-100 w-32 h-14 items-center justify-around ">
                  hi
                </div>
              </div>
            ) : (
              <>
                <div className="text-xl font-extrabold col-span-2">
                  {wishlistItem.item.title}
                </div>

                <div className="text-3xl font-semibold text-[#48CAB2] col-span-1 flex justify-center">
                  {wishlistItem.item.price.toFixed(2)}
                </div>
              </>
            )} */}

              <>
                <div className="flex text-lg justify-between w-full pt-1">
                  <div>
                    {wishlistItem.item.discountedPrice?.toFixed(2) ??
                      wishlistItem.item.price?.toFixed(2)}
                  </div>
                </div>
                <div className={`p-2 bg-[#48CAB2] w-full`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2 font-bold hover:bg-transparent">
                        <LuShoppingBag color="#fff" size={24} />
                        <div> Add to Cart</div>
                      </Button>
                    </DialogTrigger>
                    <AddToCartDialog itemId={wishlistItem.itemId} />
                  </Dialog>
                </div>
              </>
            </div>
          ))}
        </div>
      ) : (
        <div>helllo</div>
      )}
    </div>
  );
};

export default WishlistView;
