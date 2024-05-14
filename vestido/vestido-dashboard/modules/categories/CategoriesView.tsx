import { InputElement } from '../../forms/input-element';
import { Form } from 'libs/shadcn-ui/src/ui/form';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { CategoriesTable } from './CategoriesTable';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Categories: React.FC = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {},
  });

  const handleButtonClick = () => {
    console.log('add new button function');
    router.push('/categories/add-new');
  };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <Form {...form}>
        <form>
          <div className="flex items-center py-5 gap-3 justify-between">
            <h1 className="text-lg font-semibold">Categories List</h1>
            <div className=" flex gap-[5px] ">
              <div className="relative">
                <InputElement
                  name="search-categories"
                  placeholder="Search Categories"
                  type="search"
                />
                <AiOutlineSearch
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={24}
                />
              </div>

              <Button
                onClick={handleButtonClick}
                className="p-5 whitespace-nowrap "
              >
                + Add New
              </Button>
            </div>
          </div>

          <div className="bg-white">
            <CategoriesTable />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Categories;
