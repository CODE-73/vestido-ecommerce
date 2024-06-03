import * as React from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { AddToWishListButton } from '../HomePage/SpecialOffer/AddToWishlistButton';
import { QuickViewButton } from '../HomePage/SpecialOffer/QuickViewButton';
import useIsMobile from '../../hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import ProductFilter from './ProductFilter';

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
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product21,
    cardImage2: product22,
    name: 'Metallic Effect Bag',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product31,
    cardImage2: product32,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product41,
    cardImage2: product42,
    name: 'T-shirt with pearly sleeves',
    salePercent: '13',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product51,
    cardImage2: product52,
    name: 'Metallic Effect Bag',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product61,
    cardImage2: product62,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    price: '$450.00',
    offerPrice: '$390.00',
  },
];

const ProductlistView: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  const handleShowMoreClick = () => {
    // function
  };
  return (
    <div className="md:px-16">
      <div className="text-4xl  tracking-wide text-[#333333] text-center font-extrabold my-5 py-14">
        Women&apos;s
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 md:grid-cols-4 md:gap-10 md:px-0">
        {!isMobile && <ProductFilter />}
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

            <div className="self-start pt-[#1px] capitalize text-[#333333] text-sm font-thin">
              {item.name}
            </div>
            {isMobile ? (
              <>
                <div className="flex text-xl justify-between w-full pt-3">
                  <div className="text-[#48CAB2] font-bold">
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
