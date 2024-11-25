import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  LuChevronLeft,
  LuChevronRight,
  LuMinus,
  LuPlus,
  LuTrash2,
} from 'react-icons/lu';

import {
  useAddToCart,
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

import ItemImage from '../../components/item-image';
import { ItemToastBody } from '../../components/item-toast-body';

const CartView: React.FC = () => {
  const router = useRouter();
  const { data: { data: cartItems } = { data: [] } } = useCart();

  const { trigger } = useRemoveFromCart();

  const { trigger: addCartTrigger } = useAddToCart();
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
      {cartItems.length && cartItems.length > 0 ? (
        <div className="flex flex-col xl:flex-row gap-5 md:gap-10 ">
          <div className="hidden xl:block xl:basis-[24%]"></div>
          <div className="md:grow flex flex-col ">
            {cartItems.map((cartItem, index) => {
              return (
                <div key={index}>
                  <div className="flex gap-2 lg:gap-4 items-center bg-neutral-800 border border-gray-600 mb-5 min-h-[170px]  md:rounded-lg  relative">
                    <div className="absolute right-1 md:right-5 top-1 md:top-5">
                      <AlertDialog>
                        <AlertDialogTrigger asChild className="cursor-pointer">
                          <LuTrash2 color="rgb(161 161 170)" size={20} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this item from
                              cart?
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
                      <div className="  col-span-3">
                        {cartItem.item.discountedPrice ? (
                          <div className="flex items-center gap-2">
                            <div className="text-white text-sm font-semibold">
                              {formatINR(cartItem.item.discountedPrice)}
                            </div>
                            {cartItem.item.discountedPrice <
                            cartItem.item.price ? (
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
            })}
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex flex-col lg:flex-row gap-3 lg:justify-between items-center">
              <Link href="/products">
                <div className="flex items-center cursor-pointer">
                  <LuChevronLeft color="white" size={24} />
                  <div className="font-extrabold no-underline hover:underline text-white">
                    Continue Shopping
                  </div>
                </div>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex cursor-pointer">
                    <LuTrash2 className="mr-3 " color="white" />
                    <div className="mr-5 font-extrabold no-underline hover:underline text-white">
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
