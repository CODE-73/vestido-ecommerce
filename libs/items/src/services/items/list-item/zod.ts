import { z } from 'zod';

export const ListItemRequestSchema = z
  .object({
    q: z.string().nullish(),
    categoryId: z.string().nullish(),
  })
  .nullish();

export type ListItemRequestSchemaType = z.infer<typeof ListItemRequestSchema>;
