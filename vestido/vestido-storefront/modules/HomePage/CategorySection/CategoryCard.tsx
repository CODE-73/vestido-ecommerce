import Image from 'next/image';
import Link from 'next/link';

import { z } from 'zod';

import { useCategories } from '@vestido-ecommerce/items/client';
import { HeroCategorySchema } from '@vestido-ecommerce/settings/client';

type CategoryData = z.infer<typeof HeroCategorySchema>;

interface CategoryCardProps {
  category_card: CategoryData;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category_card }) => {
  const { data: categories } = useCategories();

  const getCategory = (id: string) => {
    return categories?.data?.find((category) => category.id === id);
  };

  const category = getCategory(category_card.categoryId as string);
  const categoryId = category?.id;

  return (
    <div className="group basis-1/4 lg:basis-48 text-center transition duration-700 ease-in-out md:hover:-translate-y-5 text-[#333333]">
      <Link href={`/${categoryId}`}>
        <div className="flex flex-col items-center mb-5 md:mb-auto">
          <div className="relative w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full">
            <Image
              src={category_card.image.url ?? ''}
              alt="alt text"
              placeholder={
                category_card.image.blurHashDataURL ? 'blur' : undefined
              }
              blurDataURL={category_card.image.blurHashDataURL ?? undefined}
              sizes="(max-width: 640px) 50vw"
              fill
            />
          </div>

          <div className="pt-2 capitalize text-center text-xs md:text-base group-hover:underline group-hover:underline-offset-4 leading-normal text-white group-hover:text-[#48CAB2] ">
            {/*text-[#333333]*/}
            {category?.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
