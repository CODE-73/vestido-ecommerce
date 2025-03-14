import Image from 'next/image';
import Link from 'next/link';

import { z } from 'zod';

import { CollageSchema } from '@vestido-ecommerce/settings/client';
type CollageItemData = z.infer<typeof CollageSchema>;
interface PopularCollectionCardProps {
  data: CollageItemData;
  mainImage?: boolean;
}
const PopularCollectionCard: React.FC<PopularCollectionCardProps> = ({
  data,
  mainImage,
}) => {
  return (
    <div
      className={`group  relative overflow-hidden h-[42vh] ${mainImage ? 'md:h-[85vh] md:col-span-2 md:row-span-2' : ''} w-full`}
    >
      <Link
        href={`/${data.href}`}
        className={`${data.href ? 'cursor-pointer' : 'pointer-events-none'}`}
      >
        <div className="group-hover:scale-110 transition duration-500 cursor-pointer w-full h-full">
          <Image
            src={data.image.url ?? ''}
            placeholder={data.image.blurHashDataURL ? 'blur' : undefined}
            blurDataURL={data.image.blurHashDataURL ?? undefined}
            alt="alt text"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute left-10 top-10 ">
          <div
            className={` capitalize font-bold text-2xl leading-normal main-title ${
              data.text_color ? `text-${data.text_color}` : 'text-white'
            }`}
          >
            {data.text_content}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularCollectionCard;
