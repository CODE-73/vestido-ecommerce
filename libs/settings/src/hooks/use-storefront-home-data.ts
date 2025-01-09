import { useMemo } from 'react';

import { z } from 'zod';

import { ImageSchema } from '@vestido-ecommerce/utils';

import { SettingsKeys } from '../keys';
import { useSettings } from '../swr';

export const HeroCarouselSchema = z.object({
  image: ImageSchema,
  text_color: z.string().default('black'),
  horizontal_position: z.string().default('left'),
  vertical_position: z.string().default('middle'),
  text_content: z.object({
    line1: z.string(),
    line2: z.string().nullish(),
    line3: z.string().nullish(),
  }),
  button_text: z.string().nullish(),
  href: z.string().nullish(),
});

export const CircleLinksSchema = z.object({
  image: ImageSchema,
  text_content: z.string().nullish(),
  href: z.string().nullish(),
});

export const ScrollCardSchema = z.object({
  image: ImageSchema,
  text_content: z.object({
    line1: z.string(),
    line2: z.string().nullish(),
    line3: z.string().nullish(),
  }),
  button_text: z.string().nullish(),
  href: z.string().nullish(),
});

export const CollageSchema = z.object({
  image: ImageSchema,
  text_content: z.string(),
  text_color: z.string().nullish().default('black'),
  href: z.string().nullish(),
});

export const StorefrontHomeDataSchema = z.object({
  navbar_carousel: z
    .array(
      z.object({
        text_content: z.string().nullish(),
        href: z.string().nullish(),
      }),
    )
    .nullish(),
  hero_carousel: z.array(HeroCarouselSchema),
  circle_links: z.array(CircleLinksSchema),
  horizontal_scroll_cards: z.array(ScrollCardSchema),
  collage: z.array(CollageSchema),
});

export type StorefrontHomeDataType = z.infer<typeof StorefrontHomeDataSchema>;

export const useVestidoHomeData = (): z.infer<
  typeof StorefrontHomeDataSchema
> | null => {
  const { data } = useSettings(SettingsKeys.VESTIDO_HOME_DATA);
  return useMemo(() => {
    if (!data) {
      return null;
    }

    const p = StorefrontHomeDataSchema.safeParse(data?.data?.value);
    if (p.success) {
      return p.data;
    }

    return null;
  }, [data]);
};
