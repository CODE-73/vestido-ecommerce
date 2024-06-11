import { z } from 'zod';

export const ImageSchema = z.object({
  blurHash: z.string().nullish(),
  alt: z.string(),
  url: z.string(),
  displayIndex: z.number(),
  default: z.boolean(),
});

export type ImageSchemaType = z.infer<typeof ImageSchema>;
