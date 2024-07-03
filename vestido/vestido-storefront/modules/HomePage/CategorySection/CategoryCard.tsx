import Image, { StaticImageData } from 'next/image';

export type CategoryCardData = {
  cardImage: StaticImageData;
  title: string;
};

interface CategoryCardProps {
  data: CategoryCardData;
}
const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  return (
    <div className="group basis-1/4 lg:basis-48 text-center transition duration-700 ease-in-out md:hover:-translate-y-5 text-[#333333]">
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
        <div className="pt-2 capitalize text-center text-sm md:text-md group-hover:underline group-hover:underline-offset-4 leading-normal text-[#333333] group-hover:text-[#48CAB2] ">
          {data.title}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
