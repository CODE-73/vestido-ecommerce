import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  LuChevronLeft,
  LuChevronRight,
  LuMinus,
  LuPlus,
  LuTrash2,
  LuX,
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
import { Toaster } from '@vestido-ecommerce/shadcn-ui/toaster';
import { toast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

const CartView: React.FC = () => {
  const { data: cartItems } = useCart();

  const { trigger } = useRemoveFromCart();

  const { trigger: addCartTrigger } = useAddToCart();
  const { trigger: wishlistTrigger } = useAddToWishlist();

  const removeItem = (itemId: string) => {
    const removingItem = cartItems?.data.find((x) => x.itemId === itemId);
    const images = (removingItem?.item.images ?? []) as ImageSchemaType[];
    return { removingItem, images };
  };

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
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
      toast({
        title: '',
        description: (
          <>
            <div className="flex font-semibold text-xl items-center gap-2 mb-3">
              <LuX className="text-red-500" strokeWidth={3} />
              <span>Item removed from Cart!</span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={removeItem(itemId).images[0]?.url ?? ''}
                alt="Product Thumbnail"
                className="rounded-full w-10 h-10"
                width={10}
                height={10}
              />
              <div>
                <p className="font-semibold">
                  {removeItem(itemId).removingItem?.item.title}
                </p>
                <p className="text-sm text-gray-500 max-w-full truncate text-ellipsis overflow-hidden">
                  {removeItem(itemId).removingItem?.item.description}
                </p>
              </div>
            </div>
          </>
        ),
      });
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
    toast({
      title: 'Moved to Wishlist',
    });
  };
  const handleClearCart = () => {
    cartItems?.data.forEach((cartItem) => {
      handleRemoveFromCart(cartItem.itemId, cartItem.variantId!, 'full');
    });
    toast({
      title: 'Cart Cleared !',
    });
  };
  const handleMoveAllToWishlist = () => {
    cartItems?.data.forEach((cartItem) => {
      handleAddToWishlist(cartItem.itemId);
    });
    toast({
      title: 'Moved all to wishlist',
    });
  };
  return (
    <div>
      <Toaster />
      <div className="text-xs md:text-lg tracking-wide text-gray-300 justify-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase flex gap-2 items-center">
        <span className="md:text-2xl text-[#48CAB2]">Cart</span>
        <LuChevronRight /> Address <LuChevronRight /> Payment
      </div>
      {cartItems?.data.length && cartItems.data.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-5 md:gap-10 ">
          <div className="hidden md:block md:basis-[15%] xl:basis-[24%]"></div>
          <div className="md:grow flex flex-col ">
            {cartItems?.data.map((cartItem, index) => {
              const img =
                ((cartItem.item.images ?? []) as ImageSchemaType[])?.[0] ||
                null;
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
                                handleAddToWishlist(cartItem.itemId);
                                handleRemoveFromCart(
                                  cartItem.itemId,
                                  cartItem.variantId ?? '',
                                  'full',
                                );
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
                      <Image
                        src={img.url ?? ''}
                        alt={img.alt ?? ''}
                        width={150}
                        height={195}
                        placeholder={img.blurHashDataURL ? 'blur' : undefined}
                        blurDataURL={img.blurHashDataURL ?? undefined}
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
                      <div className="  text-[#48CAB2] col-span-3">
                        {cartItem.item.discountedPrice ? (
                          <div className="flex items-center gap-2">
                            <div className="text-white text-sm font-semibold">
                              ₹&nbsp;
                              {cartItem.item.discountedPrice.toFixed(2)}
                            </div>
                            {cartItem.item.discountedPrice <
                            cartItem.item.price ? (
                              <div className="text-white line-through text-xs">
                                ₹&nbsp;{cartItem.item.price.toFixed(2)}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        ) : (
                          <div> ₹&nbsp;{cartItem.item.price.toFixed(2)}</div>
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

          <div className="md:basis-1/3 flex flex-col">
            <div className="bg-gray-100 p-10 min-h-[275px] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center text-neutral-800 justify-center pb-3 font-semibold text-xl justify-between ">
                  Items Total: <div>₹&nbsp;{totalPrice.toFixed(2)}</div>
                </div>

                <div className="font-medium text-[8px] md:text-sm">
                  Shipping charges calculated at checkout (Free Shipping all
                  over Kerala)
                </div>
              </div>
              <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
                <Link href="/checkout">PROCEED TO CHECKOUT</Link>
              </Button>
            </div>
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
              <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
                Add from Wishlist
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

export default CartView;
