import React, { useState } from 'react';

import { FulfillmentStatus } from '@prisma/client';
import { subDays } from 'date-fns';
import { AiOutlineSearch } from 'react-icons/ai';

import { useFulfillments } from '@vestido-ecommerce/orders/client';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';

import FulfillmentsTable from './FulfillmentsTable';

const FulfillmentsListView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<FulfillmentStatus | null>(null);
  const [fromDate, setFromDate] = useState<string>(
    subDays(new Date(), 30).toISOString().substring(10, 0),
  );
  const [toDate, setToDate] = useState<string>(
    new Date().toISOString().substring(0, 10),
  );

  const { data, isLoading } = useFulfillments({
    q: searchQuery,
    limit: 9999999,
    fulfillmentStatus: status ? [status] : [],
    fromDate,
    toDate,
  });
  const fulfillments = data?.data;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value; // yyyy-MM-dd
    if (dateStr) {
      setFromDate(dateStr);
    }
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value; // yyyy-MM-dd
    if (dateStr) {
      setToDate(dateStr);
    }
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16 h-full">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Fulfillments List</h1>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">From</label>
            <div className="relative">
              <Input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                className="w-[150px] text-transparent caret-black"
                style={{ WebkitTextFillColor: 'transparent' }}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-black text-sm pointer-events-none">
                {fromDate}
              </span>
            </div>

            <label className="text-sm font-medium">To</label>
            <div className="relative">
              <Input
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                className="w-[150px] text-transparent caret-black"
                style={{ WebkitTextFillColor: 'transparent' }}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-black text-sm pointer-events-none">
                {toDate}
              </span>
            </div>
          </div>

          <Select
            value={status || undefined}
            onValueChange={(s) =>
              setStatus(s ? (s as FulfillmentStatus) : null)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">DRAFT</SelectItem>
              <SelectItem value="AWAITING_PICKUP">AWAITING PICKUP</SelectItem>
              <SelectItem value="IN_TRANSIT">IN TRANSIT</SelectItem>
              <SelectItem value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</SelectItem>
              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              <SelectItem value="FAILED">FAILED</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative min-w-[15em]">
            <Input
              name="search-fulfillments"
              placeholder="Search Fulfillments"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <AiOutlineSearch
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={24}
            />
          </div>
        </div>
      </div>

      <div className="bg-white">
        {isLoading ? (
          <div className="flex h-[60vh]">
            <span className="m-auto">Loading...</span>
          </div>
        ) : (
          <FulfillmentsTable data={fulfillments ?? []} />
        )}
      </div>
    </div>
  );
};

export default FulfillmentsListView;
