import { isValid, parse } from 'date-fns';
import { z } from 'zod';

const parseISODate = (dateString: string) => {
  return parse(dateString, 'yyyy-MM-dd', new Date());
};

export const BaseReportFilterSchema = z
  .object({
    fromDate: z.string().refine(
      (val) => {
        const parsed = parseISODate(val);
        return isValid(parsed);
      },
      { message: 'Invalid fromDate format, expected yyyy-mm-dd' },
    ),
    toDate: z.string().refine(
      (val) => {
        const parsed = parseISODate(val);
        return isValid(parsed);
      },
      { message: 'Invalid toDate format, expected yyyy-mm-dd' },
    ),
    groupBy: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  })
  .refine((data) => parseISODate(data.toDate) >= parseISODate(data.fromDate), {
    message: 'toDate must be after fromDate',
    path: ['toDate'],
  });

export type BaseReportFilter = z.infer<typeof BaseReportFilterSchema>;
