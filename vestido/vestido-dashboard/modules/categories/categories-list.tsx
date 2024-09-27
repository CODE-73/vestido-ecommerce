import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';

import { Gender, useCategories } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { Switch } from '@vestido-ecommerce/shadcn-ui/switch';

import CategoryTable from './CategoriesTable';

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [gender, setGender] = useState<Gender | null>(null);

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
      <div className="flex flex-col md:flex-row items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold ">Categories List</h1>
        <div className=" flex gap-[5px] ">
          <div className="flex items-center">
            <Label>Enabled</Label>
            <Switch
              name="enabled"
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked)}
            />
          </div>
          <Select
            value={gender || undefined}
            onValueChange={(g) => setGender(g ? (g as Gender) : null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEN">MEN</SelectItem>
              <SelectItem value="WOMEN">WOMEN</SelectItem>
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
