import { z } from 'zod';

export const BaseReportFilterSchema = z.object({
  fromDate: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Invalid fromDate format',
    }),
  toDate: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Invalid toDate format',
    }),
  groupBy: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
});

export type BaseReportFilter = z.infer<typeof BaseReportFilterSchema>;
