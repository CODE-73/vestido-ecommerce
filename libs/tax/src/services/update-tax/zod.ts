import { z } from 'zod';

export const UpdateTaxSchema = z.object({
  id: z.string(),
  title: z.string(),
  rate: z.number(),
  description: z.string(),
  active: z.boolean(),
});

export type UpdateTaxSchemaType = z.infer<typeof UpdateTaxSchema>;
