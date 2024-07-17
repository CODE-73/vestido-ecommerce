import { ListItemResponse } from '@vestido-ecommerce/items';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

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
          <TableHead>Has Variants</TableHead>
          <TableHead className="text-right">Variants Count</TableHead>
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
              <TableCell className="truncate max-w-xs">
                {item.description}
              </TableCell>
              <TableCell>{item.hasVariants ? 'Yes' : 'No'}</TableCell>
              <TableCell
                className={`${
                  item.hasVariants && item.variants.length < 1
                    ? 'text-red-500 font-semibold'
                    : ''
                } text-center`}
              >
                {item.hasVariants ? `${item.variants.length}` : 'No variant'}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default ProductsTable;
