import { z } from 'zod';

export const ListItemRequestSchema = z
  .object({
    q: z.string().nullish(),
    categoryId: z.string().nullish(),
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
