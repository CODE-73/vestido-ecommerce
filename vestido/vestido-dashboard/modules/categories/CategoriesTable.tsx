import { useRouter } from 'next/router';

import { Category, Gender } from '@prisma/client';

import { useCategory } from '@vestido-ecommerce/items';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

interface CategoryTableProps {
  data: Category[];
}

const ParentCategoryName: React.FC<{ parentId: string | null | undefined }> = ({
  parentId,
}) => {
  const { data: parentCategory, isLoading } = useCategory(parentId);

  if (isLoading) return <span>Loading...</span>;
  if (!parentCategory) return <span>N/A</span>;

  return <span>{parentCategory.data.name}</span>;
};

const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const router = useRouter();

  const handleRowClick = (category: string) => {
    router.push(`/categories/${encodeURIComponent(category)}`);
  };

  const getGenderString = (gender: Gender[]): string => {
    return gender.join(', ');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Parent Cateogry</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((category) => (
            <TableRow
              key={category.id}
              onClick={() => handleRowClick(category.id)}
              className="max-w-sm truncate cursor-pointer"
            >
              <TableCell className="font-semibold">{category.name}</TableCell>
              <TableCell>
                <ParentCategoryName parentId={category.parentCategoryId} />
              </TableCell>
              <TableCell>{category.description}</TableCell>

              <TableCell className="text-right">
                {getGenderString(category.gender)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
