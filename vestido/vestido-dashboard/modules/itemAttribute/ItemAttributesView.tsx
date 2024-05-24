import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { Form } from 'libs/shadcn-ui/src/ui/form';
import { InputElement } from '../../forms/input-element';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button } from 'libs/shadcn-ui/src/ui/button';
import {ItemAttributeTable} from './ItemAttributesTable';
import React from "react";

const ItemAttributes: React.FC = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues: {},
      });

    const handleButtonClick() = () => {
        router.push('/itemAttributes/add-new');
    };

    return (
        <div className="container mx-auto py-10 bg-slate-200 mt-16">
        <Form {...form}>
          <form>
            <div className="flex items-center py-5 gap-3 justify-between">
              <h1 className="text-lg font-semibold">Item Attribute List</h1>
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
                  type="button"
                  className="p-5 whitespace-nowrap "
                >
                  + Add New
                </Button>
              </div>
            </div>
  
            <div className="bg-white">
              <ItemAttributeTable />
            </div>
          </form>
        </Form>
      </div>

    );
};

export default ItemAttributes;