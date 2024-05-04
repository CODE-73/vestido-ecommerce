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
    <div className="group relative">
      <div className="overflow-hidden">
        <div className="hover:scale-110 transition duration-500 cursor-pointer object-cover ">
          <Image src={data.cardImage} alt="alt text" />
        </div>
      </div>{' '}
      <div className="pt-2 group-hover:underline capitalize text-center font-bold text-lg group-hover:underline group-hover:underline-offset-4 leading-normal text-[#333333] hover:text-[#48CAB2]">
        {data.title}
      </div>
    </div>
  );
};

export default CategoryCard;
