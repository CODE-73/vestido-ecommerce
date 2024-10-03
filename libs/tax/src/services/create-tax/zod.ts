import { z } from 'zod';

export const CreateTaxSchema = z.object({
  title: z.string(),
  rate: z.number(),
  description: z.string(),
  active: z.boolean(),
});

export type CreateTaxSchemaType = z.infer<typeof CreateTaxSchema>;
