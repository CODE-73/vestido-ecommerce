import { useRouter } from 'next/router';

import { Item } from '@prisma/client';
import clsx from 'clsx';

import { Badge } from '@vestido-ecommerce/shadcn-ui/badge';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import AddToCartButton from './AddToCartButton';
import AddToWishListButton from './AddToWishlistButton';

interface ProductCardProps {
  data: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ data: item }) => {
  const router = useRouter();
  const handleProductClick = (slug: string) => {
    router.push(`/products/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="relative flex flex-col items-center group mb-10 cursor-pointer z-0">
      {item.discountPercent && item.discountPercent > 0 ? (
        <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto z-10">
          flat&nbsp;{item.discountPercent}&nbsp;%
        </Badge>
      ) : (
        ''
      )}

      <div
        onClick={() => handleProductClick(item.slug)}
        className="group w-full relative"
      >
        <div className="relative w-full pb-[130%]">
          <ItemImage
            item={item}
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 block object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
            fill
          />
          <ItemImage
            item={item}
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 block object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
            imageIdx={1}
            fill
          />
        </div>
      </div>

      <div className="self-start pt-[#2px] capitalize text-white text-xs md:text-base font-light md:mb-4 w-full truncate">
        {item.title}
      </div>
      <div className="self-start md:hidden mb-4">
        {item.discountedPrice ? (
          <div className="flex items-center gap-2">
            <div className="text-white text-sm font-semibold">
              {formatINR(item.discountedPrice)}
            </div>
            {item.discountedPrice < item.price ? (
              <div className="text-red-400 line-through text-xs">
                {formatINR(item.price)}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="text-white text-sm font-semibold">
            {formatINR(item.price)}
          </div>
        )}
      </div>
      <div className="hidden md:block w-full self-start">
        <AddToCartButton
          price={item.price}
          offerPrice={item.discountedPrice}
          item={item}
        />
      </div>

      <AddToWishListButton
        className={clsx(
          'flex flex-row justify-start',
          'sm:group-hover:flex sm:flex-col gap-3 absolute top-3 right-3 pt-2',
        )}
        itemId={item.id}
        color="black"
      />
    </div>
  );
};

export default ProductCard;
