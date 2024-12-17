import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Item, type WishlistItem } from '@prisma/client';
import { LuShoppingBag, LuX } from 'react-icons/lu';

import { WishlistItemResponse } from '@vestido-ecommerce/items';
import {
  useAddToCart,
  useRemoveFromWishlist,
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
import { Skeleton } from '@vestido-ecommerce/shadcn-ui/skeleton';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import { ItemToastBody } from '../../components/item-toast-body';
import { SizeSelectorDialog } from './size-selector';

type WishlistItemProp = WishlistItem & {
  item: Item;
};

type props = {
  wishlistItem: WishlistItemProp;
  removeItem: (itemId: string) => WishlistItemProp | undefined;
};

const WishlistItemCard: React.FC<props> = ({ wishlistItem, removeItem }) => {
  const router = useRouter();
  const { trigger: wishlistTrigger } = useRemoveFromWishlist();
  const { trigger } = useAddToCart();
  const { toast } = useToast();
  const [qty] = useState(1);

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
    <div className="relative flex flex-col items-center group  mb-10 cursor-pointer ">
      {wishlistItem.item.discountPercent &&
      wishlistItem.item.discountPercent > 0 ? (
        <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto z-10">
          sale&nbsp;{wishlistItem.item.discountPercent}&nbsp;%
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
            {wishlistItem.item.discountedPrice < wishlistItem.item.price ? (
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
};

export default WishlistItemCard;

export const WishlistItemSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="bg-neutral-700 h-[250px] w-[220px]" />

      <Skeleton className="h-[16px] mt-4 bg-neutral-600 w-[92%] rounded-full" />

      <Skeleton className="h-[10px] mt-4 bg-neutral-600 w-[50%] rounded-full" />
    </div>
  );
};
