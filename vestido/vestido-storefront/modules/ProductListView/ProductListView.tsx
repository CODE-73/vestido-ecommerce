import * as React from 'react';
import Image from 'next/image';

import { Item } from '@prisma/client';

import {
  useCategory,
  usePaginatedItemsInfinite,
} from '@vestido-ecommerce/items/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@vestido-ecommerce/shadcn-ui/breadcrumb';

// import ProductFilter from './ProductFilter';
import MountAnimator from '../../components/mount-animator';
import ProductTile from './ProductTile';

type ProductListViewProps = {
  categoryId?: string;
  suggestedList?: boolean;
};

const ProductlistView: React.FC<ProductListViewProps> = ({
  categoryId,
  suggestedList,
}) => {
  const { data: { data: category } = { data: null } } = useCategory(categoryId);
  // const { data: items } = useItems({ categoryId });
  const { items, loadMore, hasMore, isLoadingMore, isLoadingInitialData } =
    usePaginatedItemsInfinite({ categoryId });

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  // ⬇️ Use IntersectionObserver to auto-load more
  React.useEffect(() => {
    const el = bottomRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [loadMore, hasMore, isLoadingMore]);

  return (
    <div className="md:px-16">
      <Breadcrumb className={`${suggestedList ? 'hidden' : ''}   p-3`}>
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
              className={`text-white hover:text-white ${category && category.name ? '' : 'underline underline-offset-4'}`}
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category?.name && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white underline underline-offset-4">
                  {category?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={`text-2xl lg:text-4xl  tracking-wide text-white text-center font-extrabold my-5 ${
          !suggestedList && category?.name ? 'py-3 md:py-6 py-14' : 'py-5'
        }`}
      >
        {!suggestedList && (category?.name ?? 'All')}
      </div>
      <div className="flex relative justify-center">
        {/* {!suggestedList && (
          <div className="basis-1/5 hidden invisible lg:block">
            <ProductFilter />
          </div>
        )} */}
        {}

        {isLoadingInitialData ? (
          <div className="text-white text-center py-10">
            Loading products...
          </div>
        ) : items.length > 0 ? (
          <>
            <div
              className={`grid grid-cols-2 gap-2 px-5 md:grid-cols-3 lg:grid-cols-4  md:gap-5 xl:gap-10 md:px-0 ${suggestedList ? 'xl:px-32 xl:grid-cols-6' : ' w-full xl:grid-cols-5'} `}
            >
              {items?.map((item: Item, index) => (
                <MountAnimator key={item.id} deferIdx={index}>
                  <ProductTile data={item} />
                </MountAnimator>
              ))}
            </div>
            {/* <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center mt-8">
              <button
                className="border border-gray-200 text-xs text-white font-medium py-2 px-5  my-5 hover:border-black duration-100"
                onClick={handleShowMoreClick}
              >
                Show More
              </button>
            </div> */}
            {/* Sentinel element that triggers loadMore */}
            {hasMore && <div ref={bottomRef} className="h-10 w-full" />}

            {/* Optional loading indicator */}
            {/* {isLoadingMore && (
              <div className="text-white text-sm mt-5 ">
                Loading more...
              </div>
            )} */}
          </>
        ) : (
          <div className="absolute left-[50%] transform -translate-x-1/2 flex flex-col items-center text-white">
            <div>
              We are updating this category with brand new products to suit your
              style!
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mt-32">
              <Image src="/assets/noitems.png" alt="" fill />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductlistView;
