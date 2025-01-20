import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LuChevronLeft, LuChevronRight, LuTrash2 } from 'react-icons/lu';

import {
  useAddToWishlist,
  useCart,
  useRemoveFromCart,
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
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { toast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { formatINR } from '@vestido-ecommerce/utils';

import { ItemToastBody } from '../../components/item-toast-body';
import CartItemCard, { CartItemSkeleton } from './CartItem';

const CartView: React.FC = () => {
  const router = useRouter();
  const { data: { data: cartItems } = { data: [] }, isLoading } = useCart();

  const { trigger } = useRemoveFromCart();
  const { trigger: wishlistTrigger } = useAddToWishlist();

  const removeItem = (itemId: string) => {
    return cartItems.find((x) => x.itemId === itemId);
  };

  const totalPrice =
    cartItems.reduce((total, item) => {
      return total + item.qty * (item.item.discountedPrice || item.item.price);
    }, 0) ?? 0;

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
  const handleClearCart = () => {
    cartItems.forEach((cartItem) => {
      handleRemoveFromCart(cartItem.itemId, cartItem.variantId!, 'full');
    });
    toast({
      title: 'Cart Cleared !',
    });
  };
  const handleMoveAllToWishlist = () => {
    cartItems.forEach((cartItem) => {
      handleAddToWishlist(cartItem.itemId);
    });
    toast({
      title: 'Moved all to wishlist',
    });
  };
  return (
    <div>
      <div className="text-xs md:text-lg tracking-wide text-gray-300 justify-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase flex gap-2 items-center">
        <span className="md:text-2xl text-gray-600">Cart</span>
        <LuChevronRight /> Address <LuChevronRight /> Payment
      </div>
      {isLoading ? (
        Array(2)
          .fill(0)
          .map((_, index) => <CartItemSkeleton key={index} />)
      ) : cartItems.length && cartItems.length > 0 ? (
        <div className="flex flex-col xl:flex-row gap-5 md:gap-10 ">
          <div className="hidden xl:block xl:basis-[24%]"></div>

          <div className="md:grow flex flex-col ">
            {cartItems.map((cartItem, index) => {
              return (
                <CartItemCard
                  key={index}
                  cartItem={cartItem}
                  removeItem={removeItem}
                />
              );
            })}

            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex flex-col lg:flex-row gap-3 lg:justify-between items-center">
              <Link href="/products">
                <div className="flex items-center cursor-pointer">
                  <LuChevronLeft color="white" size={24} />
                  <div className="font-extrabold text-white">
                    Continue Shopping
                  </div>
                </div>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex cursor-pointer">
                    <LuTrash2 className="mr-3 mt-1" color="white" />
                    <div className="mr-5 font-extrabold text-white">
                      Clear Shopping Cart
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete every item in the cart?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You can move it all to wishlist for future.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={() => handleClearCart()}>
                      Remove
                    </AlertDialogAction>
                    <AlertDialogAction
                      onClick={() => {
                        handleMoveAllToWishlist();
                        handleClearCart();
                      }}
                    >
                      Move to wishlist
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="md:basis-1/3 overflow-auto  px-3 md:pl-5 md:sticky top-0 w-full text-white">
            <div className="flex flex-col">
              <hr className="border-gray-600" />
              <div className="flex justify-between my-5">
                <div>Items Subtotal</div>

                <div className="text-right text-xl font-semibold">
                  {formatINR(totalPrice)}
                </div>
              </div>
            </div>

            <hr className="border-gray-600" />
            <div className="text-[14px] mt-2">
              Shipping Charges and coupon codes if any will be applied at
              checkout. (Free Shipping all over Kerala)
            </div>

            <Button
              onClick={() => router.push('/checkout')}
              className="flex tracking-wide  w-full h-14  font-extrabold bg-white  text-black hover:bg-neutral-900 hover:border hover:border-white hover:text-white  justify-center mt-6 mb-1"
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      ) : (
        <div className="min-h-[80%] w-full flex flex-col gap-5 items-center justify-center font-semibold text-l text-[#f5f5f5] lg:mt-10">
          Your cart is empty.
          <div className="relative w-32 h-32 sm:w-42 sm:h-42 md:w-48 md:h-48 m-10">
            <Image src="/assets/cartempty.png" alt="" fill />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Link href="/wishlist">
              <Button className="flex tracking-wide bg-white w-full h-14 hover:bg-gray-400 font-extrabold text-black hover:text-white justify-center">
                Add from Wishlist
              </Button>
            </Link>
            <Link href="/products">
              <Button className="flex tracking-wide bg-white w-full h-14 hover:bg-gray-400 font-extrabold text-black hover:text-white justify-center">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
