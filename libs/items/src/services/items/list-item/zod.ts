import { z } from 'zod';

export const ListItemRequestSchema = z
  .object({
    q: z.string().nullish(),
    categoryId: z.string().nullish(),
    gender: z.string().nullish(),
    limit: z.number().int().min(1).max(100).nullish(),
    offset: z.number().int().min(0).nullish(),
    enabled: z.union([
      z.boolean().nullish(),
      z
        .string()
        .nullish()
        .transform((val) => {
          if (val === 'true') return true;
          if (val === 'false') return false;
          return undefined;
        }),
    ]),
  })
  .nullish();

export type ListItemRequestSchemaType = z.infer<typeof ListItemRequestSchema>;
