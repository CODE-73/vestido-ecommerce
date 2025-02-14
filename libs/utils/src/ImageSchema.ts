import { z } from 'zod';

export const ImageSchema = z.object({
  blurHash: z.string().nullish(),
  blurHashDataURL: z.string().nullish(),
  alt: z.string().nullish(),
  key: z.string().min(3, { message: 'Please provide a valid File Key' }),
  url: z.string().nullish(),
  displayIndex: z.number().default(0),
  default: z.boolean().default(false),
});

export type ImageSchemaType = z.infer<typeof ImageSchema>;
