import React, { useState } from 'react';

import { OrderStatus } from '@prisma/client';
import { AiOutlineSearch } from 'react-icons/ai';

import { useAdminOrders } from '@vestido-ecommerce/orders/client';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';

import OrdersTable from './OrdersTable';

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<OrderStatus | null>(null);

  const { data, isLoading } = useAdminOrders({
    limit: 999999,
    q: searchQuery,
    orderStatus: status ? [status] : undefined,
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Orders List</h1>
        <div className="flex gap-2">
          <Select
            value={status || undefined}
            onValueChange={(s) => setStatus(s ? (s as OrderStatus) : null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
              <SelectItem value="COMPLETED">COMPLETED</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative min-w-[15em]">
            <Input
              name="search_orders"
              placeholder="Search Orders"
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

      <div className="bg-white"></div>

      <div className="bg-white">
        {isLoading ? (
          <div className="flex h-[60vh]">
            <span className="m-auto">Loading...</span>
          </div>
        ) : (
          <OrdersTable data={data} />
        )}
      </div>
    </div>
  );
};

export default Products;
