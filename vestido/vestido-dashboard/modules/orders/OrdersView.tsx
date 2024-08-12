import React from 'react';

import { useAdminOrders } from '@vestido-ecommerce/orders';

import OrdersTable from './OrdersTable';

const Products: React.FC = () => {
  //   const [searchQuery, setSearchQuery] = useState('');
  const { data } = useAdminOrders();

  //   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchQuery(e.target.value);
  //   };

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Orders List</h1>

        {/* <div className="relative">
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
          </div> */}
      </div>

      <div className="bg-white">
        <OrdersTable data={data} />
      </div>
    </div>
  );
};

export default Products;
