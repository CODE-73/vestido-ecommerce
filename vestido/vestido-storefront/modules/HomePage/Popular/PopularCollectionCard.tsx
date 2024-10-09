import Image, { StaticImageData } from 'next/image';

export type PopularCollectionCardData = {
  cardImage: StaticImageData;
  mainTitle: string;
  textColor?: string;
};

interface PopularCollectionCardProps {
  data: PopularCollectionCardData;
  mainImage?: boolean;
}
const PopularCollectionCard: React.FC<PopularCollectionCardProps> = ({
  data,
  mainImage,
}) => {
  return (
    <div
      className={`group relative overflow-hidden ${mainImage ? 'col-span-2 row-span-2' : ''} w-full`}
    >
      <div className="hover:scale-110 transition duration-500 cursor-pointer w-full h-full">
        <Image
          src={data.cardImage}
          alt="alt text"
          className={`object-cover w-full h-full ${mainImage ? 'max-h-[85vh]' : 'max-h-[43vh]'}`} // Ensure it covers the entire area
        />
      </div>
      <div className="absolute left-10 top-10 ">
        <div
          className={`group-hover:underline capitalize font-bold text-2xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ${
            data.textColor ? `text-${data.textColor}` : 'text-white'
          }`}
        >
          {data.mainTitle}
        </div>
      </div>
    </div>
  );
};

export default PopularCollectionCard;
