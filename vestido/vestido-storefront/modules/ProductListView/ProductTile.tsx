import Image from 'next/image';
import { useRouter } from 'next/router';

import { Item } from '@prisma/client';
import clsx from 'clsx';

import { Badge } from '@vestido-ecommerce/shadcn-ui/badge';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import AddToCartButton from './AddToCartButton';
import AddToWishListButton from './AddToWishlistButton';

interface ProductCardProps {
  data: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ data: item }) => {
  const router = useRouter();
  const handleProductClick = (itemId: string) => {
    router.push(`/products/${encodeURIComponent(itemId)}`);
  };

  const images = (item.images ?? []) as ImageSchemaType[];

  return (
    <div className="relative flex flex-col items-center group  mb-10 cursor-pointer ">
      {item.discountPercent && item.discountPercent > 0 ? (
        <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto">
          sale&nbsp;{item.discountPercent}&nbsp;%
        </Badge>
      ) : (
        ''
      )}

      {images.length > 0 && (
        <div
          onClick={() => handleProductClick(item.id)}
          className="group w-full relative"
        >
          <div className="relative w-full pb-[130%]">
            <Image
              className="absolute inset-0 block group-hover:hidden object-cover"
              src={images[0]?.url ?? ''}
              blurDataURL={images[0]?.blurHashDataURL ?? undefined}
              fill
              alt="alt text"
              style={{ objectFit: 'cover' }}
            />
            <Image
              className="absolute inset-0 group-hover:block hidden object-cover"
              fill
              style={{ objectFit: 'cover' }}
              blurDataURL={
                (images[1] ?? images[0])?.blurHashDataURL ?? undefined
              }
              src={(images[1] ?? images[0])?.url ?? ''}
              alt="alt text"
            />
          </div>
        </div>
      )}

      <div className="self-start pt-[#2px] capitalize text-[#333333] text-md font-light md:mb-4 w-full truncate">
        {item.title}
      </div>
      <div className="self-start md:hidden mb-4">
        {item.discountedPrice ? (
          <div className="flex items-center gap-2">
            <div className="text-black text-sm font-semibold">
              ₹&nbsp;{item.discountedPrice.toFixed(2)}
            </div>
            {item.discountedPrice < item.price ? (
              <div className="text-gray-500 line-through text-xs">
                ₹&nbsp;{item.price.toFixed(2)}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="text-black text-sm font-semibold">
            ₹&nbsp;{item.price.toFixed(2)}
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
      />
    </div>
  );
};

export default ProductCard;
