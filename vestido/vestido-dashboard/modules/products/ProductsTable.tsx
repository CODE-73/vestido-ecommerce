import { useRouter } from 'next/router';

import { LuTrash } from 'react-icons/lu';

import { ListItemResponse, useItemDelete } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

interface ProductTableProps {
  data: ListItemResponse;
}

const ProductsTable: React.FC<ProductTableProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  // const { data } = useItems();

  const handleRowClick = (product: string) => {
    router.push(`/products/${encodeURIComponent(product)}`);
  };

  const { trigger, isMutating } = useItemDelete();

  const handleItemDelete = async (itemId: string) => {
    try {
      await trigger({
        itemId: itemId,
      });
    } catch (e) {
      console.error('Error deleting item:', e);
      toast({
        title: 'Error deleting Product',
      });
    }
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
          <TableHead>Variants Count</TableHead>
          <TableHead className="text-right">Delete</TableHead>
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
              <TableCell>
                <Button
                  className="bg-transparent text-black hover:text-white"
                  type="button"
                  disabled={isMutating}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemDelete(item.id);
                  }}
                >
                  {' '}
                  {isMutating ? 'Deleting...' : <LuTrash />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default ProductsTable;
