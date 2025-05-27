import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

import { VestidoError } from '@vestido-ecommerce/utils';

import { type GroupBy } from './generate-periods';

interface PeriodRangeValidationParams {
  fromDate: string | Date;
  toDate: string | Date;
  groupBy: GroupBy;
}

/**
 * Validates that the number of periods between fromDate and toDate does not exceed 31.
 * Throws an error if validation fails.
 * @param params - Object containing fromDate, toDate, and groupBy
 * @throws Error if dates are invalid, fromDate is after toDate, or period count exceeds 31
 */
export function validatePeriodRange({
  fromDate,
  toDate,
  groupBy,
}: PeriodRangeValidationParams): void {
  // Convert string dates to Date objects
  const startDate =
    typeof fromDate === 'string' ? new Date(fromDate) : fromDate;
  const endDate = typeof toDate === 'string' ? new Date(toDate) : toDate;

  // Validate dates
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid date range provided. Please provide valid dates.');
  }

  // Ensure startDate is not after endDate
  if (startDate > endDate) {
    throw new Error(
      'Start date cannot be after end date. Please provide a valid range.',
    );
  }

  // Calculate the number of periods based on groupBy
  let periodCount: number;
  switch (groupBy) {
    case 'daily':
      periodCount = differenceInDays(endDate, startDate) + 1; // Inclusive of start date
      break;
    case 'weekly':
      periodCount = differenceInWeeks(endDate, startDate) + 1;
      break;
    case 'monthly':
      periodCount = differenceInMonths(endDate, startDate) + 1;
      break;
    case 'yearly':
      periodCount = differenceInYears(endDate, startDate) + 1;
      break;
    default:
      throw new Error(
        `Invalid groupBy value: ${groupBy}. Please provide a valid grouping.`,
      );
  }

  // Check if the period count exceeds 31
  if (periodCount > 31) {
    throw new VestidoError({
      name: 'InvalidDateRange',
      message: `The selected date range results in too many data points (${periodCount} ${groupBy} periods). Please select a range with 31 or fewer periods.`,
      httpStatus: 400,
    });
  }
}
