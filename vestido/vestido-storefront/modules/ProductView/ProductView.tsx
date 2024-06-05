import * as React from 'react';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@vestido-ecommerce/shadcn-ui/accordion';
import { Avatar, AvatarFallback } from '@vestido-ecommerce/shadcn-ui/avatar';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import Image from 'next/image';

import {
  Scaling,
  Truck,
  Mail,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  GitCompareArrows,
  Star,
} from 'lucide-react';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import product11 from '../../assets/offer-products/product1-1.jpg';
import product12 from '../../assets/offer-products/product1-2.jpg';

const product = [
  {
    cardImage1: product11,
    cardImage2: product12,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    price: '$450.00',
    offerPrice: '$390.00',
  },
];

const reviews = [
  {
    title: 'AMZAZING',
    user: 'Violan',
    date: 'Jul 09, 2019',
    description:
      'Thank you very much for providing this wonderful theme which provides all the features you may need it is an integrated template :) Full support is also provided. They have wonderful support :)',
  },
  {
    title: 'PERFECT',
    user: 'Sarah',
    date: 'Jul 09, 2019',
    description:
      'The Feature and options of customization are amazing. buy this theme without any research. The team is very helpful and the output of the theme is very user friendly.',
  },
];

const ProductView: React.FC = () => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const labels = ['Days', 'Hrs', 'Min', 'Sec'];
  return (
    <div className="w-full flex flex-row py-5 ">
      <div className="w-1/6 grid justify-items-end">
        <div className="w-20">
          <div className="sticky top-0">
            <Image
              className="outline outline-3 hover:outline-black mb-3"
              src={product[0].cardImage1}
              alt="alt text"
            />
            <Image
              className="outline outline-3 hover:outline-black"
              src={product[0].cardImage2}
              alt="alt text"
            />
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div className="sticky top-0">
          <Image
            className="w-5/6 px-5 h-4/6"
            src={product[0].cardImage1}
            alt="alt text"
          />
        </div>
      </div>
      <div className="w-1/3">
        <div className="text-sm font-semibold pb-3">Offer Will End Through</div>
        <div className="flex gap-2 pb-7">
          {labels.map((label, index) => (
            <div
              key={index}
              className="flex flex-col bg-zinc-100 w-16 h-14 items-center"
            >
              <div className="font-extrabold text-2xl">0</div>
              <div className="text-xs">{label}</div>
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-semibold">T-shirt with pearly sleeves</h1>
        <div className="flex flex-row items-center gap-1">
          <div>
            <s>$450.00</s>
          </div>
          <div className="text-2xl font-semibold text-red-700 ">$390.00</div>
        </div>
        <div className="flex flex-row py-3 gap-3 items-center">
          <div className="flex self-start  gap-1 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} fill="#ffb503" strokeWidth={0} size={20} />
            ))}
          </div>
          <div className="text-xs font-semibold text-[#48CAB2] ">2 reviews</div>
        </div>
        <div className="text-sm ">
          <div className="flex flex-row">
            <h1 className="font-extralight">SKU:&nbsp; </h1>
            <h1 className="font-semibold">w20</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="font-extralight">Availability:&nbsp; </h1>
            <h1 className="font-semibold">Many in stock</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="font-extralight">Vendor:&nbsp; </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="font-extralight">Product Type:&nbsp; </h1>
            <h1 className="font-semibold no-underline hover:underline">
              T-Shirts
            </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="font-extralight">Barcode:&nbsp; </h1>
            <h1 className="font-semibold">0123456789</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="font-extralight">Tags:&nbsp; </h1>
            <h1 className="font-semibold no-underline hover:underline">Nice</h1>
          </div>
          <div className="flex flex-row pt-4">
            <h1 className="font-extralight">Color:&nbsp; </h1>
            <h1 className="font-semibold no-underline ">Green</h1>
          </div>
          <Button
            className="bg-transparent hover:bg-transparent text-xs "
            onClick={() => console.log('haii')}
          >
            <Avatar className="outline outline-3  hover:outline-black">
              <AvatarFallback className="bg-[#48CAB2] text-xs ">
                Green
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex flex-row pt-4">
            <h1 className="font-extralight">Size:&nbsp; </h1>
            <h1 className="font-semibold no-underline">XS</h1>
          </div>
        </div>
        <div className="flex gap-2 pt-2 ">
          {sizes.map((size, index) => (
            <div
              key={index}
              className="flex flex-col outline outline-3 outline-zinc-100 hover:outline-black   "
            >
              <div className="text-xs outline outline-3 p-2">{size}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-row r py-6 text-sm ">
          <div className="flex flex-row pr-5 gap-1 ">
            <Scaling />
            <h1>Size Guide</h1>
          </div>
          <div className="flex flex-row pr-5 gap-1">
            <Truck />
            <h1>Shipping</h1>
          </div>
          <div className="flex flex-row  gap-1">
            <Mail />
            <h1>Ask about this product</h1>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-2 mb-5 ">
            <div className="flex flex-row bg-zinc-100 px-4 h-12 items-center justify-around ">
              <div className="text-zinc-300  ">
                <Minus />
              </div>
              <div className="px-3 font-medium">1</div>
              <div className="text-zinc-300">
                <Plus />
              </div>
            </div>
            <div className="flex flex-row bg-[#48CAB2] items-center gap-2 w-full justify-center text-white  ">
              <ShoppingBag />
              <div className="text-xs font-semibold ">ADD TO CART</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex flex-row outline outline-1 outline-zinc-100  hover:outline-black font-medium text-xs w-2/4 h-7 items-center justify-center">
            <Heart />
            <div>Add to whistlist</div>
          </div>
          <div className="flex flex-row outline outline-1 outline-zinc-100 hover:outline-black font-medium text-xs w-2/4 h-7 items-center justify-center">
            <GitCompareArrows />
            <div>Add to compare</div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 py-4">
          <Checkbox />
          <div className="text-black font-extralight text-sm">
            I agree with the terms and conditions
          </div>
        </div>
        <div className="w-full bg-neutral-500 flex items-center justify-center font-medium text-white text-xs h-10">
          Buy it now
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                Please, enjoy our best rated Shopify Theme Yanka. This item is
                among bestsellers among Top Popular items on ThemeForest. Yanka
                is universal Shopify theme. Take a look on our amazing demos -
                any store niche os covered by Yanka functionality. Yanka Shopify
                theme is compatible with Oberlo, Weglot and many other 3rd party
                apps from Shopify community. Buying Yanka Shopify theme will be
                best investment in your future web store. You do not need to
                review our competitors
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Additional Information</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader className="bg-neutral-100">
                    <TableRow>
                      <TableHead className="w-[100px] ">Color:</TableHead>
                      <TableCell className="font-extrabold">
                        Blue, Purple, White
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Size:</TableHead>
                      <TableCell className="font-extrabold"> 20, 24</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableHeader className="bg-neutral-100">
                    <TableRow>
                      <TableHead className="w-[100px]">Material:</TableHead>
                      <TableCell className="font-extrabold">
                        100% Polyester
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Reviews </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-row py-3 gap-3 pb-7">
                  <div className="flex self-start  gap-1 ">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        fill="#ffb503"
                        strokeWidth={0}
                        size={20}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-[#48CAB2] ">
                    Based on 2 reviews
                  </div>
                  <div className="text-sm font-bold text-[#48CAB2] underline hover:no-underline ml-auto">
                    Write a review
                  </div>
                </div>

                <div className="flex self-start gap-1 pb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      fill="#ffb503"
                      strokeWidth={0}
                      size={20}
                    />
                  ))}
                </div>
                <div>
                  {reviews.map((review, index) => (
                    <div key={index}>
                      <div className="font-extrabold text-2xl">
                        {review.title}
                      </div>
                      <div className="flex flex-row py-5">
                        <div className="font-semibold">{review.user} </div>
                        <div>&nbsp;on&nbsp;</div>
                        <div className="font-semibold"> {review.date} </div>
                      </div>
                      <div className="pb-7 text-gray-500">
                        {review.description}
                      </div>
                      <div className="text-sm font-bold text-[#48CAB2] underline hover:no-underline flex justify-end">
                        Report as Inappropriate
                      </div>
                      <div className="border-t border-gray-300 my-4"></div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
