import * as React from 'react';
import Image from 'next/image';

import {
  Trash2,
  Minus,
  Plus,
  ChevronLeft,
  RefreshCcw,
  Star,
  ShoppingBag,
} from 'lucide-react';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import { Badge } from 'libs/shadcn-ui/src/ui/badge';
import { AddToWishListButton } from '../HomePage/SpecialOffer/AddToWishlistButton';
import { AddToCompareButton } from '../HomePage/SpecialOffer/AddToCompareButton';
import { QuickViewButton } from '../HomePage/SpecialOffer/QuickViewButton';
import { useState } from 'react';
import useIsMobile from 'vestido/vestido-storefront/hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';
import { Textarea } from '@vestido-ecommerce/shadcn-ui/textarea';
import product11 from '../../assets/offer-products/product1-1.jpg';
import product12 from '../../assets/offer-products/product1-2.jpg';
import product21 from '../../assets/offer-products/product2-1.jpg';
import product22 from '../../assets/offer-products/product2-2.jpg';
import product31 from '../../assets/offer-products/product3-1.jpg';
import product32 from '../../assets/offer-products/product3-2.jpg';
import product41 from '../../assets/offer-products/product4-1.jpg';
import product42 from '../../assets/offer-products/product4-2.jpg';
import product51 from '../../assets/offer-products/product5-1.jpg';
import product52 from '../../assets/offer-products/product5-2.jpg';
import product61 from '../../assets/offer-products/product6-1.jpg';
import product62 from '../../assets/offer-products/product6-2.jpg';

