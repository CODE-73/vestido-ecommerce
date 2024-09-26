import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';

import { useCategories } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { Switch } from '@vestido-ecommerce/shadcn-ui/switch';

// import { SelectElement } from '../../forms/select-element';
import { SwitchElement } from '../../forms/switch-element';
import CategoryTable from './CategoriesTable';

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [gender, setGender] = useState();
  const { data, isLoading } = useCategories({
    q: searchQuery,
    enabled,
    gender,
  });
  const router = useRouter();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    router.push('/categories/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Categories List</h1>
        <div className=" flex gap-[5px] ">
          <Switch
            name="enabled"
            value={enabled ? 'true' : 'false'}
            onChange={(e) => setEnabled(e.target.value)}
          />
          <Select value={gender} onChange={setGender}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEN">MEN</SelectItem>
              <SelectItem value="WOMEN">WOMEN</SelectItem>
              {/* <SelectItem value=>BOTH</SelectItem> */}
            </SelectContent>
          </Select>

          <div className="relative">
            <Input
              name="search-categories"
              placeholder="Search Categories"
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
        {isLoading ? (
          <div className="flex h-[60vh]">
            <span className="m-auto">Loading...</span>
          </div>
        ) : (
          <CategoryTable data={data?.success ? data.data : []} />
        )}
      </div>
    </div>
  );
};

export default Categories;
