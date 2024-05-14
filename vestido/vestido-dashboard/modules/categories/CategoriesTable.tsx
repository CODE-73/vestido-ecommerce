import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';
import { useCategories } from 'libs/items/src/swr/index';

import { useRouter } from 'next/router';

export function CategoriesTable() {
  const router = useRouter();
  const { data } = useCategories();
  // console.log('data is', data);

  const handleRowClick = (category: string) => {
    console.log(category);
    console.log('row click function');
    router.push(`/categories/${encodeURIComponent(category)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data &&
          data.data.map((category) => (
            <TableRow
              key={category.id}
              onClick={() => handleRowClick(category.id)}
            >
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>

              <TableCell className="text-right">
                {category.description}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
