import { z } from 'zod';

export const ItemAttributeValueSchema = z.object({
  value: z.string(),
});

export const CreateAttributeSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .nullish()
    .transform((x) => {
      if (!x || x.length === 0) {
        return null;
      }
      return x;
    }),
  itemAttributeValues: z.array(ItemAttributeValueSchema).optional(),
});

export type CreateAttributeSchemaType = z.infer<typeof CreateAttributeSchema>;
