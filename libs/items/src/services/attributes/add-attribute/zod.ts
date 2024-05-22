import { z } from 'zod';

export const CreateAttributeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CreateAttributeSchemaType = z.infer<typeof CreateAttributeSchema>;
