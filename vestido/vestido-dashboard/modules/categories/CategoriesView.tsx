import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import CategoryTable from './CategoriesTable';
import { useRouter } from 'next/router';
import { useCategories } from '@vestido-ecommerce/items';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useCategories({ q: searchQuery });
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
        <CategoryTable data={data?.success ? data.data : []} />
      </div>
    </div>
  );
};

export default Categories;
