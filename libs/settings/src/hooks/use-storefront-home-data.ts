import { z } from 'zod';

import { ImageSchema } from '@vestido-ecommerce/utils';

import { SettingsKeys } from '../keys';
import { useSettings } from '../swr';

export const HeroCarouselSchema = z.object({
  image: ImageSchema,
  text_color: z.string(),
  text_position: z.string(),
  text_align: z.string(),
  text_content: z.object({
    line1: z.string(),
    line2: z.string().nullish(),
    line3: z.string().nullish(),
  }),
  button_text: z.string(),
});

export const ScrollCardSchema = z.object({
  image: ImageSchema,
  text_content: z.object({
    line1: z.string(),
    line2: z.string().nullish(),
    line3: z.string().nullish(),
  }),
  button_text: z.string(),
});

export const StorefrontHomeDataSchema = z.object({
  navbar_carousel: z.array(
    z.object({
      text_content: z.string(),
    }),
  ),
  hero_carousel: z.array(HeroCarouselSchema),
  hero_categories: z.array(
    z.object({
      image: ImageSchema,
      categoryId: z.string(),
    }),
  ),
  horizontal_scroll_cards: z.array(ScrollCardSchema),
  collage: z.array(
    z.object({
      image: ImageSchema,
      text_content: z.string(),
    }),
  ),
});

export const useVestidoHomeData = (): z.infer<
  typeof StorefrontHomeDataSchema
> | null => {
  const { data, error } = useSettings(SettingsKeys.VESTIDO_HOME_DATA);

  if (error || !data) {
    return null;
  }

  try {
    const storefrontHomeData = StorefrontHomeDataSchema.parse(data.data?.value);
    return storefrontHomeData;
  } catch (e) {
    console.error('Storefront Home Data validation failed:', e);
    return null;
  }
};
