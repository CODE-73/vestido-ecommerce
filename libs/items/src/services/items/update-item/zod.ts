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
  discountPercent: z.coerce
    .number()
    .max(100, { message: 'Percentage cannot be more than 100' })
    .default(0)
    .nullable(),
  discountedPrice: z.coerce.number().nullable(),
  slug:z.string()
});

export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;
