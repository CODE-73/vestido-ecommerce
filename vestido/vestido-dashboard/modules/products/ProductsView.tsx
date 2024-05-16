import { InputElement } from '../../forms/input-element';
import { Form } from 'libs/shadcn-ui/src/ui/form';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { ProductsTable } from './ProductsTable';
import { useRouter } from 'next/router';

const Products: React.FC = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {},
  });

  const handleButtonClick = () => {
    router.push('/products/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <Form {...form}>
        <form>
          <div className="flex items-center py-5 gap-3 justify-between">
            <h1 className="text-lg font-semibold">Products List</h1>
            <div className=" flex gap-[5px] ">
              <div className="relative">
                <InputElement
                  name="search-products"
                  placeholder="Search Products"
                  type="search"
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
            <ProductsTable />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Products;
