import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';
import { useVariants } from 'libs/items/src/swr/index';

import { useRouter } from 'next/router';
import React from 'react';

interface VariantProps {
  itemId: string;
}

const VariantsTable: React.FC<VariantProps> = ({ itemId }) => {
  const router = useRouter();
  const { data } = useVariants(itemId);

  const handleRowClick = (variant: string) => {
    console.log(variant);
    router.push(`/variants/${encodeURIComponent(variant)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Item ID</TableHead>
          {/* <TableHead>Price</TableHead>
          <TableHead className="text-right">Category</TableHead> */}
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
              <TableCell className="font-medium">{itemVariant.id}</TableCell>
              <TableCell>{itemVariant.itemId}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default VariantsTable;
