import * as React from 'react';
import Image from 'next/image';
import { LuShoppingBag } from 'react-icons/lu';

import useIsMobile from '../../../vestido-storefront/hooks/useIsMobile';

import { useWishlist } from '@vestido-ecommerce/items';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import AddToCartButton from '../HomePage/TopProducts/AddToCartButton';

const WishlistView: React.FC = () => {
  const { data: wishlistItems } = useWishlist();
  console.log('wishlist', wishlistItems);
  const isMobile = useIsMobile();

  return (
    <div className="md:px-16">
      <div className="text-4xl tracking-wide text-[#333333] text-center font-extrabold my-5 lg:py-10">
        Wishlist
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {wishlistItems?.data.map((wishlistItem, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center group  mb-10 "
          >
            {/* <div
              onClick={() => handleRemoveFromCart(cartItem.itemId)}
              className="col-span-1 flex justify-center cursor-pointer"
            >
              <LuTrash2 />
            </div> */}
            <Image
              className="block col-span-2"
              src={
                ((wishlistItem.item.images ?? []) as ImageSchemaType[])[0]
                  ?.url ?? ''
              }
              alt={
                ((wishlistItem.item.images ?? []) as ImageSchemaType[])[0]
                  ?.alt ?? ''
              }
              width={200}
              height={260}
            />
            <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
              {wishlistItem.item.title}
            </div>
            {/* {isMobile ? (
              <div className=" col-span-5 flex flex-col space-y-5 pl-8">
                <div className="truncate text-md md:text-xl font-semibold whitespace-nowrap">
                  {wishlistItem.item.title}
                </div>
                <div className="text-xl font-semibold text-[#48CAB2] flex ">
                  {wishlistItem.item.price}
                </div>
                <div className="flex flex-row bg-zinc-100 w-32 h-14 items-center justify-around ">
                  hi
                </div>
              </div>
            ) : (
              <>
                <div className="text-xl font-extrabold col-span-2">
                  {wishlistItem.item.title}
                </div>

                <div className="text-3xl font-semibold text-[#48CAB2] col-span-1 flex justify-center">
                  {wishlistItem.item.price.toFixed(2)}
                </div>
              </>
            )} */}
            {isMobile ? (
              <>
                <div className="flex text-xl justify-between w-full pt-3">
                  <div className="line-through">
                    {wishlistItem.item.discountedPrice}
                  </div>
                </div>
                <div className={`p-2 bg-[#48CAB2] w-full`}>
                  <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2 font-bold">
                    <LuShoppingBag color="#fff" />
                    <div> Add to Cart</div>
                  </Button>
                </div>
              </>
            ) : (
              <AddToCartButton
                price={wishlistItem.item.price}
                offerPrice={wishlistItem.item.discountedPrice}
                item={wishlistItem.item}
              />
            )}
          </div>
        ))}

        {/* {data.map((item, index) => (
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

            <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
              {item.name}
            </div>
            {isMobile ? (
              <>
                <div className="flex text-xl justify-between w-full pt-3">
                  <div className="line-through">{item.price}</div>
                  <div className="text-red-700">{item.offerPrice}</div>
                </div>
                <div className={`p-2 bg-[#48CAB2] w-full`}>
                  <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2 font-bold">
                    <LuShoppingBag color="#fff" />
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
                    <LuShoppingBag color="#fff" />
                    {isHovering && (
                      <button className=" absolute top-1 right-0 bg-[#48CAB2] text-white p-2 font-bold">
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="line-through">{item.price}</div>
                    <div className="text-red-700">{item.offerPrice}</div>
                  </div>
                </div>
              </div>
            )}
            <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
              <QuickViewButton />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default WishlistView;
