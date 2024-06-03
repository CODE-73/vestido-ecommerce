import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';
import { useItems } from 'libs/items/src/swr/index';

import { useRouter } from 'next/router';

export function ProductsTable() {
  const router = useRouter();
  const { data } = useItems();
  console.log('item data is', data);

  const handleRowClick = (product: string) => {
    console.log(product);
    console.log('row click function');
    router.push(`/products/${encodeURIComponent(product)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data &&
          data.data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="cursor-pointer"
            >
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.price}</TableCell>
              {/* <TableCell></TableCell> */}
              <TableCell className="text-right">{item.description}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
