import * as React from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { AddToWishListButton } from '../HomePage/SpecialOffer/AddToWishlistButton';
import { QuickViewButton } from '../HomePage/SpecialOffer/QuickViewButton';
import useIsMobile from '../../hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useItems } from '@vestido-ecommerce/items';
import ProductFilter from './ProductFilter';
import { Item } from '@prisma/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { useRouter } from 'next/router';

const ProductlistView: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const { data } = useItems();
  const handleShowMoreClick = () => {
    // function
  };
  const handleProductClick = (itemId: string) => {
    router.push(`/products/${encodeURIComponent(itemId)}`);
  };

  return (
    <div className="md:px-16">
      <div className="text-4xl  tracking-wide text-[#333333] text-center font-extrabold my-5 py-14">
        Women&apos;s
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 md:grid-cols-4 md:gap-10 md:px-0">
        {!isMobile && <ProductFilter />}
        {data?.map((item: Item, index: number) => (
          <div
            onClick={() => handleProductClick(item.id)}
            key={index}
            className="relative flex flex-col items-center group  mb-10 "
          >
            {((item.images ?? []) as ImageSchemaType[]).length > 0 && (
              <Image
                className="block"
                src={((item.images ?? []) as ImageSchemaType[])[0].url!}
                alt="alt text"
                width={430}
                height={551}
              />
            )}

            <div className="self-start pt-[#1px] capitalize text-[#333333] text-sm font-thin">
              {item.title}
            </div>
            {isMobile ? (
              <>
                <div className="flex text-xl justify-between w-full pt-3">
                  <div className="text-[#48CAB2] font-bold">{item.price}</div>
                </div>
                <div className={`p-2 bg-[#48CAB2] w-full`}>
                  <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2">
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
                      <button className=" absolute top-0 right-0 bg-[#48CAB2] text-white p-2">
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#48CAB2] font-semibold">
                      {item.price}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
              <AddToWishListButton />
              <QuickViewButton />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border border-gray-200 text-xs font-medium py-2 px-5  my-5 hover:border-black  transition-colors duration-100"
          onClick={handleShowMoreClick}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default ProductlistView;
