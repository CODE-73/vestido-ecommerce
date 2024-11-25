import Image from 'next/image';

import { Item } from '@prisma/client';

import { ImageSchemaType } from '@vestido-ecommerce/utils';

type ItemImageProps = {
  item: Item;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  imageIdx?: number;
};

const ItemImage: React.FC<ItemImageProps> = ({
  item,
  width,
  height,
  className,
  style,
  fill,
  imageIdx = 0,
}) => {
  const images = (item?.images ?? []) as ImageSchemaType[];
  const image = images[imageIdx] ?? images[0];

  return (
    <Image
      // src={image?.url ?? '/assets/no-image-fallback.png'}
      src={image?.url ?? '/assets/fallback-image.png'}
      alt={image?.alt ?? 'alt'}
      width={width}
      height={height}
      fill={fill}
      style={style}
      placeholder={image?.blurHashDataURL ? 'blur' : undefined}
      blurDataURL={image?.blurHashDataURL ?? undefined}
      className={className}
    />
  );
};

export default ItemImage;
