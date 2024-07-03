import { z } from 'zod';
import { ImageSchema } from '@vestido-ecommerce/utils';
import { Gender, StockStatus } from '@prisma/client';

export const UpdateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  stockStatus: z
    .nativeEnum(StockStatus)
    .default('AVAILABLE' satisfies StockStatus),
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

export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;
