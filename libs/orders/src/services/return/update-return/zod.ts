import { z } from 'zod';
export const UpdateReturnSchema = z.object({
  returnId: z.string(),
  status: z.string(),
});

export type UpdateReturnSchemaType = z.infer<typeof UpdateReturnSchema>;
