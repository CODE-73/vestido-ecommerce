import { Item } from '@prisma/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export type ItemDetailsResponse = {
  data: Item & {
    images: ImageSchemaType[];
  };
};
