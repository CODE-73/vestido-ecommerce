import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import { ItemDetails } from '@vestido-ecommerce/items';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@vestido-ecommerce/shadcn-ui/carousel';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

type ProductViewImagesProps = {
  item: ItemDetails;
  selectedVariantId: string | null;
};

const ProductViewImages: FC<ProductViewImagesProps> = ({
  item,
  selectedVariantId,
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageSchemaType | null>(
    (item?.images as ImageSchemaType[])?.[0] ?? null,
  );

  const selectedVariant = useMemo(
    () => item?.variants?.find((x) => x.id === selectedVariantId) ?? null,
    [item, selectedVariantId],
  );

  const productImages = useMemo(
    () => [
      ...((selectedVariant?.images as ImageSchemaType[]) ?? []),
      ...((item?.images as ImageSchemaType[]) ?? []),
    ],
    [item, selectedVariant],
  );

  useEffect(() => {
    if (!item) {
      return;
    }

    if (item.hasVariants) {
      const defaultVar =
        item.variants.find((variant) => variant.default) || item.variants[0];
      setSelectedImage(
        ((defaultVar?.images ?? []) as ImageSchemaType[])[0] || null,
      );
    } else {
      setSelectedImage(((item?.images ?? []) as ImageSchemaType[])[0] ?? null);
    }
  }, [item]);

  const mainImageRef = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const mainImage = selectedImage
    ? selectedImage
    : (productImages.find((x) => x.default == true) ??
      productImages.at(0) ??
      null);

  return (
    <>
      <div className="w-full sm:flex hidden sm:block md:w-1/2 justify-start">
        <div
          className="relative basis-1/6 overflow-y-auto no-scrollbar lg:pl-10"
          ref={carouselRef}
        >
          <div
            className="overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col "
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="w-full px-2">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className="basis-1/5 flex-none"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                    placeholder={image.blurHashDataURL ? 'blur' : undefined}
                    blurDataURL={image.blurHashDataURL ?? undefined}
                    src={image.url!}
                    alt="alt text"
                    width={100}
                    height={150}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-5/6 text-right">
          <Image
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
            {productImages.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                  <Image
                    className="outline outline-3 hover:outline-[#48CAB2] mb-3"
                    src={image.url!}
                    placeholder={image.blurHashDataURL ? 'blur' : undefined}
                    blurDataURL={image.blurHashDataURL ?? undefined}
                    alt="alt text"
                    width={550}
                    height={720}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default ProductViewImages;