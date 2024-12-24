import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';

import { useFulfillments } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import FulfillmentsTable from './FulfillmentsTable';

const FulfillmentsListView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useFulfillments({
    limit: 9999999,
  });
  const fulfillments = data?.data;
  const router = useRouter();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    router.push('/fulfillments/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16 h-full">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Fulfillments List</h1>
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

          <Button
            onClick={handleButtonClick}
            type="button"
            className="p-5 whitespace-nowrap"
          >
            + Add New
          </Button>
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
