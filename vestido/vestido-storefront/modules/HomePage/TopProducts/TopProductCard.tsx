import Image from 'next/image';
import Link from 'next/link';

import { Item } from '@prisma/client';

import { ImageSchemaType } from '@vestido-ecommerce/utils';

import AddToCartButton from './AddToCartButton';
import { AddToWishListButton } from './AddToWishlistButton';
import { QuickViewButton } from './QuickViewButton';

interface SpecialOfferCardProps {
  data: Item;
}
const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({ data }) => {
  return (
    <div className={`flex flex-col items-center group relative mb-10 `}>
      <Link href={`/products/${data.id}`}>
        <Image
          className="block group-hover:hidden"
          src={((data?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''}
          alt="alt text"
          width={430}
          height={551}
        />
        <Image
          className="hidden group-hover:block"
          src={((data?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''}
          alt="alt text"
          width={430}
          height={551}
        />
      </Link>

      <div className="self-start pt-[#1px] capitalize text-[#333333] text-md font-thin">
        {data.title}
      </div>
      <AddToCartButton
        price={data.price}
        offerPrice={data.discountedPrice}
        item={data}
      />

      <div className="sm:hidden flex flex-row justify-start sm:group-hover:flex sm:flex-col gap-3 sm:absolute top-3 right-3 pt-2 sm:pt-0">
        <AddToWishListButton />
        <QuickViewButton />
      </div>
    </div>
  );
};

export default SpecialOfferCard;
