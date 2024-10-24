import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuShoppingBag, LuX } from 'react-icons/lu';

import {
  useRemoveFromWishlist,
  useWishlist,
} from '@vestido-ecommerce/items/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { ItemToastBody } from '../../components/item-toast-body';
import { AddToCartDialog } from './AddToCartFromWishlistDialog';

const WishlistView: React.FC = () => {
  const { data: { data: wishlistItems } = { data: [] } } = useWishlist();

  const { trigger } = useRemoveFromWishlist();
  const { toast } = useToast();

  const removeItem = (itemId: string) => {
    return wishlistItems.find((x) => x.itemId === itemId);
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    const removedItem = removeItem(itemId);
    trigger({
      itemId: itemId,
    });
    if (!removedItem) {
      toast({
        title: 'Error',
        description: 'Item not found in the wishlist!',
      });
    } else {
      toast({
        title: '',
        description: ItemToastBody(
          false,
          removedItem.item,
          'Item removed from Wishlist',
        ),
      });
    }
  };

  return (
    <div className="md:px-16">
      <div className="text-4xl flex items-center justify-center gap-3 tracking-wide text-white text-center font-extrabold my-5 lg:py-10">
        Wishlist
        <span className="font-normal text-lg">
          ({`${wishlistItems.length ?? 0}`} items)
        </span>
      </div>
      {wishlistItems.length && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {wishlistItems.map((wishlistItem, index) => {
            const img =
              ((wishlistItem.item.images ?? []) as ImageSchemaType[])?.[0] ||
              null;
            return (
              <div
                key={index}
                className=" flex flex-col items-center group relative mb-10 "
              >
                <div>
                  <div className="absolute right-3 top-3 text-stone-400 border border-1 border-stone-400 rounded-full p-1 cursor-pointer">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <LuX />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to remove this from wishlist?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromWishlist(wishlistItem.itemId);
                            }}
                          >
                            Yes, Remove.
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <Link href={`/products/${wishlistItem.itemId}`}>
                    <Image
                      className="block col-span-2"
                      src={img.url ?? ''}
                      alt={img.alt ?? ''}
                      width={250}
                      height={300}
                      placeholder={img.blurHashDataURL ? 'blur' : undefined}
                      blurDataURL={img.blurHashDataURL ?? undefined}
                    />
                  </Link>
                </div>

                <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
                  {wishlistItem.item.title}
                </div>

                <>
                  <div className="flex text-lg justify-between w-full pt-1">
                    <div>
                      ₹&nbsp;
                      {wishlistItem.item.discountedPrice?.toFixed(2) ??
                        wishlistItem.item.price?.toFixed(2)}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className={`p-2 bg-[#48CAB2] w-full`}>
                        <Button className="bg-[#48CAB2] w-full flex gap-3 h-[30px] text-lg mb-1 text-white p-2 uppercase font-semibold tracking-wide hover:bg-transparent">
                          <LuShoppingBag color="#fff" size={24} />
                          <div> Add to Cart</div>
                        </Button>
                      </div>
                    </DialogTrigger>
                    <AddToCartDialog itemId={wishlistItem.itemId} />
                  </Dialog>
                </>
              </div>
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
              <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
                Go to Cart
              </Button>
            </Link>
            <Link href="/products">
              <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
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
