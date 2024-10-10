import { z } from 'zod';

export const ListCouponSchema = z.object({
  q: z.string().nullish(),
});

export type ListCouponSchemaType = z.infer<typeof ListCouponSchema>;