const data = [
  {
    cardImage1: product11,
    cardImage2: product12,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product21,
    cardImage2: product22,
    name: 'Metallic Effect Bag',
    brand: 'guess',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product31,
    cardImage2: product32,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product41,
    cardImage2: product42,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
];

const CartView: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const labels = ['Days', 'Hrs', 'Min', 'Sec'];
  return (
    <div className="px-5">
      <div className="text-4xl tracking-wide text-[#333333] text-center font-extrabold my-5">
        Shopping Cart
      </div>
      <div className="flex flex-col">
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <div className="border-t border-gray-300 my-4"></div>
            </div>
            <div className="grid gap-2 grid-cols-7 items-center">
              <div className="col-span-1 flex justify-center">
                <div className="">
                  <Trash2 />
                </div>
              </div>
              <Image
                className="block w-52 col-span-1"
                src={item.cardImage1}
                alt="alt text"
              />
              <div className="text-3xl font-extrabold col-span-2">
                {item.name}
              </div>
              <div className="text-3xl font-extrabold text-[#48CAB2] col-span-1 flex justify-center">
                {item.offerPrice}
              </div>
              <div className="flex flex-row bg-zinc-100 px-4 h-14 items-center justify-around col-span-1">
                <div className="text-zinc-300">
                  <Minus />
                </div>
                <div className="font-extrabold text-2xl">1</div>
                <div className="text-zinc-300">
                  <Plus />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#48CAB2] col-span-1 flex justify-center">
                {item.offerPrice}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-300 my-4"></div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <ChevronLeft />
            <div className="font-extrabold no-underline hover:underline">
              Continue Shopping
            </div>
          </div>
        </div>
        <div className="flex">
          <Trash2 className="mr-3 " />
          <div className="mr-5 font-extrabold no-underline hover:underline">
            Clear Shopping Cart
          </div>
          <RefreshCcw className="mr-3 " />
          <div className="mr-5 font-extrabold no-underline hover:underline">
            Update Cart
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-3 h-96 p-10 mb-44 ">
        <div className="bg-gray-100 p-10 mr-7">
          <div className="text-3xl font-extrabold pb-5">
            Estimate Shipping and Tax
          </div>
          <div className="text-xl text-neutral-500 pb-3">
            Enter your destination to get a shipping estimate
          </div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-neutral-500 text-lg" htmlFor="name">
                  Country *
                </Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Label className="text-neutral-500 text-lg" htmlFor="framework">
                  Zip/Postal Code
                </Label>
                <Input type="email" placeholder="Zip/Postal Code" />
                <div className="flex pt-5 justify-center items-center">
                  <Button
                    variant="outline"
                    className="tracking-wider font-extrabold bg-gray-100 outline outline-1 outline-zinc-100  hover:outline-black "
                  >
                    Calculate Shipping
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-gray-100 p-10  mr-7 ">
          <div className="text-3xl font-extrabold pb-5">Note</div>
          <div className="text-xl text-neutral-500 pb-3">
            Add special instructions for your order...
          </div>
          <Textarea placeholder="Type your message here." />
        </div>
        <div className="bg-neutral-800 p-10">
          <div className="flex items-center text-stone-400 justify-center pb-3 text-white font-extrabold text-3xl">
            Subtotal:
          </div>
          <div className="flex item-center  text-stone-400 pb-8 justify-center text-white font-extrabold text-3xl">
            $1,140.00
          </div>
          <div className="flex item-center  text-white justify-center text-white font-extrabold text-5xl pb-5">
            Grand Total:
          </div>
          <div className="flex item-center  text-white justify-center text-white font-extrabold text-5xl">
            $1,140.00
          </div>
          <div className="flex flex-row items-center gap-2 py-4">
            <Checkbox className="bg-white" />
            <div className="text-white  text-lg">
              I agree with the terms and conditions
            </div>
          </div>
          <div className="flex item-center justify-center">
            <Button className="flex item-center tracking-wide bg-[#48CAB2] w-2/3 h-14 hover:bg-white font-extrabold hover:text-black text-white justify-center">
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="text-4xl tracking-wide text-[#333333] text-center font-extrabold my-5">
        You May Be Interested in These Products
      </div>
      <div className="text-5xl tracking-wide text-[#333333] text-center font-extrabold my-5">
        Sale
      </div>
      <div className="md:px-16">
        <div className="grid grid-cols-4 gap-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center group  mb-10 "
            >
              <Image
                className="block group-hover:hidden"
                src={item.cardImage1}
                alt="alt text"
              />
              <Image
                className="hidden group-hover:block"
                src={item.cardImage2}
                alt="alt text"
              />
              {item.salePercent && (
                <Badge className="absolute left-3 top-3 rounded-none bg-red-600">
                  SALE {item.salePercent}%
                </Badge>
              )}
              <div className=" absolute bottom-64 sm:bottom-36 bg-white opacity-80 font-extralight text-[#333333] text-lg text-center px-16">
                <div>Offer Will End Through</div>
                <div className="flex gap-2 justify-center">
                  {labels.map((label, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="font-extrabold text-2xl">0</div>
                      <div className="text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex self-start pt-2 gap-1 ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} fill="#ffb503" strokeWidth={0} size={20} />
                ))}
              </div>
              <div className="self-start pt-2 text-[#777777] uppercase text-sm font-light">
                {item.brand}
              </div>
              <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
                {item.name}
              </div>
              {isMobile ? (
                <>
                  <div className="flex text-xl justify-between w-full pt-3">
                    <div className="line-through">{item.price}</div>
                    <div className="text-red-700 font-bold">
                      {item.offerPrice}
                    </div>
                  </div>
                  <div className={`p-2 bg-[#48CAB2] w-full`}>
                    <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2 font-bold">
                      <ShoppingBag color="#fff" />
                      <div> Add to Cart</div>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="self-start mt-2">
                  <div
                    className="flex gap-1 relative items-center"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div
                      className={`p-2 bg-[#48CAB2] ${
                        isHovering ? 'w-20' : 'w-auto'
                      }`}
                      style={{ minWidth: 'min-content' }}
                    >
                      <ShoppingBag color="#fff" />
                      {isHovering && (
                        <button className=" absolute top-1 right-0 bg-[#48CAB2] text-white p-2 font-bold">
                          Add to Cart
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="line-through">{item.price}</div>
                      <div className="text-red-700 font-bold">
                        {item.offerPrice}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
                <AddToWishListButton />
                <AddToCompareButton />
                <QuickViewButton />
              </div>
            </div>
          ))}
        </div>
        <div className="text-5xl tracking-wide text-[#333333] text-center font-extrabold my-8">
          Accessories
        </div>
        <div className="grid grid-cols-4 gap-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center group  mb-10 "
            >
              <Image
                className="block group-hover:hidden"
                src={item.cardImage1}
                alt="alt text"
              />
              <Image
                className="hidden group-hover:block"
                src={item.cardImage2}
                alt="alt text"
              />

              <div className="flex self-start pt-2 gap-1 ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} fill="#ffb503" strokeWidth={0} size={20} />
                ))}
              </div>
              <div className="self-start pt-2 text-[#777777] uppercase text-sm font-light">
                {item.brand}
              </div>
              <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
                {item.name}
              </div>
              {isMobile ? (
                <>
                  <div className="flex text-xl justify-between w-full pt-3">
                    <div className="line-through">{item.price}</div>
                    <div className="text-red-700 font-bold">
                      {item.offerPrice}
                    </div>
                  </div>
                  <div className={`p-2 bg-[#48CAB2] w-full`}>
                    <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2 font-bold">
                      <ShoppingBag color="#fff" />
                      <div> Add to Cart</div>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="self-start mt-2">
                  <div
                    className="flex gap-1 relative items-center"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div
                      className={`p-2 bg-[#48CAB2] ${
                        isHovering ? 'w-20' : 'w-auto'
                      }`}
                      style={{ minWidth: 'min-content' }}
                    >
                      <ShoppingBag color="#fff" />
                      {isHovering && (
                        <button className=" absolute top-1 right-0 bg-[#48CAB2] text-white p-2 font-bold">
                          Add to Cart
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="pl-3 text-xl font-semibold text-[#48CAB2]">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
                <AddToWishListButton />
                <AddToCompareButton />
                <QuickViewButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartView;
