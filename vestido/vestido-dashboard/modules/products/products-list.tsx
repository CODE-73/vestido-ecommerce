import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';

import { useItems } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import { CategoryCombobox } from '../../forms/category-combobox-element';
import ProductsTable from './ProductsTable';

const ProductsListView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { data, isLoading } = useItems({ q: searchQuery, categoryId });
  const router = useRouter();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    router.push('/products/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16 h-full">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Products List</h1>
        <div className="flex gap-[5px] ">
          <CategoryCombobox value={categoryId} onChange={setCategoryId} />
          <div className="relative min-w-[15em]">
            <Input
              name="search-products"
              placeholder="Search Products"
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
          <ProductsTable data={data ?? []} />
        )}
      </div>
    </div>
  );
};

export default ProductsListView;
