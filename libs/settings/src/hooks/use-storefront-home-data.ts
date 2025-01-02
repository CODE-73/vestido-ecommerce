import { z } from 'zod';

import { SettingsKeys } from '../keys';
import { useSettings } from '../swr';

export const ImageSchema = z.object({
  blurHash: z.string().nullish(),
  blurHashDataURL: z.string().nullish(),
  alt: z.string().nullish(),
  key: z.string().min(3).nullish(),
  url: z.string().nullish(),
});

export type ImageSchemaType = z.infer<typeof ImageSchema>;

export const HeroCarouselSchema = z.object({
  image: ImageSchema,
  text_color: z.string().nullish(),
  text_position: z.string().nullish(),
  text_align: z.string().nullish(),
  text_content: z.object({
    line1: z.string(),
    line2: z.string().nullish(),
    line3: z.string().nullish(),
  }),
  button_text: z.string().nullish(),
});

export const ScrollCardSchema = z.object({
  image: ImageSchema,
  text_content: z.object({
    line1: z.string(),
    line2: z.string().nullish(),
    line3: z.string().nullish(),
  }),
  button_text: z.string().nullish(),
});

export const StorefrontHomeDataSchema = z.object({
  navbar_carousel: z
    .array(
      z.object({
        text_content: z.string(),
      }),
    )
    .nullish(),
  hero_carousel: z.array(HeroCarouselSchema),
  hero_categories: z.array(
    z.object({
      image: ImageSchema,
      categoryId: z.string().nullish(),
    }),
  ),
  horizontal_scroll_cards: z.array(ScrollCardSchema),
  collage: z
    .array(
      z.object({
        image: ImageSchema,
        text_content: z.string(),
      }),
    )
    .nullish(),
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
