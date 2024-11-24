import { z } from 'zod';

export const UpdateOrderSchema = z.object({
  id: z.string(),
  description: z.string(),
});

export type UpdateOrderSchemaType = z.infer<typeof UpdateOrderSchema>;
