import * as React from 'react';
// import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@vestido-ecommerce/shadcn-ui/accordion';
// import { Avatar, AvatarFallback } from '@vestido-ecommerce/shadcn-ui/avatar';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import Image from 'next/image';
// import Markdown from 'react-markdown';
import Markdown from 'react-markdown';

import {
  LuScaling,
  LuMinus,
  LuPlus,
  LuShoppingBag,
  LuHeart,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';
import {
  useCategory,
  useItem,
  useAddToCart,
  useAddToWishlist,
} from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useState } from 'react';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
// import { ItemVariant, VariantAttributeValue } from '@prisma/client';

interface ProductViewProps {
  itemId: string;
}

const ProductView: React.FC<ProductViewProps> = ({ itemId }) => {
  const { data } = useItem(itemId);

  const item = data?.data;

  console.log(item?.variants);

  const { data: category } = useCategory(item?.categoryId);
  const itemCategory = category?.data.name;

  const [selectedImage, setSelectedImage] = React.useState<string>(
    ((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''
  );

  const [qty, setQty] = useState(1);

  const { trigger: cartTrigger } = useAddToCart();
  const { trigger: wishlistTrigger } = useAddToWishlist();

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }
  };
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const attributeMap: { [key: string]: { name: string; values: string[] } } =
    {};

  item?.variants.forEach((variant) => {
    variant.attributeValues.forEach((attributeValue) => {
      if (!attributeMap[attributeValue.attributeId]) {
        attributeMap[attributeValue.attributeId] = {
          name: attributeValue.attribute.name,
          values: [],
        };
      }
      if (
        !attributeMap[attributeValue.attributeId].values.includes(
          attributeValue.attributeValue.value
        )
      ) {
        attributeMap[attributeValue.attributeId].values.push(
          attributeValue.attributeValue.value
        );
      }
    });
  });
  const handleAddToCart = () => {
    if (item) {
      cartTrigger({
        itemId: item.id,
        qty: qty,
        variantId: item.variants?.[0]?.id ?? null,
      });
    }
    console.log('handleAddToCart');
  };

  const handleAddToWishlist = () => {
    if (item) {
      wishlistTrigger({
        itemId: item.id,
      });
    }
  };

  return (
    <div className="w-full flex py-5 space-x-10">
      <div className="w-1/2">
        <div className="flex justify-center items-center pb-4">
          <Image
            className="w-4/6 px-5 h-4/6"
            src={
              selectedImage
                ? selectedImage
                : ((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''
            }
            alt="alt text"
            width={550}
            height={720}
          />
        </div>
        <div className="relative">
          {' '}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white z-10 p-2 rounded-full shadow-md"
          >
            <LuChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden no-scrollbar flex space-x-2"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex space-x-2 w-full">
              {((item?.images ?? []) as ImageSchemaType[]).map(
                (image, index) => (
                  <div
                    key={index}
                    className="basis-1/5 flex-none"
                    onClick={() => setSelectedImage(image.url!)}
                  >
                    <Image
                      className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                      src={image.url!}
                      alt="alt text"
                      width={100}
                      height={150}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white z-10 p-2 rounded-full shadow-md"
          >
            <LuChevronRight />
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold">{item?.title}</h1>
        <div className="flex flex-row items-center gap-1">
          <div className="text-2xl font-semibold">Rs.{item?.price}</div>
        </div>

        <div className="text-sm ">
          <div className="flex flex-row">
            <h1 className="font-extralight">Availability:&nbsp; </h1>
            <h1 className="font-semibold">
              {item?.stockStatus === 'LIMITED_STOCK'
                ? 'Limited Stock'
                : item?.stockStatus === 'OUT_OF_STOCK'
                ? 'Out of Stock'
                : 'Available'}
            </h1>
          </div>

          <div className="flex gap-2">
            <h1 className="font-extralight">Category</h1>
            <h1 className="font-semibold no-underline hover:underline">
              {itemCategory}
            </h1>
          </div>

          {/* <div>
            {' '}
            {item?.variants.map((variant, variantIndex) => (
              <div key={variantIndex}>
                {variant.attributeValues.map((attribute, attributeIndex) => (
                  <div key={attributeIndex}>{attribute.attribute.name}</div>
                ))}
              </div>
            ))}
          </div> */}

          <div className="mt-5 flex flex-col gap-5">
            {Object.keys(attributeMap).map((attributeId) => (
              <div key={attributeId} className="flex gap-5">
                <strong>{attributeMap[attributeId].name}:</strong>

                {attributeMap[attributeId].values.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col outline outline-3 outline-zinc-100 hover:outline-black "
                  >
                    <div className="text-xs outline outline-3 p-2">{value}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

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

        <div className="flex flex-row pr-5 gap-1 py-6">
          <LuScaling />
          <h1>Size Guide</h1>
        </div>

        <div className="flex gap-2 mb-5 ">
          <div className="flex bg-zinc-100 px-4 h-12 items-center justify-around ">
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
          </div>
          <div className="flex bg-[#48CAB2] items-center gap-2 w-full justify-center text-white  ">
            <LuShoppingBag />
            <Button
              onClick={() => handleAddToCart()}
              className="text-xl font-semibold bg-transparent hover:bg-transparent"
            >
              ADD TO CART
            </Button>
          </div>
          <div
            onClick={() => handleAddToWishlist()}
            className="outline outline-2 outline-[#48CAB2] font-medium text-xs  h-full self-center p-4"
          >
            <LuHeart size={24} />
          </div>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <Markdown className="prose">{item?.description}</Markdown>
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
                  <TableHeader></TableHeader>
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
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
