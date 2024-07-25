import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';

import { useAttributes } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import ItemAttributeTable from './ItemAttributesTable';

const ItemAttributes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useAttributes({ q: searchQuery });
  const router = useRouter();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    router.push('/attributes/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Item Attribute List</h1>
        <div className=" flex gap-[5px] ">
          <div className="relative">
            <Input
              name="search-attributes"
              placeholder="Search Attributes"
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
            className="p-5 whitespace-nowrap "
          >
            + Add New
          </Button>
        </div>
      </div>

      <div className="bg-white">
        <ItemAttributeTable data={data?.success ? data.data : []} />
      </div>
    </div>
  );
};

export default ItemAttributes;
