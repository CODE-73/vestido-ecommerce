import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { useCategories } from '@vestido-ecommerce/items/client';

export type CategoryCardData = {
  cardImage: StaticImageData;
  title: string;
};

interface CategoryCardProps {
  data: CategoryCardData;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  const { data: categories } = useCategories();

  const getCategory = (title: string) => {
    return categories?.data?.find((category) => category.name === title);
  };

  const category = getCategory(data.title);
  const categoryId = category?.id;

  return (
    <div className="group basis-1/4 lg:basis-48 text-center transition duration-700 ease-in-out md:hover:-translate-y-5 text-[#333333]">
      <Link href={`/${categoryId}`}>
        <div className="flex flex-col items-center">
          <div
            className="
      w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full"
          >
            <Image
              src={data.cardImage}
              alt="alt text"
              sizes="(max-width: 640px) 50vw"
            />
          </div>
          <div className="pt-2 capitalize text-center text-xs md:text-base group-hover:underline group-hover:underline-offset-4 leading-normal text-white group-hover:text-gray-300 ">
            {/*text-[#333333]*/}
            {data.title}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
