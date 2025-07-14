import { useRouter } from 'next/router';

import { Item } from '@prisma/client';

// import clsx from 'clsx';
import { Badge } from '@vestido-ecommerce/shadcn-ui/badge';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';

interface ProductCardProps {
  data: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ data: item }) => {
  const router = useRouter();
  const handleProductClick = (slug: string) => {
    router.push(`/products/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="relative flex flex-col items-center group  mb-10 cursor-pointer ">
      {item.discountPercent && item.discountPercent > 0 ? (
        <Badge className="absolute top-2 left-2 rounded-none uppercase bg-red-500 hover:bg-red-400 cursor-auto">
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
            className="absolute inset-0 block group-hover:hidden object-cover"
            fill
          />
          <ItemImage
            item={item}
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 group-hover:block hidden object-cover"
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
              <div className="text-white line-through text-xs">
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
    </div>
  );
};

export default ProductCard;
