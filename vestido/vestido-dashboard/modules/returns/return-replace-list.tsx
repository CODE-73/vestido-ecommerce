import React, { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import { useReturnOrders } from '@vestido-ecommerce/orders/client';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import ReturnsTable from './returns-table';

const ReturnsListView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useReturnOrders();
  const returns = data?.data;

  console.log('returns', returns);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16 h-full">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Return/Replace List</h1>
        <div className="flex gap-[5px] ">
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
          <ReturnsTable data={returns} />
        )}
      </div>
    </div>
  );
};

export default ReturnsListView;
