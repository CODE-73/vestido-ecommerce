import Image, { StaticImageData } from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { AddToWishListButton } from './AddToWishlistButton';
import { QuickViewButton } from './QuickViewButton';
import useIsMobile from '../../../hooks/useIsMobile';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import Link from 'next/link';

export type SpecialOfferCardData = {
  cardImage1: StaticImageData;
  cardImage2: StaticImageData;
  name: string;
  textColor?: string;
  salePercent?: string;
  price: string;
  offerPrice: string;
};

interface SpecialOfferCardProps {
  data: SpecialOfferCardData;
}
const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col items-center group relative mb-10 `}>
      <Link href="/product/Product">
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
      </Link>

      <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
        {data.name}
      </div>
      {isMobile ? (
        <>
          <div className="flex text-xl justify-between w-full pt-3">
            <div className="line-through">{data.price}</div>
            <div className="text-red-700">{data.offerPrice}</div>
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
              className={`p-2 bg-[#48CAB2] ${isHovering ? 'w-20' : 'w-auto'}`}
              style={{ minWidth: 'min-content' }}
            >
              <ShoppingBag color="#fff" />
              {isHovering && (
                <button className=" absolute top-1 right-0 bg-[#48CAB2] text-white p-2">
                  Add to Cart
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <div className="line-through">{data.price}</div>
              <div className="text-red-700">{data.offerPrice}</div>
            </div>
          </div>
        </div>
      )}
      <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
        <AddToWishListButton />
        <QuickViewButton />
      </div>
    </div>
  );
};

export default SpecialOfferCard;
