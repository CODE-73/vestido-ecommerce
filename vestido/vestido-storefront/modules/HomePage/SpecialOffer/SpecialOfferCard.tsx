import Image, { StaticImageData } from 'next/image';
import { Badge } from 'libs/shadcn-ui/src/ui/badge';
import { ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { AddToWishListButton } from './AddToWishlistButton';
import { QuickViewButton } from './QuickViewButton';
import { CarouselItem } from '@vestido-ecommerce/shadcn-ui/carousel';
import useIsMobile from 'vestido/vestido-storefront/hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import CardDailog from './CardDialog';

export type SpecialOfferCardData = {
  cardImage1: StaticImageData;
  cardImage2: StaticImageData;
  name: string;
  textColor?: string;
  salePercent?: string;
  brand: string;
  price: string;
  offerPrice: string;
};

interface SpecialOfferCardProps {
  data: SpecialOfferCardData;
}
const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();

  const labels = ['Days', 'Hrs', 'Min', 'Sec'];
  return (
    <CarouselItem className={`basis-1/2 lg:basis-1/3 max-w-[50vw]`}>
      <CardDailog isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className={`flex flex-col items-center group relative mb-10 `}>
        <a href="/product/Product">
          <Image
            className="block group-hover:hidden"
            src={data.cardImage1}
            alt="alt text"
          />
          <Image
            className="hidden group-hover:block"
            src={data.cardImage2}
            alt="alt text"
          />
        </a>
        <Badge className="absolute left-3 top-3 rounded-none bg-red-600">
          SALE {data.salePercent}%
        </Badge>
        <div className=" absolute bottom-64 sm:bottom-36 bg-white opacity-80 font-extralight text-[#333333] text-lg text-center sm:px-16">
          <div>Offer Will End Through</div>
          <div className="flex gap-2 justify-center">
            {labels.map((label, index) => (
              <div key={index} className="flex flex-col">
                <div className="font-extrabold text-2xl">0</div>
                <div className="text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>{' '}
        <div className="flex self-start pt-2 gap-1 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star fill="#ffb503" strokeWidth={0} size={20} />
          ))}
        </div>
        <div className="self-start pt-2 text-[#777777] uppercase text-sm font-light">
          {data.brand}
        </div>
        <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
          {data.name}
        </div>
        {isMobile ? (
          <>
            <div className="flex text-xl justify-between w-full pt-3">
              <div className="line-through">{data.price}</div>
              <div className="text-red-700 font-bold">{data.offerPrice}</div>
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
                className={`p-2 bg-[#48CAB2] ${isHovering ? 'w-20' : 'w-auto'}`}
                style={{ minWidth: 'min-content' }}
              >
                <ShoppingBag color="#fff" />
                {isHovering && (
                  <button
                    className=" absolute top-1 right-0 bg-[#48CAB2] text-white p-2 font-bold"
                    onClick={() => setShowModal(true)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                <div className="line-through">{data.price}</div>
                <div className="text-red-700 font-bold">{data.offerPrice}</div>
              </div>
            </div>
          </div>
        )}
        <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
          <AddToWishListButton />
          <QuickViewButton />
        </div>
      </div>
    </CarouselItem>
  );
};

export default SpecialOfferCard;
