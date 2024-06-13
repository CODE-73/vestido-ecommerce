import { z } from 'zod';
import { ImageSchema } from '@vestido-ecommerce/utils';
import { Gender, StockStatus } from '@prisma/client';

export const CreateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  stockStatus: z
    .nativeEnum(StockStatus)
    .default('AVAILABLE' satisfies StockStatus),
  gender: z
    .array(z.nativeEnum(Gender))
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['MEN', 'WOMEN'] satisfies Gender[]),
  categoryId: z.string(),
  images: z.array(ImageSchema),
  hasVariants: z.boolean().default(false),
});

export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>;
