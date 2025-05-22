'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@tremor/react';

import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';

export const OrderFilterControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fromDate, setFromDate] = useState(
    searchParams?.get('fromDate') ?? '2025-01-01',
  );
  const [toDate, setToDate] = useState(
    searchParams?.get('toDate') ?? '2025-05-16',
  );
  const [groupBy, setGroupBy] = useState(
    searchParams?.get('groupBy') ?? 'monthly',
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set('fromDate', fromDate);
    params.set('toDate', toDate);
    params.set('groupBy', groupBy);
    router.push(`?${params.toString()}`);
  };

  const groupByOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;

  return (
    <div className="grid grid-cols-2 gap-1 mb-4">
      <Input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="input w-[180px]"
      />
      <Input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="input w-[180px]"
      />
      <Select value={groupBy} onValueChange={(value) => setGroupBy(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Group By" />
        </SelectTrigger>
        <SelectContent>
          {groupByOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={applyFilters} className="button">
        Apply
      </Button>
    </div>
  );
};
