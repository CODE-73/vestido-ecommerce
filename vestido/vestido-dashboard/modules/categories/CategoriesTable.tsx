import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'libs/shadcn-ui/src/ui/table';
import { useCategories, useCategory } from 'libs/items/src/swr/index';

import { useRouter } from 'next/router';
import { Gender } from '@prisma/client';

const ParentCategoryName: React.FC<{ parentId: string | null | undefined }> = ({
  parentId,
}) => {
  const { data: parentCategory, isLoading } = useCategory(parentId);

  if (isLoading) return <span>Loading...</span>;
  if (!parentCategory) return <span>N/A</span>;

  return <span>{parentCategory.data.name}</span>;
};

export function CategoriesTable() {
  const router = useRouter();
  const { data } = useCategories();
  // console.log('data is', data);

  const handleRowClick = (category: string) => {
    console.log(category);
    console.log('row click function');
    router.push(`/categories/${encodeURIComponent(category)}`);
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
          <TableHead>Parent Cateogry</TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data &&
          data.data.map((category) => (
            <TableRow
              key={category.id}
              onClick={() => handleRowClick(category.id)}
              className="max-w-sm truncate"
            >
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <ParentCategoryName parentId={category.parentCategoryId} />
              </TableCell>

              <TableCell className="text-right">
                {getGenderString(category.gender)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
