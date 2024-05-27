import { z } from 'zod';

export const UpdateAttributeValueSchema = z.object({
  id: z.string().optional(),
  value: z.string(),
});

export const UpdateAttributeSchema = z.object({
  id: z.string(),
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
  itemAttributeValues: z.array(UpdateAttributeValueSchema),
});

export type UpdateAttributeSchemaType = z.infer<typeof UpdateAttributeSchema>;
