import * as React from 'react';
import Image from 'next/image';
import { Trash2, Minus, Plus, ChevronLeft } from 'lucide-react';

import useIsMobile from '../../../vestido-storefront/hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

import { useCart } from '@vestido-ecommerce/items';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import Link from 'next/link';

const CartView: React.FC = () => {
  const isMobile = useIsMobile();
  const { data: cartItems } = useCart();
  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;

  return (
    <div>
      <div className="text-lg tracking-wide text-gray-300 text-center font-semibold my-12 uppercase">
        <span className="text-2xl text-[#48CAB2] underline decoration-4 underline-offset-3">
          Cart
        </span>
        ----- Address ----- Payment
      </div>

      <div className="flex gap-5 divide-x">
        <div className="basis-2/3 flex flex-col px-2 sm:px-0">
          {cartItems?.data.map((cartItem, index) => (
            <div key={index}>
              <div>
                <div className="border-t border-gray-300 py-2"></div>
              </div>
              <div className="grid gap-2 grid-cols-8 items-center">
                <div className="col-span-1 flex justify-center">
                  <div className="">
                    <Trash2 />
                  </div>
                </div>
                <Image
                  className="block col-span-2"
                  src={
                    ((cartItem.item.images ?? []) as ImageSchemaType[])[0].url!
                  }
                  alt={
                    ((cartItem.item.images ?? []) as ImageSchemaType[])[0].alt!
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
                      <div className="text-zinc-300">
                        <Minus />
                      </div>
                      <div className="font-semibold text-2xl">
                        {cartItem.qty}
                      </div>
                      <div className="text-zinc-300">
                        <Plus />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-xl font-extrabold col-span-2">
                      {cartItem.item.title}
                    </div>

                    <div className="flex flex-row bg-zinc-100 px-4 h-14 items-center justify-around col-span-1">
                      <div className="text-zinc-300">
                        <Minus />
                      </div>
                      <div className="font-semibold text-2xl">1</div>
                      <div className="text-zinc-300">
                        <Plus />
                      </div>
                    </div>
                    <div className="text-3xl font-semibold text-[#48CAB2] col-span-1 flex justify-center">
                      {cartItem.item.price}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center cursor-pointer">
                <ChevronLeft />
                <div className="font-extrabold no-underline hover:underline">
                  Continue Shopping
                </div>
              </div>
            </div>
            <div className="flex cursor-pointer">
              <Trash2 className="mr-3 " />
              <div className="mr-5 font-extrabold no-underline hover:underline">
                Clear Shopping Cart
              </div>
            </div>
          </div>
        </div>

        <div className="basis-1/3 flex-flex-col">
          <div className="bg-gray-100 p-10 min-h-[275px] relative flex flex-col justify-between">
            <div>
              <div className="flex items-center text-neutral-800 justify-center pb-3 font-semibold text-xl justify-between ">
                Items Total: <div>{totalPrice}</div>
              </div>

              <div className="font-medium text-sm">
                Shipping charges calculated at checkout (Free Shipping all over
                Kerala)
              </div>
            </div>
            <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
              <Link href="/checkout">PROCEED TO CHECKOUT</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
