import { addDays, format, isBefore } from 'date-fns';

export function checkReturnEligibility(orderDate: Date): {
  returnDeadline: string;
  canBeReturned: boolean;
} {
  const rawReturnDeadline = addDays(orderDate, 7);
  const returnDeadline = format(rawReturnDeadline, 'EEE, dd MMM yyyy');
  const canBeReturned = isBefore(new Date(), returnDeadline);

  return { returnDeadline, canBeReturned };
}
