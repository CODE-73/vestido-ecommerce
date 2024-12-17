import * as React from 'react';
import Link from 'next/link';

import { type CartItem, Item } from '@prisma/client';
import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';

import {
  useAddToCart,
  useAddToWishlist,
  useRemoveFromCart,
  useSizeAttribute,
} from '@vestido-ecommerce/items/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
import { Skeleton } from '@vestido-ecommerce/shadcn-ui/skeleton';
import { toast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import { ItemToastBody } from '../../components/item-toast-body';

type CartItemProp = CartItem & {
  item: Item;
};

type props = {
  cartItem: CartItemProp;
  removeItem: (itemId: string) => CartItemProp | undefined;
};

const CartItemCard: React.FC<props> = ({ cartItem, removeItem }) => {
  const { trigger } = useRemoveFromCart();

  const { trigger: addCartTrigger } = useAddToCart();
  const { trigger: wishlistTrigger } = useAddToWishlist();
  const { variantSize } = useSizeAttribute(cartItem.itemId, cartItem.variantId);

  const handleRemoveFromCart = (
    itemId: string,
    variantId: string,
    actionType: 'full' | 'decrement',
  ) => {
    trigger({
      itemId: itemId,
      variantId: variantId,
      actionType: actionType,
    });
    if (actionType === 'full') {
      const removedItem = removeItem(itemId);
      if (!removedItem) {
        toast({
          title: 'Error',
          description: 'Item not found in the cart!',
        });
      } else {
        toast({
          title: '',
          description: ItemToastBody(
            false,
            removedItem.item,
            'Item removed from Cart!',
          ),
        });
      }
    }
  };
  const handleAddToCart = (itemId: string, qty: number, variantId: string) => {
    addCartTrigger({
      itemId: itemId,
      qty: qty,
      variantId: variantId,
    });
  };
  const handleAddToWishlist = (itemId: string) => {
    wishlistTrigger({
      itemId: itemId,
    });
    const removedItem = removeItem(itemId);
    if (!removedItem) {
      toast({
        title: 'Error',
        description: 'Item not found in the cart!',
      });
    } else {
      toast({
        title: '',
        description: ItemToastBody(true, removedItem.item, 'Moved to Wishlist'),
      });
    }
  };
  return (
    <div key={cartItem.id}>
      <div className="flex gap-2 lg:gap-4 items-center bg-neutral-800 border border-gray-600 mb-5 min-h-[170px]  md:rounded-lg  relative">
        <div className="absolute right-1 md:right-5 top-1 md:top-5">
          <AlertDialog>
            <AlertDialogTrigger asChild className="cursor-pointer">
              <LuTrash2 color="rgb(161 161 170)" size={20} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this item from cart?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You can move this to wishlist for future.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() =>
                    handleRemoveFromCart(
                      cartItem.itemId,
                      cartItem.variantId!,
                      'full',
                    )
                  }
                >
                  Remove
                </AlertDialogAction>
                <AlertDialogAction
                  onClick={() => {
                    handleRemoveFromCart(
                      cartItem.itemId,
                      cartItem.variantId ?? '',
                      'full',
                    );
                    handleAddToWishlist(cartItem.itemId);
                  }}
                >
                  Move to wishlist
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Link
          href={`/products/${cartItem.itemId}`}
          className="block basis-1/5 md:basis-1/4"
        >
          <ItemImage
            item={cartItem.item}
            width={150}
            height={195}
            className="pl-2 md:pl-0 md:rounded-l-lg"
          />
        </Link>

        <div className="flex flex-col gap-1 lg:gap-3 md:self-start my-4">
          <div className="md:text-xl font-semibold text-white">
            {cartItem.item.title}
          </div>

          <div className="flex flex-row text-neutral-500 border border-neutral-500 rounded-full  w-[100px] items-center justify-between  px-2 ">
            <div
              className="text-zinc-300 cursor-pointer"
              onClick={() => {
                handleRemoveFromCart(
                  cartItem.itemId,
                  cartItem.variantId!,
                  'decrement',
                );
              }}
            >
              <LuMinus />
            </div>
            <div className="font-semibold ">{cartItem.qty}</div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                handleAddToCart(
                  cartItem.itemId,
                  cartItem.qty + 1,
                  cartItem.variantId!,
                );
              }}
            >
              <LuPlus />
            </div>
          </div>
          <div className="flex text-white gap-3">
            <div>Size: </div>
            <div className="uppercase"> {variantSize}</div>
          </div>
          <div className="  col-span-3">
            {cartItem.item.discountedPrice ? (
              <div className="flex items-center gap-2">
                <div className="text-white text-sm font-semibold">
                  {formatINR(cartItem.item.discountedPrice)}
                </div>
                {cartItem.item.discountedPrice < cartItem.item.price ? (
                  <div className="text-white line-through text-xs">
                    {formatINR(cartItem.item.price)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div> {formatINR(cartItem.item.price)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

export const CartItemSkeleton = () => {
  return (
    <div className="flex gap-2 lg:gap-4 items-center bg-neutral-800 border border-gray-600 mb-5 min-h-[170px]  md:rounded-lg  relative">
      <div className="absolute right-1 md:right-5 top-1 md:top-5">
        <Skeleton className="bg-neutral-900 h-10 w-10 rounded-full" />
      </div>

      <Skeleton className="w-[150px] h-[195px] pl-2 md:pl-0 md:rounded-l-lg bg-neutral-700" />

      <div className="flex flex-col gap-1 lg:gap-3 md:self-start my-4">
        <Skeleton className="w-[300px] h-[20px] rounded-full bg-neutral-600" />
        <Skeleton className="w-[200px] mt-8 h-[10px] rounded-full bg-neutral-600" />
        <Skeleton className="w-[150px] h-[10px] rounded-full bg-neutral-600" />
        <Skeleton className="w-[150px] h-[10px] rounded-full bg-neutral-600" />
      </div>
    </div>
  );
};
