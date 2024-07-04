import { ItemVariant, VariantAttributeValue } from '@prisma/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export type VariantDetailsResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
    images: ImageSchemaType[];
  };
};
