import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { useMediaQuery } from '@react-hook/media-query';
import { LuCalendar, LuScaling, LuShoppingBag, LuTruck } from 'react-icons/lu';
import Markdown from 'react-markdown';

import { useAuth } from '@vestido-ecommerce/auth/client';
import {
  useAddToCart,
  useCategory,
  useItem,
} from '@vestido-ecommerce/items/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@vestido-ecommerce/shadcn-ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@vestido-ecommerce/shadcn-ui/breadcrumb';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import AddToWishListButton from '../ProductListView/AddToWishlistButton';
import ProductListView from '../ProductListView/ProductListView';

interface ProductViewProps {
  itemId: string;
}

const ProductView: React.FC<ProductViewProps> = ({ itemId }) => {
  const { isAuthenticated, routeToLogin } = useAuth();

  const { data: { data: item } = { data: null } } = useItem(itemId);
  const { data: category } = useCategory(item?.categoryId);
  const itemCategory = category?.data.name;

  const [selectedImage, setSelectedImage] =
    React.useState<ImageSchemaType | null>(
      (item?.images as ImageSchemaType[])?.[0] ?? null,
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
        item.variants.find((variant) => variant.default) || item.variants[0];
      setSelectedVariantId(defaultVar?.id ?? null);
      setSelectedImage(
        ((defaultVar?.images ?? []) as ImageSchemaType[])[0] || null,
      );
    } else {
      setSelectedVariantId(null);
      setSelectedImage(((item?.images ?? []) as ImageSchemaType[])[0] ?? null);
    }
  }, [item]);
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
        ((selectedVariant?.images ?? []) as ImageSchemaType[])[0] || null,
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

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const mainImageRef = React.useRef<HTMLImageElement>(null);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // const scrollUp = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({ top: -800, behavior: 'smooth' });
  //   }
  // };

  // const scrollDown = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({ top: 800, behavior: 'smooth' });
  //   }
  // };
  useEffect(() => {
    const adjustCarouselHeight = () => {
      if (mainImageRef.current && carouselRef.current) {
        carouselRef.current.style.height = `${mainImageRef.current.clientHeight}px`;
      }
    };

    adjustCarouselHeight();
    window.addEventListener('resize', adjustCarouselHeight);

    return () => {
      window.removeEventListener('resize', adjustCarouselHeight);
    };
  }, []);

  const predefinedSizeOrder = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
  ];

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

  Object.keys(attributeMap).forEach((attributeId) => {
    const attributeName = attributeMap[attributeId].name.toLowerCase();

    if (attributeName === 'size' || attributeName === 'sizes') {
      attributeMap[attributeId].values.sort(
        (a, b) =>
          predefinedSizeOrder.indexOf(a.value.toLowerCase()) -
          predefinedSizeOrder.indexOf(b.value.toLowerCase()),
      );
    }
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    if (item) {
      cartTrigger({
        itemId: item.id,
        qty: 1,
        variantId: selectedVariantId ?? null,
      });
    }
  };

  const mainImage = selectedImage
    ? selectedImage
    : ((selectedVariant?.images ?? item?.images ?? []) as ImageSchemaType[])[0];

  const isMdAndAbove = useMediaQuery('(min-width:768px)');
  return (
    <>
      <Breadcrumb className="p-3 text-gray-200">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${item?.categoryId}`}>
              {itemCategory}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">
              {item?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full flex flex-col md:flex-row py-5 sm:px-2 md:px-0 md:space-x-10 md:px-10 lg:px-20 xl:px-64 text-white">
        <div className="w-full sm:flex hidden sm:block md:w-1/2 justify-start">
          <div
            className="relative basis-1/6 overflow-y-auto no-scrollbar lg:pl-10"
            ref={carouselRef}
          >
            {/* <button
            onClick={scrollUp}
            className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white z-10 p-2 rounded-full shadow-md"
          >
            <LuChevronUp />
          </button> */}
            <div
              ref={scrollRef}
              className="overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col "
              style={{ scrollbarWidth: 'none' }}
            >
              <div className=" w-full px-2">
                {((selectedVariant?.images ?? []) as ImageSchemaType[]).length >
                1 ? (
                  <>
                    {((selectedVariant?.images ?? []) as ImageSchemaType[]).map(
                      (image, index) => (
                        <div
                          key={index}
                          className=""
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                            src={image.url ?? ''}
                            placeholder={
                              image.blurHashDataURL ? 'blur' : undefined
                            }
                            blurDataURL={image.blurHashDataURL ?? undefined}
                            alt="alt text"
                            fill
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
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                            placeholder={
                              image.blurHashDataURL ? 'blur' : undefined
                            }
                            blurDataURL={image.blurHashDataURL ?? undefined}
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
              </div>
            </div>
            {/* <button
            onClick={scrollDown}
            className="absolute bottom-3 left-1/2 transform-translate-x-1/2 bg-white z-10 p-2 rounded-full shadow-md"
          >
            <LuChevronDown />
          </button> */}
          </div>
          <div className="basis-5/6 text-right">
            <Image
              // className="w-4/6 px-5 h-4/6"
              ref={mainImageRef}
              src={mainImage?.url ?? ''}
              placeholder={mainImage?.blurHashDataURL ? 'blur' : undefined}
              blurDataURL={mainImage?.blurHashDataURL ?? undefined}
              alt="alt text"
              width={550}
              height={720}
            />
          </div>
        </div>
        <div className="sm:hidden">
          <Carousel className=" w-full relative">
            <CarouselContent>
              {((selectedVariant?.images ?? []) as ImageSchemaType[]).length >
              1 ? (
                <>
                  {((selectedVariant?.images ?? []) as ImageSchemaType[]).map(
                    (image, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={image.url ?? ''}
                          placeholder={
                            image.blurHashDataURL ? 'blur' : undefined
                          }
                          blurDataURL={image.blurHashDataURL ?? undefined}
                          alt="alt text"
                          fill
                          width={550}
                          height={720}
                        />
                      </CarouselItem>
                    ),
                  )}
                </>
              ) : (
                <>
                  {((item?.images ?? []) as ImageSchemaType[]).map(
                    (image, index) => (
                      <CarouselItem key={index}>
                        <div>
                          <Image
                            className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                            src={image.url!}
                            placeholder={
                              image.blurHashDataURL ? 'blur' : undefined
                            }
                            blurDataURL={image.blurHashDataURL ?? undefined}
                            alt="alt text"
                            width={550}
                            height={720}
                          />
                        </div>
                      </CarouselItem>
                    ),
                  )}
                </>
              )}
            </CarouselContent>
            {/* <CarouselPrevious />
          <CarouselNext /> */}
          </Carousel>
        </div>
        <div className="w-full  md:w-1/2">
          <div className="px-2 sm:px-auto">
            <h1 className="text-xl md:text-3xl font-semibold mt-2 md:mt-5 lg:mt-auto">
              {item?.title}
            </h1>
            <div className="flex flex-row items-center gap-1">
              <div className="text-2xl text-gray-500 md:text-black  mt-5 md:mt-0 font-semibold">
                ₹&nbsp;
                {item?.discountedPrice && item?.discountedPrice > 0
                  ? item?.discountedPrice.toFixed(2)
                  : item?.price.toFixed(2)}
              </div>
            </div>

            <div className="text-sm mt-4">
              <div className="flex">
                <h1 className="font-extralight">Availability:&nbsp; </h1>
                <h1
                  className={`font-semibold ${item?.stockStatus == 'LIMITED_STOCK' ? 'text-yellow-400' : item?.stockStatus === 'OUT_OF_STOCK' ? 'text-red-400' : 'text-green-500'}`}
                >
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

              <div className="flex gap-2">
                <h1 className="font-extralight">SKU: </h1>
                <h1 className="font-semibold no-underline hover:underline">
                  {item?.variants?.length && item?.variants?.length > 0
                    ? selectedVariant?.sku
                    : item?.sku}
                </h1>
              </div>

              <div className="mt-5 flex flex-col gap-5">
                <hr className="border-gray-600" />
                {Object.keys(attributeMap).map((attributeId) => (
                  <div
                    key={attributeId}
                    className="flex items-center gap-[1px]"
                  >
                    <div className="capitalize font-semibold">
                      {attributeMap[attributeId].name}:
                    </div>
                    {attributeMap[attributeId].values.map((value, index) => (
                      <div
                        key={index}
                        onClick={() => changeToVariant(attributeId, value.id)}
                        className={`flex flex-col border border-2 rounded-3xl m-1 cursor-pointer ${
                          selectedVariant?.attributeValues.some(
                            (attrVal) =>
                              attrVal.attributeId === attributeId &&
                              attrVal.attributeValue.id === value.id,
                          )
                            ? 'border-[#48CAB2] text-[#48CAB2] '
                            : 'border-zinc-100 hover:border-[#48CAB2] hover:text-[#48CAB2]'
                        }`}
                      >
                        <div className="text-sm font-semibold border border-1 border-stone-200 rounded-3xl py-2 px-4 ">
                          {value.value}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <hr className="border-gray-600" />
              </div>
            </div>

            <hr className="border-gray-600" />
          </div>
          <div
            className="flex gap-2 mb-5 w-full fixed -bottom-5 w-full sm:static bg-black  py-4 px-2 mx-0 z-50 sm:z-auto"
            style={{
              boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.3)', // Mimicking shadow-lg shadow-gray-700/50
            }}
          >
            <div className="flex bg-[#48CAB2] items-center gap-2 flex-1 justify-center text-white  ">
              <LuShoppingBag size={30} />
              <Button
                onClick={() => handleAddToCart()}
                className="text-xl font-semibold bg-transparent hover:bg-transparent"
              >
                ADD TO CART
              </Button>
            </div>
            <div className="flex bg-[#48CAB2] items-center gap-2 flex-1 justify-center text-white  ">
              <Button
                // onClick={() => handleAddToCart()}
                className="text-xl font-semibold bg-transparent hover:bg-transparent"
              >
                BUY NOW
              </Button>
            </div>
            <AddToWishListButton
              itemId={item?.id || ''}
              className="border border-2 border-[#48CAB2] font-medium text-xs  h-full self-center p-4"
            />
          </div>
          <hr className="border-gray-600" />
          <div className="flex justify-between py-5 px-1 sm:px-0">
            {isMdAndAbove ? (
              <>
                <div className="flex flex-col  gap-1 items-center">
                  <LuScaling size={28} style={{ strokeWidth: 0.5 }} />
                  <div>Size Guide</div>
                </div>
                <div className="flex  flex-col  gap-1 items-center">
                  <LuCalendar size={28} style={{ strokeWidth: 0.5 }} />
                  <div>7 Days Easy Return</div>
                </div>
                <div className="flex  flex-col  gap-1 items-center">
                  <LuTruck size={30} style={{ strokeWidth: 0.5 }} />
                  <div>
                    Free Shipping in Kerala
                    <div className="text-[10px] text-center">(Prepaid)</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-3">
                <div className="flex flex-col  gap-1 items-center ">
                  <LuScaling size={24} />
                  <div className="text-xs">Size Guide</div>
                </div>
                <div className="flex  flex-col  justify-center gap-1 items-center ">
                  <LuCalendar size={24} />
                  <div className="text-xs text-center">7 Days Easy Return</div>
                </div>
                <div className="flex  flex-col  gap-1 items-center ">
                  <LuTruck size={26} />
                  <div className="text-xs text-center">
                    Free Shipping in Kerala
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr className="border-gray-600" />
          <div>
            <Accordion className="px-2" type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <Markdown className="prose prose-invert text-white text-sm md:text-base">
                    {item?.description}
                  </Markdown>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <hr className="border-gray-600" />
          </div>
        </div>
      </div>

      <div>
        <div className="text-center text-xl md:text-3xl font-semibold pt-10 sm:pt-16 -mb-10 text-white">
          You may also like
        </div>
        {category && (
          <ProductListView categoryId={category.data.id} suggestedList={true} />
        )}
      </div>
    </>
  );
};

export default ProductView;
