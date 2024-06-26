import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { useVariants } from '@vestido-ecommerce/items';

import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

interface VariantProps {
  itemId: string;
}

const VariantsTable: React.FC<VariantProps> = ({ itemId }) => {
  const router = useRouter();
  const { data } = useVariants(itemId);

  const handleButtonClick = () => {
    router.push(`/products/${encodeURIComponent(itemId)}/variants/add-new`);
  };

  const handleRowClick = (variant: string) => {
    router.push(
      `/products/${encodeURIComponent(itemId)}/variants/${encodeURIComponent(
        variant
      )}`
    );
  };

  return (
    <div>
      <div className="flex items-center py-5 lg:px-20 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Product Variants</h1>
        <div className=" flex gap-[5px] ">
          <Button
            onClick={handleButtonClick}
            type="button"
            className="p-5 whitespace-nowrap"
          >
            + Add Variant
          </Button>
        </div>
      </div>

      <div className="lg:px-20 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variant Name</TableHead>

              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data &&
              data.data.map((itemVariant) => (
                <TableRow
                  key={itemVariant.id}
                  onClick={() => handleRowClick(itemVariant.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {itemVariant.title}
                  </TableCell>
                  <TableCell className="text-right">
                    {itemVariant.price}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VariantsTable;
