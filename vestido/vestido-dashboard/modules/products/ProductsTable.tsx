import { ListItemResponse } from '@vestido-ecommerce/items';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';

import { useRouter } from 'next/router';

interface ProductTableProps {
  data: ListItemResponse;
}

const ProductsTable: React.FC<ProductTableProps> = ({ data }) => {
  const router = useRouter();
  // const { data } = useItems();

  const handleRowClick = (product: string) => {
    router.push(`/products/${encodeURIComponent(product)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Has Variants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {item.title}
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.category?.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">
                {item.hasVariants ? 'Yes' : 'No'}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default ProductsTable;
