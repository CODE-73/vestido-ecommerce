import { Card, Text } from '@tremor/react';
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

import { type GroupBy } from '../formatters';

interface ValidRangeComponentProps {
  fromDate?: string | Date;
  toDate?: string | Date;
  groupBy: GroupBy;
  children: React.ReactNode;
}

export const ValidRangeComponent: React.FC<ValidRangeComponentProps> = ({
  fromDate,
  toDate,
  groupBy,
  children,
}) => {
  // Convert string dates to Date objects if necessary
  const startDate = fromDate
    ? typeof fromDate === 'string'
      ? new Date(fromDate)
      : fromDate
    : new Date();
  const endDate = toDate
    ? typeof toDate === 'string'
      ? new Date(toDate)
      : toDate
    : new Date();

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
      periodCount = 0;
  }

  // Check if the period count exceeds 31
  if (periodCount > 31) {
    return (
      <Card className="mt-6 h-[50%] flex justify-center items-center">
        <Text className="text-red-600 p-4 pb-0 bg-red-50 border-red-200 ">
          ⚠️ The selected date range results in more than 31 {groupBy} periods,
          which may impact chart readability. Please select a shorter range or
          different grouping.
        </Text>
      </Card>
    );
  }

  // If valid, render the children (e.g., the BarChart)
  return <>{children}</>;
};
