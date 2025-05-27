import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  isBefore,
  isEqual,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

export type GroupBy = 'daily' | 'weekly' | 'monthly' | 'yearly';

export function generatePeriods(
  from: Date,
  to: Date,
  groupBy: GroupBy,
): string[] {
  const periods: string[] = [];
  let current: Date;
  let formatStr: string;

  switch (groupBy) {
    case 'daily':
      current = startOfDay(from);
      formatStr = 'yyyy-MM-dd';
      while (isBefore(current, to) || isEqual(current, to)) {
        periods.push(format(current, formatStr));
        current = addDays(current, 1);
      }
      break;

    case 'weekly':
      current = startOfWeek(from, { weekStartsOn: 1 }); // ISO week (Monday)
      formatStr = "RRRR-'W'II";
      while (isBefore(current, to) || isEqual(current, to)) {
        periods.push(format(current, formatStr));
        current = addWeeks(current, 1);
      }
      break;

    case 'monthly':
      current = startOfMonth(from);
      formatStr = 'yyyy-MM';
      while (isBefore(current, to) || isEqual(current, to)) {
        periods.push(format(current, formatStr));
        current = addMonths(current, 1);
      }
      break;

    case 'yearly':
      current = startOfYear(from);
      formatStr = 'yyyy';
      while (isBefore(current, to) || isEqual(current, to)) {
        periods.push(format(current, formatStr));
        current = addYears(current, 1);
      }
      break;

    default:
      throw new Error(`Unsupported groupBy: ${groupBy}`);
  }

  return periods;
}
