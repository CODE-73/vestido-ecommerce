import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuChevronLeft, LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';

import { useCart, useRemoveFromCart } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import useIsMobile from '../../../vestido-storefront/hooks/useIsMobile';
import { useState } from 'react';

const CartView: React.FC = () => {
  const isMobile = useIsMobile();
  const { data: cartItems } = useCart();

  const { trigger } = useRemoveFromCart();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    cartItems?.data.reduce((acc, item) => {
      acc[item.itemId] = item.qty;
      return acc;
    }, {} as { [key: string]: number }) ?? {}
  );

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;

  const handleRemoveFromCart = (itemId: string) => {
    trigger({
      itemId: itemId,
    });
  };

  const handleQtyChange = (itemId: string, newQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQty,
    }));
  };

  return (
    <div>
      <div className="text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase">
        <span className="text-2xl text-[#48CAB2] underline decoration-4 underline-offset-3">
          Cart
        </span>
        ----- Address ----- Payment
      </div>
      {cartItems?.data.length && cartItems.data.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-5 divide-x">
          <div className="md:basis-2/3 flex flex-col px-2 sm:px-0">
            {cartItems?.data.map((cartItem, index) => (
              <div key={index}>
                <div>
                  <div className="border-t border-gray-300 py-2"></div>
                </div>
                <div className="grid gap-2 grid-cols-9 items-center">
                  <div
                    onClick={() => handleRemoveFromCart(cartItem.itemId)}
                    className="col-span-1 flex justify-center cursor-pointer"
                  >
                    <LuTrash2 />
                  </div>
                  <Image
                    className="block col-span-2"
                    src={
                      ((cartItem.item.images ?? []) as ImageSchemaType[])[0]
                        .url!
                    }
                    alt={
                      ((cartItem.item.images ?? []) as ImageSchemaType[])[0]
                        .alt!
                    }
                    width={200}
                    height={260}
                  />
                  {isMobile ? (
                    <div className=" col-span-5 flex flex-col space-y-5 pl-8">
                      <div className="truncate text-md md:text-xl font-semibold whitespace-nowrap">
                        {cartItem.item.title}
                      </div>
                      <div className="text-xl font-semibold text-[#48CAB2] flex ">
                        {cartItem.item.price}
                      </div>
                      <div className="flex flex-row bg-zinc-100 w-32 h-14 items-center justify-around ">
                        <div
                          className="text-zinc-300"
                          onClick={() =>
                            handleQtyChange(
                              cartItem.itemId,
                              quantities[cartItem.itemId] > 1
                                ? quantities[cartItem.itemId] - 1
                                : 1
                            )
                          }
                        >
                          <LuMinus />
                        </div>
                        <div className="font-semibold text-2xl">
                          {quantities[cartItem.itemId]}
                        </div>
                        <div
                          className="text-zinc-300"
                          onClick={() =>
                            handleQtyChange(
                              cartItem.itemId,
                              quantities[cartItem.itemId] + 1
                            )
                          }
                        >
                          <LuPlus />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-xl font-extrabold col-span-2">
                        {cartItem.item.title}
                      </div>

                      <div className="flex flex-row bg-zinc-100 h-14 items-center justify-between col-span-1 px-2">
                        <div
                          className="text-zinc-300"
                          onClick={() =>
                            handleQtyChange(
                              cartItem.itemId,
                              quantities[cartItem.itemId] > 1
                                ? quantities[cartItem.itemId] - 1
                                : 1
                            )
                          }
                        >
                          <LuMinus />
                        </div>
                        <div className="font-semibold text-2xl">
                          {quantities[cartItem.itemId]}
                        </div>
                        <div
                          className="text-zinc-300"
                          onClick={() =>
                            handleQtyChange(
                              cartItem.itemId,
                              quantities[cartItem.itemId] + 1
                            )
                          }
                        >
                          <LuPlus />
                        </div>
                      </div>
                      <div className="text-3xl font-semibold text-[#48CAB2] col-span-3 flex justify-end">
                        ₹&nbsp;{cartItem.item.price.toFixed(2)}
                      </div>
                    </>
                  )}

                  {/* <div className="flex bg-zinc-100 px-4 h-12 items-center justify-around ">
            <div
              className="text-zinc-300 "
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              <LuMinus />
            </div>
            <div className="px-3 font-medium">{qty}</div>
            <div className="text-zinc-300" onClick={() => setQty(qty + 1)}>
              <LuPlus />
            </div>
          </div> */}
                </div>
              </div>
            ))}
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex flex-col lg:flex-row gap-3 lg:justify-between items-center">
              <div>
                <div className="flex items-center cursor-pointer">
                  <LuChevronLeft />
                  <div className="font-extrabold no-underline hover:underline">
                    Continue Shopping
                  </div>
                </div>
              </div>
              <div className="flex cursor-pointer">
                <LuTrash2 className="mr-3 " />
                <div className="mr-5 font-extrabold no-underline hover:underline">
                  Clear Shopping Cart
                </div>
              </div>
            </div>
          </div>

          <div className="md:basis-1/3 flex flex-col">
            <div className="bg-gray-100 p-10 min-h-[275px] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center text-neutral-800 justify-center pb-3 font-semibold text-xl justify-between ">
                  Items Total: <div>₹&nbsp;{totalPrice.toFixed(2)}</div>
                </div>

                <div className="font-medium text-sm">
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
        <div className="min-h-[80%] w-full flex flex-col gap-5 items-center justify-center font-semibold text-lg">
          Your cart is empty.
          <div className="flex flex-col md:flex-row gap-3">
            {' '}
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
