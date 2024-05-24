import { z } from 'zod';

export const UpdateAttributeValueSchema = z.object({
  id: z.string().optional(),
  value: z.string(),
});

export const UpdateAttributeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  itemAttributeValues: z.array(UpdateAttributeValueSchema).optional(),
});

export type UpdateAttributeSchemaType = z.infer<typeof UpdateAttributeSchema>;
