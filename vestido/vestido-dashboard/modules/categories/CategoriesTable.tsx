import { useRouter } from 'next/router';

import { Category, Gender } from '@prisma/client';
import { LuTrash } from 'react-icons/lu';

import {
  useCategory,
  useCategoryDelete,
} from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

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
  const { toast } = useToast();
  const { trigger: deleteCategory, isMutating: isDeleting } =
    useCategoryDelete();

  const handleRowClick = (category: string) => {
    router.push(`/categories/${encodeURIComponent(category)}`);
  };

  const getGenderString = (gender: Gender[]): string => {
    return gender.join(', ');
  };

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      await deleteCategory({
        categoryId: categoryId,
      });
    } catch (e) {
      if (e instanceof VestidoError) {
        toast({
          title: e.name,
          description: e.message,
        });
      } else {
        console.error('Error deleting category:', e);
        toast({
          title: 'Error deleting Category',
          description: 'Unknown Internal Error',
        });
      }
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Parent Cateogry</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Gender</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((category) => (
            <TableRow
              key={category.id}
              onClick={() => handleRowClick(category.id)}
              className={`${!category.enabled ? 'text-[#999]' : ''} max-w-sm truncate cursor-pointer`}
            >
              <TableCell className="font-semibold">{category.name}</TableCell>
              <TableCell>
                <ParentCategoryName parentId={category.parentCategoryId} />
              </TableCell>
              <TableCell>{category.description}</TableCell>

              <TableCell className="text-right">
                {getGenderString(category.gender)}
              </TableCell>
              <TableCell>
                <Button
                  className="bg-transparent text-black hover:text-white"
                  type="button"
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryDelete(category.id);
                  }}
                >
                  {isDeleting ? 'Deleting...' : <LuTrash />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
