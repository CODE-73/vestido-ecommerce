import Image from 'next/image';

import { z } from 'zod';

import { CollageSchema } from '@vestido-ecommerce/settings/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export type PopularCollectionCardData = {
  cardImage: ImageSchemaType;
  mainTitle: string;
  textColor?: string;
};

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
      className={`group relative overflow-hidden ${mainImage ? 'col-span-2 row-span-2' : ''} w-full`}
      style={{ height: mainImage ? '85vh' : '42vh' }}
    >
      <div className="hover:scale-110 transition duration-500 cursor-pointer w-full h-full">
        <Image
          src={data.image.url ?? ''}
          alt="alt text"
          fill
          className="object-cover "
        />
      </div>
      <div className="absolute left-10 top-10 ">
        <div
          className={`group-hover:underline capitalize font-bold text-2xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ${
            data.text_color ? `text-${data.text_color}` : 'text-white'
          }`}
        >
          {data.text_content}
        </div>
      </div>
    </div>
  );
};

export default PopularCollectionCard;
