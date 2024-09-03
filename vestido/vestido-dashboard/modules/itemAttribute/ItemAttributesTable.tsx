import { useRouter } from 'next/router';

import { type ListAttributesResponse } from '@vestido-ecommerce/items';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

interface ItemAttributeTableProps {
  data: ListAttributesResponse;
}

const ItemAttributeTable: React.FC<ItemAttributeTableProps> = ({ data }) => {
  const router = useRouter();
  // const { data } = useAttributes();

  const handleRowClick = (itemAttribute: string) => {
    router.push(`/attributes/${encodeURIComponent(itemAttribute)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Attribute</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Values</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((itemAttribute) => (
            <TableRow
              key={itemAttribute.id}
              onClick={() => handleRowClick(itemAttribute.id)}
              className="max-w-sm truncate cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {itemAttribute.name}
              </TableCell>
              <TableCell>{itemAttribute.description}</TableCell>
              <TableCell>
                {itemAttribute.values.map((x) => x.value).join(', ')}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ItemAttributeTable;
