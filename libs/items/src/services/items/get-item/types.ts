// import { Item, ItemVariant, VariantAttributeValue } from '@prisma/client';
// import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { itemDetails } from './service';

// export type ItemDetailsResponse = {
//   data: Item & {
//     images: ImageSchemaType[];
//     variants: (ItemVariant & {
//       attributeValues: VariantAttributeValue[];
//     })[];
//   };
// };

export type ItemDetailsResponse = {
  data: Awaited<ReturnType<typeof itemDetails>>;
};
