import { useRouter } from 'next/router';

import { LuTrash } from 'react-icons/lu';

import {
  ListItemResponse,
  useItemDelete,
} from '@vestido-ecommerce/items/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
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
  categoryId?: string;
}

const ProductsTable: React.FC<ProductTableProps> = ({ data, categoryId }) => {
  const productsInCategory = data.filter((x) => x.categoryId === categoryId);
  const router = useRouter();
  const { toast } = useToast();
  // const { data } = useItems();

  const handleRowClick = (product: string) => {
    router.push(`/products/${encodeURIComponent(product)}`);
    console.log('row click');
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
    <>
      {data && categoryId && productsInCategory.length < 1 ? (
        <div className="w-full flex justify-center items-center my-10 font-semibold">
          There are no products in this category
        </div>
      ) : (
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
            {(data && categoryId ? productsInCategory : data).map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className="cursor-pointer"
              >
                <TableCell className="font-semibold capitalize">
                  {item.title}
                </TableCell>
                <TableCell>₹&nbsp;{item.price.toFixed(2)}</TableCell>
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
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-transparent text-black hover:text-white"
                        type="button"
                        disabled={isMutating}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <LuTrash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this product?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel type="button">
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => {
                            handleItemDelete(item.id);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      )}
    </>
  );
};

export default ProductsTable;
