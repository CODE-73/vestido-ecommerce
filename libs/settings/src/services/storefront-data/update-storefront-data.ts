import { addThumbhashToImages } from '@vestido-ecommerce/caching';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import {
  StorefrontHomeDataSchema,
  StorefrontHomeDataType,
} from '../../hooks/use-storefront-home-data';

export const updateStorefrontData = async (
  args: unknown,
): Promise<StorefrontHomeDataType> => {
  const p = StorefrontHomeDataSchema.safeParse(args);
  if (!p.success) {
    return {
      hero_carousel: [],
      circle_links: [],
      horizontal_scroll_cards: [],
      collage: [],
    };
  }

  const data = p.data;

  const images: ImageSchemaType[] = [
    ...(data.hero_carousel.flatMap((x) =>
      ['sm', 'md', 'lg']
        .map((k) => x.image[k as keyof typeof x.image])
        .filter(Boolean),
    ) as ImageSchemaType[]),
    ...data.circle_links.map((x) => x.image),
    ...data.horizontal_scroll_cards.map((x) => x.image),
    ...data.collage.map((x) => x.image),
  ];

  await addThumbhashToImages(images);
  return data;
};
