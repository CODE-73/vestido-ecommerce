import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';

import { useCoupons } from '@vestido-ecommerce/coupons/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import CouponsTable from './coupons-table';

const CouponsListView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useCoupons();
  const coupons = data?.data;
  const router = useRouter();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    router.push('/coupons/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16 h-full">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Coupons List</h1>
        <div className="flex gap-[5px] ">
          <div className="relative min-w-[15em]">
            <Input
              name="search-coupons"
              placeholder="Search Coupons"
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
          <CouponsTable data={coupons ?? []} />
        )}
      </div>
    </div>
  );
};

export default CouponsListView;
