import { isValid, parse } from 'date-fns';
import { z } from 'zod';

export const BaseReportFilterSchema = z
  .object({
    fromDate: z.string().refine(
      (val) => {
        try {
          const parsed = parse(val, 'yyyy-mm-dd', new Date());
          return isValid(parsed);
        } catch {
          return false;
        }
      },
      { message: 'Invalid fromDate format, expected yyyy-mm-dd' },
    ),
    toDate: z.string().refine(
      (val) => {
        try {
          const parsed = parse(val, 'yyyy-mm-dd', new Date());
          return isValid(parsed);
        } catch {
          return false;
        }
      },
      { message: 'Invalid toDate format, expected yyyy-mm-dd' },
    ),
    groupBy: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  })
  .refine(
    (data) =>
      new Date(parse(data.toDate, 'yyyy-mm-dd', new Date())) >=
      new Date(parse(data.fromDate, 'yyyy-mm-dd', new Date())),
    { message: 'toDate must be after fromDate', path: ['toDate'] },
  );

export type BaseReportFilter = z.infer<typeof BaseReportFilterSchema>;
