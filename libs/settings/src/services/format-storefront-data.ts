import { populateImageURLs } from '@vestido-ecommerce/caching';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import {
  StorefrontHomeDataSchema,
  StorefrontHomeDataType,
} from '../hooks/use-storefront-home-data';

export const formatStorefrontData = async (
  args: unknown,
): Promise<StorefrontHomeDataType> => {
  const p = StorefrontHomeDataSchema.safeParse(args);
  if (!p.success) {
    return {
      hero_carousel: [],
      hero_categories: [],
      horizontal_scroll_cards: [],
      collage: [],
    };
  }

  const data = p.data;

  const images: ImageSchemaType[] = [
    ...data.hero_carousel.map((x) => x.image),
    ...data.hero_categories.map((x) => x.image),
    ...data.horizontal_scroll_cards.map((x) => x.image),
    ...data.collage.map((x) => x.image),
  ];

  // Await the result of the asynchronous populateImageURLs
  const imageURLs = await populateImageURLs(images);
  console.info('populatedurls', imageURLs);
  return data;
};
