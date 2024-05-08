import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';
import { useItems } from 'libs/items/src/swr/index';

export function ProductsTable() {
  const { data } = useItems();

  console.log('data is', data);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data &&
          data.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className="text-right">{item.description}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
