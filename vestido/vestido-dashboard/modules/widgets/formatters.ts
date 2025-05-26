export const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

// utils/formatters.ts
import { format, parseISO } from 'date-fns';

export const formatPeriod = (period: string, groupBy: string) => {
  try {
    switch (groupBy) {
      case 'daily': {
        // period = "2025-05-01"
        const date = parseISO(period);
        return format(date, 'MMM dd'); // "May 01"
      }
      case 'weekly': {
        // period = "2025-W18" or similar ISO string
        return period; // or customize like "W18 (2025)"
      }
      case 'monthly': {
        // period = "2025-05"
        const [year, month] = period.split('-');
        return new Date(Number(year), Number(month) - 1).toLocaleString(
          'default',
          {
            month: 'short',
            year: 'numeric',
          },
        ); // "May 2025"
      }
      case 'yearly': {
        return period; // already like "2025"
      }
      default:
        return period;
    }
  } catch (e) {
    console.warn('Invalid period format:', period, groupBy);
    return period;
  }
};

export type GroupBy = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const isValidGroupBy = (value: string | null): value is GroupBy =>
  ['daily', 'weekly', 'monthly', 'yearly'].includes(value ?? '');

export const formatDate = (date: string | Date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
};
