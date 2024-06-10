import { z } from 'zod';
import { ImageSchema } from '@vestido-ecommerce/utils';
import { Gender } from '@prisma/client';

export const CreateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  unit: z.string(),
  stock: z.string(),
  categoryId: z.string(),
  images: z.array(ImageSchema),
  hasVariants: z.boolean().default(false),
  gender: z
    .array(z.nativeEnum(Gender))
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['MEN', 'WOMEN'] satisfies Gender[]),
});

export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>;
