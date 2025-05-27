import { useEffect } from 'react';

import { format, startOfDay, subDays } from 'date-fns';

import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';

import { useWidgets } from './widgets-provider';

export default function WidgetsDateRange() {
  const { fromDate, toDate, handleDateChange } = useWidgets();

  const filterOptions = [
    'last 30 days',
    'last 7 days',
    'today',
    'yesterday',
  ] as const;

  // Set default dates to 'last 30 days' on mount if not already set
  useEffect(() => {
    if (!fromDate || !toDate) {
      const today = startOfDay(new Date());
      const newFromDate = format(subDays(today, 29), 'yyyy-MM-dd');
      const newToDate = format(today, 'yyyy-MM-dd');
      handleDateChange(newFromDate, newToDate);
    }
  }, [fromDate, toDate, handleDateChange]);

  const handleFilterChange = (value: (typeof filterOptions)[number]) => {
    const today = startOfDay(new Date());

    let newFromDate: string | null = null;
    let newToDate: string | null = null;

    switch (value) {
      case 'today': {
        newFromDate = format(today, 'yyyy-MM-dd');
        newToDate = newFromDate;
        break;
      }
      case 'yesterday': {
        const yesterday = subDays(today, 1);
        newFromDate = format(yesterday, 'yyyy-MM-dd');
        newToDate = newFromDate;
        break;
      }
      case 'last 7 days': {
        newFromDate = format(subDays(today, 6), 'yyyy-MM-dd');
        newToDate = format(today, 'yyyy-MM-dd');
        break;
      }
      case 'last 30 days': {
        newFromDate = format(subDays(today, 29), 'yyyy-MM-dd');
        newToDate = format(today, 'yyyy-MM-dd');
        break;
      }
    }

    handleDateChange(newFromDate, newToDate);
  };

  return (
    <div className="flex gap-1 mb-4">
      <Select onValueChange={handleFilterChange} defaultValue="last 30 days">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option} value={option}>
              <div className="capitalize">{option}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={fromDate ?? ''}
        onChange={(e) => handleDateChange(e.target.value, toDate)}
        className="input w-[180px]"
      />
      <Input
        type="date"
        value={toDate ?? ''}
        onChange={(e) => handleDateChange(fromDate, e.target.value)}
        className="input w-[180px]"
      />
    </div>
  );
}
