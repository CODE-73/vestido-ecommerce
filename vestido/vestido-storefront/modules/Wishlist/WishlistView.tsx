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

              <>
                <div className="flex text-lg justify-between w-full pt-1">
                  <div>
                    {wishlistItem.item.discountedPrice?.toFixed(2) ??
                      wishlistItem.item.price?.toFixed(2)}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className={`p-2 bg-[#48CAB2] w-full`}>
                      <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2 font-bold hover:bg-transparent">
                        <LuShoppingBag color="#fff" size={24} />
                        <div> Add to Cart</div>
                      </Button>
                    </div>
                  </DialogTrigger>
                  <AddToCartDialog itemId={wishlistItem.itemId} />
                </Dialog>
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
