import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LuShoppingBag, LuX } from 'react-icons/lu';

import { WishlistItemResponse } from '@vestido-ecommerce/items';
import {
  useAddToCart,
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
import { Badge } from '@vestido-ecommerce/shadcn-ui/badge';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import { ItemToastBody } from '../../components/item-toast-body';
import { SizeSelectorDialog } from './size-selector';

const WishlistView: React.FC = () => {
  const router = useRouter();
  const { data: { data: wishlistItems } = { data: [] } } = useWishlist();

  const { trigger: wishlistTrigger } = useRemoveFromWishlist();
  const { toast } = useToast();
  const { trigger } = useAddToCart();
  const [qty] = useState(1);

  const removeItem = (itemId: string) => {
    return wishlistItems.find((x) => x.itemId === itemId);
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    const removedItem = removeItem(itemId);
    wishlistTrigger({
      itemId: itemId,
    });
    if (!removedItem) {
      toast({
        title: 'Error',
        description: 'Item not found in the wishlist!',
      });
    }
  };
  const handleAddToCart = async (
    wishlistItem: WishlistItemResponse['data'][number],

    selectedVariantId: string | null,
  ) => {
    if (wishlistItem) {
      // setLoading(true);

      try {
        await trigger({
          itemId: wishlistItem.itemId,
          qty: qty,
          variantId: selectedVariantId,
        });

        toast({
          title: '',
          description: ItemToastBody(
            true,
            wishlistItem.item,
            'Item Added to Cart!',
          ),
        });
        console.log('passed toast');
      } catch (error) {
        console.error('Failed to add item to cart', error);
        toast({
          title: 'Error Adding to Cart!',
          description: ItemToastBody(false, wishlistItem.item, ''),
        });
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleProductClick = (itemId: string) => {
    router.push(`/products/${encodeURIComponent(itemId)}`);
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
        <div className=" grid grid-cols-2 gap-2 px-5 md:grid-cols-3 lg:grid-cols-4  md:gap-5 xl:grid-cols-6  xl:gap-10 md:px-0">
          {wishlistItems.map((wishlistItem, index) => {
            return (
              <div
                key={index}
                className="relative flex flex-col items-center group  mb-10 cursor-pointer "
              >
                {wishlistItem.item.discountPercent &&
                wishlistItem.item.discountPercent > 0 ? (
                  <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto z-10">
                    flat&nbsp;{wishlistItem.item.discountPercent}&nbsp;%
                  </Badge>
                ) : (
                  ''
                )}
                <div className="absolute z-10 right-3 top-3 text-stone-400 border border-2 border-stone-400 rounded-full p-1 cursor-pointer">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <LuX strokeWidth={3} />
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

                <div
                  onClick={() => handleProductClick(wishlistItem.itemId)}
                  className="group w-full relative"
                >
                  <div className="relative w-full pb-[130%]">
                    <ItemImage
                      item={wishlistItem.item}
                      style={{ objectFit: 'cover' }}
                      className="absolute inset-0 block group-hover:hidden object-cover"
                      fill
                    />
                    <ItemImage
                      item={wishlistItem.item}
                      style={{ objectFit: 'cover' }}
                      className="absolute inset-0 group-hover:block hidden object-cover"
                      imageIdx={1}
                      fill
                    />
                  </div>
                </div>

                <div className="self-start pt-[#2px] capitalize text-white text-xs md:text-base font-light md:mb-4 w-full truncate">
                  {wishlistItem.item.title}
                </div>

                <div className="self-start mb-4">
                  {wishlistItem.item.discountedPrice ? (
                    <div className="flex items-center gap-2">
                      <div className="text-white text-sm font-semibold">
                        {formatINR(wishlistItem.item.discountedPrice)}
                      </div>
                      {wishlistItem.item.discountedPrice <
                      wishlistItem.item.price ? (
                        <div className="text-white line-through text-xs">
                          {formatINR(wishlistItem.item.price)}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <div className="text-white text-sm font-semibold">
                      {formatINR(wishlistItem.item.price)}
                    </div>
                  )}
                </div>
                <div className=" w-full self-start">
                  <SizeSelectorDialog
                    itemId={wishlistItem.itemId}
                    onSizeSelect={(selectedVariantId) => {
                      handleRemoveFromWishlist(wishlistItem.itemId);
                      handleAddToCart(wishlistItem, selectedVariantId);
                    }}
                  >
                    <div className="p-2 bg-white w-full rounded-lg">
                      <Button className="bg-white w-full flex gap-3 h-[30px] text-black rounded-lg p-2  font-semibold tracking-wide hover:bg-transparent">
                        <LuShoppingBag size={20} />
                        <div> Add to Cart</div>
                      </Button>
                    </div>
                  </SizeSelectorDialog>
                </div>
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
