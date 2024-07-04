import { ItemVariant, VariantAttributeValue } from '@prisma/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export type ListVariantsResponse = {
  data: Array<
    ItemVariant & {
      attributeValues: VariantAttributeValue[];
      images: ImageSchemaType[];
    }
  >;
};
