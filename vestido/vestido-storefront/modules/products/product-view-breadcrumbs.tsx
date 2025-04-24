import { FC } from 'react';

import { Category, ItemDetails } from '@vestido-ecommerce/items';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@vestido-ecommerce/shadcn-ui/breadcrumb';

type ProductViewBreadcrumbProps = {
  item: ItemDetails;
  category: Category;
};

const ProductViewBreadcrumb: FC<ProductViewBreadcrumbProps> = ({
  item,
  category,
}) => {
  return (
    <Breadcrumb className="p-3 text-white hover:text-white">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-white hover:text-white">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/products"
            className="text-white hover:text-white"
          >
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${category.id}`}>
            {category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white underline underline-offset-4">
            {item?.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductViewBreadcrumb;
