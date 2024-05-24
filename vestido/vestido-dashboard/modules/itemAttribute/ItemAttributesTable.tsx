import { useRouter } from 'next/router';
//import {useItemAttribute} from
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
  const { data } = useItemAttributes();
  // console.log('data is', data);

  const handleRowClick = (itemAttribute: string) => {
    console.log(itemAttribute);
    console.log('row click function');
    router.push(`/itemAttribute/${encodeURIComponent(itemAttribute)}`);
  };

  const getGenderString = (gender: Gender[]): string => {
    return gender.join(', ');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
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
              <TableCell>{itemAttribute.Description}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
