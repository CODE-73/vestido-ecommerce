import { z } from 'zod';

export const OrderByQueryParamSchema = z.object({
  orderBy: z
    .string()
    .optional()
    .transform(
      (value) =>
        value
          ? value.split(',').map((field) => {
              const [column, direction] = field.split(':');
              return OrderByFieldSchema.parse({ column, direction });
            })
          : [{ column: 'createdAt', direction: 'asc' as const }], // Default sorting
    ),
});

export const PaginationQueryParamSchema = z.object({
  start: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : 0)), // Defaults to 0
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : 20)),
});

export const OrderByFieldSchema = z.object({
  column: z.string().default('createdAt'),
  direction: z.enum(['asc', 'desc']).default('asc'),
});

export type OrderByFieldType = z.infer<typeof OrderByFieldSchema>;
