import { z } from 'zod';
export const ListTaxSchema = z.object({
  q: z.string().nullish(),
});

export type ListTaxSchemaType = z.infer<typeof ListTaxSchema>;
