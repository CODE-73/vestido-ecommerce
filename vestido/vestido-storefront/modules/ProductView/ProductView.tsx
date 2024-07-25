import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import {
  LuChevronLeft,
  LuChevronRight,
  LuHeart,
  LuScaling,
  LuShoppingBag,
} from 'react-icons/lu';
// import Markdown from 'react-markdown';
import Markdown from 'react-markdown';

import {
  useAddToCart,
  useAddToWishlist,
  useCategory,
  useItem,
} from '@vestido-ecommerce/items';
// import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@vestido-ecommerce/shadcn-ui/accordion';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
// import { Avatar, AvatarFallback } from '@vestido-ecommerce/shadcn-ui/avatar';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
// import { ItemVariant, VariantAttributeValue } from '@prisma/client';

interface ProductViewProps {
  itemId: string;
}

const ProductView: React.FC<ProductViewProps> = ({ itemId }) => {
  const { data } = useItem(itemId);

  const item = data?.data;

  const { data: category } = useCategory(item?.categoryId);
  const itemCategory = category?.data.name;

  const [selectedImage, setSelectedImage] = React.useState<string>(
    ((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? '',
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );

  const selectedVariant = useMemo(
    () => item?.variants?.find((x) => x.id === selectedVariantId) ?? null,
    [item, selectedVariantId],
  );

  useEffect(() => {
    if (!item) {
      return;
    }

    if (item.hasVariants) {
      const defaultVar =
        item.variants.find((variant) => variant.default) || null;
      setSelectedVariantId(defaultVar?.id ?? null);
      setSelectedImage(
        ((defaultVar?.images ?? []) as ImageSchemaType[])[0]?.url || '',
      );
    } else {
      setSelectedVariantId(null);
      setSelectedImage(
        ((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? '',
      );
    }
  }, [item]);

  // const currentAttributeValues ={}
  interface AttributeValuesMap {
    [key: string]: string;
  }

  const currentAttributeValues = useMemo<AttributeValuesMap>(() => {
    if (!selectedVariant) return {};

    return selectedVariant.attributeValues.reduce((acc, attributeValue) => {
      acc[attributeValue.attribute.id] = attributeValue.attributeValue.id;
      return acc;
    }, {} as AttributeValuesMap);
  }, [selectedVariant]);

  const changeToVariant = (attributeId: string, valueId: string) => {
    const values = {
      ...currentAttributeValues,
      [attributeId]: valueId,
    };

    const _v = item?.variants.find((x) =>
      x.attributeValues.every(
        (attrVal) => values[attrVal.attribute.id] === attrVal.attributeValue.id,
      ),
    );

    if (_v) {
      setSelectedVariantId(_v.id);
      setSelectedImage(
        ((selectedVariant?.images ?? []) as ImageSchemaType[])[0]?.url || '',
      );
    }
  };
  //   const _v = item?.variants.find((x) => {
  //     x.attribute
  //   });
  //   if (_v) {
  //     setSelectedVariantId(_v.id);
  //   }
  // };

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

  const attributeMap: {
    [key: string]: { name: string; values: { value: string; id: string }[] };
  } = {};

  item?.variants.forEach((variant) => {
    variant.attributeValues.forEach((attributeValue) => {
      if (!attributeMap[attributeValue.attributeId]) {
        attributeMap[attributeValue.attributeId] = {
          name: attributeValue.attribute.name,
          values: [],
        };
      }
      if (
        !attributeMap[attributeValue.attributeId].values.find(
          (x) => x.id === attributeValue.attributeValue.id,
        )
      ) {
        attributeMap[attributeValue.attributeId].values.push({
          value: attributeValue.attributeValue.value,
          id: attributeValue.attributeValue.id,
        });
      }
    });
  });

  console.log('selectedVariantId now', selectedVariantId);
  const handleAddToCart = () => {
    if (item) {
      cartTrigger({
        itemId: item.id,
        qty: 1,
        variantId: selectedVariantId ?? null,
      });
    }
    console.log('handleAddToCart');
  };

  const handleAddToWishlist = () => {
    if (item) {
      wishlistTrigger({
        itemId: item.id,
        // variantId: selectedVariantId ?? null,
      });
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row py-5 px-2 md:px-0 md:space-x-10">
      <div className="w-full md:w-1/2">
        <div className="flex justify-center items-center pb-4">
          <Image
            className="w-4/6 px-5 h-4/6"
            src={
              selectedImage
                ? selectedImage
                : (((selectedVariant?.images ?? []) as ImageSchemaType[])[0]
                    ?.url ?? '')
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
              {((selectedVariant?.images ?? []) as ImageSchemaType[]).length >
              1 ? (
                <>
                  {((selectedVariant?.images ?? []) as ImageSchemaType[]).map(
                    (image, index) => (
                      <div
                        key={index}
                        className="basis-1/5 flex-none"
                        onClick={() => setSelectedImage(image.url!)}
                      >
                        <Image
                          className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                          src={image.url ?? ''}
                          alt="alt text"
                          width={100}
                          height={150}
                        />
                      </div>
                    ),
                  )}
                </>
              ) : (
                <>
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
                    ),
                  )}
                </>
              )}
              {/* {((item?.images ?? []) as ImageSchemaType[]).map(
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
              )} */}
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
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-semibold">{item?.title}</h1>
        <div className="flex flex-row items-center gap-1">
          <div className="text-2xl font-semibold">
            Rs.
            {item?.discountedPrice && item?.discountedPrice > 0
              ? item?.discountedPrice
              : item?.price}
          </div>
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

          <div className="mt-5 flex flex-col gap-5">
            {Object.keys(attributeMap).map((attributeId) => (
              <div key={attributeId} className="flex gap-2">
                <strong>{attributeMap[attributeId].name}:</strong>
                {attributeMap[attributeId].values.map((value, index) => (
                  <div
                    key={index}
                    onClick={() => changeToVariant(attributeId, value.id)}
                    className={`flex flex-col outline outline-3 ${
                      selectedVariant?.attributeValues.some(
                        (attrVal) =>
                          attrVal.attributeId === attributeId &&
                          attrVal.attributeValue.id === value.id,
                      )
                        ? 'outline-black'
                        : 'outline-zinc-100 hover:outline-black'
                    }`}
                  >
                    <div className="text-xs outline outline-3 p-2">
                      {value.value}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row pr-5 gap-1 py-6">
          <LuScaling />
          <h1>Size Guide</h1>
        </div>

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
        <div className="flex gap-2 mb-5 w-full">
          <div className="flex bg-[#48CAB2] items-center gap-2 flex-1 justify-center text-white  ">
            <LuShoppingBag size={30} />
            <Button
              onClick={() => handleAddToCart()}
              className="text-xl font-semibold bg-transparent hover:bg-transparent"
            >
              ADD TO CART
            </Button>
          </div>
          <div
            onClick={() => handleAddToWishlist()}
            className="border border-2 border-[#48CAB2] font-medium text-xs  h-full self-center p-4"
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
