import { z } from 'zod';

export const ImageSchema = z.object({
  blurHash: z.string().nullish(),
  alt: z.string(),
  key: z.string().min(3),
  url: z.string().nullish(),
  displayIndex: z.number(),
  default: z.boolean(),
});

export type ImageSchemaType = z.infer<typeof ImageSchema>;
