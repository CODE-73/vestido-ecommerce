import { useRouter } from 'next/router';
import { useAttributes } from 'libs/items/src/swr/index';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';

export function ItemAttributeTable() {
  const router = useRouter();
  const { data } = useAttributes();
  console.log('data is', data?.data);

  const handleRowClick = (itemAttribute: string) => {
    console.log(itemAttribute);
    console.log('row click function');
    router.push(`/attributes/${encodeURIComponent(itemAttribute)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Values</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data &&
          data.data.map((itemAttribute) => (
            <TableRow
              key={itemAttribute.id}
              onClick={() => handleRowClick(itemAttribute.id)}
              className="max-w-sm truncate"
            >
              <TableCell className="font-medium">{itemAttribute.id}</TableCell>
              <TableCell>{itemAttribute.name}</TableCell>
              <TableCell>{itemAttribute.description}</TableCell>
              <TableCell>
                {itemAttribute.ItemAttributeValues.map((x) => x.value).join(
                  ','
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
