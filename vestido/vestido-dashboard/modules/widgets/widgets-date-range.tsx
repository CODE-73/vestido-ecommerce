import { useEffect, useState } from 'react';

import { format, isEqual, parse, startOfDay, subDays } from 'date-fns';

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

  const [selectedFilter, setSelectedFilter] = useState<string>('last 30 days');

  const filterOptions = [
    'last 30 days',
    'last 7 days',
    'today',
    'yesterday',
    'custom',
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

  useEffect(() => {
    if (!fromDate || !toDate) return;

    const today = startOfDay(new Date());
    const from = parse(fromDate, 'yyyy-MM-dd', new Date());
    const to = parse(toDate, 'yyyy-MM-dd', new Date());

    const checks = [
      {
        filter: 'today',
        match: isEqual(from, today) && isEqual(to, today),
      },
      {
        filter: 'yesterday',
        match:
          isEqual(from, subDays(today, 1)) && isEqual(to, subDays(today, 1)),
      },
      {
        filter: 'last 7 days',
        match: isEqual(from, subDays(today, 6)) && isEqual(to, today),
      },
      {
        filter: 'last 30 days',
        match: isEqual(from, subDays(today, 29)) && isEqual(to, today),
      },
    ];

    const matchedFilter = checks.find((check) => check.match)?.filter;
    setSelectedFilter(matchedFilter || 'custom');
  }, [fromDate, toDate]);

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
      case 'custom': {
        // Do nothing, keep current dates
        return;
      }
    }

    handleDateChange(newFromDate, newToDate);
    setSelectedFilter(value);
  };

  const handleDateInputChange = (
    newFromDate: string | null,
    newToDate: string | null,
  ) => {
    handleDateChange(newFromDate, newToDate);
    // The useEffect above will handle setting 'custom' if dates don't match predefined filters
  };

  return (
    <div className="flex gap-1 mb-4">
      <Select onValueChange={handleFilterChange} value={selectedFilter}>
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
        onChange={(e) => handleDateInputChange(e.target.value, toDate)}
        className="input w-[180px]"
      />
      <Input
        type="date"
        value={toDate ?? ''}
        onChange={(e) => handleDateInputChange(fromDate, e.target.value)}
        className="input w-[180px]"
      />
    </div>
  );
}
