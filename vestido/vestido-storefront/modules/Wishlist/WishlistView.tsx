import * as React from 'react';
import Image from 'next/image';
import { Badge } from 'libs/shadcn-ui/src/ui/badge';
import { ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';
import { AddToWishListButton } from '../HomePage/SpecialOffer/AddToWishlistButton';
import { AddToCompareButton } from '../HomePage/SpecialOffer/AddToCompareButton';
import { QuickViewButton } from '../HomePage/SpecialOffer/QuickViewButton';
import useIsMobile from 'vestido/vestido-storefront/hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

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
  {
    cardImage1: product51,
    cardImage2: product52,
    name: 'Metallic Effect Bag',
    brand: 'guess',
    price: '$450.00',
    offerPrice: '$390.00',
  },
  {
    cardImage1: product61,
    cardImage2: product62,
    name: 'Knit Beanie with slogan',
    textColor: 'white',
    brand: "levi's",
    price: '$450.00',
    offerPrice: '$390.00',
  },
];

const WishlistView: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const labels = ['Days', 'Hrs', 'Min', 'Sec'];
  return (
    <div className="">
      <div className="text-4xl tracking-wide text-[#333333] text-center font-extrabold">
        Wishlist
      </div>

      <div className="">
        <div className="">
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
      </div>
    </div>
  );
};

export default WishlistView;
