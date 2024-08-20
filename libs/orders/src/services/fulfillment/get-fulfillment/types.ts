import { getFulfillment } from './service';

// export type ItemDetailsResponse = {
//   data: Item & {
//     images: ImageSchemaType[];
//     variants: (ItemVariant & {
//       attributeValues: VariantAttributeValue[];
//     })[];
//   };
// };

export type FulfillmentDetailsResponse = {
  data: Awaited<ReturnType<typeof getFulfillment>>;
};
